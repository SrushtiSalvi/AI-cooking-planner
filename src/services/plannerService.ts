import type { Planner, PlannerInput } from "@/types";
import { calculateBudget, generateGroceries, generateMeals, generateMealsSync, generateSubstitutions, generateTasks } from "./aiService";

export function buildPlannerPlan(input: PlannerInput): Planner {
  const meals = generateMealsSync(input);
  const groceries = generateGroceries(meals);
  const budget = calculateBudget(meals, input);
  const tasks = generateTasks(meals);
  const substitutions = generateSubstitutions(meals);

  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    meals,
    groceries,
    budget,
    tasks,
    substitutions,
    isFavorite: false,
  };
}

export async function buildPlannerPlanAsync(input: PlannerInput): Promise<Planner> {
  const meals = await generateMeals(input);
  const groceries = generateGroceries(meals);
  const budget = calculateBudget(meals, input);
  const tasks = generateTasks(meals);
  const substitutions = generateSubstitutions(meals);

  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    meals,
    groceries,
    budget,
    tasks,
    substitutions,
    isFavorite: false,
  };
}

export function createPlannerSnapshot(plan: Planner) {
  return plan;
}
