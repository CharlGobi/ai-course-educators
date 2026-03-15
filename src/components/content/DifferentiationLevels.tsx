"use client";

import { useState } from "react";

interface Level {
  label: string;
  tag: string;
  description: string;
  passage: string;
  wordCount?: number;
  bgColor: string;
  activeTab: string;
  activeBorder: string;
  activeDot: string;
  tagBg: string;
  tagText: string;
}

interface DifferentiationLevelsProps {
  title?: string;
  topic?: string;
  levels: [Level, Level, Level];
}

export function DifferentiationLevels({ title, topic, levels }: DifferentiationLevelsProps) {
  const [active, setActive] = useState(0);

  const current = levels[active];

  return (
    <div className="my-8">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {title}
        </p>
      )}
      {topic && (
        <p className="text-sm text-gray-500 mb-4">
          Same topic: <span className="font-semibold text-gray-700">{topic}</span> — three different versions for three different needs
        </p>
      )}

      {/* Tab bar */}
      <div className="flex gap-2 mb-0">
        {levels.map((level, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`
              flex-1 flex flex-col items-center gap-1 px-3 py-3 rounded-t-2xl border-2 border-b-0 text-center transition-all duration-150
              ${active === idx
                ? `${level.activeTab} border-gray-200 shadow-sm`
                : "bg-gray-50 border-transparent hover:bg-gray-100"
              }
            `}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${active === idx ? level.activeDot : "bg-gray-300 text-white"}`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className={`text-xs font-semibold ${active === idx ? "text-gray-800" : "text-gray-400"}`}>
              {level.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className={`rounded-b-2xl rounded-tr-2xl border-2 border-gray-200 ${current.bgColor} p-5 transition-all duration-200`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${current.tagBg} ${current.tagText} mb-2`}>
              {current.tag}
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">{current.description}</p>
          </div>
          {current.wordCount && (
            <span className="flex-shrink-0 text-xs text-gray-400 bg-white rounded-full px-2.5 py-1 border border-gray-100">
              ~{current.wordCount} words
            </span>
          )}
        </div>

        {/* Passage */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {current.passage}
          </p>
        </div>

        {/* Navigation hint */}
        <div className="flex justify-between mt-3">
          <button
            onClick={() => setActive((prev) => Math.max(0, prev - 1))}
            disabled={active === 0}
            className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous level
          </button>
          <button
            onClick={() => setActive((prev) => Math.min(2, prev + 1))}
            disabled={active === 2}
            className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next level →
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        All three versions cover the same learning content — only the language and complexity changes
      </p>
    </div>
  );
}
