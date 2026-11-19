"use client";

import { useState } from "react";
import { gags } from "@/content/gags";
import { profile } from "@/content/profile";

type State = "idle" | "sending" | "sent" | "error";

/** Working contact form. `fun` swaps the button copy for the joke version. */
export function ContactForm({ fun = false }: { fun?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-bg/60 px-4 py-3 text-ink placeholder:text-ink-dim/70 outline-none transition focus:border-acid focus:shadow-[var(--glow)]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="t-label text-ink-dim">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="grid gap-1.5">
          <span className="t-label text-ink-dim">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="t-label text-ink-dim">Subject</span>
        <input name="subject" required maxLength={150} className={field} placeholder={fun ? "We'd like to hire you (please)" : "Subject"} />
      </label>
      <label className="grid gap-1.5">
        <span className="t-label text-ink-dim">Message</span>
        <textarea name="message" required rows={4} maxLength={5000} className={`${field} resize-y`} placeholder="Say hi, share an opportunity, or report a bug in my personality." />
      </label>
      {/* Honeypot — bots fill this, humans never see it */}
      <input name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor={fun ? "Do it. I dare you." : undefined}
          className="rounded-full bg-acid px-6 py-3 font-mono text-sm font-semibold text-on-acid transition hover:-translate-y-0.5 hover:shadow-[var(--glow)] disabled:opacity-60"
        >
          {state === "sending" ? gags.contact.sending : fun ? gags.contact.send : "Send message"}
        </button>
        <p role="status" className="font-mono text-sm">
          {state === "sent" && <span className="text-acid">{fun ? gags.contact.sent : "Thanks — your message was sent."}</span>}
          {state === "error" && (
            <span className="text-hot">
              {fun ? gags.contact.error : error}
              {profile.links.email && (
                <>
                  {" "}
                  <a className="underline" href={`mailto:${profile.links.email}`}>
                    {profile.links.email}
                  </a>
                </>
              )}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
