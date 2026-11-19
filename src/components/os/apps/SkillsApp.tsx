"use client";

import { useState } from "react";
import { skillGroups, statusLabel, fakeProcesses, type SkillStatus } from "@/content/skills";
import { StatusDot } from "@/components/ui/StatusDot";

const badge: Record<SkillStatus, string> = {
  work: "bg-acid text-on-acid",
  personal: "bg-volt/15 text-volt ring-1 ring-volt/50",
  loaded: "text-ink-dim ring-1 ring-line",
};

/** Task Manager for the brain. Status = where a skill was used, never a fake percentage. */
export function SkillsApp() {
  const [tab, setTab] = useState(0);
  const group = skillGroups[tab];
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 font-mono text-[11px] text-ink-dim">
        <span>rohan@brain:~$ htop --no-percentages --honest</span>
        <span className="hidden @md:inline">
          {total} processes · uptime: since 2023 · load avg: chai
        </span>
      </div>

      <div role="tablist" aria-label="Skill categories" className="flex shrink-0 gap-1 overflow-x-auto border-b border-line px-2 py-2">
        {skillGroups.map((g, i) => (
          <button
            key={g.id}
            role="tab"
            type="button"
            aria-selected={i === tab}
            aria-controls="skills-panel"
            onClick={() => setTab(i)}
            className={`shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition ${i === tab ? "bg-acid text-on-acid" : "text-ink-dim hover:bg-bg hover:text-ink"}`}
          >
            {g.label}
            <span className="ml-1.5 opacity-60">{g.process}</span>
          </button>
        ))}
      </div>

      <div id="skills-panel" role="tabpanel" className="min-h-0 flex-1 overflow-y-auto">
        <table className="w-full text-left font-mono text-xs @lg:text-[13px]">
          <caption className="sr-only">{group.label} skills. Status shows where each skill was used, not a proficiency level.</caption>
          <thead className="sticky top-0 bg-bg-elev text-[10px] uppercase tracking-widest text-ink-dim">
            <tr>
              <th className="hidden px-4 py-2 font-normal @md:table-cell">PID</th>
              <th className="px-4 py-2 font-normal">Process</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="hidden px-4 py-2 font-normal @2xl:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody key={group.id}>
            {group.skills.map((s, i) => (
              <tr key={s.name} className="border-t border-line/60 align-top transition hover:bg-bg/60" style={{ animation: `os-row-in .35s ${i * 35}ms both` }}>
                <td className="hidden px-4 py-2 text-ink-dim @md:table-cell">{1000 + tab * 100 + i * 7}</td>
                <td className="px-4 py-2">
                  <span className="font-semibold text-ink">{s.name}</span>
                  <span className="mt-0.5 block text-[11px] text-ink-dim @2xl:hidden">{s.note}</span>
                </td>
                <td className="px-2 py-2">
                  <span className={`inline-block whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold ${badge[s.status]}`}>{statusLabel[s.status].label}</span>
                </td>
                <td className="hidden px-4 py-2 text-ink-dim @2xl:table-cell">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-4 py-2 text-[11px] text-ink-dim">
        {(Object.keys(statusLabel) as SkillStatus[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <StatusDot status={k} /> {statusLabel[k].legend}
          </span>
        ))}
      </div>
      <div aria-label="Other processes" className="flex flex-wrap gap-x-4 gap-y-1 border-t border-dashed border-line bg-bg/40 px-4 py-2 font-mono text-[10px]">
        {fakeProcesses.map((p) => (
          <span key={p.name}>
            <span className="text-ink-dim">{p.name}:</span> <span className="text-hot">{p.status}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
