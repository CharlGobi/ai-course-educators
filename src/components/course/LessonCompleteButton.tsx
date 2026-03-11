"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";

interface LessonCompleteButtonProps {
  moduleId: string;
  lessonId: string;
  nextHref?: string;
  nextTitle?: string;
}

export function LessonCompleteButton({
  moduleId,
  lessonId,
  nextHref,
  nextTitle,
}: LessonCompleteButtonProps) {
  const isComplete = useProgressStore((s) => s.isLessonComplete(moduleId, lessonId));
  const markComplete = useProgressStore((s) => s.markComplete);
  const markIncomplete = useProgressStore((s) => s.markIncomplete);

  const handleToggle = () => {
    if (isComplete) {
      markIncomplete(moduleId, lessonId);
    } else {
      markComplete(moduleId, lessonId);
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          onClick={handleToggle}
          className={cn(
            "flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all",
            isComplete
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow"
          )}
        >
          {isComplete ? (
            <>
              <CheckCircle2 size={18} />
              Lesson complete!
            </>
          ) : (
            <>
              <Circle size={18} />
              Mark as complete
            </>
          )}
        </button>

        {nextHref && isComplete && (
          <a
            href={nextHref}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Next: {nextTitle} →
          </a>
        )}
      </div>

      {isComplete && (
        <p className="mt-3 text-sm text-green-600">
          ✓ Great work! Your progress has been saved.
        </p>
      )}
    </div>
  );
}
