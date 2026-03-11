"use client";

import Link from "next/link";
import { BookOpen, Clock, Award, ChevronRight, Zap } from "lucide-react";
import { ModuleCard } from "@/components/course/ModuleCard";
import { Progress } from "@/components/ui/progress";
import { MobileNav } from "@/components/layout/MobileNav";
import { getAllModules, getTotalLessonCount } from "@/lib/course";
import { useProgressStore } from "@/store/progressStore";

const stats = [
  { label: "Modules", value: "8", icon: BookOpen },
  { label: "Estimated time", value: "~6 hours", icon: Clock },
  { label: "Certificate", value: "Included", icon: Award },
];

export default function HomePage() {
  const modules = getAllModules();
  const totalLessons = getTotalLessonCount();
  const overallProgress = useProgressStore((s) => s.getOverallProgress());
  const completedCount = useProgressStore((s) => s.getCompletedCount());
  const getModuleProgress = useProgressStore((s) => s.getModuleProgress);
  const isModuleComplete = useProgressStore((s) => s.isModuleComplete);
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);

  const hasStarted = completedCount > 0;

  // Find the first incomplete lesson for "Continue" CTA
  const continueModule = modules.find((m) => !isModuleComplete(m.id));
  const continueLesson = continueModule?.lessons.find(
    (l) => !isLessonComplete(continueModule.id, l.id)
  );
  const continueHref = continueModule && continueLesson
    ? `/modules/${continueModule.id}/${continueLesson.id}`
    : `/modules/${modules[0].id}/${modules[0].lessons[0].id}`;

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white overflow-hidden">
        {/* SA flag stripe accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-sa-green" />
          <div className="flex-1 bg-sa-gold" />
          <div className="flex-1 bg-sa-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-sa-red" />
          <div className="flex-1 bg-sa-black" />
        </div>

        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap size={22} className="text-secondary-300" fill="currentColor" />
            </div>
            <span className="text-sm font-semibold text-primary-200 uppercase tracking-widest">
              South African Educators
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            AI as Your{" "}
            <span className="text-secondary-300">Teaching Superpower</span>
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            A practical, self-paced course designed for South African school educators.
            Learn to use AI tools like Gemini and NotebookLM to save time, create better
            lessons, and support every learner — without needing to be a tech expert.
          </p>

          {/* Progress bar if started */}
          {hasStarted ? (
            <div className="mb-6 bg-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold">Your progress</span>
                <span className="text-primary-200">
                  {completedCount} of {totalLessons} lessons complete
                </span>
              </div>
              <Progress value={overallProgress} className="h-2.5 bg-white/20 [&>div]:bg-secondary-400" />
            </div>
          ) : null}

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={continueHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary-400 text-gray-900 font-bold text-sm hover:bg-secondary-300 transition-colors shadow-lg"
            >
              {hasStarted ? "Continue learning" : "Start the course"}
              <ChevronRight size={16} />
            </Link>
            {!hasStarted && (
              <a
                href="#modules"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                See all modules
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Icon size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-tight">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <span className="text-lg">🇿🇦</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">SA Curriculum</p>
                <p className="text-xs text-gray-500">CAPS aligned</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div id="modules" className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
          <p className="text-gray-600 mt-1">
            Work through the modules in order, or jump to what you need most right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {modules.map((module, idx) => (
            <ModuleCard
              key={module.id}
              module={module}
              moduleNumber={idx + 1}
              progress={getModuleProgress(module.id)}
              isComplete={isModuleComplete(module.id)}
            />
          ))}
        </div>

        {/* Quick access */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/prompt-library"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600">Prompt Library</p>
              <p className="text-xs text-gray-500">50+ SA-ready prompts</p>
            </div>
          </Link>
          <Link
            href="/glossary"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600">AI Glossary</p>
              <p className="text-xs text-gray-500">25+ plain-language terms</p>
            </div>
          </Link>
          <Link
            href="/resources"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">⬇️</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600">Downloads</p>
              <p className="text-xs text-gray-500">Checklists & reference cards</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Certificate teaser */}
      {overallProgress === 100 && (
        <div className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">🎉</p>
            <h3 className="font-bold text-gray-900 text-xl mb-1">You completed the course!</h3>
            <p className="text-gray-800 text-sm mb-4">
              Download your certificate of completion.
            </p>
            <Link
              href="/certificate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors shadow"
            >
              <Award size={16} />
              Get your certificate
            </Link>
          </div>
        </div>
      )}

      <div className="pb-24 lg:pb-10" />
      <MobileNav />
    </div>
  );
}
