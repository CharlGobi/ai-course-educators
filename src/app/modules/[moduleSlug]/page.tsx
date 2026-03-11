import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { LessonLayout } from "@/components/layout/LessonLayout";
import { getModule, getAllModules, getModuleNumber } from "@/lib/course";
import { formatMinutes } from "@/lib/utils";

interface PageProps {
  params: { moduleSlug: string };
}

export default function ModuleOverviewPage({ params }: PageProps) {
  const { moduleSlug } = params;
  const module = getModule(moduleSlug);

  if (!module) notFound();

  const moduleNumber = getModuleNumber(moduleSlug);
  const allModules = getAllModules();
  const nextModule = allModules[moduleNumber]; // 0-indexed so moduleNumber = next index

  return (
    <LessonLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Module header */}
        <div className="mb-8">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
            style={{ backgroundColor: module.color }}
          >
            Module {moduleNumber}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{module.title}</h1>
          <p className="text-xl text-gray-600 mb-3">{module.subtitle}</p>
          <p className="text-gray-700">{module.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatMinutes(module.estimatedMinutes)}
            </span>
            <span>{module.lessons.length} lessons</span>
          </div>
        </div>

        {/* Lessons list */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
            Lessons in this module
          </h2>
          {module.lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/modules/${module.id}/${lesson.id}`}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: module.color }}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formatMinutes(lesson.estimatedMinutes)}
                  {lesson.hasQuiz && " · includes quiz"}
                  {lesson.hasTryItNow && " · hands-on activity"}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-400 flex-shrink-0 group-hover:text-primary-500 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Start CTA */}
        <div className="mt-8">
          <Link
            href={`/modules/${module.id}/${module.lessons[0].id}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors shadow-sm"
          >
            Start Module {moduleNumber}
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </LessonLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const module = getModule(params.moduleSlug);
  if (!module) return {};
  return {
    title: `${module.title} | AI for SA Educators`,
    description: module.description,
  };
}
