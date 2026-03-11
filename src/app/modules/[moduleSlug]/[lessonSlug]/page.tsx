import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/layout/LessonLayout";
import { LessonHeader } from "@/components/course/LessonHeader";
import { LessonCompleteButton } from "@/components/course/LessonCompleteButton";
import { getModule, getLesson, getLessonNav, getLessonPath } from "@/lib/course";

interface PageProps {
  params: {
    moduleSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { moduleSlug, lessonSlug } = params;

  const module = getModule(moduleSlug);
  const lesson = getLesson(moduleSlug, lessonSlug);

  if (!module || !lesson) {
    notFound();
  }

  const { prev, next } = getLessonNav(moduleSlug, lessonSlug);

  // Dynamically import the MDX file
  let LessonContent: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/modules/${moduleSlug}/${lessonSlug}.mdx`);
    LessonContent = mod.default;
  } catch {
    // MDX file not yet written — show a placeholder
    LessonContent = null;
  }

  return (
    <LessonLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <LessonHeader
          module={module}
          lesson={lesson}
          prevLesson={prev}
          nextLesson={next}
        />

        {/* Lesson content */}
        <article className="mt-8">
          {LessonContent ? (
            <LessonContent />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center text-gray-400">
              <p className="text-4xl mb-3">🚧</p>
              <p className="font-semibold text-lg">Content coming soon</p>
              <p className="text-sm mt-1">
                This lesson is being prepared. Check back soon!
              </p>
            </div>
          )}
        </article>

        {/* Complete button */}
        <LessonCompleteButton
          moduleId={moduleSlug}
          lessonId={lessonSlug}
          nextHref={next ? getLessonPath(next.moduleId, next.lessonId) : undefined}
          nextTitle={next?.title}
        />
      </div>
    </LessonLayout>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { moduleSlug, lessonSlug } = params;
  const module = getModule(moduleSlug);
  const lesson = getLesson(moduleSlug, lessonSlug);

  if (!module || !lesson) return {};

  return {
    title: `${lesson.title} | ${module.title} | AI for SA Educators`,
    description: lesson.objectives[0] ?? "",
  };
}
