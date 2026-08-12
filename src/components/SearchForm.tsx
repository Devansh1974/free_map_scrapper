"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: {
    query: string;
    location: string;
    limit: number;
    options: {
      includeWebsite: boolean;
      includePhone: boolean;
      includeRating: boolean;
    };
  }) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [limit, setLimit] = useState(20);
  const [isCustom, setIsCustom] = useState(false);
  const [customLimit, setCustomLimit] = useState("15");
  const [includeWebsite, setIncludeWebsite] = useState(true);
  const [includePhone, setIncludePhone] = useState(true);
  const [includeRating, setIncludeRating] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !location.trim()) return;

    onSearch({
      query: query.trim(),
      location: location.trim(),
      limit: isCustom ? (Number(customLimit) || 20) : limit,
      options: {
        includeWebsite,
        includePhone,
        includeRating,
      },
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Find businesses from Google Maps
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Search any business and export the results in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Business / Keyword Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="query"
              className="text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Business / Keyword
            </label>
            <input
              id="query"
              type="text"
              required
              disabled={isLoading}
              placeholder="dentist, salon, gym, restaurant"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          {/* Location Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="location"
              className="text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              required
              disabled={isLoading}
              placeholder="Indiranagar, Bengaluru"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          {/* Limit Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="limit"
              className="text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Maximum results
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  id="limit"
                  disabled={isLoading}
                  value={isCustom ? "custom" : limit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setIsCustom(true);
                    } else {
                      setIsCustom(false);
                      setLimit(Number(val));
                    }
                  }}
                  className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value={5}>5 results</option>
                  <option value={10}>10 results</option>
                  <option value={20}>20 results</option>
                  <option value={30}>30 results</option>
                  <option value={50}>50 results</option>
                  <option value={70}>70 results</option>
                  <option value={100}>100 results</option>
                  <option value="custom">Custom...</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {isCustom && (
                <input
                  type="number"
                  min={1}
                  max={200}
                  disabled={isLoading}
                  placeholder="Number"
                  value={customLimit}
                  onChange={(e) => setCustomLimit(e.target.value)}
                  className="h-10 w-20 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                />
              )}
            </div>
          </div>
        </div>

        {/* Checkboxes for filter criteria */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <label className="flex items-center gap-2.5 text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              disabled={isLoading}
              checked={includeWebsite}
              onChange={(e) => setIncludeWebsite(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-black accent-black focus:ring-black"
            />
            Include website
          </label>
          <label className="flex items-center gap-2.5 text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              disabled={isLoading}
              checked={includePhone}
              onChange={(e) => setIncludePhone(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-black accent-black focus:ring-black"
            />
            Include phone
          </label>
          <label className="flex items-center gap-2.5 text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              disabled={isLoading}
              checked={includeRating}
              onChange={(e) => setIncludeRating(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-black accent-black focus:ring-black"
            />
            Include rating
          </label>
        </div>

        {/* Submit Button & Helper text */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !query.trim() || !location.trim()}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-black text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-400 md:w-auto md:px-6 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search businesses"
            )}
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Results depend on publicly available Google Maps business information.
          </p>
        </div>
      </form>
    </div>
  );
}
