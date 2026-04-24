'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// ── Gauge SVG ─────────────────────────────────────────────────────────────────
function Gauge({ pct, color }: { pct: number; color: string }) {
  const r = 52, cx = 80, cy = 78;
  const startAngle = -215, endAngle = 35;
  const range = endAngle - startAngle;
  const angle = startAngle + (range * pct) / 100;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arc = (a1: number, a2: number, radius: number) => {
    const s = { x: cx + radius * Math.cos(toRad(a1)), y: cy + radius * Math.sin(toRad(a1)) };
    const e = { x: cx + radius * Math.cos(toRad(a2)), y: cy + radius * Math.sin(toRad(a2)) };
    const lg = a2 - a1 > 180 ? 1 : 0;
    return `M${s.x},${s.y} A${radius},${radius} 0 ${lg} 1 ${e.x},${e.y}`;
  };
  const nx = cx + (r - 12) * Math.cos(toRad(angle));
  const ny = cy + (r - 12) * Math.sin(toRad(angle));

  return (
    <svg width="160" height="100" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`gaugeGrad${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Track */}
      <path d={arc(startAngle, endAngle, r)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={11} strokeLinecap="round" />
      {/* Fill */}
      <path d={arc(startAngle, angle, r)} fill="none"
        stroke={`url(#gaugeGrad${color.replace('#', '')})`} strokeWidth={11} strokeLinecap="round" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="white" />
      {/* Value */}
      <text x={cx} y={cy + 22} textAnchor="middle" fill="white" fontSize="26" fontWeight="900"
        fontFamily="'Inter',sans-serif">{pct}%</text>
      {/* Scale ticks */}
      <text x={cx - r - 6} y={cy + 8} textAnchor="end" fill="#475569" fontSize="9">40</text>
      <text x={cx + r + 6} y={cy + 8} textAnchor="start" fill="#475569" fontSize="9">100%</text>
    </svg>
  );
}

// ── Mini bar chart ─────────────────────────────────────────────────────────────
function MiniBar({ vals, color }: { vals: number[]; color: string }) {
  const max = Math.max(...vals);
  return (
    <svg width="52" height="44" style={{ flexShrink: 0 }}>
      {vals.map((v, i) => {
        const h = (v / max) * 38;
        return <rect key={i} x={i * 8 + 1} y={44 - h} width="6" height={h} rx="2"
          fill={i === vals.length - 1 ? color : `${color}44`} />;
      })}
    </svg>
  );
}

// ── Hourly data ───────────────────────────────────────────────────────────────
const INIT_HOURLY = [
  { time: 'Jun', pct: 6 }, { time: 'Man', pct: 14 }, { time: 'Gap', pct: 22 },
  { time: 'Por', pct: 30 }, { time: '10dp', pct: 39 }, { time: 'Mup', pct: 42 },
];

const VOTER_GROUPS = [
  { label: 'Ages 18–34',       pct: 68, color: '#DC143C' },
  { label: 'Ages 35–54',       pct: 82, color: '#F97316' },
  { label: 'Ages 55+',         pct: 91, color: '#22C55E' },
  { label: 'First-time Voters',pct: 74, color: '#60A5FA' },
];

const STATIONS = [
  { name: 'Basseterre',         turnout: 89, ok: true },
  { name: 'St. Christopher 1',  turnout: 85, ok: true },
  { name: 'Sandy Point',        turnout: 78, ok: false },
  { name: 'Cayon',              turnout: 74, ok: true },
  { name: 'Charlestown',        turnout: 72, ok: false },
  { name: 'Nevis 1',            turnout: 70, ok: true },
];

const AI_TIPS = [
  'Target low-turnout areas now',
  'SMS push to ages 18–34 in Sandy Point',
  'Runner redeployment: Charlestown urgent',
  'Final sweep: 3 constituencies below 75%',
];

export default function TurnoutDashboardPage() {
  const [national, setNational] = useState(78);
  const [hourly, setHourly] = useState(INIT_HOURLY);
  const [aiIdx, setAiIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setNational(n => Math.min(+(n + 0.08).toFixed(2), 84));
      setHourly(prev => {
        const last = prev[prev.length - 1];
        return [...prev.slice(1), { ...last, pct: Math.min(last.pct + 1, 52) }];
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAiIdx(i => (i + 1) % AI_TIPS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const card = {
    background: 'linear-gradient(145deg,#141e2e 0%,#0f1827 100%)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14,
  } as React.CSSProperties;

  return (
    <div style={{ backgroundColor: '#090E1A', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div>
          <h1 style={{ color: 'white', fontSize: 19, fontWeight: 800, margin: 0 }}>
            Turnout Dashboard — Live Analytics
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', cursor: 'pointer', fontSize: 15 }}>🔍</button>
          <button style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', cursor: 'pointer', fontSize: 15 }}>⋯</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#64748B', fontSize: 12 }}>lare</span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>A</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 18px' }}>

        {/* Row 1 — 3 stat cards */}
        <div className="rg-3" style={{ gap: 14, marginBottom: 14 }}>

          {/* National Turnout */}
          <div style={{ ...card, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: '0 0 8px', letterSpacing: '0.02em' }}>National Turnout</p>
              <p style={{ color: 'white', fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1 }}>
                {Math.floor(national)}%
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
              <svg width="14" height="14" style={{ marginRight: 4, marginBottom: 2 }}>
                <circle cx="7" cy="7" r="6" fill="none" stroke="#DC143C" strokeWidth="1.5" />
                <path d="M4,7 L6,5 L8,8 L10,4" stroke="#DC143C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <MiniBar vals={[20, 32, 27, 42, 38, 50]} color="#DC143C" />
            </div>
          </div>

          {/* Highest Constituency */}
          <div style={{ ...card, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: 0 }}>Highest Turnout Constituency:</p>
                <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 3 }}>fairrate ✓</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 4px' }}>Basseterre</p>
              <p style={{ color: 'white', fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1 }}>89%</p>
            </div>
            <MiniBar vals={[14, 24, 32, 48, 40, 54]} color="#4ADE80" />
          </div>

          {/* Voter Groups Mobilized */}
          <div style={{
            ...card, position: 'relative', overflow: 'hidden',
            padding: '18px 20px',
          }}>
            {/* Crowd background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                radial-gradient(ellipse at 75% 25%, rgba(220,20,60,0.3) 0%, transparent 55%),
                radial-gradient(ellipse at 25% 75%, rgba(251,191,36,0.2) 0%, transparent 50%),
                linear-gradient(160deg, #141e2e 0%, #0f1827 100%)
              `,
            }} />
            <div style={{ position: 'relative' }}>
              <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: '0 0 12px' }}>Voter Groups Mobilized</p>
              {VOTER_GROUPS.map((g, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>{g.label}</span>
                    <span style={{ color: g.color, fontSize: 11, fontWeight: 700 }}>{g.pct}%</span>
                  </div>
                  <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                    <div style={{ width: `${g.pct}%`, height: '100%', backgroundColor: g.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — Trend + Polling + AI */}
        <div className="rg-3" style={{ gap: 14, marginBottom: 14 }}>

          {/* Hourly Turnout Trend */}
          <div style={{ ...card, padding: '16px' }}>
            <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: '0 0 12px' }}>Hourly Turnout Trend</p>
            <ResponsiveContainer width="100%" height={135}>
              <AreaChart data={hourly} margin={{ top: 4, right: 2, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="redArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC143C" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#DC143C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 6, fontSize: 11 }}
                  formatter={(v) => [`${v}%`, 'Turnout']}
                />
                <Area type="monotone" dataKey="pct" stroke="#DC143C" strokeWidth={2.5} fill="url(#redArea)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Polling Stations — glowing earth visual */}
          <div style={{ ...card, overflow: 'hidden', position: 'relative', minHeight: 190 }}>
            {/* Dramatic glowing earth heatmap */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                radial-gradient(ellipse at 48% 42%, rgba(220,20,60,0.85) 0%, rgba(251,146,60,0.6) 18%, rgba(234,179,8,0.35) 32%, rgba(34,197,94,0.15) 50%, transparent 68%),
                radial-gradient(ellipse at 30% 65%, rgba(59,130,246,0.3) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 70%, rgba(124,58,237,0.2) 0%, transparent 35%),
                linear-gradient(180deg, #0a1020 0%, #1a0520 50%, #0a1530 100%)
              `,
            }} />
            {/* Globe grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice">
              {/* Latitude arcs */}
              {[38, 78, 118, 158].map((y, i) => (
                <ellipse key={i} cx="120" cy={y} rx={Math.min(95 - Math.abs(y - 100) * 0.4, 90)} ry={7}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" fill="none" />
              ))}
              {/* Longitude lines */}
              {[-56, -28, 0, 28, 56].map((dx, i) => (
                <path key={i} d={`M${120 + dx},28 Q${120 + dx * 0.7},112 ${120 + dx},192`}
                  stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
              ))}
              {/* Glow center */}
              <circle cx="118" cy="98" r="38" fill="rgba(220,20,60,0.18)" />
              <circle cx="118" cy="98" r="18" fill="rgba(251,146,60,0.22)" />
            </svg>

            <div style={{ position: 'relative', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: 0 }}>Polling Stations</p>
                <span style={{ color: '#475569', cursor: 'pointer', fontSize: 16 }}>⋮</span>
              </div>
              <p style={{ color: '#475569', fontSize: 10, margin: '2px 0 0' }}>Turnout %</p>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 14px 12px' }}>
              {STATIONS.slice(0, 4).map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '3px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ color: '#94A3B8', fontSize: 11 }}>{s.name}</span>
                  <span style={{ color: s.ok ? '#4ADE80' : '#F97316', fontSize: 11, fontWeight: 700 }}>{s.turnout}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div style={{ ...card, padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: 0 }}>AI Insights</p>
            {/* Dramatic bg for AI panel */}
            <div style={{
              flex: 1,
              background: `
                radial-gradient(ellipse at 60% 30%, rgba(220,20,60,0.25) 0%, transparent 65%),
                radial-gradient(ellipse at 30% 70%, rgba(251,191,36,0.12) 0%, transparent 55%),
                rgba(255,255,255,0.02)
              `,
              border: '1px solid rgba(220,20,60,0.18)',
              borderRadius: 10, padding: '14px 12px',
              minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: 0 }}>{AI_TIPS[aiIdx]}</p>
              <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                {AI_TIPS.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, backgroundColor: i === aiIdx ? '#DC143C' : 'rgba(255,255,255,0.12)', transition: 'background-color 0.3s' }} />
                ))}
              </div>
            </div>
            {/* Station list */}
            <div>
              {STATIONS.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '4px 0', borderBottom: i < STATIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, backgroundColor: s.ok ? '#DC143C' : '#475569' }} />
                  <span style={{ color: '#94A3B8', fontSize: 11, flex: 1 }}>{s.name}</span>
                  <span style={{ color: s.ok ? '#4ADE80' : '#F97316', fontSize: 11, fontWeight: 700 }}>{s.turnout}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 — 2 gauge cards */}
        <div className="rg-2" style={{ gap: 14 }}>
          {[
            { color: '#22C55E', label: 'Poeil' },
            { color: '#DC143C', label: 'Poeil' },
          ].map((g, i) => (
            <div key={i} style={{ ...card, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Final Projected Turnout
              </p>
              <Gauge pct={82} color={g.color} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingTop: 4, maxWidth: 160 }}>
                <span style={{ color: '#475569', fontSize: 10 }}>40</span>
                <span style={{ color: '#64748B', fontSize: 10 }}>{g.label}</span>
                <span style={{ color: '#475569', fontSize: 10 }}>100%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
