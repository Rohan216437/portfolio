"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOS, type AppId } from "../context";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillGroups, statusLabel } from "@/content/skills";
import { toggleTheme } from "@/components/ui/ThemeToggle";

type Line = { kind: "in" | "out" | "err" | "ok"; text: string };

const APPS: Record<string, AppId> = {
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  contact: "contact",
  mail: "contact",
  bugs: "bugs",
  bin: "bugs",
  resume: "resume",
  welcome: "welcome",
};

const NIMBU = String.raw`
      |
     (🌶)
     (🌶)
     (🌶)
     (🍋)
  NAZAR SHIELD: ACTIVE
  bugs deflected: ∞`;

const BANNER = `RohanOS terminal — bash-ish 0.0.1 (Mumbai build)
Type 'help' for commands. Type 'sudo hire rohan' for the best command.`;

export function TerminalApp({ winId }: { winId: string }) {
  const { open, close } = useOS();
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: BANNER }]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [{ kind: "in", text: cmd }];
    const say = (text: string, kind: Line["kind"] = "out") => out.push({ kind, text });
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    switch (name?.toLowerCase()) {
      case "":
        break;
      case "help":
        say(
          [
            "whoami        who is this guy",
            "about         short bio",
            "skills        list running processes",
            "projects      list exhibits",
            "experience    career line",
            "contact       ways to reach him",
            "open <thing>  open an app or project (e.g. open mecard)",
            "ls / cat      poke around the file system",
            "theme         toggle light/dark",
            "boring        switch to Boring Mode",
            "nimbu         check nazar protection",
            "chai          refuel",
            "clear / exit  self-explanatory",
            "…and a few undocumented ones. It's a terminal, not a confession.",
          ].join("\n"),
        );
        break;
      case "whoami":
        say(`${profile.name.toLowerCase().replace(" ", "")} — ${profile.title} @ ${experience[0].short} (${experience[0].start} – present), ${profile.location}`);
        break;
      case "about":
        profile.intro.forEach((p) => say(p));
        break;
      case "skills":
        skillGroups.forEach((g) =>
          say(`${g.label.padEnd(14)} ${g.skills.map((s) => `${s.name}${s.status === "work" ? "*" : ""}`).join(", ")}`),
        );
        say(`* = ${statusLabel.work.legend.toLowerCase()}. No percentages. We're not animals.`);
        break;
      case "projects":
        projects.forEach((p) => say(`${p.index}  ${p.slug.padEnd(24)} ${p.status}`));
        say("try: open mecard");
        break;
      case "experience":
        say(`${experience[0].role} — ${experience[0].company}`);
        say(`${experience[0].start} → ${experience[0].end} · ${experience[0].location}`);
        say("PHP / CodeIgniter on MeCard since July 2024. Try: open experience");
        break;
      case "contact":
        say(profile.links.email ? `email: ${profile.links.email}` : "email: [ADD PROFESSIONAL EMAIL]");
        if (profile.links.linkedin) say(`linkedin: ${profile.links.linkedin}`);
        if (profile.links.github) say(`github: ${profile.links.github}`);
        say("or: open contact");
        break;
      case "open": {
        const target = arg.toLowerCase();
        const proj = projects.find((p) => p.slug === target || p.name.toLowerCase() === target || p.slug.startsWith(target));
        if (APPS[target]) {
          open(APPS[target]);
          say(`opening ${target}…`, "ok");
        } else if (proj && target) {
          open("case", { payload: proj.slug });
          say(`opening ${proj.name}…`, "ok");
        } else say(`open: '${arg}': no such app. Try: ${Object.keys(APPS).join(", ")}`, "err");
        break;
      }
      case "ls":
        say("about.txt  skills/  projects/  experience.map  contact.mail  resume.pdf  bin/  .secrets");
        break;
      case "cat":
        if (arg === ".secrets") say("The secret ingredient is console.log. Don't tell anyone.");
        else if (arg === "about.txt") profile.intro.forEach((p) => say(p));
        else if (arg === "resume.pdf") say("Binary file. Like my feelings. Try: open resume", "err");
        else say(`cat: ${arg || "(nothing)"}: No such file. Unlike my bugs, which definitely exist.`, "err");
        break;
      case "sudo":
        if (/hire\s+rohan/i.test(arg)) {
          say("[sudo] password for recruiter: ********", "out");
          say("Permission granted. Excellent decision. Opening mail…", "ok");
          open("contact");
        } else if (arg.startsWith("rm")) say("Nimbu Mirchi Antivirus™ blocked this. Nice try.", "err");
        else say("rohan is not in the sudoers file. This incident will be reported to HR.", "err");
        break;
      case "rm":
        say("rm: Nimbu Mirchi Antivirus™ has quarantined this command. Nazar averted.", "err");
        break;
      case "nimbu":
      case "mirchi":
        say(NIMBU, "ok");
        break;
      case "chai":
        say("Brewing cutting chai… ☕ done. Productivity +40% [citation needed]", "ok");
        break;
      case "coffee":
        say("Error 418: I'm a teapot. Try 'chai'.", "err");
        break;
      case "git":
        if (args[0] === "blame") say("It was the intern. There is no intern.", "err");
        else if (args[0] === "push" && args.includes("--force")) say("Bold. The Nimbu Mirchi just turned slightly darker.", "err");
        else say("git: on branch main. Nothing to commit, working tree clean (for once).");
        break;
      case "theme":
        say(`theme → ${toggleTheme(undefined, undefined, true)}`, "ok");
        break;
      case "boring":
        say("Fine. Loading the spreadsheet version…", "ok");
        window.setTimeout(() => router.push("/boring"), 500);
        break;
      case "date":
        say(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST — a great time to hire someone");
        break;
      case "echo":
        say(arg);
        break;
      case "hello":
      case "hi":
        say("Hi! 👋 You're talking to a terminal. Healthy.");
        break;
      case "exit":
        close(winId);
        break;
      case "clear":
        setLines([]);
        return;
      default:
        say(`command not found: ${name}. Did you mean 'sudo hire rohan'?`, "err");
    }
    setLines((l) => [...l, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) history.current.unshift(value);
      hIdx.current = -1;
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      hIdx.current = Math.min(history.current.length - 1, hIdx.current + 1);
      setValue(history.current[hIdx.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIdx.current = Math.max(-1, hIdx.current - 1);
      setValue(hIdx.current < 0 ? "" : history.current[hIdx.current]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const color = { in: "text-ink", out: "text-ink/80", err: "text-hot", ok: "text-acid" } as const;

  return (
    <div className="min-h-full bg-[#06060a] p-4 font-mono text-[13px] leading-relaxed text-[#edebff] light:bg-[#14131a]" onClick={() => input.current?.focus()}>
      <div role="log" aria-live="polite">
        {lines.map((l, i) => (
          <pre key={i} className={`whitespace-pre-wrap break-words ${l.kind === "in" ? "text-[#edebff]" : ""} ${l.kind !== "in" ? color[l.kind] : ""} ${l.kind === "out" ? "text-[#edebff]/75" : ""}`}>
            {l.kind === "in" ? (
              <>
                <span className="text-[#c6ff3d]">rohan@os</span>
                <span className="text-[#8b89a6]">:~$ </span>
                {l.text}
              </>
            ) : (
              l.text
            )}
          </pre>
        ))}
      </div>
      <div ref={end} className="flex items-center">
        <span className="text-[#c6ff3d]">rohan@os</span>
        <span className="text-[#8b89a6]">:~$&nbsp;</span>
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-[#edebff] caret-[#c6ff3d] outline-none focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
