import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | FreeMapScrapper",
  description: "Track all recent updates, features, improvements, and bug fixes made to the FreeMapScrapper lead scraper engine.",
};

export default function ChangelogPage() {
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

        {/* Changelog Content */}
        <div className="prose prose-neutral max-w-none flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 border-b border-gray-150 pb-2">
            Changelog
          </h1>
          <p className="text-xs text-neutral-400">
            Track all releases, API upgrades, scraper details, and styling changes.
          </p>

          {/* Release Entry V2.0.0 */}
          <div className="mt-6 flex gap-4 md:gap-8 items-start">
            <div className="w-24 flex-shrink-0 pt-1 text-xs font-bold text-[#1A73E8] uppercase tracking-wider">
              Aug 2026
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="inline-flex w-fit items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-semibold text-[#1A73E8] ring-1 ring-inset ring-[#1A73E8]/10">
                v2.0.0
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-1">
                Website Profile Enrichment & SEO System
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                This release transforms FreeMapScrapper into an end-to-end B2B lead finder by crawling target business homepages for contacts.
              </p>
              <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5 mt-1">
                <li><strong>Cheerio Website Scraper:</strong> Pulls public emails, Instagram handles, Facebook pages, and WhatsApp links directly from business sites for free.</li>
                <li><strong>IP Rate Limiting:</strong> Deployed Upstash Redis sliding window rate limits (5 runs / 10 minutes) on the search endpoint to block API quota exhaustion.</li>
                <li><strong>Excel Hyperlink CSVs:</strong> Outputs CSV exports with dynamic hyperlinked cell formulas for one-click contact launches.</li>
                <li><strong>Google Workspace Style:</strong> Re-themed all buttons, cards, checkboxes, and hero indicators in minimal Workspace Blue and Google Green.</li>
                <li><strong>SEO Dynamic Blog Routes:</strong> Built static parameters generator blog engines (`/blog/[slug]`) to rank on search engine indexing categories.</li>
              </ul>
            </div>
          </div>

          <hr className="border-t border-neutral-100 my-4" />

          {/* Release Entry V1.0.0 */}
          <div className="flex gap-4 md:gap-8 items-start">
            <div className="w-24 flex-shrink-0 pt-1 text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Jul 2026
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="inline-flex w-fit items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-semibold text-neutral-500 ring-1 ring-inset ring-neutral-200">
                v1.0.0
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-1">
                Google Places API Integration
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Initial stable release of the search engine utility.
              </p>
              <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5 mt-1">
                <li><strong>Google Places API (New):</strong> Integrated Google Places TextSearch endpoints for modern, accurate results.</li>
                <li><strong>Details Promise Pool:</strong> Implemented parallel fetching for details queries with `p-limit` concurrent gates.</li>
                <li><strong>Deduplication Engine:</strong> Deduplicates business places automatically.</li>
                <li><strong>CSV Exporter:</strong> Configured CSV text formatting.</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
