import type { Cuisine, Diet, MealPreference } from "@/types";

export const DIET_OPTIONS: { value: Diet; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "egg", label: "Egg" },
  { value: "non-vegetarian", label: "Non-Vegetarian" },
];

export const MEAL_PREFERENCE_OPTIONS: { value: MealPreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "heavy", label: "Heavy" },
];

export const CUISINE_OPTIONS: { value: Cuisine | "any"; label: string }[] = [
  { value: "any", label: "Any Cuisine" },
  { value: "north-indian", label: "North Indian" },
  { value: "south-indian", label: "South Indian" },
  { value: "italian", label: "Italian" },
  { value: "mexican", label: "Mexican" },
  { value: "chinese", label: "Chinese" },
  { value: "continental", label: "Continental" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "thai", label: "Thai" },
];

export const DEFAULT_PLANNER_INPUT = {
  diet: "vegetarian" as Diet,
  budget: 500,
  people: 2,
  cookingTime: 60,
  mealPreference: "medium" as MealPreference,
  availableIngredients: [] as string[],
  allergies: [] as string[],
  cuisine: "any" as Cuisine | "any",
};

export const STORAGE_KEYS = {
  PLANS: "ai-cooking-todo:plans",
  SETTINGS: "ai-cooking-todo:settings",
  LAST_INPUT: "ai-cooking-todo:last-input",
} as const;

export const CURRENCY_SYMBOL = "₹";
