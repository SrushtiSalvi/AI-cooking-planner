import { STORAGE_KEYS } from "@/constants";
import type { Planner, PlannerInput } from "@/types";

export function savePlan(plan: Planner) {
  const plans = getPlans();
  const nextPlans = [plan, ...plans.filter((item) => item.id !== plan.id)];
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(nextPlans));
  return nextPlans;
}

export function getPlans(): Planner[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEYS.PLANS);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Planner[];
  } catch {
    return [];
  }
}

export function updatePlan(planId: string, updates: Partial<Planner>) {
  const plans = getPlans();
  const nextPlans = plans.map((plan) => (plan.id === planId ? { ...plan, ...updates } : plan));
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(nextPlans));
  return nextPlans;
}

export function deletePlan(planId: string) {
  const plans = getPlans().filter((plan) => plan.id !== planId);
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  return plans;
}

export function saveLastInput(input: PlannerInput) {
  localStorage.setItem(STORAGE_KEYS.LAST_INPUT, JSON.stringify(input));
}

export function getLastInput(): PlannerInput | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(STORAGE_KEYS.LAST_INPUT);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PlannerInput;
  } catch {
    return null;
  }
}

export function saveAiConfig(config: { apiKey: string; model: string }) {
  localStorage.setItem("ai-cooking-todo:ai-config", JSON.stringify(config));
}

export function getAiConfig() {
  if (typeof window === "undefined") {
    return { apiKey: "", model: "gpt-4o-mini" };
  }

  const raw = localStorage.getItem("ai-cooking-todo:ai-config");
  if (!raw) {
    return { apiKey: "", model: "gpt-4o-mini" };
  }

  try {
    return JSON.parse(raw) as { apiKey: string; model: string };
  } catch {
    return { apiKey: "", model: "gpt-4o-mini" };
  }
}
