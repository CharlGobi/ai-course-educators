"use client";

import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemObj {
  id: string;
  label: string;
  detail?: string;
}

type ChecklistItem = ChecklistItemObj | string;

interface ChecklistProps {
  items: ChecklistItem[];
  title?: string;
}

function normalise(item: ChecklistItem, index: number): ChecklistItemObj {
  if (typeof item === "string") return { id: String(index), label: item };
  return item;
}

export function Checklist({ items, title }: ChecklistProps) {
  const normalised = items.map(normalise);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === normalised.length;

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {title && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="font-bold text-gray-800 text-sm">{title}</span>
          <span className="ml-2 text-xs text-gray-500">
            {checked.size}/{normalised.length} checked
          </span>
        </div>
      )}
      <ul className="p-2 space-y-1">
        {normalised.map((item, idx) => {
          const isChecked = checked.has(item.id);
          return (
            <li key={`ci-${idx}`}>
              <button
                onClick={() => toggle(item.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                  isChecked ? "bg-green-50" : "hover:bg-gray-50"
                )}
              >
                {isChecked ? (
                  <CheckSquare size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={cn("text-sm font-medium", isChecked ? "text-green-700 line-through decoration-green-400" : "text-gray-800")}>
                    {item.label}
                  </p>
                  {item.detail && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {allChecked && (
        <div className="px-4 py-3 bg-green-50 border-t border-green-100">
          <p className="text-sm font-semibold text-green-700">✓ All done! Great work.</p>
        </div>
      )}
    </div>
  );
}
