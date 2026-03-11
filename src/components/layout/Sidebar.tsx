"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getAllModules } from "@/lib/course";
import { useProgressStore } from "@/store/progressStore";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const modules = getAllModules();
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);
  const isModuleComplete = useProgressStore((s) => s.isModuleComplete);

  // Determine which module is active
  const activeModuleId = modules.find((m) =>
    pathname.includes(`/modules/${m.id}`)
  )?.id;

  const [openModules, setOpenModules] = useState<string[]>(
    activeModuleId ? [activeModuleId] : [modules[0]?.id]
  );

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-72 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Course title */}
      <div className="px-4 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Course</p>
        <h2 className="text-sm font-bold text-gray-800 mt-0.5 leading-snug">
          AI as Your Teaching Assistant
        </h2>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {modules.map((module, idx) => {
          const isOpen = openModules.includes(module.id);
          const isDone = isModuleComplete(module.id);

          return (
            <div key={module.id}>
              {/* Module header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-gray-50 transition-colors group",
                  isOpen && "bg-gray-50"
                )}
              >
                {/* Module number circle */}
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: module.color }}
                >
                  {isDone ? <CheckCircle2 size={14} /> : idx + 1}
                </span>

                <span
                  className={cn(
                    "flex-1 text-sm font-semibold leading-tight",
                    isOpen ? "text-gray-900" : "text-gray-700"
                  )}
                >
                  {module.title}
                </span>

                {isOpen ? (
                  <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Lessons */}
              {isOpen && (
                <ul className="pb-1">
                  {module.lessons.map((lesson) => {
                    const path = `/modules/${module.id}/${lesson.id}`;
                    const isActive = pathname === path;
                    const done = isLessonComplete(module.id, lesson.id);

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={path}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2.5 pl-12 pr-4 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary-50 text-primary-700 font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          {done ? (
                            <CheckCircle2
                              size={15}
                              className="text-primary-500 flex-shrink-0"
                            />
                          ) : (
                            <Circle
                              size={15}
                              className={cn(
                                "flex-shrink-0",
                                isActive ? "text-primary-400" : "text-gray-300"
                              )}
                            />
                          )}
                          <span className="leading-snug">{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <Link
          href="/prompt-library"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors"
        >
          📚 Prompt Library
        </Link>
        <Link
          href="/glossary"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors"
        >
          📖 Glossary
        </Link>
        <Link
          href="/resources"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors"
        >
          ⬇️ Downloads
        </Link>
      </div>
    </aside>
  );
}
