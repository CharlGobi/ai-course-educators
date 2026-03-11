"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Header } from "@/components/layout/Header";
import glossaryData from "@/content/glossary.json";
import type { GlossaryTerm } from "@/lib/types";

const terms = glossaryData as GlossaryTerm[];

export default function GlossaryPage() {
  const [query, setQuery] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">AI Glossary</h1>
          <p className="text-gray-600">
            Plain-language explanations of AI terms — and why they matter for South African educators.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
          />
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} {filtered.length === 1 ? "term" : "terms"}{query && ` matching "${query}"`}
        </p>

        {/* Terms */}
        <div className="space-y-3">
          {filtered.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-primary-200 transition-colors"
            >
              <h3 className="font-bold text-gray-900 text-base mb-1.5">{term.term}</h3>
              <p className="text-gray-700 text-sm mb-2">{term.definition}</p>
              <div className="bg-primary-50 rounded-lg px-3 py-2 mt-2">
                <p className="text-xs font-semibold text-primary-700 mb-0.5">Why it matters for you:</p>
                <p className="text-xs text-primary-800">{term.whyItMatters}</p>
              </div>
              {term.example && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  <strong>Example:</strong> {term.example}
                </p>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No terms found for "{query}"</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
      <div className="pb-24 lg:pb-10" />
      <MobileNav />
    </div>
  );
}
