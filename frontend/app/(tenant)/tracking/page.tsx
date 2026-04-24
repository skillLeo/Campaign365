'use client';
import { useState } from 'react';

/* ─── Pin positions on the map ──────────────────────────────────── */
const RED_PINS = [
  { x: 370, y: 120 }, { x: 420, y: 105 }, { x: 465, y: 130 },
  { x: 340, y: 160 }, { x: 395, y: 158 }, { x: 448, y: 168 },
  { x: 318, y: 200 }, { x: 362, y: 210 }, { x: 408, y: 218 },
  { x: 350, y: 258 }, { x: 388, y: 268 }, { x: 425, y: 260 },
  { x: 332, y: 298 }, { x: 372, y: 312 }, { x: 406, y: 305 },
  { x: 348, y: 350 }, { x: 385, y: 358 }, { x: 415, y: 345 },
  { x: 356, y: 395 }, { x: 390, y: 405 },
];

const GOLD_PINS = [
  { x: 450, y: 150 }, { x: 480, y: 195 },
  { x: 455, y: 310 }, { x: 510, y: 340 },
  { x: 470, y: 380 }, { x: 500, y: 400 },
];

/* Lines connecting gold pins (runner routes) */
const ROUTES = [
  [{ x: 480, y: 195 }, { x: 510, y: 340 }, { x: 470, y: 380 }, { x: 500, y: 400 }],
  [{ x: 450, y: 150 }, { x: 455, y: 310 }],
];

/* ─── SVG pin components ─────────────────────────────────────────── */
function RedPin({ x, y }: { x: number; y: number }) {
  const r = 8;
  const path = `M${x},${y + r * 2.1} C${x - r * 0.8},${y + r * 1.3} ${x - r * 1.4},${y + r * 0.5} ${x - r * 1.4},${y} A${r * 1.4},${r * 1.4} 0 1 1 ${x + r * 1.4},${y} C${x + r * 1.4},${y + r * 0.5} ${x + r * 0.8},${y + r * 1.3} ${x},${y + r * 2.1}Z`;
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.8} fill="rgba(220,20,60,0.15)" />
      <circle cx={x} cy={y} r={r * 2.0} fill="rgba(220,20,60,0.22)" />
      <path d={path} fill="#DC143C" style={{ filter: 'drop-shadow(0 0 5px #DC143C)' }} />
      <circle cx={x} cy={y} r={r * 0.38} fill="white" opacity={0.9} />
    </g>
  );
}

function GoldPin({ x, y }: { x: number; y: number }) {
  const r = 7;
  const path = `M${x},${y + r * 2.1} C${x - r * 0.8},${y + r * 1.3} ${x - r * 1.4},${y + r * 0.5} ${x - r * 1.4},${y} A${r * 1.4},${r * 1.4} 0 1 1 ${x + r * 1.4},${y} C${x + r * 1.4},${y + r * 0.5} ${x + r * 0.8},${y + r * 1.3} ${x},${y + r * 2.1}Z`;
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.4} fill="rgba(234,179,8,0.18)" />
      <path d={path} fill="#EAB308" style={{ filter: 'drop-shadow(0 0 6px #EAB308)' }} />
      <circle cx={x} cy={y} r={r * 0.35} fill="white" opacity={0.9} />
    </g>
  );
}

/* ─── Map SVG ────────────────────────────────────────────────────── */
function LiveMap() {
  return (
    <svg viewBox="0 0 700 500" style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mapBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#1A2A4A" />
          <stop offset="100%" stopColor="#070D1A" />
        </radialGradient>
        <radialGradient id="oceanGrad" cx="50%" cy="80%" r="60%">
          <stop offset="0%"   stopColor="#0D2340" />
          <stop offset="100%" stopColor="#040A14" />
        </radialGradient>
        <filter id="islandShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.7)" />
        </filter>
      </defs>

      {/* Sky/background */}
      <rect width="700" height="500" fill="url(#mapBg)" />

      {/* Ocean waves bottom */}
      <path d="M 0,370 Q 100,345 200,360 Q 300,375 400,355 Q 500,335 600,348 Q 650,355 700,345 L 700,500 L 0,500 Z"
        fill="url(#oceanGrad)" opacity="0.9" />
      <path d="M 0,395 Q 120,375 240,388 Q 360,401 480,382 Q 590,365 700,375 L 700,500 L 0,500 Z"
        fill="#060E1E" opacity="0.8" />
      {/* Wave lines */}
      {[405, 420, 435].map((y, i) => (
        <path key={y} d={`M ${i * 60},${y} Q ${100 + i * 40},${y - 8} ${200 + i * 30},${y} Q ${300 + i * 20},${y + 8} ${400},${y}`}
          fill="none" stroke="rgba(100,180,255,0.15)" strokeWidth="1.5" />
      ))}

      {/* Palm trees (stylised) */}
      <g opacity="0.6">
        <line x1="60" y1="420" x2="65" y2="310" stroke="#1A3A1A" strokeWidth="5" />
        <path d="M 65,315 C 30,280 20,260 40,255 C 55,265 65,315 65,315" fill="#1E4A1E" opacity="0.8"/>
        <path d="M 65,315 C 100,278 110,258 90,253 C 75,263 65,315 65,315" fill="#1E4A1E" opacity="0.8"/>
        <path d="M 65,315 C 50,295 38,275 55,268 C 65,275 65,315 65,315" fill="#234A23" opacity="0.7"/>
      </g>
      <g opacity="0.5">
        <line x1="620" y1="430" x2="624" y2="330" stroke="#1A3A1A" strokeWidth="4" />
        <path d="M 624,335 C 595,305 588,288 603,283 C 615,291 624,335 624,335" fill="#1E4A1E" opacity="0.8"/>
        <path d="M 624,335 C 652,303 660,286 645,281 C 633,289 624,335 624,335" fill="#1E4A1E" opacity="0.8"/>
      </g>

      {/* ── St. Kitts Island ──────────────────────── */}
      <path
        d="M 280,95
           C 295,72 320,62 345,66 C 368,70 388,82 408,92
           C 430,103 452,112 472,120 C 492,128 510,134 522,145
           C 534,156 538,170 535,185 C 532,200 522,213 508,222
           C 492,232 472,236 452,235 C 432,234 412,226 394,218
           C 374,209 354,198 335,190 C 314,181 292,175 272,173
           C 252,171 234,174 220,182 C 206,190 196,202 192,216
           C 188,230 190,246 196,258 C 180,248 168,232 162,214
           C 156,196 158,176 165,158 C 172,140 184,124 198,112
           C 214,98 248,90 280,95 Z"
        fill="#3A3F52" stroke="#4A5068" strokeWidth="1"
        filter="url(#islandShadow)" opacity="0.95"
      />
      {/* Constituency lines */}
      <path d="M 300,100 C 298,140 296,180 295,220 C 294,255 295,275 298,300"
        fill="none" stroke="#555A70" strokeWidth="1" opacity="0.6" />
      <path d="M 380,105 C 378,145 376,185 375,225 C 374,258 375,278 378,298"
        fill="none" stroke="#555A70" strokeWidth="1" opacity="0.5" />
      <path d="M 200,175 C 260,172 320,170 380,172 C 430,174 475,178 520,183"
        fill="none" stroke="#555A70" strokeWidth="1" opacity="0.5" />
      <path d="M 195,230 C 255,227 315,225 375,227 C 425,229 468,233 515,238"
        fill="none" stroke="#555A70" strokeWidth="0.8" opacity="0.4" />

      {/* SE peninsula */}
      <path
        d="M 340,330 C 355,340 370,352 382,368 C 392,382 396,398 390,410
           C 382,420 368,424 354,420 C 338,414 326,400 320,384
           C 314,368 316,350 328,338 Z"
        fill="#3A3F52" stroke="#4A5068" strokeWidth="1" opacity="0.9"
      />

      {/* Nevis */}
      <ellipse cx="560" cy="350" rx="45" ry="40"
        fill="#3A3F52" stroke="#4A5068" strokeWidth="1"
        filter="url(#islandShadow)" opacity="0.85" />
      <ellipse cx="560" cy="346" rx="22" ry="18" fill="#484D62" opacity="0.5" />

      {/* Runner route lines */}
      {ROUTES.map((route, ri) => {
        const pts = route.map(p => `${p.x},${p.y}`).join(' ');
        return (
          <polyline key={ri} points={pts}
            fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"
            strokeDasharray="none" />
        );
      })}

      {/* Pins */}
      {RED_PINS.map((p, i) => <RedPin key={`r${i}`} x={p.x} y={p.y} />)}
      {GOLD_PINS.map((p, i) => <GoldPin key={`g${i}`} x={p.x} y={p.y} />)}

      {/* Bottom text */}
      <text x="245" y="468" fill="white" fontSize="13" fontWeight="700"
        fontFamily="Inter, sans-serif">Real-time | Py-tive GPS</text>
      <text x="245" y="484" fill="rgba(255,255,255,0.55)" fontSize="11"
        fontFamily="Inter, sans-serif">Real Kitts Nevis Labour Party</text>

      {/* Map controls */}
      <g>
        <rect x="238" y="560" width="32" height="32" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <text x="254" y="581" textAnchor="middle" fill="white" fontSize="16" fontWeight="300">↺</text>
        <rect x="238" y="598" width="32" height="32" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <text x="254" y="619" textAnchor="middle" fill="white" fontSize="18" fontWeight="300">−</text>
      </g>

      {/* Search dot bottom right */}
      <circle cx="660" cy="468" r="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="660" y="473" textAnchor="middle" fill="white" fontSize="13">⌕</text>
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function TrackingPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const teamStatus = [
    { label: 'Canvasser',      count: 1 },
    { label: 'Cunners Active', count: 1 },
    { label: 'Ruly User',      count: 2 },
    { label: 'Panic Alerts',   count: 4, highlight: true },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0C1220',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* ── Red title banner ──────────────────────────── */}
      <div style={{
        backgroundColor: '#CC1525',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          Live Tracking Dashboard
        </h1>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* ── KPI stats ─────────────────────────────────── */}
      <div className="rg-4" style={{ gap: 12,
        padding: '16px 24px',
      }}>
        {[
          { icon: '●', label: 'Canvassers Online',   value: '47', iconColor: '#EAB308' },
          { icon: '▦', label: 'Runners Active',       value: '12', iconColor: '#EAB308' },
          { icon: '◎', label: 'Total Users Tracked',  value: '89', iconColor: null      },
          { icon: '⚠', label: 'Panic Alerts',         value: '2',  iconColor: null      },
        ].map(({ icon, label, value, iconColor }) => (
          <div key={label} style={{
            backgroundColor: '#141B2D',
            borderRadius: 10,
            padding: '16px 18px',
            border: '1px solid #1E2A42',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 14, color: iconColor || '#E2E8F0' }}>{icon}</span>
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{label}</span>
            </div>
            <p style={{ margin: 0, fontSize: 56, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Map + Right panel ─────────────────────────── */}
      <div className="rg-chart-panel" style={{ gap: 14,
        padding: '0 24px 24px',
        alignItems: 'start',
      }}>

        {/* Map card */}
        <div style={{
          backgroundColor: '#0A1020',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #1E2A42',
          position: 'relative',
        }}>
          {/* Map header */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1E2A42',
            backgroundColor: '#0E1520',
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                St. Kitts &amp; Nevis
              </h3>
              <div style={{ display: 'flex', gap: 14, marginTop: 5 }}>
                {[
                  { color: '#DC143C', label: 'Canvasser' },
                  { color: '#EAB308', label: 'Runners'   },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', backgroundColor: color,
                      boxShadow: `0 0 6px ${color}`,
                    }} />
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map controls top-right */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['⊡', '—', '⊕'].map((icon, i) => (
                <button key={i} style={{
                  width: 30, height: 30,
                  backgroundColor: '#1A2438',
                  border: '1px solid #2A3650',
                  borderRadius: 6, color: '#94A3B8',
                  fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Map SVG */}
          <div style={{ height: 480 }}>
            <LiveMap />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Live Team Status */}
          <div style={{
            backgroundColor: '#141B2D',
            borderRadius: 10,
            border: '1px solid #1E2A42',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #1E2A42',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>Live Team Status</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {teamStatus.map(({ label, count, highlight }, i) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 16px',
                borderBottom: i < teamStatus.length - 1 ? '1px solid #1A2235' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Avatar placeholder */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: '#1E2A42',
                    border: '1px solid #2A3A52',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <svg viewBox="0 0 30 30" width="30" height="30">
                      <circle cx="15" cy="15" r="15" fill="#1E2A42" />
                      <circle cx="15" cy="12" r="5" fill="#3A4A62" />
                      <path d="M 6,28 Q 15,22 24,28" fill="#3A4A62" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{label}</span>
                </div>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>··{count}</span>
              </div>
            ))}
          </div>

          {/* Active Panic Alerts */}
          <div style={{
            backgroundColor: '#141B2D',
            borderRadius: 10,
            border: '1px solid #1E2A42',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #1E2A42' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>Active Panic Alerts</span>
            </div>

            {[1, 2].map(i => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 16px',
                borderBottom: i === 1 ? '1px solid #1A2235' : 'none',
                backgroundColor: i === 1 ? '#2A1A0A' : 'transparent',
                borderLeft: i === 1 ? '3px solid #EA580C' : '3px solid transparent',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  backgroundColor: '#EA580C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 12, color: 'white', fontWeight: 800 }}>!</span>
                </div>
                <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>Active Panic Alerts</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
