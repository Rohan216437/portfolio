/**
 * Illustrated stand-ins for project screenshots (MeCard is proprietary,
 * so we show stylised mock-ups, not real UI). Colours come from theme tokens.
 */
export function ProjectArt({ slug, className = "" }: { slug: string; className?: string }) {
  const common = { viewBox: "0 0 800 400", className, role: "img" as const, preserveAspectRatio: "xMidYMid slice" };

  if (slug === "mecard") {
    return (
      <svg {...common} aria-label="Illustration: a digital business card with a QR code on a phone, in front of an admin dashboard">
        <rect width="800" height="400" className="fill-bg-deep" />
        <g className="stroke-line" strokeWidth="1">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="400" />
          ))}
        </g>
        {/* dashboard */}
        <rect x="300" y="60" width="440" height="280" rx="14" className="fill-bg-elev stroke-line" strokeWidth="2" />
        <rect x="300" y="60" width="440" height="34" rx="14" className="fill-bg stroke-line" strokeWidth="2" />
        <circle cx="320" cy="77" r="5" className="fill-hot" />
        <circle cx="338" cy="77" r="5" className="fill-acid" />
        <circle cx="356" cy="77" r="5" className="fill-volt" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={540 + i * 36} y={300 - [60, 110, 80, 150, 125][i]} width="24" height={[60, 110, 80, 150, 125][i]} rx="4" className={i === 3 ? "fill-acid" : "fill-line"} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="330" y={118 + i * 46} width="170" height="32" rx="6" className="fill-bg stroke-line" />
            <circle cx="348" cy={134 + i * 46} r="8" className={i === 1 ? "fill-hot" : "fill-line"} />
            <rect x="364" y={130 + i * 46} width={[100, 80, 120, 70][i]} height="8" rx="4" className="fill-ink-dim" opacity=".5" />
          </g>
        ))}
        {/* phone */}
        <g transform="rotate(-8 170 210)">
          <rect x="90" y="40" width="170" height="330" rx="26" className="fill-bg stroke-ink" strokeWidth="3" />
          <rect x="108" y="70" width="134" height="80" rx="10" className="fill-acid" />
          <circle cx="135" cy="110" r="18" className="fill-bg" />
          <rect x="160" y="96" width="66" height="9" rx="4" className="fill-bg" />
          <rect x="160" y="114" width="44" height="7" rx="3" className="fill-bg" opacity=".6" />
          {/* QR */}
          <g transform="translate(125 175)">
            <rect width="100" height="100" rx="6" className="fill-ink" />
            {Array.from({ length: 49 }, (_, i) => {
              const x = i % 7;
              const y = Math.floor(i / 7);
              const on = (x * 7 + y * 3 + x * y) % 3 === 0;
              return on ? <rect key={i} x={8 + x * 12} y={8 + y * 12} width="10" height="10" className="fill-bg" /> : null;
            })}
            <rect x="8" y="8" width="26" height="26" className="fill-bg" />
            <rect x="14" y="14" width="14" height="14" className="fill-ink" />
          </g>
          <rect x="125" y="300" width="100" height="26" rx="13" className="fill-hot" />
        </g>
      </svg>
    );
  }

  if (slug === "ai-learning-companion") {
    const pts = Array.from({ length: 34 }, (_, i) => ({
      x: 470 + ((i * 97) % 280),
      y: 50 + ((i * 59) % 300),
      hot: i % 7 === 0,
    }));
    return (
      <svg {...common} aria-label="Illustration: a chat conversation connected to a cloud of vector points">
        <rect width="800" height="400" className="fill-bg-deep" />
        {pts.map((p, i) =>
          i % 3 === 0 && pts[i + 1] ? (
            <line key={`l${i}`} x1={p.x} y1={p.y} x2={pts[i + 1].x} y2={pts[i + 1].y} className="stroke-line" strokeWidth="1.5" />
          ) : null,
        )}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.hot ? 7 : 4} className={p.hot ? "fill-volt" : "fill-ink-dim"} opacity={p.hot ? 1 : 0.6} />
        ))}
        <path d="M330 200 C 400 200, 420 120, 520 110" className="stroke-volt" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M330 220 C 420 230, 430 300, 540 290" className="stroke-volt" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        {/* chat */}
        <rect x="60" y="60" width="270" height="280" rx="18" className="fill-bg-elev stroke-line" strokeWidth="2" />
        <rect x="80" y="86" width="170" height="44" rx="14" className="fill-bg stroke-line" />
        <rect x="96" y="102" width="120" height="10" rx="5" className="fill-ink-dim" opacity=".6" />
        <rect x="130" y="146" width="180" height="70" rx="14" className="fill-volt" />
        <rect x="146" y="164" width="140" height="9" rx="4" className="fill-bg" />
        <rect x="146" y="182" width="110" height="9" rx="4" className="fill-bg" opacity=".7" />
        <rect x="80" y="232" width="150" height="44" rx="14" className="fill-bg stroke-line" />
        <circle cx="104" cy="254" r="5" className="fill-ink-dim" />
        <circle cx="122" cy="254" r="5" className="fill-ink-dim" opacity=".6" />
        <circle cx="140" cy="254" r="5" className="fill-ink-dim" opacity=".3" />
        <rect x="80" y="296" width="230" height="28" rx="14" className="fill-bg stroke-line" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="Illustration: a browser window with an automated cursor clicking through checked test cases">
      <rect width="800" height="400" className="fill-bg-deep" />
      <rect x="120" y="40" width="560" height="320" rx="16" className="fill-bg-elev stroke-line" strokeWidth="2" />
      <rect x="120" y="40" width="560" height="38" rx="16" className="fill-bg stroke-line" strokeWidth="2" />
      <rect x="220" y="51" width="360" height="16" rx="8" className="fill-bg-elev" />
      {["login", "permissions", "admin", "roles", "logout"].map((t, i) => (
        <g key={t} transform={`translate(160 ${104 + i * 48})`}>
          <rect width="300" height="34" rx="8" className="fill-bg stroke-line" />
          <rect x="10" y="9" width="16" height="16" rx="4" className={i < 4 ? "fill-acid" : "stroke-ink-dim fill-none"} strokeWidth="2" />
          {i < 4 && <path d="M13 17l4 4 7-8" className="stroke-bg" strokeWidth="2.5" fill="none" />}
          <text x="40" y="22" className="fill-ink font-mono" fontSize="13">
            test: {t}
          </text>
          <text x="250" y="22" className={`${i < 4 ? "fill-acid" : "fill-hot"} font-mono`} fontSize="12">
            {i < 4 ? "PASS" : "…"}
          </text>
        </g>
      ))}
      <rect x="500" y="104" width="150" height="226" rx="10" className="fill-bg stroke-line" />
      <text x="516" y="130" className="fill-ink-dim font-mono" fontSize="11">clicks saved</text>
      <text x="516" y="170" className="fill-hot font-display" fontSize="34" fontWeight="700">∞</text>
      <path d="M585 300 l0 -34 l26 24 l-12 1 l8 16 l-6 3 l-8 -16 z" className="fill-ink stroke-bg" strokeWidth="2" />
    </svg>
  );
}
