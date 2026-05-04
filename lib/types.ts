// Tipos compartidos del sistema Life OS

export type UserSlug = "lautaro" | "rocio";

export type Theme = "lautaro" | "rocio";

export type CheckCategory =
  | "morning"
  | "training"
  | "nutrition"
  | "post_work"
  | "night"
  | "goals";

export interface ChecklistItem {
  key: string;
  label: string;
  category: CheckCategory;
  time?: string;
}

export interface TimelineItem {
  time: string;
  emoji: string;
  title: string;
  description: string;
  detail?: string;
}

export interface MealOption {
  emoji: string;
  name: string;
  description: string;
  calories: number;
  protein?: number;
  carbs?: number;
}

export interface Exercise {
  name: string;
  sets: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  emoji: string;
  title: string;
  focus: string;
  duration: string;
  warmup?: Exercise[];
  exercises: { section: string; items: Exercise[] }[];
  notes?: string;
}

export interface UserStats {
  weight?: number;
  height?: number;
  bmi?: number;
  caloriesGoal: number;
  proteinGoal: number;
  weeklyGoal?: string;
}
