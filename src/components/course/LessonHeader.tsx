"use client";

import Link from "next/link";
import { Clock, ChevronLeft, CheckCircle2, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMinutes } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import type { Module, Lesson } from "@/lib/types";

interface LessonHeaderProps {
  module: Module;
  lesson: Lesson;
  prevLesson?: { moduleId: string; lessonId: string; title: string } | null;
  nextLesson?: { moduleId: string; lessonId: string; title: string } | null;
}

export function LessonHeader({ module, lesson, prevLesson }: LessonHeaderProps) {
  const isComplete = useProgressStore((s) =>
    s.isLessonComplete(module.id, lesson.id)
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span
          className="font-medium truncate max-w-[140px] sm:max-w-none"
          style={{ color: module.color }}
        >
          {module.title}
        </span>
        {prevLesson && (
          <Link
            href={`/modules/${prevLesson.moduleId}/${prevLesson.lessonId}`}
            className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={13} />
            Previous
          </Link>
        )}
      </div>

      {/* Module badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: module.color }}
        >
          {module.title}
        </span>
        {isComplete && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
            <CheckCircle2 size={13} />
            Complete
          </span>
        )}
      </div>

      {/* Lesson title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
        {lesson.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {formatMinutes(lesson.estimatedMinutes)}
        </span>
      </div>

      {/* Learning objectives */}
      {lesson.objectives.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2.5">
            <Target size={15} className="text-primary-500" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              By the end of this lesson you will be able to:
            </span>
          </div>
          <ul className="space-y-1.5">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-primary-500 font-bold mt-0.5">✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
