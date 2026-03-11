import type { MDXComponents } from "mdx/types";
import { PromptBox } from "@/components/interactive/PromptBox";
import { Quiz } from "@/components/interactive/Quiz";
import { TryItNow } from "@/components/interactive/TryItNow";
import { ReflectionInput } from "@/components/interactive/ReflectionInput";
import { Checklist } from "@/components/interactive/Checklist";
import { SAExample } from "@/components/content/SAExample";
import { KeyPoint } from "@/components/content/KeyPoint";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override HTML elements with styled versions
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-7 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 mb-4 leading-relaxed text-base">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-4 space-y-1.5 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-4 space-y-1.5 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed text-base">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-400 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-gray-100 rounded px-1.5 py-0.5 text-gray-800">
        {children}
      </code>
    ),
    hr: () => <hr className="border-gray-200 my-8" />,
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary-600 underline underline-offset-2 hover:text-primary-700"
      >
        {children}
      </a>
    ),

    // Custom course components
    PromptBox,
    Quiz,
    TryItNow,
    ReflectionInput,
    Checklist,
    SAExample,
    KeyPoint,

    ...components,
  };
}
