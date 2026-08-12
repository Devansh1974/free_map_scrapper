export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 mt-auto">
      <div className="mx-auto flex max-w-[1120px] flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 text-xs text-gray-500">
        <div>
          FreeMapScrapper &middot; Simple Google Maps business export utility
        </div>
        <div className="flex items-center gap-1 font-medium text-gray-700">
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            Next.js
          </a>
        </div>
      </div>
    </footer>
  );
}
