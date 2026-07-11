import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";
import { CURRENCY_SYMBOL } from "@/constants";
import { buildPlannerPlanAsync } from "@/services/plannerService";
import { deletePlan, getPlans, savePlan } from "@/services/storageService";
import type { Planner } from "@/types";

export default function History() {
  const [plans, setPlans] = useState<Planner[]>([]);

  useEffect(() => {
    setPlans(getPlans());
  }, []);

  const handleRegenerate = async (sourcePlan: Planner) => {
    const regeneratedPlan = await buildPlannerPlanAsync(sourcePlan.input);
    const nextPlans = savePlan(regeneratedPlan);
    setPlans(nextPlans);
  };

  const handleDelete = (planId: string) => {
    setPlans(deletePlan(planId));
  };

  return (
    <AppLayout title="History" subtitle="View, regenerate, or delete your past cooking plans.">
      <div className="space-y-4">
        {plans.length === 0 ? (
          <Card>
            <p className="text-sm text-surface-900/60">No saved plans yet. Generate one from the planner page.</p>
          </Card>
        ) : (
          plans.map((plan) => (
            <Card key={plan.id} className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-surface-900">{new Date(plan.createdAt).toLocaleString()}</p>
                  <p className="mt-1 text-sm text-surface-900/60">
                    {plan.meals.breakfast.name} • {plan.meals.lunch.name} • {plan.meals.dinner.name}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${plan.budget.withinBudget ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {plan.budget.withinBudget ? "Within budget" : "Over budget"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-surface-900/70">
                <span>Total: {CURRENCY_SYMBOL}{plan.budget.totalCost}</span>
                <span>People: {plan.input.people}</span>
                <span>Diet: {plan.input.diet}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="btn-secondary" onClick={() => handleRegenerate(plan)}>
                  Regenerate
                </button>
                <button className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600" onClick={() => handleDelete(plan.id)}>
                  Delete
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </AppLayout>
  );
}
