import manifest from "@/content/course-manifest.json";
import type { CourseManifest, Module, Lesson } from "./types";

export const courseManifest = manifest as CourseManifest;

export function getAllModules(): Module[] {
  return courseManifest.modules;
}

export function getModule(moduleId: string): Module | undefined {
  return courseManifest.modules.find((m) => m.id === moduleId);
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  const module = getModule(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}

export function getLessonNav(moduleId: string, lessonId: string) {
  const allModules = courseManifest.modules;
  const modIndex = allModules.findIndex((m) => m.id === moduleId);
  if (modIndex === -1) return { prev: null, next: null };

  const module = allModules[modIndex];
  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return { prev: null, next: null };

  let prev: { moduleId: string; lessonId: string; title: string } | null = null;
  let next: { moduleId: string; lessonId: string; title: string } | null = null;

  // Previous lesson
  if (lessonIndex > 0) {
    const prevLesson = module.lessons[lessonIndex - 1];
    prev = { moduleId, lessonId: prevLesson.id, title: prevLesson.title };
  } else if (modIndex > 0) {
    const prevModule = allModules[modIndex - 1];
    const prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
    prev = { moduleId: prevModule.id, lessonId: prevLesson.id, title: prevLesson.title };
  }

  // Next lesson
  if (lessonIndex < module.lessons.length - 1) {
    const nextLesson = module.lessons[lessonIndex + 1];
    next = { moduleId, lessonId: nextLesson.id, title: nextLesson.title };
  } else if (modIndex < allModules.length - 1) {
    const nextModule = allModules[modIndex + 1];
    const nextLesson = nextModule.lessons[0];
    next = { moduleId: nextModule.id, lessonId: nextLesson.id, title: nextLesson.title };
  }

  return { prev, next };
}

export function getTotalLessonCount(): number {
  return courseManifest.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getModuleLessonIds(moduleId: string): string[] {
  const module = getModule(moduleId);
  if (!module) return [];
  return module.lessons.map((l) => `${moduleId}/${l.id}`);
}

export function getLessonPath(moduleId: string, lessonId: string): string {
  return `/modules/${moduleId}/${lessonId}`;
}

export function getModuleNumber(moduleId: string): number {
  return courseManifest.modules.findIndex((m) => m.id === moduleId) + 1;
}
