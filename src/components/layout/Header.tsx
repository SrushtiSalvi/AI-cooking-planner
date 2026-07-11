import { NavLink } from "react-router-dom";

const MOBILE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/planner", label: "Planner" },
  { to: "/history", label: "History" },
  { to: "/settings", label: "Settings" },
];

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-surface-200/70 bg-surface-50/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <div>
          <h1 className="text-xl font-bold text-surface-900">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-surface-900/50">{subtitle}</p>}
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-surface-200/70 px-4 py-2 md:hidden">
        {MOBILE_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-primary-50 text-primary-700" : "text-surface-900/60"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
