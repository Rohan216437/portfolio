"use client";

import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { gags } from "@/content/gags";

const Cite = ({ kind = "citation needed" }: { kind?: string }) => (
  <sup className="whitespace-nowrap font-sans text-[0.7em] text-volt">[<i>{kind}</i>]</sup>
);

/** A parody encyclopedia article. Every fact is real; every compliment is cited as needed. */
export function AboutApp() {
  const job = experience[0];
  return (
    <article className="p-5 @lg:p-8">
      <header className="border-b border-line pb-3">
        <h2 className="font-serif text-3xl tracking-tight @lg:text-4xl">{profile.name}</h2>
        <p className="mt-1 text-xs text-ink-dim">From Wikipedia-ish, the free encyclopedia (edited exclusively by {profile.firstName})</p>
      </header>

      <div className="mt-5 flex flex-col gap-6 @2xl:flex-row">
        <div className="flex-1 space-y-4 font-serif text-[15px] leading-relaxed @lg:text-base">
          <p>
            <b>{profile.name}</b> is a software development engineer based in {profile.location}, working on enterprise web applications, backend
            systems, databases and API integrations — and is widely regarded as a pretty decent debugger.
            <Cite />
          </p>
          <p>
            Since {job.start} he has worked at {job.company} ({job.short}), where he primarily works on <b>MeCard</b>, an enterprise digital business
            card platform, using PHP, CodeIgniter, MySQL and JavaScript. He handles the full lifecycle — requirements, database design, backend,
            frontend, testing and debugging — which he calls &ldquo;full-stack&rdquo; and his relatives call &ldquo;computer stuff&rdquo;.
            <Cite />
          </p>
          <p>
            He is currently exploring artificial intelligence, locally hosted language models and RAG, mostly so there is someone to talk to at
            2&nbsp;AM.
            <Cite />
          </p>
          <h3 className="pt-2 font-serif text-xl">Personal life</h3>
          <p>
            He enjoys learning by building, experimenting with new technologies and solving complicated problems. He has never once said &ldquo;it
            works on my machine&rdquo;.
            <Cite kind="dubious – discuss" />
          </p>
          <h3 className="pt-2 font-serif text-xl">Superstitions</h3>
          <p>
            Devout follower of the Nimbu Mirchi, which he credits for every successful production deployment.
            <Cite />
          </p>
        </div>

        <aside className="w-full shrink-0 self-start rounded-lg border border-line bg-bg p-3 text-xs @2xl:w-56">
          <div className="grid aspect-square place-items-center overflow-hidden rounded-md bg-bg-deep text-center" data-cursor={gags.cursor.photo} tabIndex={0} aria-label={gags.cursor.photo}>
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={`Photo of ${profile.name}`} className="h-full w-full object-cover" />
            ) : (
              <span className="p-3 font-mono text-[10px] text-hot">
                [ADD PHOTO]
                <br />
                (yes, it will really be him)
              </span>
            )}
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
            <dt className="font-semibold">Occupation</dt>
            <dd>{profile.title}</dd>
            <dt className="font-semibold">Employer</dt>
            <dd>
              {job.short} (since {job.start})
            </dd>
            <dt className="font-semibold">Based in</dt>
            <dd>{profile.location}</dd>
            <dt className="font-semibold">Known for</dt>
            <dd>MeCard; fixing bugs he definitely didn&apos;t write</dd>
            <dt className="font-semibold">Traits</dt>
            <dd>{profile.traits.join(", ")}</dd>
            <dt className="font-semibold">Habitat</dt>
            <dd className="font-mono">localhost:3000</dd>
          </dl>
        </aside>
      </div>
    </article>
  );
}
