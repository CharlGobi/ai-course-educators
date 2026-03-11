"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/store/progressStore";

interface HeaderProps {
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

export function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  const progress = useProgressStore((s) => s.getOverallProgress());
  const completed = useProgressStore((s) => s.getCompletedCount());

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 px-4 h-16">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-primary-600 shrink-0">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
          <span className="hidden sm:block text-base leading-tight">
            AI for SA Educators
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Progress indicator */}
        {completed > 0 && (
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-sm text-gray-500 tabular-nums">{progress}%</span>
          </div>
        )}

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/prompt-library"
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            Prompts
          </Link>
          <Link
            href="/glossary"
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            Glossary
          </Link>
          <Link
            href="/resources"
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            Downloads
          </Link>
        </nav>
      </div>

      {/* Mobile progress bar */}
      {completed > 0 && (
        <div className="sm:hidden h-1">
          <Progress value={progress} className="h-1 rounded-none" />
        </div>
      )}
    </header>
  );
}
