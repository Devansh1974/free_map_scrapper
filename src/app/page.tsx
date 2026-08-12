"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchForm } from "@/components/SearchForm";
import { ResultsToolbar } from "@/components/ResultsToolbar";
import { ResultsTable } from "@/components/ResultsTable";
import { EmptyState, ErrorBanner } from "@/components/States";
import { Footer } from "@/components/Footer";
import { exportToCSV } from "@/utils/csv";
import { BusinessResult } from "@/providers/types";

export default function Home() {
  const [results, setResults] = useState<BusinessResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Stored details of the active search for CSV export naming and column rendering
  const [activeQuery, setActiveQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [activeOptions, setActiveOptions] = useState({
    includeWebsite: true,
    includePhone: true,
    includeRating: true,
  });

  const handleSearch = async (params: {
    query: string;
    location: string;
    limit: number;
    options: {
      includeWebsite: boolean;
      includePhone: boolean;
      includeRating: boolean;
    };
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build API request URL
      const searchUrl = new URL("/api/search", window.location.origin);
      searchUrl.searchParams.set("query", params.query);
      searchUrl.searchParams.set("location", params.location);
      searchUrl.searchParams.set("limit", params.limit.toString());

      const response = await fetch(searchUrl.toString());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch search results.");
      }

      setResults(data.results || []);
      setActiveQuery(params.query);
      setActiveLocation(params.location);
      setActiveOptions(params.options);
    } catch (err: any) {
      setError(err.message || "Unable to fetch results. Please check your connection.");
      // Keep previous results or reset them on error? Resetting is cleaner, but keeping layout stable is also good.
      // Resetting results on error to make error prominent
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResults(null);
    setError(null);
    setActiveQuery("");
    setActiveLocation("");
  };

  const handleDownloadCSV = () => {
    if (!results || results.length === 0) return;
    exportToCSV(results, activeQuery, activeLocation, activeOptions);
  };

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
