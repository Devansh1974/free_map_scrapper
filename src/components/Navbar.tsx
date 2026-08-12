import { Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Square logo: black border, white fill */}
          <div className="flex h-8 w-8 items-center justify-center rounded-[6px] border-2 border-black bg-white">
            <span className="font-mono text-xs font-black text-black">F</span>
          </div>
          <span className="font-sans text-base font-semibold tracking-tight text-gray-900">
            FreeMapScrapper
          </span>
        </div>
        <div>
          <a
            href="https://github.com/Devansh1974/free_map_scrapper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
