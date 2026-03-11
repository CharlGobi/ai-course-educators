"use client";

import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import promptData from "@/content/prompt-library.json";
import type { PromptTemplate } from "@/lib/types";

const prompts = promptData as PromptTemplate[];

const categories = ["All", ...Array.from(new Set(prompts.map((p) => p.category)))];

export default function PromptLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = prompts.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  const handleCopy = async (id: string, text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            SA Educator Prompt Library
          </h1>
          <p className="text-gray-600">
            Ready-to-use prompts for South African educators. Copy, customise, and paste into Gemini.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                category === cat
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} prompt{filtered.length !== 1 && "s"}
        </p>

        {/* Prompt cards */}
        <div className="space-y-4">
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary-200 transition-colors"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{prompt.title}</h3>
                    <p className="text-xs text-gray-600">{prompt.description}</p>
                  </div>
                  <Badge variant="default" className="flex-shrink-0 text-xs">
                    {prompt.category}
                  </Badge>
                </div>
              </div>

              <div className="relative p-4 bg-gray-50">
                <pre className="prompt-text text-xs text-gray-700 whitespace-pre-wrap break-words pr-8 leading-relaxed">
                  {prompt.prompt}
                </pre>
                <button
                  onClick={() => handleCopy(prompt.id, prompt.prompt)}
                  title="Copy prompt"
                  className={cn(
                    "absolute top-3 right-3 p-1.5 rounded-lg transition-colors",
                    copied === prompt.id
                      ? "text-green-500 bg-green-50"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {copied === prompt.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>

              {copied === prompt.id && (
                <div className="px-4 py-2 bg-green-50 border-t border-green-100">
                  <p className="text-xs text-green-700 font-medium">
                    ✓ Copied! Replace the [BRACKETED] fields with your specific details, then paste into Gemini.
                  </p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">No prompts found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
      <div className="pb-24 lg:pb-10" />
      <MobileNav />
    </div>
  );
}
