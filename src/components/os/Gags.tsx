"use client";

import { useEffect, useState } from "react";
import { gags } from "@/content/gags";
import { quip } from "@/lib/quip";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const IDLE_MS = 20_000;

/** Global easter eggs: idle nap, tab title, console note, Konami / "bug" → Bug Zoo. */
export function Gags({ onSecret }: { onSecret: () => void }) {
  const [asleep, setAsleep] = useState(false);

  // Console message (once)
  useEffect(() => {
    console.log(
      `%c${gags.console}%c\n\nPsst: try the Konami code, or just type "bug".`,
      "font: 700 16px monospace; color: #c6ff3d; background: #07070c; padding: 8px 12px; border-radius: 6px;",
      "font: 12px monospace; color: #8b89a6;",
    );
  }, []);

  // Tab title
  useEffect(() => {
    const original = document.title;
    let t: number | undefined;
    const onVis = () => {
      window.clearTimeout(t);
      if (document.hidden) {
        document.title = gags.tab.first;
        t = window.setTimeout(() => (document.title = gags.tab.second), 5000);
      } else {
        document.title = original;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
      document.title = original;
    };
  }, []);

  // Idle → yawn → sleep. Never while typing in a field.
  useEffect(() => {
    let t: number | undefined;
    let sleeping = false;
    const arm = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const el = document.activeElement;
        if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return arm();
        sleeping = true;
        setAsleep(true);
        quip(gags.idle.yawn, { tone: "volt", ms: 2500 });
      }, IDLE_MS);
    };
    const wake = () => {
      if (sleeping) {
        sleeping = false;
        setAsleep(false);
        quip(gags.idle.wake, { tone: "acid" });
      }
      arm();
    };
    const evts = ["pointermove", "keydown", "wheel", "touchstart", "scroll"] as const;
    evts.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    arm();
    return () => {
      window.clearTimeout(t);
      evts.forEach((e) => window.removeEventListener(e, wake));
    };
  }, []);

  // Konami code or typing "bug"
  useEffect(() => {
    let k = 0;
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) return;
      k = e.key === KONAMI[k] || e.key.toLowerCase() === KONAMI[k] ? k + 1 : e.key === KONAMI[0] ? 1 : 0;
      typed = (typed + e.key.toLowerCase()).slice(-3);
      if (k === KONAMI.length || typed === "bug") {
        k = 0;
        typed = "";
        quip("Secret unlocked, you absolute nerd. Opening the Bug Zoo…", { tone: "hot" });
        onSecret();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSecret]);

  return (
    <>
      {asleep && (
        <div aria-hidden className="pointer-events-none fixed bottom-24 left-6 z-[75] font-mono text-ink-dim">
          <p className="animate-[bob_2.4s_ease-in-out_infinite] text-sm">
            <span className="text-2xl">(－_－)</span> <span className="text-volt">zzZ</span>
          </p>
          <p className="mt-1 text-xs">{gags.idle.asleep}</p>
        </div>
      )}
    </>
  );
}
