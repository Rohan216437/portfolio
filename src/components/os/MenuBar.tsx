"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NimbuMirchi } from "./NimbuMirchi";
import { useOS } from "./context";
import { gags } from "@/content/gags";
import { quip } from "@/lib/quip";

function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "2-digit" });
    setNow(fmt());
    const id = window.setInterval(() => setNow(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden font-mono text-[11px] tabular-nums text-ink-dim sm:inline" suppressHydrationWarning>
      {now} IST
    </span>
  );
}

/** Chai battery: drains while you browse. Click to refill. */
function Chai() {
  const [level, setLevel] = useState(64);
  useEffect(() => {
    const id = window.setInterval(() => setLevel((l) => Math.max(3, l - 1)), 9000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (level === 10) quip("Chai level critical. Productivity entering power-saving mode.", { tone: "hot" });
  }, [level]);
  return (
    <button
      type="button"
      onClick={() => {
        setLevel(100);
        quip("Cutting chai refilled. Productivity +40% [citation needed]", { tone: "acid" });
      }}
      aria-label={`Chai level ${level} percent. Click to refill.`}
      data-cursor="Refill chai"
      className="flex items-center gap-1.5 font-mono text-[11px] text-ink-dim hover:text-ink"
    >
      <span aria-hidden>☕</span>
      <span className="relative h-2.5 w-6 rounded-[3px] border border-current p-px">
        <span className={`block h-full rounded-[1px] ${level < 20 ? "bg-hot" : "bg-acid"}`} style={{ width: `${level}%` }} />
      </span>
      <span className="hidden tabular-nums md:inline">{level}%</span>
    </button>
  );
}

const MENU = [
  { label: "About This Developer", action: "about" },
  { label: "Open Terminal", action: "terminal" },
  { label: "Boring Mode…", action: "boring" },
  { label: "Restart", action: "restart" },
  { label: "Shut Down", action: "shutdown" },
] as const;

export function MenuBar({ title, onRestart }: { title: string; onRestart: () => void }) {
  const { open } = useOS();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const off = (e: PointerEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("pointerdown", off);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", off);
      window.removeEventListener("keydown", esc);
    };
  }, [menu]);

  const act = (a: (typeof MENU)[number]["action"]) => {
    setMenu(false);
    if (a === "about") open("about");
    else if (a === "terminal") open("terminal");
    else if (a === "boring") window.location.href = "/boring";
    else if (a === "restart") onRestart();
    else quip("Nice try. You can't shut me down. Only my manager can.", { tone: "hot", ms: 3200 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[200] flex h-9 items-center gap-4 border-b border-line bg-bg/70 px-3 backdrop-blur-xl sm:px-4">
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-haspopup="menu"
          aria-expanded={menu}
          className="rounded px-1.5 py-0.5 font-display text-[13px] font-extrabold tracking-tight hover:bg-bg-elev"
        >
          RG<span className="text-acid">.</span>
        </button>
        {menu && (
          <div role="menu" className="absolute left-0 top-8 w-56 rounded-lg border border-line bg-bg-elev/95 p-1 shadow-2xl backdrop-blur-xl">
            {MENU.map((m, i) => (
              <button
                key={m.action}
                role="menuitem"
                type="button"
                onClick={() => act(m.action)}
                className={`block w-full rounded px-3 py-1.5 text-left text-[13px] hover:bg-acid hover:text-on-acid ${i === 2 ? "border-b border-line" : ""}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="hidden truncate text-[13px] font-semibold sm:block">{title}</p>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <Chai />
        <Link
          href="/boring"
          data-cursor={gags.cursor.boring}
          className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-bg"
        >
          {gags.boring.button}
        </Link>
        <ThemeToggle />
        <Clock />
        {/* room for the charm on the right edge */}
        <span className="w-6 sm:w-8" aria-hidden />
      </div>
      <NimbuMirchi />
    </header>
  );
}
