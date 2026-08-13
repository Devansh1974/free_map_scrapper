import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-12 mt-auto">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-xs text-gray-500">
        
        {/* Branding Column */}
        <div className="md:col-span-2 flex flex-col gap-2.5 max-w-[280px]">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="FreeMapScrapper Logo"
              className="h-6 w-6 rounded-[4px] object-cover"
            />
            <span className="font-semibold text-gray-900 text-sm">
              FreeMapScrapper
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Search Google Maps, extract contact emails, telephones, websites, and social profiles in seconds.
          </p>
          <div className="italic text-gray-400 font-medium text-[10px] tracking-wide mt-1">
            "Find businesses. Get contacts. Build opportunities."
          </div>
        </div>

        {/* 1. Product Column */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
            Product
          </span>
          <div className="flex flex-col gap-2 font-medium">
            <a href="/#features" className="hover:text-black transition">
              Features
            </a>
            <a href="/#how-it-works" className="hover:text-black transition">
              How it works
            </a>
            <a href="/#faq" className="hover:text-black transition">
              FAQ
            </a>
          </div>
        </div>

        {/* 2. Resources Column */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
            Resources
          </span>
          <div className="flex flex-col gap-2 font-medium">
            <a href="/blog" className="hover:text-black transition">
              Blog / Guides
            </a>
            <a href="/changelog" className="hover:text-black transition">
              Changelog
            </a>
          </div>
        </div>

        {/* 3. Legal Column */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
            Legal
          </span>
          <div className="flex flex-col gap-2 font-medium">
            <a
              href="/privacypolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              Terms of Service
            </a>
          </div>
        </div>

      </div>

      {/* Copyright & Founder social connection bar */}
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[10px] text-gray-400">
        <div>
          Built with Next.js by <span className="font-semibold text-neutral-800">Devansh Singh</span>. &copy; {new Date().getFullYear()} FreeMapScrapper. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Devansh1974"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            title="Founder GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/devanshsingh2006/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            title="Founder LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
