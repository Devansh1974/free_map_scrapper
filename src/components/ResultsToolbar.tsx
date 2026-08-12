import { Download, X } from "lucide-react";

interface ResultsToolbarProps {
  count: number;
  onDownloadCSV: () => void;
  onClear: () => void;
}

export function ResultsToolbar({ count, onDownloadCSV, onClear }: ResultsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3 border-b border-gray-200">
      <div className="text-sm font-medium text-gray-900">
        {count} {count === 1 ? "business" : "businesses"} found
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDownloadCSV}
          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" />
          Download CSV
        </button>
        <button
          type="button"
          onClick={onClear}
          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-red-600 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
