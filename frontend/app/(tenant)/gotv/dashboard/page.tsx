'use client';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts';

// ── St Kitts Flag ─────────────────────────────────────────────────────────────
function SKNFlag({ w = 28, h = 19 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={w} height={h} style={{ borderRadius: 3, flexShrink: 0 }}>
      <polygon points="0,20 30,20 0,0"  fill="#009E60" />
      <polygon points="30,0 30,20 0,0"  fill="#CE1126" />
      <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
      <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
      <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
    </svg>
  );
}

// ── Live badge ────────────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      backgroundColor: '#DC143C', color: 'white',
      borderRadius: 4, padding: '3px 9px', fontSize: 11, fontWeight: 800,
      letterSpacing: '0.05em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
      LIVE
    </span>
  );
}

// ── Gauge Chart ───────────────────────────────────────────────────────────────
function GaugeChart({ pct, color = '#DC143C', size = 140 }: { pct: number; color?: string; size?: number }) {
  const r = 54, cx = size / 2, cy = size * 0.58;
  const startAngle = -200, endAngle = 20;
  const range = endAngle - startAngle;
  const angle = startAngle + (range * pct) / 100;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arcPath = (start: number, end: number, radius: number) => {
    const s = { x: cx + radius * Math.cos(toRad(start)), y: cy + radius * Math.sin(toRad(start)) };
    const e = { x: cx + radius * Math.cos(toRad(end)),   y: cy + radius * Math.sin(toRad(end))   };
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };
  const needleX = cx + (r - 8) * Math.cos(toRad(angle));
  const needleY = cy + (r - 8) * Math.sin(toRad(angle));
  return (
    <svg width={size} height={size * 0.72} style={{ overflow: 'visible' }}>
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#1E293B" strokeWidth={10} strokeLinecap="round" />
      <path d={arcPath(startAngle, angle, r)} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill="white" />
      <text x={cx} y={cy + 20} textAnchor="middle" fill="white" fontSize={22} fontWeight={900} fontFamily="'Plus Jakarta Sans',sans-serif">
        {pct}%
      </text>
    </svg>
  );
}

// ── St Kitts SVG Map — Command Center (pins style) ────────────────────────────
function CommandMap() {
  const pins = [
    { cx: 148, cy: 128, label: 'Basseterre',  votes: '4,821', active: true },
    { cx: 112, cy:  70, label: 'Sandy Point', votes: '2,104', active: true },
    { cx: 185, cy:  90, label: 'Cayon',       votes: '1,890', active: false },
    { cx: 225, cy: 105, label: 'St. Peters',  votes: '2,340', active: true },
    { cx: 160, cy:  55, label: 'Dieppe Bay',  votes: '1,210', active: false },
    { cx: 290, cy: 122, label: 'Old Road',    votes: '1,680', active: true },
    { cx: 458, cy: 148, label: 'Charlestown', votes: '3,220', active: true },
  ];
  return (
    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', backgroundColor: '#0a1628' }}>
      <svg viewBox="0 0 560 210" width="100%" height="100%" style={{ display: 'block', minHeight: 200 }}>
        <defs>
          <linearGradient id="gotvOcean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c2040" />
            <stop offset="100%" stopColor="#091830" />
          </linearGradient>
          <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC143C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DC143C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="560" height="210" fill="url(#gotvOcean)" />
        {/* Ocean shimmer */}
        {[30,55,80,105,130,155,180].map(y => (
          <line key={y} x1="0" y1={y} x2="560" y2={y+2} stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
        ))}

        {/* St Kitts island */}
        <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z"
          fill="#1a3a20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Terrain shading */}
        <path d="M90,90 Q120,72 155,68 Q190,62 220,70 Q248,76 265,92 Q280,106 272,122 Q260,138 235,146 Q205,154 175,150 Q142,146 118,132 Q98,120 90,106 Z"
          fill="#1f4a28" fillOpacity="0.7" />
        {/* Mountain spine */}
        <path d="M130,82 L155,58 L175,78 L200,60 L220,80 L240,65 L260,84"
          fill="none" stroke="#264d2e" strokeWidth="6" strokeLinecap="round" />

        {/* Grid overlay */}
        {[100,150,200,250,300,350].map(x => (
          <line key={x} x1={x} y1="30" x2={x} y2="185" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        ))}
        {[50,80,110,140,170].map(y => (
          <line key={y} x1="62" y1={y} x2="370" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        ))}

        {/* Nevis island */}
        <ellipse cx="458" cy="148" rx="55" ry="38" fill="#1a3a20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <ellipse cx="456" cy="146" rx="32" ry="24" fill="#1f4a28" fillOpacity="0.7" />

        {/* Pins */}
        {pins.map((p, i) => (
          <g key={i}>
            {p.active && <ellipse cx={p.cx} cy={p.cy} rx={18} ry={10} fill="url(#pinGlow)" />}
            {/* Pin body */}
            <path d={`M${p.cx},${p.cy - 20}
              C${p.cx - 10},${p.cy - 30} ${p.cx - 14},${p.cy - 40} ${p.cx},${p.cy - 44}
              C${p.cx + 14},${p.cy - 40} ${p.cx + 10},${p.cy - 30} ${p.cx},${p.cy - 20} Z`}
              fill={p.active ? '#DC143C' : '#4B5563'} />
            <circle cx={p.cx} cy={p.cy - 34} r={6} fill="white" fillOpacity="0.9" />
            <circle cx={p.cx} cy={p.cy - 20} r={3} fill={p.active ? '#DC143C' : '#4B5563'} />
            {/* Label */}
            <rect x={p.cx - 28} y={p.cy - 56} width={56} height={14} rx={3}
              fill="rgba(0,0,0,0.75)" />
            <text x={p.cx} y={p.cy - 46} fill="white" fontSize="7.5" textAnchor="middle" fontWeight="700" fontFamily="Inter,sans-serif">
              {p.label}
            </text>
          </g>
        ))}

        {/* "Polling Station" label */}
        <rect x="8" y="185" width="90" height="18" rx="3" fill="rgba(0,0,0,0.6)" />
        <text x="53" y="197" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="Inter,sans-serif">Polling Station</text>
      </svg>
      <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 6 }}>
        <LiveBadge />
        <span style={{ backgroundColor: '#1E293B', color: '#94A3B8', borderRadius: 4, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
          Live Runner
        </span>
      </div>
    </div>
  );
}

// ── Results Map — red filled constituencies ───────────────────────────────────
function ResultsMap() {
  const sknlpSeats = [0, 1, 2, 3, 6, 7, 8]; // indices of won constituencies
  const constituencies = [
    { d: "M62,95 Q75,72 100,62 Q125,50 148,52 L148,135 Q110,140 82,124 Q60,108 62,95 Z" },
    { d: "M148,52 Q172,44 195,45 L195,138 L148,135 Z" },
    { d: "M195,45 Q220,40 245,44 L242,140 L195,138 Z" },
    { d: "M245,44 Q270,42 295,50 L290,148 L242,140 Z" },
    { d: "M295,50 Q318,56 335,68 Q348,80 348,98 L310,155 L290,148 Z" },
    { d: "M348,98 Q355,115 350,132 Q342,148 330,158 L310,155 Z" },
    { d: "M82,124 Q98,138 120,148 Q142,158 165,162 L165,155 Q140,148 118,136 Q98,126 82,128 Z" },
    { d: "M165,162 Q192,168 215,168 Q238,168 255,162 L255,155 L165,155 Z" },
    { d: "M255,162 Q278,158 300,150 Q318,142 328,130 L310,155 L255,155 Z" },
    { d: "M432,110 Q450,98 470,100 Q488,102 495,115 L490,165 Q470,175 450,172 Q432,165 428,148 Z" },
    { d: "M428,148 Q430,162 440,170 Q450,178 460,178 L460,170 L490,165 Q488,172 478,178 L432,182 Z" },
  ];

  return (
    <svg viewBox="0 0 560 210" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="resGlow" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#DC143C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#DC143C" stopOpacity="0" />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#DC143C" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect width="560" height="210" fill="#0c1a2e" />
      <rect width="560" height="210" fill="url(#resGlow)" />

      {/* Grid */}
      {[80,140,200,260,320,380,440,500].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[40,80,120,160,200].map(y => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* St Kitts silhouette base */}
      <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z"
        fill="#1a2a38" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* Nevis base */}
      <ellipse cx="460" cy="145" rx="52" ry="36" fill="#1a2a38" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Constituency fills */}
      {constituencies.map((c, i) => (
        <path key={i} d={c.d}
          fill={sknlpSeats.includes(i) ? '#DC143C' : '#2d3a4a'}
          fillOpacity={sknlpSeats.includes(i) ? 0.85 : 0.7}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
          filter={sknlpSeats.includes(i) ? 'url(#shadow)' : undefined}
        />
      ))}

      {/* Victory glow on island */}
      <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z"
        fill="none" stroke="#DC143C" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Labels */}
      <text x="148" y="110" fill="white" fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="Inter,sans-serif" fillOpacity="0.9">Basseterre</text>
      <text x="460" y="150" fill="white" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="Inter,sans-serif" fillOpacity="0.9">Nevis</text>

      {/* Fireworks dots */}
      {[{x:480,y:15},{x:510,y:30},{x:530,y:10},{x:500,y:45},{x:520,y:55}].map((f,i) => (
        <circle key={i} cx={f.x} cy={f.y} r={2+i%3} fill={['#FFD700','#FF6B6B','#FFFFFF','#FFA500','#FF69B4'][i]} fillOpacity="0.9" />
      ))}
    </svg>
  );
}

// ── Runner Card ───────────────────────────────────────────────────────────────
function RunnerCard({ name, status, task, score, idx }: {
  name: string; status: string; task: string; score: string | number; idx: number;
}) {
  const colors = ['#1A3A50','#1A2840','#1E1A38','#201A20','#1A2A20','#2A1A20','#1A2030'];
  return (
    <div style={{
      backgroundColor: colors[idx % colors.length],
      borderRadius: 10,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      flexShrink: 0,
      width: 148,
    }}>
      {/* Runner photo area */}
      <div style={{
        height: 100, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${colors[idx % colors.length]}, #0a1020)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* SKNLP flag in photo */}
        <div style={{ position: 'absolute', top: 6, right: 6 }}>
          <SKNFlag w={28} h={19} />
        </div>
        {/* Person silhouette */}
        <svg viewBox="0 0 80 80" width="70" height="70">
          <circle cx="40" cy="28" r="16" fill="#2a4a30" />
          <ellipse cx="40" cy="75" rx="26" ry="22" fill="#1a3020" />
          <path d="M20,58 Q40,50 60,58" stroke="#DC143C" strokeWidth="3" fill="none" />
        </svg>
        {/* Role badge */}
        <div style={{
          position: 'absolute', top: 6, left: 6,
          backgroundColor: '#DC143C', color: 'white',
          fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 3,
        }}>
          Runner
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 10px 12px' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#E6EDF3', margin: '0 0 2px' }}>{name}</p>
        <p style={{ fontSize: 10, color: '#8B949E', margin: '0 0 6px' }}>Turf</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p style={{ fontSize: 10, color: '#64748B', margin: 0 }}>Materials Delivered</p>
          <p style={{ fontSize: 10, color: '#64748B', margin: 0 }}>Lawn Signs</p>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', margin: '2px 0 0' }}>
            {task === 'Complete' ? '✓ Complete' : task}
          </p>
        </div>
        <div style={{
          marginTop: 8, padding: '4px 8px', borderRadius: 5,
          backgroundColor: 'rgba(220,20,60,0.12)', border: '1px solid rgba(220,20,60,0.25)',
          fontSize: 12, fontWeight: 700, color: '#DC143C', textAlign: 'center',
        }}>
          {score}
        </div>
      </div>
    </div>
  );
}

// ── Agent pins map ────────────────────────────────────────────────────────────
function AgentsMap() {
  const agentPins = [
    { x: 148, y: 125 }, { x: 112, y: 68 }, { x: 185, y: 88 },
    { x: 225, y: 102 }, { x: 160, y: 52 }, { x: 290, y: 118 },
    { x: 200, y: 145 }, { x: 250, y: 130 }, { x: 320, y: 142 },
    { x: 130, y: 155 }, { x: 270, y: 68 }, { x: 340, y: 88 },
    { x: 458, y: 148 }, { x: 440, y: 125 }, { x: 475, y: 162 },
  ];

  return (
    <div style={{ width: '100%', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
      {/* Scenic background */}
      <div style={{
        height: 240, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a1a30 0%, #1a3a50 40%, #0d5530 70%, #0a2a18 100%)',
      }}>
        {/* Sky glow */}
        <div style={{
          position: 'absolute', top: 0, left: '30%', right: 0, height: '45%',
          background: 'radial-gradient(ellipse, rgba(255,180,50,0.25) 0%, rgba(255,100,20,0.15) 40%, transparent 70%)',
        }} />
        {/* Ocean */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(180deg, #1a4a70 0%, #0d2a45 100%)',
          borderTop: '1px solid rgba(100,180,220,0.3)',
        }} />
        {/* Palm trees silhouette */}
        <svg style={{ position: 'absolute', bottom: 0, right: '5%', opacity: 0.7 }} width="80" height="120" viewBox="0 0 80 120">
          <line x1="40" y1="120" x2="42" y2="50" stroke="#0a1a08" strokeWidth="4" />
          <path d="M42,50 Q20,30 10,40 Q30,28 42,50" fill="#0a2008" />
          <path d="M42,50 Q60,25 72,32 Q58,22 42,50" fill="#0a2008" />
          <path d="M42,50 Q25,42 12,55 Q30,38 42,50" fill="#0d2a0e" />
        </svg>

        {/* SVG Island + pins */}
        <svg viewBox="0 0 700 240" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="agentPinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Island outline */}
          <path d="M100,140 Q120,110 150,98 Q185,84 225,80 Q265,75 305,84 Q340,92 365,110 Q385,128 378,150 Q365,172 335,182 Q300,192 260,194 Q218,196 178,188 Q138,180 114,164 Q98,152 100,140 Z"
            fill="#1a4a20" fillOpacity="0.6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />

          {/* Agent pins (golden) */}
          {agentPins.map((p, i) => (
            <g key={i}>
              <ellipse cx={p.x} cy={p.y} rx={12} ry={6} fill="url(#agentPinGlow)" />
              {/* Pin drop shape */}
              <path d={`M${p.x},${p.y} C${p.x-8},${p.y-14} ${p.x-10},${p.y-22} ${p.x},${p.y-25} C${p.x+10},${p.y-22} ${p.x+8},${p.y-14} ${p.x},${p.y} Z`}
                fill="#D4A017" stroke="#FFD700" strokeWidth="1" />
              <circle cx={p.x} cy={p.y - 18} r={4.5} fill="white" fillOpacity="0.9" />
            </g>
          ))}

          {/* Nevis island */}
          <ellipse cx="555" cy="175" rx="60" ry="40" fill="#1a4a20" fillOpacity="0.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {agentPins.slice(12).map((p, i) => (
            <g key={i}>
              <circle cx={p.x + 97} cy={p.y + 27} r={4.5} fill="#D4A017" stroke="#FFD700" strokeWidth="1" />
              <circle cx={p.x + 97} cy={p.y + 27} r={2} fill="white" />
            </g>
          ))}
        </svg>
      </div>

      {/* Count bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#E6EDF3' }}>
          ···· {agentPins.length * 276 + 142}
        </span>
        <button style={{
          backgroundColor: '#DC143C', border: 'none', color: 'white',
          padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Assign Emergency Task
        </button>
      </div>
    </div>
  );
}

// ── Turnout chart data ─────────────────────────────────────────────────────────
const hourlyData = [
  { time: '6am',  pct: 8  },
  { time: '8am',  pct: 18 },
  { time: '10am', pct: 28 },
  { time: '12pm', pct: 38 },
  { time: '2pm',  pct: 52 },
  { time: '4pm',  pct: 68 },
  { time: '6pm',  pct: 78 },
];

// ── Leaderboard data ──────────────────────────────────────────────────────────
const leaderboard = [
  { name: 'St. Kitts 1 — Basseterre',    live: 46080, pct: '0.299', status: 'SKNLP Leading', time: '02:39' },
  { name: 'St. Kitts 2 — Central',       live: 46942, pct: '0.299', status: 'SKNLP Leading', time: '02:49' },
  { name: 'St. Kitts 3 — Sandy Point',   live: 46830, pct: '0.295', status: 'SKNLP Leading', time: '02:39' },
  { name: 'Nevis 1 — Charlestown',        live: 46820, pct: '0.299', status: 'SKNLP Leading', time: '02:49' },
  { name: 'Nevis 2 — St. James',          live: 46843, pct: '0.299', status: 'SKNLP Tight',   time: '02:44' },
];

const runners = [
  { name: 'John Doe',       status: 'Active',    task: 'Complete', score: 450  },
  { name: 'Jane Smith',     status: 'Active',    task: 'Complete', score: 380  },
  { name: 'Marcus Brown',   status: 'Active',    task: 'Complete', score: 420  },
  { name: 'John Doe',       status: 'Active',    task: 'Complete', score: 395  },
  { name: 'Michael Johnson',status: 'Offline',   task: 'Complete', score: 310  },
  { name: 'Michael J.',     status: 'Active',    task: 'Complete', score: 465  },
  { name: 'Michael J.',     status: 'Active',    task: 'In Progress', score: 220 },
];

const TABS = ['Command Center', 'Runners & Agents', 'Live Results', 'Turnout Analytics'] as const;

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function GotvPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Command Center');
  const [smsSent, setSmsSent] = useState(false);
  const [victory, setVictory] = useState(false);
  const [tick, setTick] = useState(0);

  // Live ticker
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const votersSecured = 14872 + tick * 3;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0B1322', color: '#E6EDF3' }}>

      {/* ── Red header bar ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 60%, #8B0000 100%)',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56, flexShrink: 0,
        boxShadow: '0 2px 20px rgba(220,20,60,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <SKNFlag w={32} h={22} />
          <div>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900, fontSize: 18, color: '#FFFFFF', margin: 0,
              letterSpacing: '-0.01em',
            }}>
              GOTV Command Center
            </h1>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Election Day — April 25, 2026
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LiveBadge />
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 7, padding: '6px 14px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: 'white', fontFamily: 'inherit',
          }}>
            Main Screen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: '#0F1829',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 24px',
        display: 'flex', gap: 0, overflowX: 'auto',
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '13px 20px 14px',
            border: 'none', background: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            color: activeTab === tab ? '#FFFFFF' : '#64748B',
            borderBottom: activeTab === tab ? '2.5px solid #DC143C' : '2.5px solid transparent',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 1 — COMMAND CENTER                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Command Center' && (
        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Stat cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12 }}>
            {/* Turnout */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px 20px' }}>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 4px', fontWeight: 500 }}>Turnout</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 46, color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>
                68%
              </p>
              <div style={{ height: 3, borderRadius: 2, backgroundColor: '#1E293B', marginTop: 10 }}>
                <div style={{ height: '100%', width: '68%', borderRadius: 2, backgroundColor: '#DC143C' }} />
              </div>
            </div>
            {/* Voters Secured */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px 20px' }}>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 4px', fontWeight: 500 }}>Voters Secured</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 40, color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {votersSecured.toLocaleString()}
              </p>
              <p style={{ fontSize: 12, color: '#22C55E', margin: '6px 0 0', fontWeight: 600 }}>+{tick * 3} this session</p>
            </div>
            {/* 11 Constituencies */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px 20px' }}>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 4px', fontWeight: 500 }}>11 Constituencies</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 40, color: '#FFD700', margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>
                Live
              </p>
              <p style={{ fontSize: 12, color: '#64748B', margin: '6px 0 0' }}>All stations reporting</p>
            </div>
            {/* Collapse arrow */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Map + Final Push Tasks */}
          <div className="rg-sidebar-r" style={{ gap: 12 }}>
            {/* Map */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SKNFlag w={22} h={15} />
                  <span style={{ fontSize: 14, fontWeight: 700 }}>St. Kitts &amp; Nevis</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ padding: '4px 12px', borderRadius: 5, backgroundColor: '#DC143C', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    Camiana
                  </button>
                  <button style={{ width: 28, height: 28, borderRadius: 5, backgroundColor: '#21262D', border: '1px solid #30363D', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                  </button>
                </div>
              </div>
              <CommandMap />
            </div>

            {/* Final Push Tasks */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px' }}>Final Push Tasks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Predictive Seat Tally', count: '4,008,856', status: 'pending' },
                  { label: 'Predictive Seat Tally', count: '—',         status: 'active'  },
                  { label: 'Predictive Feat Tally', count: '4,099,313', status: 'done'    },
                ].map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    padding: '10px 12px', borderRadius: 8,
                    backgroundColor: t.status === 'active' ? 'rgba(220,20,60,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${t.status === 'active' ? 'rgba(220,20,60,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                      backgroundColor: t.status === 'done' ? '#22C55E' : t.status === 'active' ? '#DC143C' : '#64748B',
                    }} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: t.status === 'active' ? '#FFFFFF' : '#C9D1D9', margin: 0 }}>{t.label}</p>
                      <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0' }}>{t.count}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Running total */}
              <div style={{ marginTop: 16, padding: '12px', borderRadius: 8, backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Runners Deployed</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 32, color: '#FFD700', margin: 0 }}>28</p>
              </div>
            </div>
          </div>

          {/* Activity Feed + Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 12, alignItems: 'start' }}>
            {/* Activity feed header */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>Real-Time Activity Feed</h3>
                <span style={{ fontSize: 11, color: '#64748B' }}>Acreall ▾</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { text: 'St. Kitts Nevis Labour Party', code: '#0F172A', time: '2m ago', type: 'check' },
                  { text: 'St. Kitts Nevis Labour Party', code: '#0F172A', time: '4m ago', type: 'sms'   },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 7, backgroundColor: '#0F172A' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#DC143C', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SKNFlag w={18} h={12} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#E6EDF3', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</p>
                      <p style={{ fontSize: 10, color: '#64748B', margin: '2px 0 0' }}>{a.code} · {a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second activity column */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px' }}>
              <div style={{ marginBottom: 12, height: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { text: 'St. Kitts Nevis Labour Party', code: '#0F172A', time: '5m ago' },
                  { text: 'St. Kitts Nevis Labanoth Nevis', code: '#0F172A', time: '7m ago' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 7, backgroundColor: '#0F172A' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#1E293B', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SKNFlag w={18} h={12} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#E6EDF3', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</p>
                      <p style={{ fontSize: 10, color: '#64748B', margin: '2px 0 0' }}>{a.code} · {a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action 1 */}
            <button
              onClick={() => setSmsSent(true)}
              style={{
                padding: '14px 22px', borderRadius: 10, border: 'none',
                backgroundColor: smsSent ? '#166534' : '#DC143C',
                color: 'white', fontSize: 13, fontWeight: 800,
                cursor: 'pointer', fontFamily: 'inherit',
                minWidth: 160, alignSelf: 'stretch',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.8 }}>Quick Action</span>
              {smsSent ? '✓ SMS Sent!' : 'Send Final SMS Blast'}
            </button>

            {/* Quick Action 2 */}
            <button style={{
              padding: '14px 22px', borderRadius: 10, border: 'none',
              backgroundColor: '#DC143C', color: 'white',
              fontSize: 13, fontWeight: 800, cursor: 'pointer',
              fontFamily: 'inherit', minWidth: 160, alignSelf: 'stretch',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.8 }}>Quick Action</span>
              Launch Phone Bank
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 2 — RUNNERS & AGENTS                                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Runners & Agents' && (
        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <SKNFlag w={24} h={16} />
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>St. Kitts Nevis Labour Party (SKNLP)</span>
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 22, color: '#FFFFFF', margin: 0 }}>
                Outdoor Agents &amp; Runners — Election Day
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>Seterhl Field Logistics</span>
              <button style={{ backgroundColor: '#21262D', border: '1px solid #30363D', borderRadius: 6, padding: '6px 14px', color: '#C9D1D9', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                ▲ 120 X ▶
              </button>
            </div>
          </div>

          {/* Map with agent pins */}
          <AgentsMap />

          {/* Runner cards horizontal scroll */}
          <div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
              {runners.map((r, i) => (
                <RunnerCard key={i} {...r} idx={i} />
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="rg-4" style={{ gap: 12 }}>
            {[
              { label: 'Active Runners', value: '18', color: '#22C55E' },
              { label: 'Tasks Complete', value: '142', color: '#FFD700' },
              { label: 'Offline Agents', value: '3', color: '#F87171' },
              { label: 'Avg. ETA',       value: '12min', color: '#60A5FA' },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 6px', fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 30, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 3 — LIVE RESULTS                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Live Results' && (
        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Victory banner */}
          <div style={{
            background: 'linear-gradient(135deg, #7C0000 0%, #DC143C 50%, #8B0000 100%)',
            borderRadius: 10, padding: '12px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(220,20,60,0.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <LiveBadge />
              <span style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                SKNLP Leading 8/11 Seats
              </span>
              <span style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                Turnout 78%
              </span>
              <span style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#FFD700' }}>
                Final Projection: 9 Seats
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <SKNFlag w={28} h={19} />
            </div>
          </div>

          {/* Map + AI Insights */}
          <div className="rg-sidebar-r" style={{ gap: 14, alignItems: 'start' }}>
            {/* Results map */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>Election Day Live Results — April 25, 2026</h3>
              </div>
              <div style={{ height: 240 }}>
                <ResultsMap />
              </div>
              {/* Legend */}
              <div style={{ padding: '10px 16px', display: 'flex', gap: 16 }}>
                {[{ color: '#DC143C', label: 'SKNLP (8)' }, { color: '#4B5563', label: 'Other (3)' }].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: l.color, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights + Celebrate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Grok AI Instant Insights
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                  {[
                    'Basseterre Central trending +12% vs 2022',
                    'Nevis 2 still contested — deploy runners',
                    'Projected final: 9 seats SKNLP',
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', backgroundColor: '#0F172A', borderRadius: 7 }}>
                      <span style={{ color: '#DC143C', flexShrink: 0, fontWeight: 800 }}>•</span>
                      <p style={{ fontSize: 12, color: '#C9D1D9', margin: 0, lineHeight: 1.4 }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setVictory(v => !v)}
                style={{
                  width: '100%', padding: '15px', borderRadius: 10, border: 'none',
                  background: victory
                    ? 'linear-gradient(135deg, #166534, #15803D)'
                    : 'linear-gradient(135deg, #8B0000, #DC143C)',
                  color: 'white', fontSize: 15, fontWeight: 900,
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 20px rgba(220,20,60,0.4)',
                }}
              >
                {victory ? '🎉 Victory Celebrated!' : 'Celebrate Victory'}
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>Leaderboard</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0F172A' }}>
                  {['Constituency', 'Live Votes', 'Vote %', 'Runner/Volunteer', 'Updated'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '11px 16px', fontSize: 13, color: '#E6EDF3', fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: '11px 16px', fontSize: 13, color: '#22C55E', fontWeight: 700, fontFamily: 'monospace' }}>
                      {(r.live + tick * 7).toLocaleString()}
                    </td>
                    <td style={{ padding: '11px 16px', fontSize: 13, color: '#94A3B8' }}>{r.pct}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 11, fontWeight: 700, backgroundColor: 'rgba(220,20,60,0.15)', color: '#F87171' }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '11px 16px', fontSize: 12, color: '#64748B', fontFamily: 'monospace' }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 4 — TURNOUT ANALYTICS                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'Turnout Analytics' && (
        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 22, color: '#DC143C', margin: 0 }}>
              Turnout Dashboard — Live Analytics
            </h2>
            <LiveBadge />
          </div>

          {/* Top stats */}
          <div className="rg-3" style={{ gap: 12 }}>
            {/* National Turnout */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', margin: 0 }}>National Turnout</p>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 48, color: '#FFFFFF', margin: 0, lineHeight: 1, letterSpacing: '-0.04em' }}>78%</p>
                <div style={{ paddingBottom: 6 }}>
                  <ResponsiveContainer width={60} height={32}>
                    <AreaChart data={hourlyData.slice(-5)}>
                      <Area type="monotone" dataKey="pct" stroke="#DC143C" fill="rgba(220,20,60,0.2)" dot={false} strokeWidth={2} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Highest Turnout Constituency */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', margin: 0 }}>Highest Turnout Constituency:</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', backgroundColor: 'rgba(34,197,94,0.15)', padding: '2px 8px', borderRadius: 4 }}>↑ fairate</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px' }}>Basseterre</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 44, color: '#FFFFFF', margin: 0, lineHeight: 1, letterSpacing: '-0.04em' }}>89%</p>
                <div style={{ paddingBottom: 6 }}>
                  <ResponsiveContainer width={60} height={32}>
                    <AreaChart data={hourlyData.slice(-5)}>
                      <Area type="monotone" dataKey="pct" stroke="#22C55E" fill="rgba(34,197,94,0.2)" dot={false} strokeWidth={2} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Voter Groups Mobilized */}
            <div style={{
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden',
              position: 'relative', minHeight: 130,
              background: 'linear-gradient(135deg, #1a0a20 0%, #2a1030 100%)',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(220,20,60,0.3) 0%, transparent 65%)' }} />
              <div style={{ position: 'relative', padding: '18px 20px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', margin: '0 0 8px' }}>Voter Groups Mobilized</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: 'Youth (18–30)', pct: 82, color: '#DC143C' },
                    { label: 'Women',          pct: 76, color: '#F59E0B' },
                    { label: 'Rural',          pct: 71, color: '#22C55E' },
                  ].map(g => (
                    <div key={g.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{g.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: g.color }}>{g.pct}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, backgroundColor: '#1E293B' }}>
                        <div style={{ height: '100%', width: `${g.pct}%`, borderRadius: 2, backgroundColor: g.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts row */}
          <div className="rg-3" style={{ gap: 12 }}>
            {/* Hourly Turnout Trend */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>Hourly Turnout Trend</h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={hourlyData}>
                  <XAxis dataKey="time" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => [`${v}%`, 'Turnout']}
                  />
                  <Line type="monotone" dataKey="pct" stroke="#DC143C" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Polling Stations Heatmap */}
            <div style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '16px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Polling Stations</h3>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </div>
              <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 8px' }}>Turnout %</p>
              {/* Heat visual */}
              <div style={{ borderRadius: 8, overflow: 'hidden', height: 120, position: 'relative',
                background: 'radial-gradient(ellipse at 40% 60%, rgba(255,60,20,0.9) 0%, rgba(220,100,20,0.7) 30%, rgba(255,180,50,0.5) 55%, rgba(50,150,100,0.3) 75%, rgba(20,80,140,0.2) 100%)',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.3), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  St. Kitts &amp; Nevis
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ backgroundColor: '#1a0a14', borderRadius: 10, border: '1px solid rgba(220,20,60,0.25)', padding: '16px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#FFFFFF' }}>AI Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { tip: 'Target low-turnout areas now', urgent: true },
                  { tip: 'Sandy Point below projection by 8%', urgent: true },
                  { tip: 'Nevis 1 on track — no action needed', urgent: false },
                ].map((t, i) => (
                  <div key={i} style={{
                    padding: '9px 12px', borderRadius: 7,
                    backgroundColor: t.urgent ? 'rgba(220,20,60,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${t.urgent ? 'rgba(220,20,60,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                    <p style={{ fontSize: 12, color: t.urgent ? '#FCA5A5' : '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                      {t.urgent && <span style={{ color: '#DC143C', fontWeight: 800 }}>⚡ </span>}
                      {t.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gauge row */}
          <div className="rg-2" style={{ gap: 12 }}>
            {[
              { label: 'Final Projected Turnout', pct: 82, color: '#22C55E' },
              { label: 'Final Projected Turnout', pct: 82, color: '#DC143C' },
            ].map((g, i) => (
              <div key={i} style={{ backgroundColor: '#161D2E', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <GaugeChart pct={g.pct} color={g.color} size={150} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px' }}>{g.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 900, color: g.color, margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{g.pct}%</p>
                  <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>Based on current rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
