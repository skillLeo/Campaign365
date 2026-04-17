'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ─── Shield pin positions ───────────────────────────────────────── */
const ORANGE_PINS = [
  { x: 320, y: 100 }, { x: 378, y: 88  }, { x: 435, y: 95  },
  { x: 298, y: 148 }, { x: 358, y: 155 }, { x: 418, y: 148 },
  { x: 276, y: 205 }, { x: 335, y: 212 }, { x: 305, y: 260 },
  { x: 268, y: 312 }, { x: 318, y: 332 }, { x: 260, y: 370 },
];
const RED_PINS = [
  { x: 348, y: 198 }, { x: 392, y: 178 },
  { x: 360, y: 298 }, { x: 415, y: 310 },
];

/* ─── Shield pin SVG ─────────────────────────────────────────────── */
function ShieldPin({ x, y, urgent }: { x: number; y: number; urgent?: boolean }) {
  const color  = urgent ? '#DC143C' : '#EA580C';
  const glow   = urgent ? '#DC143C' : '#EA580C';
  const size   = urgent ? 18 : 16;
  return (
    <g style={{ filter: `drop-shadow(0 0 ${urgent ? 6 : 4}px ${glow})` }}>
      {/* Outer glow ring */}
      <circle cx={x} cy={y - 2} r={size * 1.5} fill={`${color}22`} />
      {/* Shield shape */}
      <path
        d={`M${x},${y - size} L${x + size * 0.85},${y - size * 0.5}
            L${x + size * 0.85},${y + size * 0.1}
            Q${x + size * 0.85},${y + size * 0.7} ${x},${y + size}
            Q${x - size * 0.85},${y + size * 0.7} ${x - size * 0.85},${y + size * 0.1}
            L${x - size * 0.85},${y - size * 0.5} Z`}
        fill={color}
        stroke={urgent ? '#FF4060' : '#FF7A2A'}
        strokeWidth="1"
      />
      {/* Bolt icon */}
      <text x={x} y={y + 5} textAnchor="middle"
        fill="white" fontSize={size * 0.75} fontWeight="900"
        fontFamily="Arial, sans-serif">⚡</text>
    </g>
  );
}

/* ─── Panic Map SVG ──────────────────────────────────────────────── */
function PanicMap() {
  return (
    <svg viewBox="0 0 660 420" style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pmBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#1C2535" />
          <stop offset="100%" stopColor="#0A1018" />
        </radialGradient>
        <filter id="psShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,0.6)" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="660" height="420" fill="url(#pmBg)" />

      {/* Grid lines (street-map feel) */}
      {[60,100,140,180,220,260,300,340,380].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="660" y2={y}
          stroke="#1A2535" strokeWidth="0.5" opacity="0.5" />
      ))}
      {[60,120,180,240,300,360,420,480,540,600].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420"
          stroke="#1A2535" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Ocean */}
      <rect width="660" height="420" fill="rgba(10,25,50,0.45)" />

      {/* ── St. Kitts island ─────────────────────────── */}
      <path
        d="M 230,65
           C 252,48 278,42 305,46 C 330,50 352,62 372,72
           C 395,83 418,93 440,102 C 460,110 478,118 490,130
           C 502,142 506,156 502,170 C 498,184 486,194 472,200
           C 456,207 438,208 420,206 C 402,204 384,196 366,188
           C 346,179 326,169 306,162 C 284,154 262,149 242,148
           C 222,147 204,150 190,160 C 176,170 168,184 166,200
           C 162,216 165,232 172,244 C 158,234 146,218 140,200
           C 134,182 136,162 144,144 C 152,126 166,110 182,98
           C 200,84 222,72 230,65 Z"
        fill="#2A3040" stroke="#3A4055" strokeWidth="1.2"
        filter="url(#psShadow)" opacity="0.95"
      />
      {/* Constituency grid lines on island */}
      <path d="M 268,55 C 265,100 263,148 262,190 C 261,225 262,250 265,275"
        fill="none" stroke="#3A4258" strokeWidth="1" opacity="0.6" />
      <path d="M 348,72 C 345,115 342,162 341,202 C 340,238 341,262 344,282"
        fill="none" stroke="#3A4258" strokeWidth="1" opacity="0.5" />
      <path d="M 175,162 C 230,158 290,156 350,158 C 400,160 440,164 490,168"
        fill="none" stroke="#3A4258" strokeWidth="0.8" opacity="0.4" />
      <path d="M 170,202 C 225,198 285,196 345,198 C 395,200 435,204 485,208"
        fill="none" stroke="#3A4258" strokeWidth="0.8" opacity="0.4" />

      {/* SE peninsula */}
      <path
        d="M 310,290 C 325,305 340,322 350,342 C 358,358 360,374 352,385
           C 344,394 330,396 318,390 C 304,383 294,368 290,352
           C 286,336 290,318 302,306 Z"
        fill="#2A3040" stroke="#3A4055" strokeWidth="1" opacity="0.9"
      />

      {/* Nevis */}
      <ellipse cx="555" cy="330" rx="48" ry="42"
        fill="#2A3040" stroke="#3A4055" strokeWidth="1"
        filter="url(#psShadow)" opacity="0.85" />

      {/* Map place labels */}
      {[
        { x: 420, y: 58,  label: 'Basseterre',    size: 9  },
        { x: 498, y: 72,  label: 'Ougaoce',        size: 8  },
        { x: 355, y: 172, label: 'St. Kitts & Nevis', size: 8 },
        { x: 210, y: 320, label: 'Palbs',           size: 8  },
        { x: 295, y: 358, label: 'Pallire',          size: 8  },
        { x: 378, y: 368, label: 'Gardle',           size: 8  },
        { x: 488, y: 230, label: 'Crohwon',          size: 8  },
        { x: 555, y: 215, label: 'Jolt dey',         size: 8  },
        { x: 590, y: 155, label: 'Mc...',             size: 8  },
      ].map(({ x, y, label, size }) => (
        <text key={label} x={x} y={y} fill="rgba(180,200,220,0.55)"
          fontSize={size} fontFamily="Inter, sans-serif" textAnchor="middle">{label}</text>
      ))}

      {/* Pins */}
      {ORANGE_PINS.map((p, i) => <ShieldPin key={`o${i}`} x={p.x} y={p.y} />)}
      {RED_PINS.map((p, i)    => <ShieldPin key={`r${i}`} x={p.x} y={p.y} urgent />)}

      {/* Bottom label */}
      <text x="170" y="408" fill="rgba(180,200,220,0.6)"
        fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">Poniecyy</text>

      {/* Map controls */}
      <g>
        <rect x="630" y="278" width="24" height="24" rx="4"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <text x="642" y="295" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">+</text>
        <rect x="630" y="306" width="24" height="24" rx="4"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <text x="642" y="323" textAnchor="middle" fill="white" fontSize="16">−</text>
        <rect x="630" y="334" width="24" height="24" rx="4"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <text x="642" y="350" textAnchor="middle" fill="rgba(200,220,255,0.7)" fontSize="12">◇</text>
      </g>
    </svg>
  );
}

/* ─── Emergency contacts ─────────────────────────────────────────── */
const CONTACTS = [
  { name: 'Pah Ki...',  color: '#CC1525' },
  { name: 'Doboworn',   color: '#2563EB' },
  { name: 'Nahowon',    color: '#16A34A' },
  { name: 'Labures',    color: '#9333EA' },
  { name: 'Laburer',    color: '#EA580C' },
  { name: 'Filt',       color: '#0EA5E9' },
];

/* ─── Incident rows ──────────────────────────────────────────────── */
const INCIDENTS = [
  { time: '10:45 AM', user: 'John Doe', role: 'Field Organizer', lat: '17.2975', lng: '-62.7310' },
  { time: '10:45 AM', user: 'John Doe', role: 'Field Organizer', lat: '17.2975', lng: '-62.7310' },
  { time: '10:45 AM', user: 'John Doe', role: 'Field Organizer', lat: '17.2975', lng: '-62.7310' },
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default function PanicAlertsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0C0F18',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* ── Red banner ───────────────────────────────── */}
      <div style={{
        backgroundColor: '#CC1525',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <h1 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
          Panic Alerts Center
        </h1>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* ── Sub-header ───────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: '1px solid #1A2235',
        backgroundColor: '#0E1220',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            backgroundColor: '#CC1525',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 10, color: 'white', fontWeight: 800 }}>⚡</span>
          </div>
          <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 600 }}>
            2 Active Panic Buttons
          </span>
          <span style={{ fontSize: 13, color: '#64748B' }}>•</span>
          <span style={{ fontSize: 13, color: '#64748B' }}>All Teams Safe</span>
        </div>

        {/* Siall dropdown */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          backgroundColor: '#1A2235', border: '1px solid #2A3450',
          borderRadius: 7, padding: '6px 12px', cursor: 'pointer',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#E8192C' }} />
          <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>Siall</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Map + Emergency Contacts ──────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 230px',
        gap: 0,
        padding: '12px 20px',
      }}>

        {/* Map */}
        <div style={{
          backgroundColor: '#0A1018',
          borderRadius: '10px 0 0 10px',
          overflow: 'hidden',
          border: '1px solid #1E2A42',
          borderRight: 'none',
          position: 'relative',
        }}>
          {/* Map label */}
          <div style={{
            position: 'absolute', top: 10, left: 10, zIndex: 10,
            backgroundColor: 'rgba(10,16,30,0.85)',
            border: '1px solid #2A3450',
            borderRadius: 7, padding: '7px 10px',
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              backgroundColor: '#CC1525',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 9, color: 'white', fontWeight: 900 }}>⚡</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#E2E8F0' }}>St. Kitts &amp; Nevis</p>
              <p style={{ margin: 0, fontSize: 9,  color: '#64748B' }}>Labour Party</p>
            </div>
          </div>

          {/* Close button */}
          <button style={{
            position: 'absolute', top: 10, right: 10, zIndex: 10,
            width: 24, height: 24, borderRadius: '50%',
            backgroundColor: '#1A2235', border: '1px solid #2A3450',
            color: '#94A3B8', fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          <div style={{ height: 340 }}>
            <PanicMap />
          </div>
        </div>

        {/* Emergency Contacts */}
        <div style={{
          backgroundColor: '#0E1220',
          borderRadius: '0 10px 10px 0',
          border: '1px solid #1E2A42',
          padding: '14px 14px 10px',
          display: 'flex', flexDirection: 'column',
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
            Emergency Contacts
          </h3>

          {/* Contacts list */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 12 }}>
            {CONTACTS.map(({ name, color }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 8px', borderRadius: 6, cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#1A2235'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
              >
                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: color, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: 'white',
                }}>
                  {name.charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#CBD5E1' }}>SKNLP</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748B' }}>{name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* One-Tap Resolve button */}
          <button style={{
            width: '100%', padding: '10px 0',
            backgroundColor: '#CC1525', color: 'white',
            border: 'none', borderRadius: 7,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            letterSpacing: '0.01em',
          }}>
            One-Tap Resolve
          </button>
        </div>
      </div>

      {/* ── Incident Log ──────────────────────────────── */}
      <div style={{ padding: '4px 20px 24px' }}>
        {/* Table header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10,
        }}>
          {/* Incident Log dropdown */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#141B2D', border: '1px solid #1E2A42',
            borderRadius: 7, padding: '7px 12px', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Incident Log</span>
            <span style={{ fontSize: 14 }}>🔔</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Peourt dropdown */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#141B2D', border: '1px solid #1E2A42',
            borderRadius: 7, padding: '7px 12px', cursor: 'pointer',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#E8192C' }} />
            <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>Peourt</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: '#0E1220',
          borderRadius: 10,
          border: '1px solid #1E2A42',
          overflow: 'hidden',
        }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '120px 130px 160px 180px 100px 1fr',
            padding: '10px 16px',
            borderBottom: '1px solid #1A2235',
            backgroundColor: '#0A1018',
          }}>
            {['Time', 'User', 'Role', 'Location (GPS)', 'Status', 'Response Actions'].map((h, i) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.03em' }}>{h}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            ))}
          </div>

          {/* Rows */}
          {INCIDENTS.map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '120px 130px 160px 180px 100px 1fr',
              padding: '12px 16px',
              borderBottom: i < INCIDENTS.length - 1 ? '1px solid #131A28' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{row.time}</span>
              <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{row.user}</span>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>{row.role}</span>
              <span style={{ fontSize: 13, color: '#94A3B8', fontFamily: 'monospace' }}>
                {row.lat}, {row.lng}
              </span>
              {/* Active badge */}
              <span style={{
                display: 'inline-block', padding: '3px 12px',
                backgroundColor: '#16A34A', color: 'white',
                borderRadius: 5, fontSize: 12, fontWeight: 700,
              }}>Active</span>
              {/* Response action */}
              <span style={{
                fontSize: 13, color: '#3B82F6', fontWeight: 600, cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.textDecoration = 'underline'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.textDecoration = 'none'; }}
              >Contact Team</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
