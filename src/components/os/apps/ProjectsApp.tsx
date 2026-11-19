"use client";

import Link from "next/link";
import { useOS } from "../context";
import { projects, additionalWork } from "@/content/projects";
import { ProjectArt } from "@/components/work/ProjectArt";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";

const text = { acid: "text-acid", hot: "text-hot", volt: "text-volt" } as const;
const ring = { acid: "group-hover:ring-acid", hot: "group-hover:ring-hot", volt: "group-hover:ring-volt" } as const;

/** Finder-style folder of projects. Each "file" opens its case study in its own window. */
export function ProjectsApp() {
  const { open } = useOS();
  return (
    <div className="p-4 @lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[11px] text-ink-dim">
        <span>~/projects · {projects.length} items · 0 abandoned side projects shown (out of respect)</span>
      </div>
      <ul className="grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={(e) => open("case", { payload: p.slug, origin: e.currentTarget })}
              className="group block w-full text-left"
              data-cursor="Open exhibit"
              aria-label={`Open case study: ${p.name}`}
            >
              <span className={`block overflow-hidden rounded-lg border border-line bg-bg-deep ring-2 ring-transparent transition group-hover:-translate-y-1 ${ring[p.accent]}`}>
                <ProjectArt slug={p.slug} className="aspect-[16/10] w-full transition duration-500 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-2">
                <span className="font-display text-base font-semibold">{p.name}</span>
                <span className={`font-mono text-[10px] ${text[p.accent]}`}>{p.index}</span>
              </span>
              <span className="mt-0.5 block font-mono text-[10px] text-ink-dim">
                {p.category} · {p.status}
              </span>
              <span className="mt-2 block text-[13px] italic leading-snug text-ink/80">“{p.caption}”</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-ink-dim">Also: {additionalWork.join(", ")}.</p>
    </div>
  );
}

export function CaseApp({ slug }: { slug: string }) {
  const { open } = useOS();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <p className="p-6 font-mono text-sm">404: exhibit stolen.</p>;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <div className="p-5 @lg:p-10">
      <CaseStudyBody project={p} headingLevel={2} />
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button type="button" onClick={(e) => open("case", { payload: next.slug, origin: e.currentTarget })} className="font-display text-xl font-semibold transition hover:text-acid">
          Next: {next.name} →
        </button>
        <Link href={`/work/${p.slug}`} className="font-mono text-xs text-ink-dim underline-offset-4 hover:text-ink hover:underline">
          Open as a full page ↗
        </Link>
      </div>
    </div>
  );
}
