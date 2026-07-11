import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";

export default function Home() {
  return (
    <AppLayout
      title="Welcome back 👋"
      subtitle="Generate a personalized cooking plan for today in a few seconds."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <h2 className="text-lg font-bold text-surface-900">Today's plan starts here</h2>
          <p className="mt-2 text-sm text-surface-900/60">
            Tell us your diet, budget, and how much time you have. We'll put together breakfast,
            lunch, dinner, a grocery checklist, and a cooking to-do list — all generated instantly,
            no sign-up required.
          </p>
          <Link to="/planner" className="btn-primary mt-5">
            Create a plan
          </Link>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-surface-900/70">How it works</h3>
          <ol className="mt-3 space-y-3 text-sm text-surface-900/70">
            <li className="flex gap-2">
              <span className="font-bold text-primary-600">1.</span> Fill in your preferences
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary-600">2.</span> Get meals + grocery list
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary-600">3.</span> Check off tasks as you cook
            </li>
          </ol>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-900/40">Meals</p>
          <p className="mt-1 text-sm text-surface-900/60">Breakfast, lunch &amp; dinner tailored to your diet.</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-900/40">Budget</p>
          <p className="mt-1 text-sm text-surface-900/60">See instantly if today's plan fits your budget.</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-900/40">Grocery List</p>
          <p className="mt-1 text-sm text-surface-900/60">One de-duplicated checklist for everything you need.</p>
        </Card>
      </div>
    </AppLayout>
  );
}
