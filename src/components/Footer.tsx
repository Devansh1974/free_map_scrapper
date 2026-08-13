import { Github, Linkedin, Mail, BookOpen, Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-10 mt-auto">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 flex flex-col md:flex-row md:justify-between gap-8 text-xs text-gray-500">
        
        {/* Branding Column */}
        <div className="flex flex-col gap-2 max-w-[300px]">
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
            Find local businesses, extract contact emails, telephones, websites, and social profiles in seconds.
          </p>
          <div className="italic text-gray-400 font-medium mt-1">
            "Find businesses. Get contacts. Build opportunities."
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-3">
          <div className="font-semibold text-gray-800 uppercase tracking-wider text-[10px]">
            Navigation
          </div>
          <div className="flex flex-col gap-2 font-medium">
            <a href="/" className="hover:text-black transition flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Home Search
            </a>
            <a href="/blog" className="hover:text-black transition flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Official Blog
            </a>
          </div>
        </div>

        {/* Founder Connect Column */}
        <div className="flex flex-col gap-3">
          <div className="font-semibold text-gray-800 uppercase tracking-wider text-[10px]">
            Connect with Founder
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-gray-600 font-medium">
              Made by <span className="font-semibold text-black">Devansh Singh</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 mt-1">
              <a
                href="https://github.com/Devansh1974"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
                title="GitHub Profile"
              >
                <Github className="h-4 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/devanshsingh2006/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-5" />
              </a>
              <a
                href="mailto:devanshsingh2006@gmail.com"
                className="hover:text-black transition"
                title="Direct Email"
              >
                <Mail className="h-4 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[10px] text-gray-400">
        <div>
          &copy; {new Date().getFullYear()} FreeMapScrapper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
