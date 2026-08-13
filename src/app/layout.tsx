import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freemapscrapper.com"),
  title: "FreeMapScrapper — Find Local Businesses & Export Real Leads",
  description: "Search Google Maps, extract emails, phones, websites, and social profiles, and export clean CSV lead lists in seconds. No signup required.",
  keywords: [
    "google maps scraper",
    "business leads",
    "local lead finder",
    "email extraction",
    "google maps contacts",
    "csv export",
    "salon leads",
    "dentist leads",
    "restaurant leads",
    "gym leads",
    "local business data"
  ],
  openGraph: {
    title: "FreeMapScrapper — Find Local Businesses & Export Real Leads",
    description: "Search Google Maps, extract emails, phones, websites, and social profiles, and export clean CSV lead lists in seconds. No signup required.",
    siteName: "FreeMapScrapper",
    type: "website",
    images: [
      {
        url: "/og-image.png",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeMapScrapper — Find Local Businesses & Export Real Leads",
    description: "Search Google Maps, extract emails, phones, websites, and social profiles, and export clean CSV lead lists in seconds. No signup required.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
