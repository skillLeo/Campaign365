'use client';
import { useState, useEffect, useRef } from 'react';

function LiveBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      backgroundColor: '#DC143C', color: 'white',
      borderRadius: 4, padding: '3px 9px', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white', display: 'inline-block' }} />
      LIVE
    </span>
  );
}

// St Kitts & Nevis map — red for SKNLP, grey for opposition
function SKNMap() {
  // Simplified but recognizable St Kitts shape
  const sknlpSeats = [
    // St Kitts constituencies (8 paths)
    'M155,55 Q185,40 218,45 Q240,52 243,72 Q234,90 210,96 Q183,100 162,86 Q143,70 155,55 Z',
    'M218,45 Q248,35 272,44 Q290,55 288,76 Q275,90 252,92 Q234,88 243,72 Z',
    'M142,88 Q162,100 183,108 Q172,132 150,138 Q128,132 122,112 Q126,96 142,88 Z',
    'M183,108 Q205,110 226,104 Q236,124 228,142 Q208,150 188,145 Q174,134 172,132 Z',
    'M226,104 Q250,100 270,106 Q278,126 266,142 Q246,150 230,144 Q220,128 226,104 Z',
    'M148,140 Q168,148 188,153 Q178,172 158,178 Q136,172 128,154 Q132,144 148,140 Z',
    // Nevis (2 seats — SKNLP)
    'M400,130 Q422,118 445,128 Q454,148 438,164 Q416,172 396,158 Q385,144 400,130 Z',
    'M396,158 Q416,172 432,180 Q422,198 402,202 Q382,196 376,180 Q380,166 396,158 Z',
  ];
  const oppSeats = [
    // 3 opposition
    'M272,44 Q300,34 324,44 Q338,56 334,78 Q318,92 292,92 Q275,88 288,76 Z',
    'M270,106 Q294,104 314,112 Q320,132 305,146 Q284,152 268,144 Q260,128 270,106 Z',
    'M445,128 Q466,118 485,130 Q490,150 472,164 Q452,170 438,164 Z',
  ];

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0c1830 0%,#0e1c38 50%,#0a1428 100%)',
      border: '1px solid rgba(220,20,60,0.18)', borderRadius: 12, overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} viewBox="0 0 560 240">
        <defs>
          <pattern id="egrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="560" height="240" fill="url(#egrid)" />
      </svg>

      <svg viewBox="0 0 560 240" width="100%" style={{ display: 'block' }}>
        <defs>
          <filter id="redGlow2">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="mapGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC143C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#DC143C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Red aura */}
        <ellipse cx="230" cy="120" rx="140" ry="90" fill="url(#mapGlow2)" />
        <ellipse cx="420" cy="160" rx="65" ry="50" fill="url(#mapGlow2)" opacity="0.7" />

        {/* SKNLP wins */}
        {sknlpSeats.map((d, i) => (
          <g key={i}>
            <path d={d} fill="#DC143C" stroke="#ff5555" strokeWidth="1.2" opacity="0.9" />
            <path d={d} fill="rgba(255,80,80,0.12)" stroke="none" filter="url(#redGlow2)" />
          </g>
        ))}
        {/* Opposition */}
        {oppSeats.map((d, i) => (
          <path key={i} d={d} fill="#374151" stroke="#4B5563" strokeWidth="1.2" opacity="0.75" />
        ))}

        {/* Island labels */}
        <text x="232" y="30" fill="rgba(255,255,255,0.45)" fontSize="10" fontWeight="700" textAnchor="middle">ST. KITTS</text>
        <text x="432" y="116" fill="rgba(255,255,255,0.45)" fontSize="10" fontWeight="700" textAnchor="middle">NEVIS</text>
        {/* Channel */}
        <path d="M338,82 Q370,100 386,118" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,4" fill="none" />

        {/* Legend */}
        <rect x="400" y="218" width="12" height="10" rx="2" fill="#DC143C" />
        <text x="416" y="227" fill="rgba(255,255,255,0.6)" fontSize="9">SKNLP</text>
        <rect x="455" y="218" width="12" height="10" rx="2" fill="#374151" />
        <text x="471" y="227" fill="rgba(255,255,255,0.6)" fontSize="9">Opposition</text>
      </svg>
    </div>
  );
}

const ROWS_INIT = [
  { constituency: 'St. Kitts Nevis',     live: 46080, pct: '0.299', volunteer: 'Aneck-In Check-in',         feed: '02:39' },
  { constituency: 'St. Kitts & Nevis',   live: 46942, pct: '0.299', volunteer: 'VolunteeLabour Party',      feed: '02:49' },
  { constituency: 'SKNLP SKNLP',         live: 46830, pct: '0.295', volunteer: 'Volunteer/Runner Check-in', feed: '02:39' },
  { constituency: 'St. Kitts & Nevis',   live: 46820, pct: '0.299', volunteer: 'Volunteer Labour Party',    feed: '02:49' },
  { constituency: '↓ St. Kitts & Nevis', live: 46840, pct: '0.299', volunteer: 'Volunteer Labour Party',    feed: '02:44' },
];

const AI_MSGS = [
  'SKNLP on track for historic 9-seat majority.',
  'Mobilise final runners to Constituency 3 — lagging.',
  'NV-2 turnout at 52% — urgent push needed.',
  'Victory probability: 94% based on current returns.',
];

export default function ElectionDayLivePage() {
  const [rows, setRows] = useState(ROWS_INIT);
  const [celebrated, setCelebrated] = useState(false);
  const [aiIdx, setAiIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setRows(prev => prev.map(r => ({ ...r, live: r.live + Math.floor(Math.random() * 22 + 4) })));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAiIdx(i => (i + 1) % AI_MSGS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif", position: 'relative' }}>

      {/* Fireworks celebration — top right */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 260, height: 190,
        pointerEvents: 'none', zIndex: 10, overflow: 'hidden',
      }}>
        {/* Dark night sky */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 65% 20%, #1a0d5c 0%, #0d0824 45%, transparent 70%)',
        }} />
        {/* Fireworks sparkles */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 260 190">
          {[
            { cx: 90,  cy: 35, r: 22, color: '#FFD700' },
            { cx: 155, cy: 20, r: 18, color: '#FF6B6B' },
            { cx: 210, cy: 50, r: 24, color: '#60A5FA' },
            { cx: 130, cy: 70, r: 16, color: '#4ADE80' },
            { cx: 195, cy: 100, r: 20, color: '#FFD700' },
          ].map((fw, fi) => (
            <g key={fi}>
              {Array.from({ length: 10 }, (_, j) => {
                const angle = (j / 10) * 2 * Math.PI;
                return (
                  <line key={j}
                    x1={fw.cx} y1={fw.cy}
                    x2={fw.cx + fw.r * Math.cos(angle)}
                    y2={fw.cy + fw.r * Math.sin(angle)}
                    stroke={fw.color} strokeWidth="1.5" opacity="0.75"
                  />
                );
              })}
              <circle cx={fw.cx} cy={fw.cy} r="2.5" fill={fw.color} opacity="0.9" />
            </g>
          ))}
        </svg>
        {/* SKNLP flag waving */}
        <div style={{ position: 'absolute', right: 18, top: 14, transform: 'rotate(-6deg)' }}>
          <svg viewBox="0 0 30 20" width="88" height="60" style={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            <polygon points="0,20 30,20 0,0" fill="#009E60" />
            <polygon points="30,0 30,20 0,0" fill="#CE1126" />
            <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
            <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
            <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
          </svg>
        </div>
        {/* Crowd silhouette */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
          background: 'linear-gradient(0deg, rgba(30,10,80,0.8) 0%, transparent 100%)',
        }} />
      </div>

      {/* Red header */}
      <div style={{
        background: 'linear-gradient(90deg, #991B1B 0%, #7F1D1D 100%)',
        padding: '14px 20px',
      }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0 }}>
          Election Day Live Results — April 25, 2026
        </h1>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '9px 18px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.07)', padding: '5px 13px', borderRadius: 6,
        }}>
          <LiveBadge />
          <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>SKNLP Leading 8/11 Seats</span>
        </div>
        <span style={{ color: '#475569' }}>•</span>
        <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>Turnout 78%</span>
        <span style={{ color: '#475569' }}>•</span>
        <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>Final Projection: 9 Seats</span>
        <div style={{ marginLeft: 'auto' }}>
          <LiveBadge />
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 270px', gap: 14, padding: 14 }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SKNMap />

          {/* Leaderboard */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1.5fr 85px 65px 1.4fr 65px',
              padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)',
              color: '#475569', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              <span>Leaderboard</span><span>Live</span><span>Vote</span><span>Volunteer/Runner</span><span>Feed</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1.5fr 85px 65px 1.4fr 65px',
                padding: '9px 14px', alignItems: 'center',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{ color: '#C9D1DA', fontSize: 12, fontWeight: 600 }}>{r.constituency}</span>
                <span style={{ color: '#4ADE80', fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {r.live.toLocaleString()}
                </span>
                <span style={{ color: '#475569', fontSize: 12 }}>00.00</span>
                <span style={{ color: '#4ADE80', fontSize: 12 }}>{r.pct}</span>
                <span style={{ color: '#94A3B8', fontSize: 11 }}>{r.feed}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Seats won */}
          <div style={{
            background: 'rgba(220,20,60,0.08)', border: '1px solid rgba(220,20,60,0.22)',
            borderRadius: 12, padding: '16px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>SKNLP Seats Won</p>
            <p style={{ color: '#DC143C', fontSize: 46, fontWeight: 900, margin: '0 0 2px', lineHeight: 1 }}>8</p>
            <p style={{ color: '#475569', fontSize: 11, margin: '0 0 10px' }}>of 11 Constituencies</p>
            <div style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 4 }}>
              <div style={{ width: `${(8 / 11) * 100}%`, height: '100%', backgroundColor: '#DC143C', borderRadius: 4 }} />
            </div>
          </div>

          {/* Turnout */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '14px 16px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>National Turnout</p>
            <p style={{ color: '#4ADE80', fontSize: 34, fontWeight: 900, margin: '0 0 6px' }}>78%</p>
            <div style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
              <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg,#4ADE80,#22C55E)', borderRadius: 4 }} />
            </div>
          </div>

          {/* Grok AI */}
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 20 }}>🤖</div>
              <div>
                <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: 0 }}>Grok AI</p>
                <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Instant Insights</p>
              </div>
            </div>
            <div style={{
              background: 'rgba(220,20,60,0.07)', border: '1px solid rgba(220,20,60,0.14)',
              borderRadius: 8, padding: '10px 12px', minHeight: 56,
            }}>
              <p style={{ color: '#E2E8F0', fontSize: 12, margin: 0, lineHeight: 1.55 }}>{AI_MSGS[aiIdx]}</p>
            </div>
            <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
              {AI_MSGS.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 3,
                  backgroundColor: i === aiIdx ? '#DC143C' : 'rgba(255,255,255,0.12)',
                  transition: 'background-color 0.3s',
                }} />
              ))}
            </div>
          </div>

          {/* Celebrate Victory */}
          <button
            onClick={() => setCelebrated(c => !c)}
            style={{
              width: '100%', backgroundColor: celebrated ? '#166534' : '#DC143C',
              color: 'white', border: 'none', borderRadius: 10,
              padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
              boxShadow: celebrated ? '0 4px 20px rgba(34,197,94,0.5)' : '0 4px 20px rgba(220,20,60,0.5)',
              transition: 'all 0.3s', letterSpacing: '0.02em',
            }}
          >
            {celebrated ? '🎉 Victory Celebrated!' : 'Celebrate Victory'}
          </button>
        </div>
      </div>
    </div>
  );
}
