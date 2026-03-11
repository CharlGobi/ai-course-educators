export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  estimatedMinutes: number;
  hasQuiz: boolean;
  hasTryItNow: boolean;
  hasReflection: boolean;
  hasPromptBuilder: boolean;
  downloadables: string[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseManifest {
  title: string;
  subtitle: string;
  description: string;
  totalMinutes: number;
  modules: Module[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  subjects: string[];
  grades: string[];
  prompt: string;
  description: string;
  example?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  whyItMatters: string;
  example?: string;
}

export interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, number>;
  reflections: Record<string, string>;
  certificateName: string;
  startedAt: string | null;
  completedAt: string | null;
}
