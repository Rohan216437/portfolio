"use client";

import { useEffect, useRef, useState } from "react";
import { gags } from "@/content/gags";
import { prefersReducedMotion } from "@/lib/quip";

const BIOS = [
  "RohanOS BIOS v2.0.24 — Mumbai build",
  "Memory check ........ 16 GB OK (12 GB reserved for Chrome tabs)",
  "Detecting caffeine .. cutting chai found ✓",
  "Hanging Nimbu Mirchi  nazar shield online ✓",
  "Mounting /dev/talent  …",
];

/**
 * Boot sequence: BIOS lines → 0..99 → stall → 97 → 100 "Fine. We're faking it."
 * ~3s, skippable, once per session (unless restarted from the menu).
 */
export function Boot({ onDone, force = 0 }: { onDone: () => void; force?: number }) {
  const [shown, setShown] = useState(0);
  const [n, setN] = useState(0);
  const [msg, setMsg] = useState("");
  const [phase, setPhase] = useState<"on" | "leaving" | "gone">("on");
  const done = useRef(false);
  const cb = useRef(onDone);
  cb.current = onDone;

  const finish = () => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("rg-booted", "1");
    } catch {}
    setPhase("leaving");
    cb.current();
    window.setTimeout(() => setPhase("gone"), 700);
  };

  useEffect(() => {
    done.current = false;
    setPhase("on");
    setShown(0);
    setN(0);
    setMsg("");
    let seen = false;
    try {
      seen = sessionStorage.getItem("rg-booted") === "1";
    } catch {}
    if ((seen && force === 0) || prefersReducedMotion()) {
      done.current = true;
      cb.current();
      setPhase("gone");
      return;
    }
    const t: number[] = [];
    const at = (ms: number, fn: () => void) => t.push(window.setTimeout(fn, ms));
    BIOS.forEach((_, i) => at(120 + i * 170, () => setShown(i + 1)));
    const start = 1000;
    for (let k = 1; k <= 20; k++) at(start + k * 45, () => setN(Math.round((99 * k) / 20)));
    at(start + 20 * 45 + 50, () => setMsg(gags.preloader.loading));
    at(2250, () => {
      setN(97);
      setMsg(gags.preloader.stall);
    });
    at(2650, () => {
      setN(100);
      setMsg(gags.preloader.done);
    });
    at(3150, finish);
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [force]);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[300] flex flex-col bg-[#030306] p-6 font-mono text-[13px] text-[#c9c7e0] transition-opacity duration-700 sm:p-10 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div className="space-y-1">
        {BIOS.slice(0, shown).map((l) => (
          <p key={l}>{l}</p>
        ))}
        {shown >= BIOS.length && (
          <div className="pt-4">
            <div className="flex items-center gap-3">
              <span className="w-10 tabular-nums text-[#c6ff3d]">{n}%</span>
              <span className="h-2 w-64 max-w-[60vw] overflow-hidden rounded-sm bg-[#1d1c2b]">
                <span className="block h-full bg-[#c6ff3d] transition-[width] duration-150" style={{ width: `${n}%` }} />
              </span>
            </div>
            <p className="mt-2 text-[#8b89a6]">{msg}</p>
          </div>
        )}
        <span className="inline-block h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-[#c6ff3d] align-middle" />
      </div>
      <button type="button" onClick={finish} className="mt-auto self-end text-xs text-[#8b89a6] underline underline-offset-4 hover:text-[#c6ff3d]">
        {gags.preloader.skip}
      </button>
    </div>
  );
}
