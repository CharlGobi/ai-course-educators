"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";

interface ReflectionInputProps {
  lessonKey: string;
  prompt: string;
  placeholder?: string;
}

export function ReflectionInput({
  lessonKey,
  prompt,
  placeholder = "Write your thoughts here...",
}: ReflectionInputProps) {
  const savedText = useProgressStore((s) => s.reflections[lessonKey] ?? "");
  const saveReflection = useProgressStore((s) => s.saveReflection);
  const [text, setText] = useState(savedText);
  const [saved, setSaved] = useState(false);

  // Sync with store when lessonKey changes
  useEffect(() => {
    setText(savedText);
  }, [savedText]);

  const handleSave = () => {
    if (!text.trim()) return;
    saveReflection(lessonKey, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-purple-50 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">✍️</span>
          <span className="font-bold text-gray-800 text-sm">Reflection</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{prompt}</p>
      </div>

      <div className="p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder:text-gray-400"
        />

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-primary-600 transition-colors"
          >
            <Save size={14} />
            Save reflection
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 size={13} />
              Saved
            </span>
          )}
          {savedText && !saved && (
            <span className="text-xs text-gray-400">Your reflection is saved locally.</span>
          )}
        </div>
      </div>
    </div>
  );
}
