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
