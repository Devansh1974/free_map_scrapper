import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ARTICLES } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The FreeMapScrapper Blog | Leads Generation Guides",
  description: "Insights, tutorials, and developer guidelines on B2B lead generation, web scraping, and Google Places data crawling.",
};

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Navigation */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-[600px]">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            The FreeMapScrapper Blog
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Guides, insights, and technical writeups about B2B cold outreach, web scraping, and Google Places data extraction.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {ARTICLES.map((art) => (
            <Link
              key={art.id}
              href={`/blog/${art.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-4 hover:shadow-md transition duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-gray-600 uppercase tracking-wider">
                  {art.category}
                </span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg group-hover:text-neutral-800 transition line-clamp-2">
                {art.title}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-black gap-1 group-hover:underline">
                Read article
                <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
