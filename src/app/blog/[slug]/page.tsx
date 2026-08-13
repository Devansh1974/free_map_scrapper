import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ARTICLES } from "@/lib/blog-data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  return {
    title: `${article.title} | FreeMapScrapper Blog`,
    description: article.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>
        </div>

        {/* Article Reading Layout */}
        <article className="max-w-[700px] mx-auto py-4 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3">
            <span className="inline-flex self-start rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800 border border-neutral-200">
              {article.category}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2 border-b border-gray-150 pb-4">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-gray-700 leading-relaxed text-base">
            {article.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center flex flex-col items-center gap-4">
            <h4 className="font-bold text-gray-900 text-sm">Want to try scraping these leads?</h4>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none"
            >
              Go to FreeMapScrapper
            </Link>
          </div>
        </article>

      </main>
      <Footer />
    </>
  );
}
