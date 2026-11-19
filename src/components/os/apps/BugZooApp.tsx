/** The Recycle Bin, a.k.a. the Bug Zoo: a field guide to bugs every developer has met. */
const specimens = [
  { name: "The Heisenbug", habitat: "Production", note: "Vanishes the moment you add a console.log. Returns when you remove it." },
  { name: "Works-On-My-Machine", habitat: "Localhost", note: "Perfectly healthy in captivity. Dies instantly in the wild." },
  { name: "The Off-By-One", habitat: "Every for-loop ever", note: "There are two hard problems in CS: naming things, cache invalidation and off-by-one errors." },
  { name: "The Cache Ghost", habitat: "Browsers", note: "Fixed three hours ago. Still visible until Ctrl+Shift+R performs an exorcism." },
  { name: "The Friday Deploy", habitat: "Release pipelines, 5:58 PM", note: "Harmless-looking. Ruins weekends. Nimbu Mirchi strongly advised." },
  { name: "The Timezone Gremlin", habitat: "Date columns", note: "Reports run fine — except between 12:00 and 5:30 AM IST." },
  { name: "The Session Ninja", habitat: "Auth flows", note: "Logs you out mid-sentence. Leaves no trace in the logs." },
  { name: "The Excel Export Phantom", habitat: "MIS reports", note: "Exports perfectly. Opens as one cell containing the entire universe." },
  { name: "The Semicolon Assassin", habitat: "PHP", note: "Small. Silent. Takes the whole page down with it." },
];

export function BugZooApp() {
  return (
    <div className="p-5 @lg:p-8">
      <p className="t-label text-hot">Recycle Bin · {specimens.length} items · cannot be emptied (we tried)</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight @lg:text-4xl">
        The Bug <span className="text-hot">Zoo</span>
      </h2>
      <p className="mt-2 max-w-xl text-sm text-ink-dim">A field guide to the creatures every developer has met. Please do not tap on the glass.</p>
      <ul className="mt-6 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
        {specimens.map((s, i) => (
          <li
            key={s.name}
            className="rounded-2xl border border-line bg-bg p-5 transition hover:-rotate-1 hover:border-hot"
            style={{ animation: `os-row-in .45s ${i * 50}ms both` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Specimen #{String(i + 1).padStart(3, "0")}</p>
            <h3 className="mt-2 font-display text-base font-semibold">🐛 {s.name}</h3>
            <p className="mt-1 font-mono text-xs text-hot">Habitat: {s.habitat}</p>
            <p className="mt-3 text-sm text-ink/90">{s.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
