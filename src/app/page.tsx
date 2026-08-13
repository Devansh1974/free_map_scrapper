"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchForm } from "@/components/SearchForm";
import { ResultsToolbar } from "@/components/ResultsToolbar";
import { ResultsTable } from "@/components/ResultsTable";
import { EmptyState, ErrorBanner } from "@/components/States";
import { Footer } from "@/components/Footer";
import { useSearch } from "@/hooks/useSearch";
import {
  CheckCircle2,
  TrendingUp,
  Download,
  Zap,
  Clock,
  Mail,
  Target,
  ShieldCheck,
  Building,
  Users,
  Laptop,
  BarChart,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// FAQ Interactive Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 py-3.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-semibold text-sm text-neutral-900 focus:outline-none cursor-pointer group"
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p className="text-xs text-neutral-500 mt-2 leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const {
    results,
    isLoading,
    error,
    activeOptions,
    handleSearch,
    handleClear,
    handleDownloadCSV,
  } = useSearch();

  // Structured Data schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FreeMapScrapper",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "url": "https://freemapscrapper.com",
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the data real?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all local business entries are pulled in real time directly from the official Google Places API database. We do not use stale cached records or simulated mock lists.",
            },
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, FreeMapScrapper is 100% free to search and export leads. No signups, no logins, and no credit card registrations are required to use the service.",
            },
          },
          {
            "@type": "Question",
            "name": "What is enrichment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enrichment is a free feature that visits the business's public website and retrieves direct contact details (like emails, Instagram pages, Facebook handles, and WhatsApp API numbers) not returned by standard Google Maps details.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I use it for outreach?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The CSV exporter automatically compiles all business locations, phones, websites, and parsed emails into ready-to-use lists, complete with spreadsheet HYPERLINK formulas for fast outreach campaigns.",
            },
          },
          {
            "@type": "Question",
            "name": "Why are some emails missing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Outreach details are scraped from the business's public homepage and contact sheets. If a business does not have a website, or has configured email security blockers, the scraper will skip email retrieval to respect public web privacy guidelines.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        {/* Hero Section */}
        <div className="text-center py-6 md:py-10 max-w-[800px] mx-auto flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800 border border-neutral-200">
            FREE &bull; NO SIGNUP &bull; REAL DATA
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl animate-none">
            Find Local Businesses.<br />
            <span className="text-[#188038]">Get Real Leads.</span>
          </h1>
          <p className="text-base text-neutral-500 max-w-[640px] sm:text-lg">
            Search Google Maps, extract contact information, and export results in seconds. Emails, phones, websites, and social profiles in one place.
          </p>
          <div className="text-sm font-medium text-neutral-400 italic">
            "Find businesses. Get contacts. Build opportunities."
          </div>
        </div>

        {/* Search Card Section */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Trust Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 border-y border-neutral-200 mt-2 text-[10px] sm:text-xs font-semibold text-neutral-500 tracking-wider uppercase select-none">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#188038]" />
            Real Google Maps Data
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#188038]" />
            Email & Social Enrichment
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#188038]" />
            Export CSV
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#188038]" />
            No Signup Required
          </div>
        </div>

        {/* Error State Banner */}
        {error && <ErrorBanner message={error} />}

        {/* Results Area */}
        {results !== null ? (
          results.length > 0 ? (
            <div className="flex flex-col gap-4">
              <ResultsToolbar
                count={results.length}
                onDownloadCSV={handleDownloadCSV}
                onClear={handleClear}
              />
              <ResultsTable results={results} options={activeOptions} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
              <h3 className="text-sm font-semibold text-gray-900">No businesses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try widening your search keyword or changing the location.
              </p>
            </div>
          )
        ) : (
          !isLoading && (
            <>
              <EmptyState />

              {/* 1. Features Grid (4 metrics) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">100% Real Data</h4>
                    <p className="text-xs text-gray-500 mt-1">Direct Google maps source. No mock or fake profiles.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">Contact Enrichment</h4>
                    <p className="text-xs text-gray-500 mt-1">Crawl homepage and contact page for social handles and email.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">One-click CSV</h4>
                    <p className="text-xs text-gray-500 mt-1">Ready-to-use lists with built-in clickable links formulas.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">Free to Start</h4>
                    <p className="text-xs text-gray-500 mt-1">No registration or card details needed to export.</p>
                  </div>
                </div>
              </div>

              {/* 2. Why FreeMapScrapper */}
              <div className="py-12 border-t border-gray-200 mt-8 flex flex-col gap-8">
                <div className="text-center max-w-[600px] mx-auto flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-950">Why FreeMapScrapper?</h3>
                  <p className="text-sm text-gray-500">Built for marketers, sales teams, founders, and growth hackers who need accurate local business data fast.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                    <div className="h-8 w-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-800">
                      <Clock className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900">Save manual work</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">No more copying from maps or searching websites one by one. Run bulk queries in seconds.</p>
                  </div>

                  <div className="flex flex-col gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                    <div className="h-8 w-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-800">
                      <Mail className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900">Get verified contact info</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Extract public business details, websites, telephone lines, and emails in a single run.</p>
                  </div>

                  <div className="flex flex-col gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                    <div className="h-8 w-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-800">
                      <Target className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900">Make smarter outreach</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Filter lists containing active websites and ratings to target warm, qualified opportunities.</p>
                  </div>

                  <div className="flex flex-col gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                    <div className="h-8 w-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-800">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900">Privacy friendly</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">We only crawl and compile details that businesses publish publicly on the open web.</p>
                  </div>
                </div>
              </div>

              {/* 3. How It Works */}
              <div className="py-12 border-t border-gray-200 flex flex-col gap-8">
                <div className="text-center max-w-[600px] mx-auto flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-950">How it works</h3>
                  <p className="text-sm text-gray-500">Get quality local business leads in 4 simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start relative">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-sm mb-4">1</div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-1">Enter keyword</h5>
                    <p className="text-xs text-gray-500">Specify your niche, like dentist, gym, or hotel.</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-sm mb-4">2</div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-1">Add location</h5>
                    <p className="text-xs text-gray-500">Choose city or suburb (e.g. Koramangala, Bengaluru).</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-sm mb-4">3</div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-1">Enrich results</h5>
                    <p className="text-xs text-gray-500">Toggle website crawl for emails and socials (optional).</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shadow-sm mb-4">4</div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-1">Download CSV</h5>
                    <p className="text-xs text-gray-500">Export clickable sheets and boot cold outreach campaigns.</p>
                  </div>
                </div>
              </div>

              {/* 4. Perfect For */}
              <div className="py-12 border-t border-gray-200 flex flex-col gap-8">
                <div className="text-center max-w-[600px] mx-auto flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-950">Perfect for</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Marketing Agencies</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Find SEO & Web Design clients.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Sales Teams</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Build clean pipeline lead sheets.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Freelancers</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Pitch copywriting & tech services.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="rounded-lg bg-neutral-50 border border-gray-200 p-2.5 text-neutral-800">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Researchers</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Analyze and catalog local markets.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. FAQ Section */}
              <div className="py-12 border-t border-gray-200 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-950">Frequently Asked Questions</h3>
                  <p className="text-xs text-gray-500 mt-2">Answers to common questions about data sources, lead accuracy, and search usage limits.</p>
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <FAQItem
                    question="Is the data real?"
                    answer="Yes, all local business entries are pulled in real time directly from the official Google Places API database. We do not use stale cached records or simulated mock lists."
                  />
                  <FAQItem
                    question="Is it free?"
                    answer="Yes, FreeMapScrapper is 100% free to search and export leads. No signups, no logins, and no credit card registrations are required to use the service."
                  />
                  <FAQItem
                    question="What is enrichment?"
                    answer="Enrichment is a free feature that visits the business's public website and retrieves direct contact details (like emails, Instagram pages, Facebook handles, and WhatsApp API numbers) not returned by standard Google Maps details."
                  />
                  <FAQItem
                    question="Can I use it for outreach?"
                    answer="Yes. The CSV exporter automatically compiles all business locations, phones, websites, and parsed emails into ready-to-use lists, complete with spreadsheet HYPERLINK formulas for fast outreach campaigns."
                  />
                  <FAQItem
                    question="Why are some emails missing?"
                    answer="Outreach details are scraped from the business's public homepage and contact sheets. If a business does not have a website, or has configured email security blockers, the scraper will skip email retrieval to respect public web privacy guidelines."
                  />
                </div>
              </div>

              {/* 6. CTA Card Banner */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 text-center flex flex-col items-center gap-4 shadow-sm mt-4">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready to find your next leads?</h3>
                <p className="text-sm text-gray-500 max-w-[500px]">Join thousands of users who use FreeMapScrapper to grow their business with real-time leads. No credit cards, no signup.</p>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    document.getElementById("query")?.focus();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 h-10 px-6 rounded-lg bg-[#1A73E8] text-sm font-medium text-white transition hover:bg-[#1557b0] focus:outline-none cursor-pointer"
                >
                  Start searching now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )
        )}
      </main>
      <Footer />

      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
