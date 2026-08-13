import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 mt-auto">
      <div className="mx-auto flex max-w-[1120px] flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-4 sm:px-6 text-xs text-gray-500">
        <div className="flex flex-col gap-1.5">
          <div className="font-semibold text-gray-800 text-sm">
            FreeMapScrapper
          </div>
          <div className="italic text-gray-400">
            Find businesses. Get contacts. Build opportunities.
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2 text-gray-600">
          <div className="flex items-center gap-1 font-medium">
            Made by{" "}
            <span className="font-semibold text-black">Devansh Singh</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://github.com/Devansh1974"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/devanshsingh2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:devanshsingh2006@gmail.com"
              className="hover:text-black transition"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
