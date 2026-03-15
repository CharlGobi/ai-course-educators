"use client";

import { useState } from "react";

interface PARTSBreakdownProps {
  persona: string;
  aim: string;
  recipients: string;
  theme: string;
  structure: string;
  title?: string;
}

const PARTS = [
  {
    key: "P",
    label: "Persona",
    description: "Who you are + the role you want AI to take",
    pillBg: "bg-[#002395]",
    pillText: "text-white",
    highlight: "bg-blue-50 border-l-4 border-blue-400",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-[#002395]",
  },
  {
    key: "A",
    label: "Aim",
    description: "The specific action you want AI to perform",
    pillBg: "bg-[#007A4D]",
    pillText: "text-white",
    highlight: "bg-green-50 border-l-4 border-green-400",
    badge: "bg-green-100 text-green-800",
    dot: "bg-[#007A4D]",
  },
  {
    key: "R",
    label: "Recipients",
    description: "Who will use or receive what AI creates",
    pillBg: "bg-[#FFB612]",
    pillText: "text-gray-900",
    highlight: "bg-yellow-50 border-l-4 border-yellow-400",
    badge: "bg-yellow-100 text-yellow-800",
    dot: "bg-[#FFB612]",
  },
  {
    key: "T",
    label: "Theme",
    description: "The subject matter and any special parameters",
    pillBg: "bg-[#DE3831]",
    pillText: "text-white",
    highlight: "bg-red-50 border-l-4 border-red-400",
    badge: "bg-red-100 text-red-800",
    dot: "bg-[#DE3831]",
  },
  {
    key: "S",
    label: "Structure",
    description: "How you want the output formatted",
    pillBg: "bg-[#6B21A8]",
    pillText: "text-white",
    highlight: "bg-purple-50 border-l-4 border-purple-400",
    badge: "bg-purple-100 text-purple-800",
    dot: "bg-[#6B21A8]",
  },
] as const;

type PartKey = "P" | "A" | "R" | "T" | "S";

export function PARTSBreakdown({
  persona,
  aim,
  recipients,
  theme,
  structure,
  title,
}: PARTSBreakdownProps) {
  const [active, setActive] = useState<PartKey | null>(null);

  const values: Record<PartKey, string> = { P: persona, A: aim, R: recipients, T: theme, S: structure };

  const toggle = (key: PartKey) => setActive((prev) => (prev === key ? null : key));

  return (
    <div className="my-8">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          {title}
        </p>
      )}

      {/* PARTS legend pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PARTS.map((part) => (
          <button
            key={part.key}
            onClick={() => toggle(part.key as PartKey)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150
              ${active === part.key
                ? `${part.pillBg} ${part.pillText} shadow-md scale-105 ring-2 ring-offset-1 ring-gray-300`
                : active === null
                  ? `${part.pillBg} ${part.pillText} opacity-90 hover:scale-105 hover:shadow-sm`
                  : `${part.pillBg} ${part.pillText} opacity-30`
              }
            `}
          >
            <span className="font-black">{part.key}</span>
            <span className="font-normal opacity-90 hidden sm:inline">{part.label}</span>
          </button>
        ))}
        {active && (
          <button
            onClick={() => setActive(null)}
            className="px-3 py-1.5 rounded-full text-xs text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Show all
          </button>
        )}
      </div>

      {/* Active part description */}
      {active && (
        <div className="mb-4">
          {PARTS.filter((p) => p.key === active).map((part) => (
            <div key={part.key} className={`rounded-xl px-4 py-2 ${part.badge} text-sm`}>
              <span className="font-bold">{part.key} — {part.label}:</span>{" "}
              {part.description}
            </div>
          ))}
        </div>
      )}

      {/* Prompt breakdown */}
      <div className="rounded-2xl border-2 border-gray-100 overflow-hidden bg-white">
        {PARTS.map((part) => {
          const isActive = active === null || active === part.key;
          return (
            <div
              key={part.key}
              onClick={() => toggle(part.key as PartKey)}
              className={`
                px-5 py-4 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
                ${isActive ? part.highlight : "bg-white opacity-25"}
              `}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`
                    mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                    text-xs font-black ${part.dot}
                    ${part.key === "R" ? "text-gray-900" : "text-white"}
                  `}
                >
                  {part.key}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {part.label}
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {values[part.key as PartKey]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Tap any section to focus on that element of the prompt
      </p>
    </div>
  );
}
