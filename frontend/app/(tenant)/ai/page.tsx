'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// ── Data ──────────────────────────────────────────────────────────────────────
const KPI_CARDS = [
  { label: 'Voter Support Trend', value: '+18%', icon: '✨' },
  { label: 'Turnout Prediction',  value: '68%',  icon: '🏃' },
  { label: 'Canvass Efficiency',  value: '92%',  icon: '⚙️' },
  { label: 'Fundraising ROI',     value: '3.4x', icon: '🎯' },
];

const BAR_DATA: { n: string; v: number; glow: boolean; badge?: string }[] = [
  { n: 'Fan', v: 75,  glow: false },
  { n: 'Fop', v: 155, glow: true  },
  { n: 'Cec', v: 182, glow: true,  badge: '+199%' },
  { n: 'Aal', v: 158, glow: true  },
  { n: 'Jul', v: 152, glow: true  },
  { n: 'Jun', v: 62,  glow: false },
  { n: 'Spr', v: 168, glow: true,  badge: '+330%' },
  { n: 'Spp', v: 118, glow: true  },
  { n: 'Nan', v: 12,  glow: false },
];

const DONUT_DATA = [
  { value: 62, color: '#DC2626' },
  { value: 24, color: '#F59E0B' },
  { value: 14, color: '#1a1f30' },
];

// ── Support Over Time — Custom SVG ─────────────────────────────────────────────
function SupportChart() {
  // Layout
  const W = 540, H = 230;
  const lM = 42, rM = 12, tM = 16, bM = 36;
  const cW = W - lM - rM;   // chart width  = 486
  const cH = H - tM - bM;   // chart height = 178
  const maxY = 400;

  // Data: [Moet, Mery, Juun, Moue, Seolimy]
  const pts = [
    { x: 0,    v: 68  },
    { x: 0.25, v: 130 },
    { x: 0.5,  v: 80  },
    { x: 0.75, v: 108 },
    { x: 1,    v: 282 },
  ];

  const toSvg = (px: number, pv: number) => ({
    sx: lM + px * cW,
    sy: tM + cH - (pv / maxY) * cH,
  });

  const svgPts = pts.map(p => toSvg(p.x, p.v));

  // Build smooth bezier path
  const cubicPath = (pts: {sx:number;sy:number}[]) => {
    let d = `M${pts[0].sx.toFixed(1)},${pts[0].sy.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], c = pts[i];
      const dx = (c.sx - p.sx) / 3;
      d += ` C${(p.sx+dx).toFixed(1)},${p.sy.toFixed(1)} ${(c.sx-dx).toFixed(1)},${c.sy.toFixed(1)} ${c.sx.toFixed(1)},${c.sy.toFixed(1)}`;
    }
    return d;
  };

  const line = cubicPath(svgPts);
  const area = line
    + ` L${svgPts[svgPts.length-1].sx.toFixed(1)},${(tM+cH).toFixed(1)}`
    + ` L${svgPts[0].sx.toFixed(1)},${(tM+cH).toFixed(1)} Z`;

  const yGridVals = [400, 200, 100, 50, 0];
  const xLabels   = ['Moet', 'Mery', 'Juun', 'Moue', 'Seolimy'];

  // Peak points
  const mery    = svgPts[1]; // red glow
  const seolimy = svgPts[4]; // gold glow + badge

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        {/* Horizontal gradient: red → coral → gold */}
        <linearGradient id="sg_line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C41E1E" />
          <stop offset="45%"  stopColor="#CC3322" />
          <stop offset="75%"  stopColor="#E87820" />
          <stop offset="100%" stopColor="#F5C518" />
        </linearGradient>
        {/* Area fill */}
        <linearGradient id="sg_area" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C41E1E" stopOpacity="0.32" />
          <stop offset="55%"  stopColor="#CC4422" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#F5C518" stopOpacity="0.12" />
        </linearGradient>
        {/* Red radial bloom */}
        <radialGradient id="sg_redBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FF1010" stopOpacity="0.72" />
          <stop offset="45%"  stopColor="#CC0000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#880000" stopOpacity="0" />
        </radialGradient>
        {/* Gold radial bloom */}
        <radialGradient id="sg_goldBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFEE44" stopOpacity="0.92" />
          <stop offset="38%"  stopColor="#FFB800" stopOpacity="0.58" />
          <stop offset="75%"  stopColor="#FF6600" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FF2200" stopOpacity="0" />
        </radialGradient>
        {/* Glow blur filter for line */}
        <filter id="sg_lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Y-axis grid + labels */}
      {yGridVals.map(yv => {
        const sy = tM + cH - (yv / maxY) * cH;
        return (
          <g key={yv}>
            <line x1={lM} y1={sy} x2={W - rM} y2={sy}
              stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeDasharray="3,4" />
            <text x={lM - 5} y={sy + 4} textAnchor="end"
              fontSize="10" fill="#4B5563" fontFamily="Inter, sans-serif">{yv}</text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {xLabels.map((label, i) => (
        <text key={label}
          x={svgPts[i].sx} y={H - 6}
          textAnchor="middle" fontSize="10" fill="#4B5563" fontFamily="Inter, sans-serif"
        >{label}</text>
      ))}

      {/* Area fill under line */}
      <path d={area} fill="url(#sg_area)" />

      {/* Red bloom at Mery peak */}
      <ellipse cx={mery.sx} cy={mery.sy} rx={58} ry={48} fill="url(#sg_redBloom)" />

      {/* Gold bloom at Seolimy peak */}
      <ellipse cx={seolimy.sx} cy={seolimy.sy + 22} rx={65} ry={65} fill="url(#sg_goldBloom)" />

      {/* Line — blurred glow pass */}
      <path d={line} fill="none" stroke="url(#sg_line)"
        strokeWidth={6} strokeLinecap="round" strokeLinejoin="round"
        filter="url(#sg_lineGlow)" opacity="0.45" />

      {/* Line — crisp top pass */}
      <path d={line} fill="none" stroke="url(#sg_line)"
        strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />

      {/* Glowing dot at Seolimy */}
      <circle cx={seolimy.sx} cy={seolimy.sy} r={9}
        fill="#FFE840" filter="url(#sg_lineGlow)" />
      <circle cx={seolimy.sx} cy={seolimy.sy} r={5} fill="white" />

      {/* +0F12% badge */}
      <rect
        x={seolimy.sx - 30} y={seolimy.sy - 36}
        width={60} height={20} rx={5}
        fill="rgba(20,26,46,0.92)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"
      />
      <text x={seolimy.sx} y={seolimy.sy - 22}
        textAnchor="middle" fontSize="11" fill="#FFFFFF"
        fontWeight="700" fontFamily="Inter, sans-serif">+0F12%</text>
    </svg>
  );
}

// ── Glowing Bar Chart — Custom SVG ─────────────────────────────────────────────
function GlowBarChart() {
  const data = BAR_DATA;
  const maxV = 200;
  const vH   = 155;  // chart area height
  const lM   = 36;   // left margin for y-axis labels
  const barW = 28;
  const n    = data.length;
  const totalBarW = n * barW;
  const chartAreaW = 330;
  const gap  = (chartAreaW - totalBarW) / (n - 1);  // ~12.75
  const svgW = lM + chartAreaW + 12;
  const svgH = vH + 32;

  const yLabels = [200, 150, 100, 50, 0];

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="bg_barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FF5555" />
          <stop offset="50%"  stopColor="#CC1111" />
          <stop offset="100%" stopColor="#7A0000" />
        </linearGradient>
        <filter id="bg_glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bg_softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Y-axis grid lines + labels */}
      {yLabels.map(yv => {
        const sy = vH - (yv / maxV) * vH;
        return (
          <g key={yv}>
            <line x1={lM} y1={sy} x2={svgW - 8} y2={sy}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x={lM - 5} y={sy + 4} textAnchor="end"
              fontSize="9" fill="#4B5563" fontFamily="Inter, sans-serif">{yv}</text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const rawH = (Math.min(d.v, maxV * 1.1) / maxV) * vH;
        const barH = Math.max(rawH, 4);
        const bx = lM + i * (barW + gap);
        const by = vH - barH;

        return (
          <g key={`${d.n}-${i}`}>
            {/* Outer red glow halo */}
            {d.glow && (
              <rect
                x={bx - 5} y={by - 10}
                width={barW + 10} height={barH + 10}
                rx={5}
                fill="#CC0000" fillOpacity="0.28"
                filter="url(#bg_glow)"
              />
            )}
            {/* Bar body */}
            <rect
              x={bx} y={by}
              width={barW} height={barH}
              rx={3}
              fill={d.glow ? 'url(#bg_barGrad)' : '#252c3e'}
            />
            {/* Badge */}
            {d.badge && (
              <g>
                <rect
                  x={bx - 10} y={by - 24}
                  width={barW + 20} height={18}
                  rx={5}
                  fill="rgba(15,18,32,0.96)"
                  stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"
                />
                <text
                  x={bx + barW / 2} y={by - 11}
                  textAnchor="middle" fontSize="10"
                  fill="white" fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >{d.badge}</text>
              </g>
            )}
            {/* X label */}
            <text
              x={bx + barW / 2} y={vH + 16}
              textAnchor="middle" fontSize="9"
              fill="#4B5563" fontFamily="Inter, sans-serif"
            >{d.n}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── St. Kitts & Nevis SVG Map ─────────────────────────────────────────────────
function SKNMap() {
  return (
    <svg viewBox="0 0 220 165" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Background */}
      <rect width="220" height="165" fill="#0D1120" rx="6" />

      {/* ── ST. KITTS island — NW-SE elongated shape ── */}
      {/* Northwest tip constituency */}
      <path d="M16,52 Q26,38 44,38 Q50,50 44,64 Q32,68 18,60 Z" fill="#991B1B" />
      {/* Sandy Point constituency */}
      <path d="M44,38 Q60,30 76,32 Q80,46 72,58 Q58,62 50,52 Z" fill="#DC2626" />
      {/* Middle Island constituency */}
      <path d="M76,32 Q92,28 106,32 Q108,48 98,58 Q84,62 80,48 Z" fill="#B91C1C" />
      {/* Palmetto Point constituency */}
      <path d="M106,32 Q120,30 132,38 Q132,54 120,62 Q108,62 108,50 Z" fill="#EF4444" />
      {/* Cayon constituency */}
      <path d="M44,64 Q58,62 72,58 Q74,74 66,84 Q52,88 42,78 Z" fill="#DC2626" />
      {/* Basseterre area */}
      <path d="M72,58 Q86,56 100,58 Q100,74 90,84 Q76,86 74,72 Z" fill="#7F1D1D" />
      {/* St. Peter constituency */}
      <path d="M100,58 Q114,56 126,62 Q124,78 112,86 Q100,86 100,72 Z" fill="#B91C1C" />
      {/* Figtree constituency */}
      <path d="M66,84 Q80,84 94,88 Q90,106 78,114 Q62,114 58,98 Z" fill="#FCA5A5" />
      {/* Capesterre constituency */}
      <path d="M94,88 Q108,86 120,90 Q118,108 106,116 Q94,116 92,104 Z" fill="#EF4444" />

      {/* Island outline */}
      <path d="M16,52 Q26,38 44,38 Q60,30 76,32 Q92,28 106,32 Q120,30 132,38 Q132,54 120,62 Q124,78 112,86 Q120,90 118,108 Q106,116 94,116 Q92,104 90,106 Q78,114 62,114 Q58,98 58,98 Q42,78 44,64 Z"
        fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Constituency dividers */}
      <line x1="44" y1="38" x2="44" y2="64" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="76" y1="32" x2="74" y2="58" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="106" y1="32" x2="100" y2="58" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="44" y1="64" x2="44" y2="78" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="72" y1="58" x2="72" y2="84" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="100" y1="58" x2="100" y2="86" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
      <line x1="66" y1="84" x2="90" y2="88" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />

      {/* ── NEVIS island — smaller circular island SE ── */}
      <ellipse cx="168" cy="118" rx="26" ry="24" fill="#DC2626" />
      <ellipse cx="160" cy="113" rx="12" ry="11" fill="#EF4444" />
      <ellipse cx="176" cy="112" rx="10" ry="10" fill="#991B1B" />
      <ellipse cx="167" cy="125" rx="10" ry="9"  fill="#FCA5A5" />
      <ellipse cx="172" cy="106" rx="9"  ry="8"  fill="#B91C1C" />

      {/* Nevis outline */}
      <ellipse cx="168" cy="118" rx="26" ry="24"
        fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Nevis constituency dividers */}
      <line x1="168" y1="94"  x2="168" y2="142" stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />
      <line x1="142" y1="118" x2="194" y2="118" stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />

      {/* Narrow strait label */}
      <text x="148" y="99" fontSize="6.5" fill="rgba(100,150,200,0.45)"
        textAnchor="middle" fontFamily="Inter, sans-serif">The Narrows</text>

      {/* Legend dots */}
      <circle cx="14" cy="150" r="4" fill="#DC2626" />
      <text x="22" y="154" fontSize="8" fill="#9CA3AF" fontFamily="Inter, sans-serif">High</text>
      <circle cx="52" cy="150" r="4" fill="#F87171" />
      <text x="60" y="154" fontSize="8" fill="#9CA3AF" fontFamily="Inter, sans-serif">Med</text>
      <circle cx="90" cy="150" r="4" fill="#FCA5A5" />
      <text x="98" y="154" fontSize="8" fill="#9CA3AF" fontFamily="Inter, sans-serif">Low</text>
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AiPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B1320',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 46,
              color: '#E53E3E',
              margin: '0 0 6px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              Analytics &amp; Insights
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0, fontWeight: 400 }}>
              Last 30 Days • All Constituencies
            </p>
          </div>
          <button style={{
            padding: '10px 18px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.14)',
            backgroundColor: '#1A1F30',
            color: '#E2E8F0',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}>
            Last 30 Days <span style={{ fontSize: 10 }}>▾</span>
          </button>
        </div>

        {/* ── KPI Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {KPI_CARDS.map(k => (
            <div key={k.label} style={{
              backgroundColor: '#111320',
              borderRadius: 12,
              padding: '18px 20px 20px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{k.icon}</span>
                <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, fontWeight: 500 }}>
                  {k.label}
                </p>
              </div>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 900,
                fontSize: 48,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {k.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Middle Row: Support Over Time + Ask Grok AI ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>

          {/* Support Over Time */}
          <div style={{
            backgroundColor: '#111320',
            borderRadius: 12,
            padding: '18px 20px 14px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 14,
            }}>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Support Over Time
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9CA3AF' }}>
                  <span style={{
                    display: 'inline-block', width: 8, height: 8,
                    borderRadius: '50%', backgroundColor: '#DC2626',
                    flexShrink: 0,
                  }} />
                  Lasld Day
                </span>
                <span style={{
                  backgroundColor: '#1C2234',
                  color: 'white',
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.14)',
                  fontSize: 11,
                }}>+Alle Kem</span>
                <span style={{ color: '#DC2626', fontWeight: 700, fontSize: 11 }}>+0F12%</span>
              </div>
            </div>
            <div style={{ height: 230 }}>
              <SupportChart />
            </div>
          </div>

          {/* Ask Grok AI */}
          <div style={{
            backgroundColor: '#111320',
            borderRadius: 12,
            padding: '20px 22px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 18px',
            }}>
              Ask Grok AI
            </p>

            {/* Input / dropdown */}
            <div style={{
              background: '#1C2234',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 14,
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: 13, color: '#D1D5DB', fontWeight: 400 }}>
                Predicted swing in Basseterre: +12%
              </span>
              <span style={{ fontSize: 11, color: '#6B7280' }}>▾</span>
            </div>

            {/* AI response text box */}
            <div style={{
              background: '#1C2234',
              borderRadius: 8,
              padding: '14px 16px',
              border: '1px solid rgba(255,255,255,0.08)',
              flex: 1,
            }}>
              <p style={{
                fontSize: 13,
                color: '#9CA3AF',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Conviets you rativing lbeliee loye yor andraeliendo, lev otveles you locd ant goony the kraloer of fesr on ahlising yor pralne llsvot or dinollave coongs.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Bar + Donut + Map ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

          {/* Issue Priorities — Bar Chart */}
          <div style={{
            backgroundColor: '#111320',
            borderRadius: 12,
            padding: '18px 18px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
              Issue Priorities
            </p>
            <div style={{ height: 210 }}>
              <GlowBarChart />
            </div>
          </div>

          {/* Issue Priorities — Donut Chart */}
          <div style={{
            backgroundColor: '#111320',
            borderRadius: 12,
            padding: '18px 18px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
              Issue Priorities
            </p>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={88}
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                    paddingAngle={1}
                  >
                    {DONUT_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* St. Kitts & Nevis Constituencies */}
          <div style={{
            backgroundColor: '#111320',
            borderRadius: 12,
            padding: '18px 18px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
              St. Kitts &amp; Nevis Constituencies
            </p>
            <div style={{ height: 200 }}>
              <SKNMap />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
