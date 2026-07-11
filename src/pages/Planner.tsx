import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";
import { CURRENCY_SYMBOL, CUISINE_OPTIONS, DEFAULT_PLANNER_INPUT, DIET_OPTIONS, MEAL_PREFERENCE_OPTIONS } from "@/constants";
import { buildPlannerPlanAsync } from "@/services/plannerService";
import { deletePlan, getLastInput, getPlans, saveLastInput, savePlan } from "@/services/storageService";
import type { Planner, PlannerInput } from "@/types";

export default function Planner() {
  const [form, setForm] = useState<PlannerInput>({ ...DEFAULT_PLANNER_INPUT });
  const [plan, setPlan] = useState<Planner | null>(null);
  const [history, setHistory] = useState<Planner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedInput = getLastInput();
    if (savedInput) {
      setForm(savedInput);
    }
    setHistory(getPlans());
  }, []);

  const handleArrayChange = (field: "availableIngredients" | "allergies", value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const generatedPlan = await buildPlannerPlanAsync(form);
      saveLastInput(generatedPlan.input);
      const nextHistory = savePlan(generatedPlan);
      setPlan(generatedPlan);
      setHistory(nextHistory);
    } catch {
      setError("We could not generate your plan right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (sourcePlan: Planner) => {
    setLoading(true);
    setError("");

    try {
      const regeneratedPlan = await buildPlannerPlanAsync(sourcePlan.input);
      saveLastInput(regeneratedPlan.input);
      const nextHistory = savePlan(regeneratedPlan);
      setPlan(regeneratedPlan);
      setHistory(nextHistory);
    } catch {
      setError("We could not regenerate your plan right now.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setPlan((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        tasks: current.tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
      };
    });
  };

  const removePlan = (planId: string) => {
    const nextHistory = deletePlan(planId);
    setHistory(nextHistory);
    if (plan?.id === planId) {
      setPlan(null);
    }
  };

  return (
    <AppLayout title="Planner" subtitle="Set your preferences and generate today’s cooking plan.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-700">Planner form</p>
              <h3 className="mt-1 text-lg font-semibold text-surface-900">What’s cooking today?</h3>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              Local + OpenAI ready
            </span>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="label-text">Diet</span>
                <select
                  className="input-field"
                  value={form.diet}
                  onChange={(event) => setForm((current) => ({ ...current, diet: event.target.value as PlannerInput["diet"] }))}
                >
                  {DIET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="label-text">Cuisine preference</span>
                <select
                  className="input-field"
                  value={form.cuisine}
                  onChange={(event) => setForm((current) => ({ ...current, cuisine: event.target.value as PlannerInput["cuisine"] }))}
                >
                  {CUISINE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="label-text">Budget</span>
                <input
                  className="input-field"
                  type="number"
                  min="100"
                  value={form.budget}
                  onChange={(event) => setForm((current) => ({ ...current, budget: Number(event.target.value) }))}
                />
              </label>

              <label className="block">
                <span className="label-text">People</span>
                <input
                  className="input-field"
                  type="number"
                  min="1"
                  value={form.people}
                  onChange={(event) => setForm((current) => ({ ...current, people: Number(event.target.value) }))}
                />
              </label>

              <label className="block">
                <span className="label-text">Cooking time</span>
                <input
                  className="input-field"
                  type="number"
                  min="15"
                  value={form.cookingTime}
                  onChange={(event) => setForm((current) => ({ ...current, cookingTime: Number(event.target.value) }))}
                />
              </label>
            </div>

            <label className="block">
              <span className="label-text">Meal preference</span>
              <select
                className="input-field"
                value={form.mealPreference}
                onChange={(event) => setForm((current) => ({ ...current, mealPreference: event.target.value as PlannerInput["mealPreference"] }))}
              >
                {MEAL_PREFERENCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="label-text">Available ingredients</span>
              <textarea
                className="input-field min-h-[88px]"
                value={form.availableIngredients.join(", ")}
                onChange={(event) => handleArrayChange("availableIngredients", event.target.value)}
                placeholder="rice, spinach, eggs"
              />
            </label>

            <label className="block">
              <span className="label-text">Allergies</span>
              <textarea
                className="input-field min-h-[88px]"
                value={form.allergies.join(", ")}
                onChange={(event) => handleArrayChange("allergies", event.target.value)}
                placeholder="nuts, dairy"
              />
            </label>

            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate plan"}
            </button>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary-700">Result preview</p>
                <h3 className="mt-1 text-lg font-semibold text-surface-900">Your generated plan</h3>
              </div>
              {plan ? (
                <button className="btn-secondary" onClick={() => handleRegenerate(plan)} disabled={loading}>
                  Regenerate
                </button>
              ) : null}
            </div>

            {plan ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-surface-200 bg-surface-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{new Date(plan.createdAt).toLocaleString()}</p>
                      <p className="text-sm text-surface-900/60">{plan.input.people} people • {plan.input.cookingTime} min • {plan.input.diet}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${plan.budget.withinBudget ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {plan.budget.withinBudget ? "Within budget ✅" : "Over budget ⚠️"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title: "Breakfast", meal: plan.meals.breakfast },
                    { title: "Lunch", meal: plan.meals.lunch },
                    { title: "Dinner", meal: plan.meals.dinner },
                  ].map(({ title, meal }) => (
                    <div key={title} className="rounded-2xl border border-surface-200 bg-white p-4">
                      <p className="text-sm font-semibold text-surface-900">{title}</p>
                      <p className="mt-2 text-sm font-medium text-primary-700">{meal.name}</p>
                      <p className="mt-1 text-xs text-surface-900/60">{meal.cuisine} • {meal.prepTime} min</p>
                      <p className="mt-3 text-sm text-surface-900/70">{CURRENCY_SYMBOL}{meal.cost} per person</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-surface-900">Grocery checklist</h4>
                    <ul className="mt-3 space-y-2">
                      {plan.groceries.map((item) => (
                        <li key={item.id} className="flex items-center gap-2 text-sm text-surface-900/70">
                          <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-surface-900">Cooking tasks</h4>
                    <ul className="mt-3 space-y-2">
                      {plan.tasks.map((task) => (
                        <li key={task.id} className="flex items-center gap-2 text-sm text-surface-900/70">
                          <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="rounded border-surface-300 text-primary-600" />
                          <span className={task.done ? "text-surface-400 line-through" : ""}>{task.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-surface-200 bg-surface-50 p-4">
                    <h4 className="text-sm font-semibold text-surface-900">Budget summary</h4>
                    <p className="mt-3 text-sm text-surface-900/70">Estimated total: {CURRENCY_SYMBOL}{plan.budget.totalCost}</p>
                    <p className="mt-1 text-sm text-surface-900/70">Budget limit: {CURRENCY_SYMBOL}{plan.budget.budget}</p>
                    <ul className="mt-3 space-y-2 text-sm text-surface-900/60">
                      {plan.budget.cheaperAlternatives.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-primary-600">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-surface-200 bg-surface-50 p-4">
                    <h4 className="text-sm font-semibold text-surface-900">Ingredient substitutions</h4>
                    <ul className="mt-3 space-y-2">
                      {plan.substitutions.map((item) => (
                        <li key={`${item.ingredient}-${item.alternative}`} className="text-sm text-surface-900/70">
                          <span className="font-medium text-surface-900">{item.ingredient}</span> → {item.alternative} • {item.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-surface-200 bg-surface-50 p-8 text-center text-sm text-surface-900/60">
                Generate a plan to see meals, groceries, substitutions, and tasks here.
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-700">History</p>
                <h3 className="mt-1 text-lg font-semibold text-surface-900">Saved plans</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-surface-900/60">Plans you save will appear here for quick access.</p>
              ) : (
                history.map((savedPlan) => (
                  <div key={savedPlan.id} className="rounded-2xl border border-surface-200 bg-surface-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-surface-900">{savedPlan.meals.breakfast.name}</p>
                        <p className="text-xs text-surface-900/60">{new Date(savedPlan.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary" onClick={() => handleRegenerate(savedPlan)}>
                          Regenerate
                        </button>
                        <button className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600" onClick={() => removePlan(savedPlan.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
