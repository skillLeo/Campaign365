'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ─── Mock Data ────────────────────────────────────────────────── */
const VOTERS = [
  { id: 1,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#0F172A', status: 'Support'   },
  { id: 2,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#0F172A', status: 'Undecided' },
  { id: 3,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#0F172A', status: 'Undecided' },
  { id: 4,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#001050', status: 'Support'   },
  { id: 5,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#001002', status: 'Support'   },
  { id: 6,  name: 'Voter Name',   address: 'St. Kitts Nevis Labour Party', code: '#011008', status: 'Support'   },
  { id: 7,  name: 'Voter Name',   address: '4. Kitts Nevis (SKNLP)',       code: '#02556',  status: 'Support'   },
  { id: 8,  name: 'Voter Pharme', address: 'SKitts Nevis Labour Party',    code: '#04920',  status: 'Support'   },
  { id: 9,  name: 'Voter Pharme', address: 'St. Kitts Nevis Labour Party', code: '#02529',  status: 'Support'   },
  { id: 10, name: 'Voter Pharme', address: 'St. Kitts Nevis Labour Party', code: '#02956',  status: 'Oppose'    },
];

/* ─── Status badge ─────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    Support:   { backgroundColor: '#16A34A', color: '#fff' },
    Undecided: { backgroundColor: '#0EA5E9', color: '#fff' },
    Oppose:    { backgroundColor: '#1E293B', color: '#CBD5E1' },
  };
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 14px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.01em',
      ...styles[status],
    }}>
      {status}
    </span>
  );
}

/* ─── Dark City Map SVG ────────────────────────────────────────── */
function WalkMap() {
  /* Pin positions (x,y) scattered across the map */
  const pins = [
    { x: 128, y: 68 },
    { x: 188, y: 52 },
    { x: 225, y: 82 },
    { x: 265, y: 55 },
    { x: 300, y: 92 },
    { x: 280, y: 130 },
    { x: 248, y: 165 },
    { x: 200, y: 148 },
    { x: 160, y: 175 },
    { x: 135, y: 140 },
    { x: 108, y: 105 },
    { x: 320, y: 148 },
    { x: 340, y: 190 },
  ];

  return (
    <svg
      viewBox="0 0 400 260"
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
        </filter>
        <filter id="pinGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Grid pattern for city blocks */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E3A5F" strokeWidth="0.4" opacity="0.6"/>
        </pattern>
        <pattern id="fineGrid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#162D4A" strokeWidth="0.2" opacity="0.4"/>
        </pattern>
      </defs>

      {/* Map base */}
      <rect width="400" height="260" fill="#0B1929" />
      <rect width="400" height="260" fill="url(#fineGrid)" />
      <rect width="400" height="260" fill="url(#grid)" />

      {/* Water / coastline hint */}
      <path d="M 0,200 Q 60,180 120,195 Q 180,210 240,200 Q 310,188 400,205 L 400,260 L 0,260 Z"
        fill="#0D2540" opacity="0.7" />
      <path d="M 0,215 Q 80,200 160,208 Q 240,216 320,204 Q 360,198 400,210 L 400,260 L 0,260 Z"
        fill="#0A1E35" opacity="0.6" />

      {/* Main roads */}
      <line x1="0" y1="100" x2="400" y2="85"  stroke="#1A3A60" strokeWidth="3.5" />
      <line x1="0" y1="140" x2="400" y2="125" stroke="#1A3A60" strokeWidth="3" />
      <line x1="0" y1="175" x2="400" y2="162" stroke="#1A3A60" strokeWidth="2" />
      <line x1="80"  y1="0" x2="60"  y2="260" stroke="#1A3A60" strokeWidth="3" />
      <line x1="150" y1="0" x2="130" y2="260" stroke="#1A3A60" strokeWidth="2.5" />
      <line x1="240" y1="0" x2="220" y2="260" stroke="#1A3A60" strokeWidth="2" />
      <line x1="310" y1="0" x2="295" y2="260" stroke="#1A3A60" strokeWidth="2.5" />

      {/* Secondary roads */}
      <line x1="0" y1="55"  x2="400" y2="45"  stroke="#152D4A" strokeWidth="1.2" />
      <line x1="0" y1="65"  x2="400" y2="55"  stroke="#152D4A" strokeWidth="1" />
      <line x1="40"  y1="0" x2="25"  y2="260" stroke="#152D4A" strokeWidth="1" />
      <line x1="115" y1="0" x2="98"  y2="260" stroke="#152D4A" strokeWidth="1" />
      <line x1="195" y1="0" x2="178" y2="260" stroke="#152D4A" strokeWidth="1" />
      <line x1="270" y1="0" x2="255" y2="260" stroke="#152D4A" strokeWidth="1" />
      <line x1="360" y1="0" x2="348" y2="260" stroke="#152D4A" strokeWidth="1" />

      {/* City blocks */}
      {[
        [25,10,50,38],[90,10,52,40],[162,8,50,38],[232,6,55,40],[298,4,45,38],[355,6,40,38],
        [10,50,52,36],[90,50,50,36],[162,48,50,36],[232,46,55,36],[298,44,45,36],
        [25,104,42,28],[90,102,40,28],[162,100,42,28],[232,98,50,28],[298,96,42,28],[355,96,38,28],
        [10,146,42,24],[90,144,40,24],[162,142,42,24],[232,140,50,24],[298,138,42,24],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h}
          fill="#0F2340" stroke="#1A3A60" strokeWidth="0.4" opacity="0.85" rx="1" />
      ))}

      {/* Road labels */}
      <text x="105" y="97" fill="#2A5A8A" fontSize="7" fontFamily="monospace" opacity="0.7">CENTRAL AVE</text>
      <text x="105" y="137" fill="#2A5A8A" fontSize="7" fontFamily="monospace" opacity="0.7">CHURCH ST</text>
      <text x="140" y="22" fill="#2A5A8A" fontSize="6" fontFamily="monospace" opacity="0.6" transform="rotate(-88,140,22)">BAY RD</text>
      <text x="225" y="20" fill="#2A5A8A" fontSize="6" fontFamily="monospace" opacity="0.6" transform="rotate(-88,225,20)">CAYON ST</text>

      {/* Map pins */}
      {pins.map((p, i) => {
        const r = 7;
        const path = `M ${p.x},${p.y + r * 2.2} C ${p.x - r * 0.8},${p.y + r * 1.4} ${p.x - r * 1.4},${p.y + r * 0.6} ${p.x - r * 1.4},${p.y} A ${r * 1.4},${r * 1.4} 0 1 1 ${p.x + r * 1.4},${p.y} C ${p.x + r * 1.4},${p.y + r * 0.6} ${p.x + r * 0.8},${p.y + r * 1.4} ${p.x},${p.y + r * 2.2} Z`;
        return (
          <g key={i} filter="url(#pinGlow)">
            <circle cx={p.x} cy={p.y} r={r * 2.6} fill="rgba(220,20,60,0.12)" />
            <path d={path} fill="#DC143C" filter="url(#pinShadow)" />
            <circle cx={p.x} cy={p.y} r={r * 0.4} fill="white" opacity="0.9" />
          </g>
        );
      })}

      {/* Map attribution */}
      <text x="6" y="255" fill="#1A3A60" fontSize="7" fontFamily="monospace" opacity="0.5">Basseterre, St. Kitts</text>
    </svg>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function WalkListPage() {
  const router = useRouter();
  const [turf, setTurf] = useState('Basseterre');
  const [scrollUp, setScrollUp] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B1929',
      padding: 0,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* ── Red "Walk List" banner ─────────────────────── */}
      <div style={{
        backgroundColor: '#CC1525',
        padding: '14px 24px',
        margin: '0 24px',
        borderRadius: 6,
        marginTop: 0,
        marginBottom: 4,
      }}>
        <h2 style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
        }}>
          Walk List
        </h2>
      </div>

      {/* ── Content area ──────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: 0,
        padding: '16px 24px',
        alignItems: 'start',
      }}>

        {/* ── LEFT: Search + Table ───────────────────── */}
        <div style={{ paddingRight: 16 }}>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 14,
            width: 260,
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: 8,
            padding: '8px 12px',
          }}>
            <span style={{ fontSize: 13, color: '#1E293B', fontWeight: 500, flex: 1 }}>
              Turf: {turf}
            </span>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>

          {/* Table */}
          <div style={{
            backgroundColor: '#0D2040',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #1E3A5F',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1.8fr 120px 140px',
              backgroundColor: '#0A1929',
              borderBottom: '2px solid #1E3A5F',
              padding: '10px 16px',
            }}>
              {['', 'VOTER NAME', 'ADDRESS', 'SUPPORT LEVEL', 'LAST CONTACTED'].map((h, i) => (
                <span key={i} style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#94A3B8',
                  letterSpacing: '0.07em',
                  textAlign: i === 0 ? 'center' : 'left',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {VOTERS.map((v, i) => (
              <div
                key={v.id}
                onClick={() => router.push(`/canvassing/lists/${v.id}`)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 1.8fr 120px 140px',
                  padding: '10px 16px',
                  borderBottom: i < VOTERS.length - 1 ? '1px solid #122038' : 'none',
                  backgroundColor: i % 2 === 0 ? '#0D2040' : '#0B1C38',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                  alignItems: 'center',
                  minHeight: 42,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#112848'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = i % 2 === 0 ? '#0D2040' : '#0B1C38'; }}
              >
                {/* Row number */}
                <span style={{ fontSize: 13, color: '#4A6080', textAlign: 'center', fontWeight: 600 }}>
                  {v.id}
                </span>
                {/* Voter name */}
                <span style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600 }}>
                  {v.name}
                </span>
                {/* Address */}
                <span style={{ fontSize: 13, color: '#94A3B8' }}>
                  {v.address}
                </span>
                {/* Support code */}
                <span style={{ fontSize: 13, color: '#64A3C8', fontFamily: 'monospace', fontWeight: 600 }}>
                  {v.code}
                </span>
                {/* Status badge */}
                <div>
                  <StatusBadge status={v.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Quick Actions + Map ─────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Quick Actions button */}
          <button style={{
            backgroundColor: '#CC1525',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 6,
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            alignSelf: 'flex-end',
            boxShadow: '0 2px 8px rgba(204,21,37,0.4)',
          }}>
            Quick Actions
          </button>

          {/* Map container */}
          <div style={{
            backgroundColor: '#0B1929',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #1E2D45',
            height: 320,
            position: 'relative',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}>
            <WalkMap />

            {/* Scroll controls */}
            <div style={{
              position: 'absolute',
              right: 8,
              bottom: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
              {[true, false].map((up) => (
                <button key={String(up)} style={{
                  width: 28,
                  height: 28,
                  backgroundColor: '#1A2744',
                  border: '1px solid #1E2D45',
                  borderRadius: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
                    {up
                      ? <polyline points="18 15 12 9 6 15" />
                      : <polyline points="6 9 12 15 18 9" />}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { color: '#16A34A', label: 'Support' },
              { color: '#0EA5E9', label: 'Undecided' },
              { color: '#475569', label: 'Oppose' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
                <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
