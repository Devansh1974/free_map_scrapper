import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FreeMapScrapper",
  description: "Read standard acceptable use terms and guidelines for lead generation querying and CSV exports on FreeMapScrapper.",
};

export default function TermsOfServicePage() {
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

        {/* Terms Content */}
        <div className="prose prose-neutral max-w-none flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 border-b border-gray-150 pb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-neutral-400">
            Last Updated: August 13, 2026
          </p>

          <section className="flex flex-col gap-2 mt-4">
            <h2 className="text-lg font-bold text-neutral-900">1. Acceptance of Terms</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              By accessing and using FreeMapScrapper, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this application.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">2. Acceptable Use Policy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              FreeMapScrapper is built for business developers, local sales teams, and marketers. You agree not to misuse the search engine, which includes:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5">
              <li>Deploying automated request bots or DDOS crawlers to bypass limit checks.</li>
              <li>Attempting to compromise the search APIs or inject malicious scripts.</li>
              <li>Re-selling raw server search routes as paid subscription endpoints without authorization.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">3. Rate Limiting Limits</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              To ensure access remains fair and free for all users, we enforce a strict IP-based sliding-window rate limit (5 queries per 10 minutes). Requests exceeding this limit will receive a `429 Too Many Requests` code. Attempting to bypass these blocks will result in temporary or permanent IP bans.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">4. Service Disclaimers & Warranties</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              FreeMapScrapper provides all local business leads on an "as is" and "as available" basis:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 pl-2 flex flex-col gap-1.5">
              <li><strong>No Quality Guarantee:</strong> We query Google Maps and public websites directly. We do not inspect or verify the validity of emails, phone numbers, or coordinates retrieved. Use them at your own outreach risk.</li>
              <li><strong>Google API Compliance:</strong> This tool is not affiliated with, authorized, or endorsed by Google Inc. Users must comply with Google Maps' guidelines when utilizing coordinates.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-neutral-900">5. Limitation of Liability</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              In no event shall FreeMapScrapper, its contributors, or the founder Devansh Singh be liable for any direct, indirect, special, or consequential damages arising from the use or inability to use this platform.
            </p>
          </section>
        </div>

      </main>
      <Footer />
    </>
  );
}
