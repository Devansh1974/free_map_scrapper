"use client";

import { useState } from "react";
import { BusinessResult } from "@/types";
import { exportToCSV } from "@/utils/csv";

export function useSearch() {
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
    enrichResults: false,
  });

  const handleSearch = async (params: {
    query: string;
    location: string;
    limit: number;
    options: {
      includeWebsite: boolean;
      includePhone: boolean;
      includeRating: boolean;
      enrichResults: boolean;
    };
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const searchUrl = new URL("/api/search", window.location.origin);
      searchUrl.searchParams.set("query", params.query);
      searchUrl.searchParams.set("location", params.location);
      searchUrl.searchParams.set("limit", params.limit.toString());
      if (params.options.enrichResults) {
        searchUrl.searchParams.set("enrich", "true");
      }

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

  return {
    results,
    isLoading,
    error,
    activeOptions,
    handleSearch,
    handleClear,
    handleDownloadCSV,
  };
}
