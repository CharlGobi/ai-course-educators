import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AI as Your Teaching Assistant | South African Educators",
  description:
    "A self-paced course for South African school educators. Learn to use AI tools like Gemini and NotebookLM to save time, create better lessons, and support every learner.",
  openGraph: {
    title: "AI as Your Teaching Assistant",
    description: "Your AI superpower for the South African classroom.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface">{children}</body>
    </html>
  );
}
