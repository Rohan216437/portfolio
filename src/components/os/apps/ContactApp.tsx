"use client";

import { gags } from "@/content/gags";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/ui/ContactForm";
import { ProfileLinks } from "@/components/ui/ProfileLinks";

export function ContactApp() {
  return (
    <div className="p-5 @lg:p-7">
      <div className="mb-5 space-y-1 border-b border-line pb-4 font-mono text-xs">
        <p>
          <span className="text-ink-dim">To:</span> {profile.name} &lt;the-inbox-that-actually-gets-read&gt;
        </p>
        <p>
          <span className="text-ink-dim">From:</span> you, a person of excellent taste
        </p>
        <p className="text-ink-dim">Priority: ‼ (please)</p>
      </div>
      <p className="mb-1 font-display text-lg font-semibold">Congratulations.</p>
      <p className="mb-5 text-sm text-ink-dim">You found the mail app. That&apos;s further than most people read terms and conditions.</p>
      <ContactForm fun />
      <div className="mt-6 border-t border-line pt-4">
        <p className="mb-3 font-mono text-[11px] text-ink-dim">Or, the old-fashioned way:</p>
        <ProfileLinks />
      </div>
    </div>
  );
}

export function ResumeApp() {
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <div>
        <p className="text-5xl">📄</p>
        <p className="mt-4 font-display text-xl font-semibold">resume.pdf</p>
        <p className="mt-2 max-w-sm text-sm text-ink-dim">{gags.cursor.resume} Same facts as this whole OS, but in Times New Roman energy.</p>
        <div className="mt-5 flex justify-center">
          {profile.links.resume ? (
            <a href={profile.links.resume} download className="rounded-full bg-acid px-5 py-2 font-mono text-xs font-semibold text-on-acid">
              Download anyway
            </a>
          ) : (
            <span className="rounded-full border border-dashed border-hot px-4 py-2 font-mono text-xs text-hot">[ADD RESUME PDF]</span>
          )}
        </div>
        <a href="/boring" className="mt-4 inline-block font-mono text-xs text-ink-dim underline underline-offset-4 hover:text-ink">
          or read the web version (Boring Mode)
        </a>
      </div>
    </div>
  );
}
