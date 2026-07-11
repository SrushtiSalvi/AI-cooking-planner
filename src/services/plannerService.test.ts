import { describe, expect, it } from "vitest";
import { buildPlannerPlan } from "./plannerService";
import type { PlannerInput } from "@/types";

describe("buildPlannerPlan", () => {
  it("creates a complete plan for a vegetarian budget-conscious request", () => {
    const input: PlannerInput = {
      diet: "vegetarian",
      budget: 900,
      people: 2,
      cookingTime: 60,
      mealPreference: "medium",
      availableIngredients: ["rice", "spinach"],
      allergies: ["nuts"],
      cuisine: "north-indian",
    };

    const plan = buildPlannerPlan(input);

    expect(plan.meals.breakfast.name).toBeTruthy();
    expect(plan.meals.lunch.name).toBeTruthy();
    expect(plan.meals.dinner.name).toBeTruthy();
    expect(plan.groceries.length).toBeGreaterThan(0);
    expect(plan.tasks.length).toBeGreaterThan(0);
    expect(plan.substitutions.length).toBeGreaterThan(0);
    expect(plan.budget.totalCost).toBeGreaterThan(0);
    expect(plan.budget.withinBudget).toBe(true);
  });
});
