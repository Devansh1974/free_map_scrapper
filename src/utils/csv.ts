import { BusinessResult } from "@/types";

export function exportToCSV(
  results: BusinessResult[],
  query: string,
  location: string,
  options: {
    includeWebsite: boolean;
    includePhone: boolean;
    includeRating: boolean;
    enrichResults?: boolean;
  }
) {
  // Helper to format URLs as clickable spreadsheet HYPERLINK formulas
  const makeHyperlink = (url: string | undefined) => {
    if (!url) return "";
    const escapedUrl = url.replace(/"/g, '""');
    return `=HYPERLINK("${escapedUrl}", "${escapedUrl}")`;
  };

  // Check if enrichment data is present in the parameters or within the results
  const hasEnrichment = !!options.enrichResults || results.some(
    (r) => r.email || r.instagram || r.facebook || r.whatsapp || r.contactPage
  );

  // Build header row
  const headers = ["#", "Name", "Type", "Address"];
  if (options.includePhone) headers.push("Phone");
  if (options.includeWebsite) headers.push("Website");
  if (options.includeRating) {
    headers.push("Rating");
    headers.push("Review Count");
  }
  if (hasEnrichment) {
    headers.push("Email");
    headers.push("Instagram");
    headers.push("Facebook");
    headers.push("WhatsApp");
    headers.push("Contact Page URL");
  }
  headers.push("Google Maps URL");

  // Escape special CSV characters (comma, double quotes, newline)
  const escapeCSV = (val: string | number | undefined) => {
    if (val === undefined || val === null) return "";
    const strValue = String(val);
    if (
      strValue.includes(",") ||
      strValue.includes('"') ||
      strValue.includes("\n") ||
      strValue.includes("\r")
    ) {
      return `"${strValue.replace(/"/g, '""')}"`;
    }
    return strValue;
  };

  // Build content rows
  const rows = results.map((biz, index) => {
    const row = [
      (index + 1).toString(),
      escapeCSV(biz.name),
      escapeCSV(biz.type || ""),
      escapeCSV(biz.address || ""),
    ];
    if (options.includePhone) row.push(escapeCSV(biz.phone || ""));
    if (options.includeWebsite) row.push(escapeCSV(makeHyperlink(biz.website)));
    if (options.includeRating) {
      row.push(escapeCSV(biz.rating !== undefined ? biz.rating.toString() : ""));
      row.push(escapeCSV(biz.reviews !== undefined ? biz.reviews.toString() : ""));
    }
    if (hasEnrichment) {
      row.push(escapeCSV(biz.email ? `=HYPERLINK("mailto:${biz.email}", "${biz.email}")` : ""));
      row.push(escapeCSV(makeHyperlink(biz.instagram)));
      row.push(escapeCSV(makeHyperlink(biz.facebook)));
      row.push(escapeCSV(makeHyperlink(biz.whatsapp)));
      row.push(escapeCSV(makeHyperlink(biz.contactPage)));
    }
    row.push(escapeCSV(makeHyperlink(biz.mapsUrl)));
    return row.join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n"); // Include BOM for proper Excel encoding
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  // Format filename: freemapscrapper-{query}-{location}.csv
  const sanitize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  
  const filename = `freemapscrapper-${sanitize(query)}-${sanitize(location)}.csv`;
  
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
