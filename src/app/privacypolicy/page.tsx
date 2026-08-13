import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FreeMapScrapper",
  description: "Learn about how FreeMapScrapper handles business details, user search parameters, and public web scraping data privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        {/* Navigation */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>

        {/* Policy Content */}
        <div className="prose prose-neutral max-w-none flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 border-b border-gray-150 pb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-400">
            Last Updated: August 13, 2026
          </p>

          <section className="flex flex-col gap-2 mt-4">
            <h2 className="text-lg font-bold text-neutral-900">1. Introduction</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              At FreeMapScrapper, we value your privacy. This policy outlines how we handle the search terms you enter, the business details retrieved from public APIs, and the scraping of public websites. We aim to keep our tool completely transparent and user-friendly.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">2. Data We Do NOT Collect</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              FreeMapScrapper is built to be signup-free and server-less regarding search storage:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5">
              <li><strong>No User Accounts:</strong> You do not need to register, create an account, or provide card details to use this application.</li>
              <li><strong>No Database Storage:</strong> We do not log, capture, or save your search keywords, targeted cities, or exported business lead sheets. Everything happens live and is downloaded directly to your local file system.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">3. Data We Retrieve (Public Information)</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              To generate B2B outreach sheets, our system interfaces with:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5">
              <li><strong>Google Places API:</strong> Resolves public business names, phone numbers, addresses, ratings, and maps locations published by business owners.</li>
              <li><strong>Public Website Scraping:</strong> If you select "Enrich results", our server parses the HTML code of the business's public homepages and contact sheets. This is used solely to locate links (emails, socials) that are already visible on the open web.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">4. Third-Party Integrations</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We query the official Google Places API to retrieve business profiles. Your usage of this tool is subject to Google's standard Privacy Policies and Terms of Service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">5. Rate Limiting and Analytics</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              To prevent API abuse and secure server availability, we log hashed representations of client IP addresses temporarily using Upstash Redis. This is only used to compute sliding-window limit thresholds and is not linked to any personal profiles.
            </p>
          </section>

          <section className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
            <h2 className="text-sm font-semibold text-neutral-900">Contact Us</h2>
            <p className="text-xs text-neutral-500">
              For privacy inquiries, please open a ticket on our official GitHub repository or contact the founder Devansh Singh directly via LinkedIn.
            </p>
          </section>
        </div>

      </main>
      <Footer />
    </>
  );
}
