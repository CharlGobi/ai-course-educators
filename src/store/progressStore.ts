"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTotalLessonCount, getModuleLessonIds, getAllModules } from "@/lib/course";

interface ProgressStore {
  completedLessons: string[];
  quizScores: Record<string, number>;
  reflections: Record<string, string>;
  certificateName: string;
  startedAt: string | null;
  completedAt: string | null;

  // Actions
  markComplete: (moduleId: string, lessonId: string) => void;
  markIncomplete: (moduleId: string, lessonId: string) => void;
  saveQuizScore: (lessonKey: string, score: number) => void;
  saveReflection: (lessonKey: string, text: string) => void;
  setCertificateName: (name: string) => void;
  resetProgress: () => void;

  // Computed
  isLessonComplete: (moduleId: string, lessonId: string) => boolean;
  isModuleComplete: (moduleId: string) => boolean;
  getOverallProgress: () => number;
  getModuleProgress: (moduleId: string) => number;
  getCompletedCount: () => number;
}

const INITIAL_STATE = {
  completedLessons: [] as string[],
  quizScores: {} as Record<string, number>,
  reflections: {} as Record<string, string>,
  certificateName: "",
  startedAt: null as string | null,
  completedAt: null as string | null,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      markComplete: (moduleId, lessonId) => {
        const key = `${moduleId}/${lessonId}`;
        set((state) => {
          if (state.completedLessons.includes(key)) return state;
          const newCompleted = [...state.completedLessons, key];
          const total = getTotalLessonCount();
          const completedAt =
            newCompleted.length >= total ? new Date().toISOString() : state.completedAt;
          return {
            completedLessons: newCompleted,
            startedAt: state.startedAt ?? new Date().toISOString(),
            completedAt,
          };
        });
      },

      markIncomplete: (moduleId, lessonId) => {
        const key = `${moduleId}/${lessonId}`;
        set((state) => ({
          completedLessons: state.completedLessons.filter((k) => k !== key),
          completedAt: null,
        }));
      },

      saveQuizScore: (lessonKey, score) => {
        set((state) => ({
          quizScores: { ...state.quizScores, [lessonKey]: score },
        }));
      },

      saveReflection: (lessonKey, text) => {
        set((state) => ({
          reflections: { ...state.reflections, [lessonKey]: text },
        }));
      },

      setCertificateName: (name) => {
        set({ certificateName: name });
      },

      resetProgress: () => {
        set(INITIAL_STATE);
      },

      isLessonComplete: (moduleId, lessonId) => {
        return get().completedLessons.includes(`${moduleId}/${lessonId}`);
      },

      isModuleComplete: (moduleId) => {
        const lessonIds = getModuleLessonIds(moduleId);
        const completed = get().completedLessons;
        return lessonIds.length > 0 && lessonIds.every((id) => completed.includes(id));
      },

      getOverallProgress: () => {
        const total = getTotalLessonCount();
        if (total === 0) return 0;
        return Math.round((get().completedLessons.length / total) * 100);
      },

      getModuleProgress: (moduleId) => {
        const lessonIds = getModuleLessonIds(moduleId);
        if (lessonIds.length === 0) return 0;
        const completed = get().completedLessons;
        const completedCount = lessonIds.filter((id) => completed.includes(id)).length;
        return Math.round((completedCount / lessonIds.length) * 100);
      },

      getCompletedCount: () => get().completedLessons.length,
    }),
    {
      name: "sa-ai-course-progress",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
);
