"use client";

import { useEffect, useState } from "react";
import { QUIP_EVENT, type QuipDetail } from "@/lib/quip";

type Toast = QuipDetail & { id: number };

const toneClass = {
  acid: "border-acid text-acid",
  hot: "border-hot text-hot",
  volt: "border-volt text-volt",
} as const;

/** Renders quips as small terminal-style toasts. Announced politely to screen readers. */
export function QuipToaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let id = 0;
    const onQuip = (e: Event) => {
      const detail = (e as CustomEvent<QuipDetail>).detail;
      const toast = { ...detail, id: ++id };
      setToasts((t) => [...t.filter((x) => x.text !== toast.text), toast].slice(-3));
      window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toast.id)), detail.ms ?? 2800);
    };
    window.addEventListener(QUIP_EVENT, onQuip);
    return () => window.removeEventListener(QUIP_EVENT, onQuip);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-24 left-1/2 z-[250] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col items-center gap-2"
    >
      {toasts.map((t) => (
        <p
          key={t.id}
          className={`animate-[quip-in_.35s_cubic-bezier(.2,1.4,.4,1)] rounded-md border bg-bg-elev/95 px-4 py-2 font-mono text-sm shadow-[var(--shadow-card)] backdrop-blur ${toneClass[t.tone ?? "acid"]}`}
        >
          <span className="text-ink-dim">&gt; </span>
          {t.text}
        </p>
      ))}
      <style>{`@keyframes quip-in{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
