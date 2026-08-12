import { Search, AlertCircle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">No results yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Search for a business and location to begin.
      </p>
    </div>
  );
}

interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/50 p-4 text-red-800">
      <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
      <div className="text-sm font-medium leading-5">
        {message}
      </div>
    </div>
  );
}
