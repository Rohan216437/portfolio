"use client";

import Link from "next/link";
import { useOS } from "../context";
import { profile } from "@/content/profile";
import { gags } from "@/content/gags";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function WelcomeApp() {
  const { open } = useOS();
  return (
    <div className="flex h-full flex-col justify-between gap-6 p-6 @lg:p-8">
      <div>
        <p className="t-label text-ink-dim">welcome.app · v2.0.24 · Mumbai build</p>
        <p className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight @lg:text-5xl">
          Hi, I&apos;m {profile.firstName}
          <span className="text-acid">.</span>
        </p>
        <p className="mt-3 font-display text-base @lg:text-xl">
          <ScrambleText items={gags.hero.taglines} className="text-acid" />
        </p>
        <p className="mt-4 max-w-lg text-ink/85">{profile.shortIntro}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(e) => open("about", { origin: e.currentTarget })}
          className="rounded-full bg-acid px-4 py-2 font-mono text-xs font-semibold text-on-acid transition hover:-translate-y-0.5 hover:shadow-[var(--glow)]"
        >
          Who is this guy? →
        </button>
        <button
          type="button"
          onClick={(e) => open("projects", { origin: e.currentTarget })}
          className="rounded-full border border-line px-4 py-2 font-mono text-xs transition hover:border-acid hover:text-acid"
        >
          Show me the work
        </button>
        <button
          type="button"
          onClick={(e) => open("terminal", { origin: e.currentTarget })}
          className="rounded-full border border-line px-4 py-2 font-mono text-xs transition hover:border-acid hover:text-acid"
        >
          &gt;_ I&apos;m a developer too
        </button>
        <Link href="/boring" className="rounded-full border border-dashed border-line px-4 py-2 font-mono text-xs text-ink-dim transition hover:text-ink" data-cursor={gags.cursor.boring}>
          Boring Mode (recruiters in a hurry)
        </Link>
      </div>

      <ul className="grid gap-1 border-t border-line pt-4 font-mono text-[11px] text-ink-dim">
        <li>💡 Click any icon to open it. Windows can be dragged, resized and ignored.</li>
        <li>💡 The Terminal takes commands. Try <span className="text-acid">sudo hire rohan</span>.</li>
        <li>💡 Do not anger the Nimbu Mirchi. It is load-bearing.</li>
      </ul>
    </div>
  );
}
