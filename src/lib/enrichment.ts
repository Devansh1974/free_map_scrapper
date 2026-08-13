import * as cheerio from "cheerio";
import { BusinessResult } from "@/types";

// Helper to resolve relative URLs
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).toString();
  } catch (_) {
    return relativeUrl;
  }
}

// Helper to normalize the target website URL
function normalizeUrl(url: string): string {
  let cleaned = url.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `http://${cleaned}`;
  }
  return cleaned;
}

// Fetch helper with timeout constraint (5 seconds for scraping)
async function fetchHtmlWithTimeout(url: string, timeoutMs = 5000): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });
    
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Failed to fetch HTML. Status: ${response.status}`);
    }
    return await response.text();
  } catch (error: any) {
    clearTimeout(timeoutId);
    throw error;
  }
}

interface ScrapingData {
  emails: Set<string>;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  contactPage?: string;
}

// Parse page HTML and extract emails, socials, and contact subpages
function extractLinksAndEmails(html: string, baseUrl: string): ScrapingData {
  const $ = cheerio.load(html);
  const emails = new Set<string>();
  let facebook: string | undefined = undefined;
  let instagram: string | undefined = undefined;
  let whatsapp: string | undefined = undefined;
  let contactPage: string | undefined = undefined;

  // 1. Scan mailto links
  $("a[href^='mailto:']").each((_, el) => {
    const href = $(el).attr("href") || "";
    const email = href.replace(/^mailto:/i, "").trim().split("?")[0];
    if (email && email.includes("@")) {
      emails.add(email.toLowerCase());
    }
  });

  // 2. Scan links for socials and contact subpages
  $("a[href]").each((_, el) => {
    const href = ($(el).attr("href") || "").trim();
    if (!href) return;

    const fullUrl = resolveUrl(baseUrl, href);

    // Instagram check
    if (
      /instagram\.com\//i.test(fullUrl) &&
      !/instagram\.com\/(p|reel|tv|stories|share|intent|dialog)/i.test(fullUrl)
    ) {
      if (!instagram) instagram = fullUrl;
    }

    // Facebook check
    if (
      /(facebook\.com|fb\.com)\//i.test(fullUrl) &&
      !/(facebook\.com|fb\.com)\/(sharer|share|plugins|dialog)/i.test(fullUrl)
    ) {
      if (!facebook) facebook = fullUrl;
    }

    // WhatsApp check
    if (/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(fullUrl)) {
      if (!whatsapp) whatsapp = fullUrl;
    }

    // Contact page check
    const linkText = $(el).text().toLowerCase();
    const isContactLink =
      /contact/i.test(href) ||
      /contact/i.test(linkText) ||
      /about/i.test(href) ||
      /support/i.test(href);

    if (isContactLink && !/^mailto:/i.test(href)) {
      // Prioritize contact-us over about-us
      if (!contactPage || /contact/i.test(href)) {
        contactPage = fullUrl;
      }
    }
  });

  // 3. Scan body raw text for email patterns
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2)[a-zA-Z]{2,}/gi;
  const rawBodyText = $("body").text();
  const textMatches = rawBodyText.match(emailRegex);
  if (textMatches) {
    for (const match of textMatches) {
      const email = match.trim().toLowerCase();
      // Simple filter to block static resources
      if (!email.endsWith(".png") && !email.endsWith(".jpg") && !email.endsWith(".js") && !email.endsWith(".css")) {
        emails.add(email);
      }
    }
  }

  return { emails, facebook, instagram, whatsapp, contactPage };
}

/**
 * Enriches a single business result by fetching and parsing its website.
 */
export async function enrichBusinessResult(business: BusinessResult): Promise<BusinessResult> {
  const website = business.website;
  if (!website) {
    return business; // No website, nothing to enrich
  }

  try {
    const targetUrl = normalizeUrl(website);
    
    // Fetch homepage HTML
    const homepageHtml = await fetchHtmlWithTimeout(targetUrl, 5000);
    const data = extractLinksAndEmails(homepageHtml, targetUrl);

    let finalEmail: string | undefined = undefined;

    // Check homepage emails
    if (data.emails.size > 0) {
      finalEmail = Array.from(data.emails)[0];
    }

    // If no email was found on the homepage, but we found a Contact page, search that subpage!
    if (!finalEmail && data.contactPage) {
      try {
        const contactPageHtml = await fetchHtmlWithTimeout(data.contactPage, 5000);
        const contactData = extractLinksAndEmails(contactPageHtml, data.contactPage);
        if (contactData.emails.size > 0) {
          finalEmail = Array.from(contactData.emails)[0];
        }
      } catch (err: any) {
        console.warn(`Enrichment Contact Page fetch failed for: ${data.contactPage}`, err.message);
      }
    }

    // Return the enriched business result
    return {
      ...business,
      email: finalEmail,
      facebook: data.facebook,
      instagram: data.instagram,
      whatsapp: data.whatsapp,
      contactPage: data.contactPage,
    };
  } catch (error: any) {
    console.warn(`Enrichment failed for business: ${business.name} (website: ${website})`, error.message);
    return business; // Fail silently, return original business object
  }
}
