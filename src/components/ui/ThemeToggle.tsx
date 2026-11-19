"use client";

import { gags } from "@/content/gags";
import { prefersReducedMotion, quip } from "@/lib/quip";

/** Toggle theme with a circular reveal from (x, y). Usable from anywhere (menus, terminal…). */
export function toggleTheme(x = innerWidth / 2, y = innerHeight / 2, quiet = false) {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  if (!document.startViewTransition || prefersReducedMotion()) {
    apply();
  } else {
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(apply);
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }
  if (!quiet) quip(next === "light" ? gags.theme.toLight : gags.theme.toDark, { tone: "volt" });
  return next;
}

export function ThemeToggle({ className = "", quiet = false }: { className?: string; quiet?: boolean }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme(r.left + r.width / 2, r.top + r.height / 2, quiet);
      }}
      aria-label="Toggle light and dark theme"
      data-cursor="Change the vibe"
      className={`group relative grid size-8 place-items-center rounded-full border border-line bg-bg-elev/70 text-ink backdrop-blur transition hover:border-acid hover:text-acid ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4 light:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden size-4 light:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
