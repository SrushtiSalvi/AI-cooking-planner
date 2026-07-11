// ─────────────────────────────────────────────────────────────────────────
// Enums / literal unions
// ─────────────────────────────────────────────────────────────────────────

export type Diet = "vegetarian" | "vegan" | "egg" | "non-vegetarian";

export type MealPreference = "light" | "medium" | "heavy";

export type MealType = "breakfast" | "lunch" | "dinner";

export type Difficulty = "easy" | "medium" | "hard";

export type Cuisine =
  | "north-indian"
  | "south-indian"
  | "italian"
  | "mexican"
  | "chinese"
  | "continental"
  | "mediterranean"
  | "thai";

// ─────────────────────────────────────────────────────────────────────────
// Meal dataset
// ─────────────────────────────────────────────────────────────────────────

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  diet: Diet;
  ingredients: string[];
  cost: number; // per person, in local currency units
  prepTime: number; // minutes
  cuisine: Cuisine;
  difficulty: Difficulty;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// ─────────────────────────────────────────────────────────────────────────
// Planner input (form)
// ─────────────────────────────────────────────────────────────────────────

export interface PlannerInput {
  diet: Diet;
  budget: number;
  people: number;
  cookingTime: number; // minutes available
  mealPreference: MealPreference;
  availableIngredients: string[];
  allergies: string[];
  cuisine: Cuisine | "any";
}

// ─────────────────────────────────────────────────────────────────────────
// Generated planner output pieces
// ─────────────────────────────────────────────────────────────────────────

export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface CookingTask {
  id: string;
  label: string;
  done: boolean;
}

export interface Substitution {
  ingredient: string;
  alternative: string;
  reason: string;
}

export interface BudgetSummary {
  totalCost: number;
  budget: number;
  withinBudget: boolean;
  difference: number;
  cheaperAlternatives: string[];
}

export interface DailyMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

// ─────────────────────────────────────────────────────────────────────────
// The full generated plan, persisted to history
// ─────────────────────────────────────────────────────────────────────────

export interface Planner {
  id: string;
  createdAt: string; // ISO date string
  input: PlannerInput;
  meals: DailyMeals;
  groceries: GroceryItem[];
  budget: BudgetSummary;
  tasks: CookingTask[];
  substitutions: Substitution[];
  isFavorite: boolean;
}
