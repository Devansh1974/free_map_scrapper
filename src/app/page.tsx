"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { SearchForm } from "@/components/SearchForm";
import { ResultsToolbar } from "@/components/ResultsToolbar";
import { ResultsTable } from "@/components/ResultsTable";
import { EmptyState, ErrorBanner } from "@/components/States";
import { Footer } from "@/components/Footer";
import { useSearch } from "@/hooks/useSearch";

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

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Hero Section */}
        <div className="text-center py-6 md:py-10 max-w-[800px] mx-auto flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800 border border-neutral-200">
            FREE &bull; NO SIGNUP &bull; REAL DATA
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Find Local Businesses.<br />Get Real Leads.
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
          !isLoading && <EmptyState />
        )}
      </main>
      <Footer />
    </>
  );
}
