import type { Project } from "@/content/projects";
import { ProjectArt } from "./ProjectArt";

const accentText = { acid: "text-acid", hot: "text-hot", volt: "text-volt" } as const;
const accentBg = { acid: "bg-acid", hot: "bg-hot", volt: "bg-volt" } as const;

/** Case-study content. Hook-free so it renders in the /work route and in a RohanOS window. */
export function CaseStudyBody({ project: p, headingLevel = 1 }: { project: Project; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const Sub = headingLevel === 1 ? "h2" : "h3";
  return (
    <article>
      <header>
        <p className={`t-label ${accentText[p.accent]}`}>
          Exhibit {p.index} · {p.category}
        </p>
        <H className="t-huge mt-4">{p.name}</H>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink/90">{p.summary}</p>
        <p className="mt-4 max-w-2xl font-mono text-sm italic text-ink-dim">“{p.caption}”</p>
      </header>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-bg-elev">
        <ProjectArt slug={p.slug} className="aspect-[16/8] w-full" />
      </div>

      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Status", p.status],
          ["Timeline", p.year],
          ["Code", p.repo.label],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line p-4">
            <dt className="t-label text-ink-dim">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-12">
          {p.sections.map((s) => (
            <section key={s.heading}>
              <Sub className="t-title">{s.heading}</Sub>
              {s.body && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-4 max-w-2xl space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-lg text-ink/90">
                      <span aria-hidden className={`mt-3 h-0.5 w-4 shrink-0 ${accentBg[p.accent]}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <Sub className="t-label text-ink-dim">Stack</Sub>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Sub className="t-label text-ink-dim">My contributions</Sub>
            <ul className="mt-3 space-y-1.5 text-sm">
              {p.contributions.map((c) => (
                <li key={c}>
                  <span className={accentText[p.accent]}>▸</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-xl border border-dashed border-line p-4 font-mono text-xs text-ink-dim">
            Placard: <span className="text-ink">{p.medium}</span>
          </p>
        </aside>
      </div>
    </article>
  );
}
