import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: ReactElement;
}

const iconClass = "h-5 w-5";

const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/planner",
    label: "Planner",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="4" y="4" width="16" height="17" rx="2" />
        <path d="M8 2.5v3M16 2.5v3M4 9.5h16" strokeLinecap="round" />
        <path d="M8.5 13.5h3M8.5 16.5h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/history",
    label: "History",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
        <path d="M3 4v4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/settings",
    label: "Settings",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 13.5a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H20a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-200/70 bg-white px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 20c0-4.42 2.69-8 6-8s6 3.58 6 8" strokeLinecap="round" />
            <path d="M6 20h12M9 12V8M12 12V7M15 12V8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-surface-900">AI Cooking</p>
          <p className="text-xs leading-tight text-surface-900/50">To-Do List</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-surface-900/60 hover:bg-surface-100 hover:text-surface-900"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-xl bg-surface-100 p-4">
        <p className="text-xs font-medium text-surface-900/70">
          Plans are generated locally and saved to your browser — no account needed.
        </p>
      </div>
    </aside>
  );
}
