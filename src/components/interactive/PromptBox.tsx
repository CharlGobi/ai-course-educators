"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptBoxProps {
  /** Show the full PARTS builder (all 5 fields) */
  builder?: boolean;
  /** Show a ready-made example prompt */
  example?: string;
  /** Pre-fill specific fields */
  persona?: string;
  aim?: string;
  recipients?: string;
  theme?: string;
  structure?: string;
  title?: string;
}

const GEMINI_URL = "https://gemini.google.com/app";

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}

/** A ready-made prompt card with copy button */
function PromptCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 rounded-xl p-4 group">
      <pre className="prompt-text text-sm text-gray-100 whitespace-pre-wrap break-words pr-10">
        {text}
      </pre>
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleCopy}
          title="Copy prompt"
          className={cn(
            "p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-gray-700",
            copied && "text-green-400 hover:text-green-400"
          )}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
        <a
          href={GEMINI_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Gemini"
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

/** Full PARTS prompt builder */
function PartsBuilder({
  persona: defaultPersona = "",
  aim: defaultAim = "",
  recipients: defaultRecipients = "",
  theme: defaultTheme = "",
  structure: defaultStructure = "",
}: Omit<PromptBoxProps, "builder" | "example" | "title">) {
  const [persona, setPersona] = useState(defaultPersona);
  const [aim, setAim] = useState(defaultAim);
  const [recipients, setRecipients] = useState(defaultRecipients);
  const [theme, setTheme] = useState(defaultTheme);
  const [structure, setStructure] = useState(defaultStructure);
  const [copied, setCopied] = useState(false);

  const fields = [
    {
      key: "persona",
      label: "P — Persona",
      placeholder: 'e.g. "I am a Grade 7 Natural Sciences teacher at a public school in Gauteng."',
      value: persona,
      onChange: setPersona,
      color: "bg-green-50 border-green-200",
    },
    {
      key: "aim",
      label: "A — Aim",
      placeholder: 'e.g. "Create a 45-minute lesson plan on ecosystems..."',
      value: aim,
      onChange: setAim,
      color: "bg-blue-50 border-blue-200",
    },
    {
      key: "recipients",
      label: "R — Recipients",
      placeholder: 'e.g. "...for Grade 7 learners whose home language is IsiZulu."',
      value: recipients,
      onChange: setRecipients,
      color: "bg-purple-50 border-purple-200",
    },
    {
      key: "theme",
      label: "T — Theme",
      placeholder: 'e.g. "Focus on local South African biomes as examples."',
      value: theme,
      onChange: setTheme,
      color: "bg-orange-50 border-orange-200",
    },
    {
      key: "structure",
      label: "S — Structure",
      placeholder: 'e.g. "Format as a lesson plan with: objectives, introduction (10 min), main activity (25 min), and assessment (10 min)."',
      value: structure,
      onChange: setStructure,
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  const fullPrompt = [persona, aim, recipients, theme, structure]
    .filter(Boolean)
    .join(" ");

  const handleCopy = async () => {
    if (!fullPrompt.trim()) return;
    await copyToClipboard(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 text-sm">PARTS Prompt Builder</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Fill in any fields below to build your prompt. Copy it to try in Gemini.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {fields.map((field) => (
          <div key={field.key} className={cn("rounded-lg border p-3", field.color)}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              {field.label}
            </label>
            <textarea
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={field.placeholder}
              rows={2}
              className="w-full bg-white rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder:text-gray-400"
            />
          </div>
        ))}
      </div>

      {/* Assembled prompt preview */}
      {fullPrompt.trim() && (
        <div className="px-4 pb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Your assembled prompt:
          </p>
          <div className="relative bg-gray-900 rounded-xl p-4">
            <p className="prompt-text text-sm text-gray-100 whitespace-pre-wrap break-words pr-10">
              {fullPrompt}
            </p>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={handleCopy}
                title="Copy prompt"
                className={cn(
                  "p-1.5 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-gray-700",
                  copied && "text-green-400 hover:text-green-400"
                )}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <a
                href={GEMINI_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Gemini in new tab"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
          {copied && (
            <p className="text-xs text-green-600 mt-2">
              ✓ Copied! Open Gemini and paste your prompt.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function PromptBox({ builder, example, title, ...prefills }: PromptBoxProps) {
  return (
    <div className="my-6">
      {title && (
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          {title}
        </p>
      )}
      {builder ? <PartsBuilder {...prefills} /> : example ? <PromptCard text={example} /> : null}
    </div>
  );
}
