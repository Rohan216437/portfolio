"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { quip, prefersReducedMotion } from "@/lib/quip";

const POKES = [
  "Nazar deflected. You're welcome.",
  "Please stop poking the antivirus.",
  "It's load-bearing. Last warning.",
];

type Bug = { id: number; x: number; y: number; dead: boolean };

/** Nimbu Mirchi Antivirus™ — hangs from the menu bar, protects production from nazar. */
export function NimbuMirchi() {
  const [pokes, setPokes] = useState(0);
  const [tip, setTip] = useState(false);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [invasion, setInvasion] = useState(false);
  const squashed = useRef(0);
  const charm = useRef<SVGSVGElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const endInvasion = (won: boolean) => {
    window.clearTimeout(timer.current);
    setInvasion(false);
    setBugs([]);
    setPokes(0);
    quip(
      won
        ? `All bugs squashed (${squashed.current}). You're hired… as QA. Nazar shield restored.`
        : `Nazar shield restored. Bugs squashed: ${squashed.current}. The rest went to production.`,
      { tone: "acid", ms: 4200 },
    );
  };

  const startInvasion = () => {
    squashed.current = 0;
    setInvasion(true);
    quip("⚠ NIMBU MIRCHI ANTIVIRUS DISABLED. Bugs incoming. Squash them!", { tone: "hot", ms: 3500 });
    const list: Bug[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 5 + Math.random() * 85,
      y: 15 + Math.random() * 70,
      dead: false,
    }));
    setBugs(list);
    timer.current = window.setTimeout(() => endInvasion(false), 12000);
  };

  const poke = () => {
    if (invasion) return;
    if (!prefersReducedMotion()) {
      charm.current?.animate(
        [{ transform: "rotate(0)" }, { transform: "rotate(28deg)" }, { transform: "rotate(-22deg)" }, { transform: "rotate(12deg)" }, { transform: "rotate(0)" }],
        { duration: 900, easing: "ease-out" },
      );
    }
    const n = pokes + 1;
    setPokes(n);
    if (n > POKES.length) startInvasion();
    else quip(POKES[n - 1], { tone: n === POKES.length ? "hot" : "acid" });
  };

  const squash = (id: number) => {
    squashed.current += 1;
    setBugs((b) => {
      const next = b.map((x) => (x.id === id ? { ...x, dead: true } : x));
      if (next.every((x) => x.dead)) window.setTimeout(() => endInvasion(true), 400);
      return next;
    });
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <div className="absolute right-3 top-full z-10 sm:right-6">
        <button
          type="button"
          onClick={poke}
          onMouseEnter={() => setTip(true)}
          onMouseLeave={() => setTip(false)}
          onFocus={() => setTip(true)}
          onBlur={() => setTip(false)}
          aria-label="Nimbu Mirchi Antivirus: protects this website from nazar. Poke it, if you dare."
          className="block origin-top animate-[nimbu-swing_3.2s_ease-in-out_infinite] focus-visible:outline-none"
        >
          <svg ref={charm} viewBox="-4 0 48 112" className="h-[92px] w-auto origin-top drop-shadow-[0_6px_8px_rgba(0,0,0,.45)] sm:h-[124px]" aria-hidden>
            <line x1="20" y1="0" x2="20" y2="70" stroke="#d9d2c0" strokeWidth="1.4" />
            {[-32, -16, 0, 16, 32].map((a, i) => (
              <g key={a} transform={`rotate(${a} 20 20)`}>
                <rect x="18.6" y="17" width="2.8" height="6" rx="1.2" fill="#2b6b1f" />
                <path d="M17 23 C 15.5 36, 18 50, 21 63 C 22.5 58, 25 40, 23.4 23 Z" fill={i === 2 ? "#d9381e" : "#2f9e44"} />
                <path d="M18.4 26 C 17.6 34, 18.6 42, 19.6 48" stroke="rgba(255,255,255,.35)" strokeWidth="1" fill="none" />
              </g>
            ))}
            <ellipse cx="20" cy="86" rx="13.5" ry="15.5" fill="#f5d90a" />
            <ellipse cx="20" cy="86" rx="13.5" ry="15.5" fill="url(#nm-shade)" />
            <ellipse cx="15" cy="80" rx="3.5" ry="5" fill="rgba(255,255,255,.55)" />
            <path d="M20 70 v3" stroke="#6b8e23" strokeWidth="2" />
            <defs>
              <radialGradient id="nm-shade" cx="35%" cy="30%" r="75%">
                <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(120,90,0,.45)" />
              </radialGradient>
            </defs>
          </svg>
        </button>

        {tip && (
          <div role="tooltip" className="absolute right-0 top-[calc(100%+6px)] w-60 rounded-lg border border-line bg-bg-elev/95 p-3 font-mono text-[11px] shadow-xl backdrop-blur">
            <p className="font-semibold text-acid">Nimbu Mirchi Antivirus™</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-ink-dim">
              <dt>Status</dt>
              <dd className={invasion ? "text-hot" : "text-acid"}>{invasion ? "DISABLED (you did this)" : "ACTIVE"}</dd>
              <dt>Nazar blocked</dt>
              <dd className="text-ink">∞</dd>
              <dt>Protecting</dt>
              <dd className="text-ink">production, since 2023</dd>
              <dt>Engine</dt>
              <dd className="text-ink">1 lemon, 5 chillies</dd>
            </dl>
            <p className="mt-2 text-ink-dim">Do not poke. Seriously.</p>
          </div>
        )}
      </div>

      {invasion &&
        createPortal(
        <div className="pointer-events-none fixed inset-0 z-[150]" aria-live="assertive">
          <p className="sr-only">Bug invasion! Squash the bugs.</p>
          {bugs.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => squash(b.id)}
              disabled={b.dead}
              aria-label="Squash bug"
              className="pointer-events-auto absolute text-3xl transition-transform"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                animation: b.dead ? "none" : `bug-crawl-${i % 3} ${4 + (i % 4)}s ease-in-out infinite alternate`,
                transform: b.dead ? "scale(1.4)" : undefined,
              }}
            >
              {b.dead ? "💥" : "🐛"}
            </button>
          ))}
          <p className="absolute left-1/2 top-14 -translate-x-1/2 rounded-full bg-hot px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg">
            BUG INVASION · squashed {bugs.filter((b) => b.dead).length}/{bugs.length}
          </p>
        </div>,
          document.body,
        )}
    </>
  );
}
