"use client";

import { useState } from "react";
import { stations, experience } from "@/content/experience";

/** Metro map of the career. Filled stops are facts; hollow ones are jokes. */
export function ExperienceApp() {
  const [sel, setSel] = useState(0);
  const job = experience[0];
  const current = stations[sel];

  return (
    <div className="flex min-h-full flex-col gap-6 p-5 @lg:p-8">
      <header>
        <p className="t-label text-volt">
          Line 1 · {job.short} · {job.start} → {job.end}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight @lg:text-3xl">
          The Career Line<span className="text-hot">.</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-dim">
          {job.role} at {job.company}, {job.location}. Filled stops are real. Hollow ones are service stations — jokes, not résumé claims.
        </p>
      </header>

      <div className="grid flex-1 gap-6 @3xl:grid-cols-[1fr_20rem]">
        <ol className="relative flex flex-col gap-1 pl-8">
          <span aria-hidden className="absolute bottom-4 left-[13px] top-4 w-1.5 rounded bg-gradient-to-b from-acid via-volt to-hot" />
          {stations.map((s, i) => {
            const on = i === sel;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  onMouseEnter={() => setSel(i)}
                  aria-pressed={on}
                  className="group relative flex w-full items-center gap-3 rounded-lg py-2 pl-2 pr-3 text-left transition hover:bg-bg/60"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[27px] block size-5 rounded-full border-[3px] transition ${s.real ? "border-ink bg-ink" : "border-ink bg-bg-elev"} ${
                      on ? "scale-125 !border-acid shadow-[var(--glow)]" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="flex-1">
                    <span className={`block font-display text-sm font-semibold ${on ? "text-acid" : ""}`}>{s.name}</span>
                    <span className="block font-mono text-[10px] text-ink-dim">{s.real ? s.date : "service station"}</span>
                  </span>
                  {on && <span aria-hidden className="text-lg">🚃</span>}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="space-y-4 @3xl:sticky @3xl:top-4 @3xl:self-start">
          <div aria-live="polite" className="rounded-xl border border-line bg-bg p-4">
            <p className="t-label text-ink-dim">
              Now arriving: <span className={current.real ? "text-acid" : "text-hot"}>{current.name}</span>
            </p>
            {current.date && <p className="mt-1 font-mono text-[11px] text-ink-dim">{current.date}</p>}
            <p className="mt-3 text-[15px] leading-relaxed">{current.detail}</p>
          </div>
          <details className="rounded-xl border border-line bg-bg p-4 text-sm">
            <summary className="cursor-pointer font-mono text-xs text-ink-dim">Full responsibilities (the boring timetable)</summary>
            <ul className="mt-3 space-y-1.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-acid">▸</span>
                  {r}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
