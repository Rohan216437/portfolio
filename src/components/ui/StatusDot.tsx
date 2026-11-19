import type { SkillStatus } from "@/content/skills";

const color: Record<SkillStatus, string> = {
  work: "bg-acid",
  personal: "bg-volt",
  loaded: "border border-ink-dim bg-transparent",
};

export function StatusDot({ status, className = "" }: { status: SkillStatus; className?: string }) {
  return <span aria-hidden className={`inline-block size-2 shrink-0 rounded-full ${color[status]} ${className}`} />;
}
