"use client";

import { useState } from "react";

interface VerbCategory {
  name: string;
  icon: string;
  verbs: string[];
  bgColor: string;
  pillBg: string;
  pillText: string;
  pillActiveBg: string;
}

interface VerbGridProps {
  categories: VerbCategory[];
  title?: string;
}

export function VerbGrid({ categories, title }: VerbGridProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (verb: string) => {
    navigator.clipboard.writeText(verb).catch(() => {});
    setCopied(verb);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="my-8">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          {title}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`rounded-2xl border border-gray-100 ${cat.bgColor} p-4`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{cat.icon}</span>
              <p className="text-sm font-semibold text-gray-800">{cat.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.verbs.map((verb) => (
                <button
                  key={verb}
                  onClick={() => handleCopy(verb)}
                  title="Tap to copy"
                  className={`
                    text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer select-none
                    ${copied === verb
                      ? `${cat.pillActiveBg} scale-95 shadow-inner`
                      : `${cat.pillBg} ${cat.pillText} hover:scale-105 hover:shadow-sm active:scale-95`
                    }
                  `}
                >
                  {copied === verb ? "✓ Copied!" : verb}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Tap any verb to copy it — then paste it into your prompt
      </p>
    </div>
  );
}
