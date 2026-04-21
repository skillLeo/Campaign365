'use client';
import { useState, useEffect } from 'react';

const RUNNERS = [
  { id: 1, name: 'John Doe',        status: 'Materials Delivered\nLawn Signs', count: '450',      bg: 'linear-gradient(160deg,#1a3a22 0%,#0f2016 100%)' },
  { id: 2, name: 'Jane Smith',      status: 'Materials Delivered\nLawn Signs', count: 'Complete', bg: 'linear-gradient(160deg,#1a2d3a 0%,#0f1e28 100%)' },
  { id: 3, name: 'Jane Smith',      status: 'Materials Delivered\nLawn Signs', count: 'Complete', bg: 'linear-gradient(160deg,#3a1a1a 0%,#200f0f 100%)' },
  { id: 4, name: 'John Doe',        status: 'Materials Delivered\nLawn Signs', count: 'Complete', bg: 'linear-gradient(160deg,#1a2540 0%,#0f1830 100%)' },
  { id: 5, name: 'Michael Johnson', status: 'Materials Delivered\nLawn Signs', count: 'Complete', bg: 'linear-gradient(160deg,#28163a 0%,#180e28 100%)' },
  { id: 6, name: 'Michael Johnson', status: 'Materials Delivered\nLawn Signs', count: 'Complete', bg: 'linear-gradient(160deg,#1a3020 0%,#0f2014 100%)' },
  { id: 7, name: 'Michael Jonnson', status: 'Offline Sync\nLawn Sign',         count: 'Complete', bg: 'linear-gradient(160deg,#3a2510 0%,#201508 100%)' },
];

function SKNFlagSmall() {
  return (
    <svg viewBox="0 0 30 20" width="56" height="38" style={{ borderRadius: 3 }}>
      <polygon points="0,20 30,20 0,0" fill="#009E60" />
      <polygon points="30,0 30,20 0,0" fill="#CE1126" />
      <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
      <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
      <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
    </svg>
  );
}

function RunnerCard({ r }: { r: typeof RUNNERS[0] }) {
  const isComplete = r.count === 'Complete';
  const [line1, line2] = r.status.split('\n');
  return (
    <div style={{
      minWidth: 155, maxWidth: 160, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
      background: r.bg, border: '1px solid rgba(255,255,255,0.07)', position: 'relative',
    }}>
      {/* Runner badge */}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        backgroundColor: 'rgba(0,0,0,0.55)', color: '#94A3B8',
        fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.06em',
      }}>Runner</div>

      {/* Photo area */}
      <div style={{ height: 100, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Person silhouette */}
        <svg viewBox="0 0 70 90" width="58" height="74" style={{ position: 'relative', zIndex: 1 }}>
          {/* Head */}
          <circle cx="35" cy="20" r="14" fill="rgba(200,160,110,0.85)" />
          {/* Body */}
          <path d="M14,90 Q14,56 35,54 Q56,56 56,90" fill="rgba(180,140,90,0.7)" />
          {/* Shirt detail */}
          <path d="M20,62 Q35,58 50,62 L50,80 Q35,82 20,80 Z" fill="rgba(220,20,60,0.5)" />
          {/* Flag pole */}
          <rect x="46" y="10" width="2" height="38" fill="rgba(255,255,255,0.7)" />
          {/* SKNLP flag */}
          <polygon points="48,10 70,18 48,26" fill="#009E60" opacity="0.9" />
          <polygon points="48,18 70,18 48,26" fill="#CE1126" opacity="0.9" />
        </svg>
        {/* SKNLP flag image bottom-left */}
        <div style={{ position: 'absolute', bottom: 6, left: 8 }}>
          <SKNFlagSmall />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '8px 10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
        <p style={{ color: '#475569', fontSize: 10, margin: '0 0 8px', fontWeight: 500 }}>Turf</p>
        <p style={{ color: '#94A3B8', fontSize: 10, margin: '0 0 1px' }}>{line1}</p>
        <p style={{ color: '#94A3B8', fontSize: 10, margin: '0 0 6px' }}>{line2}</p>
        <p style={{ color: isComplete ? '#4ADE80' : '#FFD700', fontSize: 13, fontWeight: 800, margin: 0 }}>{r.count}</p>
      </div>
    </div>
  );
}

// Dramatic tropical island painting style map
function IslandMap({ pinCount }: { pinCount: number }) {
  const pins = [
    { x: 210, y: 95 }, { x: 285, y: 68 }, { x: 375, y: 55 },
    { x: 450, y: 72 }, { x: 515, y: 95 }, { x: 560, y: 75 },
    { x: 605, y: 115 }, { x: 160, y: 130 }, { x: 248, y: 152 },
    { x: 335, y: 140 }, { x: 420, y: 158 }, { x: 500, y: 148 },
    { x: 578, y: 168 }, { x: 648, y: 138 }, { x: 192, y: 200 },
    { x: 312, y: 210 }, { x: 480, y: 220 }, { x: 622, y: 200 },
    { x: 272, y: 242 }, { x: 558, y: 245 },
  ];

  return (
    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: 320 }}>
      {/* Main background layers to simulate tropical painting */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 72% 22%, #c2410c 0%, #92400e 18%, transparent 40%),
          radial-gradient(ellipse at 85% 45%, #b45309 0%, transparent 35%),
          radial-gradient(ellipse at 65% 65%, #7c3aed 0%, #4c1d95 30%, transparent 55%),
          radial-gradient(ellipse at 90% 80%, #c2410c 0%, transparent 30%),
          radial-gradient(ellipse at 18% 40%, #166534 0%, #14532d 25%, transparent 50%),
          radial-gradient(ellipse at 35% 60%, #15803d 0%, transparent 35%),
          radial-gradient(ellipse at 10% 70%, #1a4a2a 0%, transparent 30%),
          linear-gradient(160deg, #0c1f3e 0%, #1e3a5c 25%, #0f6b6b 50%, #134e4a 75%, #0c2d1e 100%)
        `,
      }} />

      {/* Island mass — lush green */}
      <div style={{
        position: 'absolute', left: '12%', top: '28%', width: '55%', height: '45%',
        background: `
          radial-gradient(ellipse at 40% 50%, #16a34a 0%, #15803d 35%, #14532d 70%, #0f2d1a 100%)
        `,
        borderRadius: '40% 60% 55% 45% / 45% 40% 60% 55%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        transform: 'rotate(-8deg)',
      }} />
      {/* Island highlight */}
      <div style={{
        position: 'absolute', left: '15%', top: '30%', width: '35%', height: '25%',
        background: 'radial-gradient(ellipse, rgba(74,222,128,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'rotate(-8deg)',
      }} />

      {/* Palm tree left */}
      <svg style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2 }} width="100" height="260" viewBox="0 0 100 260">
        <path d="M42,260 Q40,200 46,155 Q50,125 55,105" stroke="#1a3d10" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M55,105 Q28,82 5,78 Q28,94 34,112" fill="#1a5e14" />
        <path d="M55,105 Q30,72 18,52 Q42,70 46,88" fill="#228b22" />
        <path d="M55,105 Q58,65 54,42 Q64,65 62,82" fill="#2ea82e" />
        <path d="M55,105 Q82,75 98,68 Q78,86 70,100" fill="#228b22" />
        <path d="M55,105 Q88,92 105,88 Q82,100 74,112" fill="#1a5e14" />
        <ellipse cx="54" cy="108" rx="5" ry="3" fill="rgba(255,140,0,0.6)" />
        <ellipse cx="58" cy="112" rx="4" ry="2.5" fill="rgba(255,160,0,0.5)" />
      </svg>

      {/* Palm tree right */}
      <svg style={{ position: 'absolute', right: -10, bottom: 0, zIndex: 2 }} width="110" height="270" viewBox="0 0 110 270">
        <path d="M68,270 Q65,205 60,158 Q56,128 52,108" stroke="#1a3d10" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M52,108 Q76,84 100,80 Q76,96 72,114" fill="#1a5e14" />
        <path d="M52,108 Q72,74 85,54 Q60,72 56,90" fill="#228b22" />
        <path d="M52,108 Q48,68 52,44 Q42,68 44,84" fill="#2ea82e" />
        <path d="M52,108 Q25,78 8,72 Q30,88 38,102" fill="#228b22" />
        <ellipse cx="52" cy="110" rx="5" ry="3" fill="rgba(255,140,0,0.6)" />
      </svg>

      {/* Dramatic sky glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 15%, rgba(251,146,60,0.35) 0%, rgba(220,38,38,0.2) 25%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Gold light streak */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} viewBox="0 0 720 320" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="goldStreak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
            <stop offset="40%" stopColor="#FFD700" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#FFA500" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.1" />
          </linearGradient>
          <filter id="pinShadow"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" /></filter>
        </defs>
        {/* Gold trail streaks */}
        <path d="M130,300 Q240,220 360,170 Q470,128 625,88" stroke="rgba(255,215,0,0.5)" strokeWidth="4" fill="none" />
        <path d="M130,300 Q240,220 360,170 Q470,128 625,88" stroke="rgba(255,215,0,0.15)" strokeWidth="12" fill="none" />

        {/* Drop pins */}
        {pins.slice(0, pinCount).map((p, i) => (
          <g key={i} filter="url(#pinShadow)">
            {/* Pin body */}
            <defs>
              <radialGradient id={`pinG${i}`} cx="35%" cy="25%">
                <stop offset="0%" stopColor="#FFE566" />
                <stop offset="50%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            <path
              d={`M${p.x},${p.y + 1} C${p.x - 11},${p.y - 10} ${p.x - 13},${p.y - 22} ${p.x - 13},${p.y - 28} A13,15 0 0,1 ${p.x + 13},${p.y - 28} C${p.x + 13},${p.y - 22} ${p.x + 11},${p.y - 10} ${p.x},${p.y + 1}`}
              fill={`url(#pinG${i})`} stroke="#A07010" strokeWidth="0.8"
            />
            <circle cx={p.x} cy={p.y - 28} r="5.5" fill="rgba(255,255,255,0.3)" />
            {/* Glow ring */}
            <ellipse cx={p.x} cy={p.y + 2} rx="6" ry="2" fill="rgba(212,160,23,0.4)" />
          </g>
        ))}
      </svg>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 3,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 20, letterSpacing: 2 }}>•••</span>
          <span style={{ color: '#FFD700', fontSize: 26, fontWeight: 900, textShadow: '0 0 16px rgba(255,215,0,0.6)' }}>
            {(pinCount * 207).toLocaleString()}
          </span>
        </div>
        <button style={{
          backgroundColor: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
          padding: '11px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(220,20,60,0.55)', letterSpacing: '0.02em',
        }}>
          Assign Emergency Task
        </button>
      </div>
    </div>
  );
}

export default function OutdoorAgentsPage() {
  const [pinCount, setPinCount] = useState(18);

  useEffect(() => {
    const t = setInterval(() => setPinCount(c => Math.min(c + 1, 20)), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: '#0A0F1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Top red header bar */}
      <div style={{
        background: 'linear-gradient(90deg,#DC143C 0%,#9B1C1C 100%)',
        padding: '9px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'white', fontSize: 15, fontWeight: 800 }}>Campaign 365</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Client Web Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500 }}>St. Kitts Nevis Labour Party (SKNLP)</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
        </div>
      </div>

      {/* Page title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 0' }}>
        <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>
          Outdoor Agents &amp; Runners — Election Day
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {['🔍', '⚙', '⋯'].map((icon, i) => (
            <button key={i} style={{
              width: 36, height: 36, borderRadius: 8,
              backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#94A3B8', cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{icon}</button>
          ))}
        </div>
      </div>

      {/* Sub-header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 18px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg viewBox="0 0 30 20" width="22" height="15" style={{ borderRadius: 2 }}>
            <polygon points="0,20 30,20 0,0" fill="#009E60" />
            <polygon points="30,0 30,20 0,0" fill="#CE1126" />
            <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
            <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
            <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
          </svg>
          <span style={{ color: '#94A3B8', fontSize: 12 }}>St. Kitts Nevis Labour Party (SKNLP)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#64748B', fontSize: 12 }}>Ssterhl Field Logistics</span>
          <span style={{ color: '#475569', fontSize: 12 }}>▼ 120 X ▶</span>
        </div>
      </div>

      <div style={{ padding: '12px 18px 20px' }}>
        {/* Island map */}
        <IslandMap pinCount={pinCount} />

        {/* Runner cards */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '14px 0 4px', scrollbarWidth: 'none' }}>
          {RUNNERS.map(r => <RunnerCard key={r.id} r={r} />)}
        </div>
      </div>
    </div>
  );
}
