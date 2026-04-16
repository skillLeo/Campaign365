'use client';
import { useState } from 'react';

function FlagIcon({ w = 28, h = 19 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={w} height={h} style={{ borderRadius: 2, flexShrink: 0, display: 'block' }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60" />
      <polygon points="0,0 30,0 30,20" fill="#CE1126" />
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
      <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" style={{ marginLeft: 4, opacity: 0.5, flexShrink: 0 }}>
      <polygon points="5,1 9,5 1,5" fill="currentColor" />
      <polygon points="5,11 9,7 1,7" fill="currentColor" />
    </svg>
  );
}

// ── Pin component ──
function MapPin({ x, y, color, size = 10 }: { x: number; y: number; color: string; size?: number }) {
  const r = size;
  const tip = size * 1.8;
  return (
    <g filter="url(#pinDropShadow)">
      <path
        d={`M${x},${y + tip} Q${x - r},${y + r * 0.8} ${x - r},${y} A${r},${r} 0 1,1 ${x + r},${y} Q${x + r},${y + r * 0.8} ${x},${y + tip}Z`}
        fill={color}
      />
      <circle cx={x} cy={y} r={r * 0.42} fill="white" />
    </g>
  );
}

// ── Proper political map of St. Kitts & Nevis ──
function ConstituencyMapPlaceholder() {
  // St. Kitts island outline — realistic elongated shape NW to SE
  // viewBox: 0 0 700 380
  const ISLAND_PATH =
    'M55,148 Q70,112 100,90 Q132,68 172,58 Q215,46 262,44 Q308,42 352,52 Q392,62 425,82 Q452,100 465,124 Q472,144 465,165 Q455,185 432,197 Q405,210 370,215 Q335,220 295,215 Q258,214 220,206 Q182,198 148,182 Q118,166 88,154 Q62,142 55,148 Z';

  // SE Peninsula of St. Kitts (narrows toward SE)
  const PENINSULA_PATH =
    'M465,124 Q478,135 488,152 Q496,168 492,184 Q486,196 476,202 Q466,206 460,198 Q454,188 460,172 Q468,156 465,140 Z';

  // Constituency zones clipped to island — using vertical rectangular strips
  // Each strip covers the full height; the clipPath handles the island boundary
  const CONSTITUENCIES = [
    { id: 1, label: 'C1',  x1: 55,  x2: 115, color: '#0D9488' },  // Teal   – far NW
    { id: 2, label: 'C2',  x1: 115, x2: 175, color: '#EA580C' },  // Orange – NW
    { id: 3, label: 'C3',  x1: 175, x2: 240, color: '#B91C1C' },  // Deep Red
    { id: 4, label: 'C4',  x1: 240, x2: 305, color: '#991B1B' },  // Darker Red – center (Basseterre)
    { id: 5, label: 'C5',  x1: 305, x2: 368, color: '#CA8A04' },  // Gold
    { id: 6, label: 'C6',  x1: 368, x2: 422, color: '#7C3AED' },  // Purple
    { id: 7, label: 'C7',  x1: 422, x2: 475, color: '#0EA5E9' },  // Light Blue
    { id: 8, label: 'C8',  x1: 475, x2: 510, color: '#78716C' },  // Brown – SE peninsula
  ];

  // Red pins on St. Kitts
  const RED_PINS = [
    { x: 80,  y: 128 }, { x: 145, y: 110 }, { x: 148, y: 150 }, { x: 195, y: 95  },
    { x: 210, y: 148 }, { x: 250, y: 82  }, { x: 265, y: 138 }, { x: 300, y: 96  },
    { x: 295, y: 162 }, { x: 338, y: 112 }, { x: 355, y: 152 }, { x: 392, y: 118 },
    { x: 410, y: 158 }, { x: 442, y: 132 }, { x: 460, y: 168 }, { x: 480, y: 148 },
  ];

  // Gold pins on Nevis
  const GOLD_PINS = [
    { x: 600, y: 248 }, { x: 636, y: 265 }, { x: 618, y: 290 },
  ];

  return (
    <div style={{
      width: '100%', height: 370, position: 'relative',
      borderRadius: 6, overflow: 'hidden',
      backgroundColor: '#B8D4E8',
    }}>
      <svg viewBox="0 0 700 370" width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="mapOcean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8C8E0" />
            <stop offset="100%" stopColor="#B8D8F0" />
          </linearGradient>

          {/* Clip to St. Kitts main island */}
          <clipPath id="stkittsMainClip">
            <path d={ISLAND_PATH} />
          </clipPath>
          {/* Clip to SE peninsula */}
          <clipPath id="peninsulaClip">
            <path d={PENINSULA_PATH} />
          </clipPath>
          {/* Clip to Nevis */}
          <clipPath id="nevisClip">
            <ellipse cx="620" cy="272" rx="62" ry="45" />
          </clipPath>

          <filter id="pinDropShadow" x="-30%" y="-10%" width="160%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.55)" />
          </filter>
          <filter id="islandShadow" x="-5%" y="-10%" width="115%" height="130%">
            <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="rgba(0,60,100,0.25)" />
          </filter>
        </defs>

        {/* Ocean */}
        <rect width="700" height="370" fill="url(#mapOcean)" />
        {/* Subtle grid */}
        {[60,120,180,240,300].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        ))}
        {[100,200,300,400,500,600].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="370" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        ))}

        {/* ── ST. KITTS ISLAND ── */}
        {/* Drop shadow layer */}
        <path d={ISLAND_PATH} fill="rgba(0,50,80,0.20)" transform="translate(4,5)" filter="url(#islandShadow)" />

        {/* Fill constituency strips (clipped to island) */}
        <g clipPath="url(#stkittsMainClip)">
          {CONSTITUENCIES.slice(0, 7).map(c => (
            <rect key={c.id} x={c.x1} y="0" width={c.x2 - c.x1} height="370" fill={c.color} />
          ))}
        </g>

        {/* SE Peninsula — brown/olive */}
        <path d={PENINSULA_PATH} fill="#78716C" />

        {/* Constituency boundary lines (clipped to island) */}
        <g clipPath="url(#stkittsMainClip)">
          {[115, 175, 240, 305, 368, 422].map(x => (
            <line key={x} x1={x} y1="30" x2={x} y2="330" stroke="white" strokeWidth="2" strokeOpacity="0.75" />
          ))}
        </g>

        {/* Island outline stroke */}
        <path d={ISLAND_PATH} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
        <path d={PENINSULA_PATH} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* ── NEVIS ISLAND ── */}
        {/* Shadow */}
        <ellipse cx="623" cy="277" rx="62" ry="45" fill="rgba(0,50,80,0.18)" />
        {/* Green fill */}
        <ellipse cx="620" cy="272" rx="62" ry="45" fill="#16A34A" />
        {/* Nevis outline */}
        <ellipse cx="620" cy="272" rx="62" ry="45" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.75" />

        {/* Narrow channel / SE peninsula connection hint */}
        <path d="M488,180 Q530,205 558,228" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4,3" fill="none" />

        {/* ── PINS ── */}
        {RED_PINS.map((p, i) => <MapPin key={`r${i}`} x={p.x} y={p.y} color="#DC143C" size={9} />)}
        {GOLD_PINS.map((p, i) => <MapPin key={`g${i}`} x={p.x} y={p.y} color="#F59E0B" size={8} />)}

        {/* Constituency number labels */}
        {[
          { x: 85,  y: 170, label: '1' },
          { x: 145, y: 170, label: '2' },
          { x: 208, y: 172, label: '3' },
          { x: 272, y: 172, label: '4' },
          { x: 336, y: 172, label: '5' },
          { x: 394, y: 168, label: '6' },
          { x: 442, y: 162, label: '7' },
        ].map(l => (
          <text key={l.label} x={l.x} y={l.y} fill="rgba(255,255,255,0.75)" fontSize="11"
            fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">{l.label}</text>
        ))}
        <text x="620" y="278" fill="rgba(255,255,255,0.75)" fontSize="11"
          fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">Nevis</text>
      </svg>

      {/* Zoom controls */}
      <div style={{ position: 'absolute', left: 10, top: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {['+', '≡', '−'].map((label, i) => (
          <button key={i} style={{
            width: 28, height: 28, borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.14)',
            fontSize: i === 0 || i === 2 ? 16 : 12, fontWeight: 700, color: '#1E293B',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{label}</button>
        ))}
      </div>

      {/* Map icon top-right */}
      <button style={{
        position: 'absolute', top: 12, right: 12,
        width: 30, height: 30, borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.14)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
          <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
        </svg>
      </button>

      {/* Bottom toolbar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(15,23,42,0.90)', padding: '7px 12px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {[
          <svg key="g" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
          <svg key="pa" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
          <svg key="st" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
          <svg key="h" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
          <svg key="c" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
        ].map((Icon, i) => (
          <button key={i} style={{
            width: 28, height: 28, borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon}</button>
        ))}
        <div style={{ flex: 1 }} />
        {[
          <svg key="u" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
          <svg key="l" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
          <svg key="cd" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
        ].map((Icon, i) => (
          <button key={i} style={{
            width: 28, height: 28, borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon}</button>
        ))}
        <button style={{
          padding: '6px 18px', borderRadius: 5, border: 'none',
          backgroundColor: '#DC143C', color: 'white',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>Aver</button>
      </div>
    </div>
  );
}

const VOTERS = [
  { id: 1,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F722, 20, 1077PM' },
  { id: 2,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F722, 25, 1077PM' },
  { id: 3,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F722, 29, 1077PM' },
  { id: 4,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F721, 19, 1037PM' },
  { id: 5,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F722, 18, 1077PM' },
  { id: 6,  vid: 'SKNLP', name: 'SKNLP', constituency: 'Constituency & Nevis', phone: 'Tunurt', support: 'Tealli', last: '00F259, 19, 1077PM' },
];

// Quick stats — each as own bordered card
const QUICK_STATS = [
  { label: 'Affttol',               rightLabel: 'Turnout',  rightVal: '38ln',   sub: '#0259 Sec)', badge: '1', badgeColor: '#2563EB' },
  { label: 'Surport Recicel Kitts', rightLabel: 'Turnout',  rightVal: '310ffn', sub: '#0459 Sec)', badge: null },
  { label: 'Petoop',                rightLabel: 'Turnout',  rightVal: '',       sub: '#0259 Sec)', badge: '1', badgeColor: '#2563EB' },
];

const TABLE_HEADERS = ['Voter ID', 'Name', 'Constituency', 'Phone', 'Surport Level', 'Last Contacted', 'Actions'];

export default function VotersPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) =>
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const allSelected = VOTERS.length > 0 && VOTERS.every(v => selectedRows.includes(v.id));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1320', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <div style={{
        backgroundColor: '#0B1320',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        height: 52, display: 'flex', alignItems: 'center',
        padding: '0 18px', gap: 0, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
          <FlagIcon w={26} h={18} />
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 18, color: '#FFFFFF', letterSpacing: '0.03em' }}>SKNLP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>Campaign 365</span>
          <span style={{ color: '#334155', fontSize: 14 }}>|</span>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>Client Web Dashboard</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style={{ position: 'relative' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={{ position: 'absolute', top: -5, right: -5, width: 14, height: 14, borderRadius: '50%', backgroundColor: '#F97316', color: 'white', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F97316' }}>Avrdoes</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 13, color: '#CBD5E1' }}>Avalip</span>
            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </div>

      {/* ── Red header with crowd texture ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '18px 20px 16px', flexShrink: 0,
      }}>
        {/* Dark moody base — deep charcoal to give "photo" depth */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#1a0205' }} />
        {/* Dense crowd silhouette layer */}
        <svg viewBox="0 0 1200 72" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
          {/* Crowd ground mass */}
          <path d="M0,72 L0,48 Q15,36 30,44 Q42,28 56,36 Q68,20 82,30 Q94,14 110,22 Q122,8 138,16 Q150,4 166,12 Q178,0 194,8 Q208,-2 224,8 Q238,-4 254,6 Q268,-4 284,6 Q298,-4 315,6 Q330,-2 346,8 Q360,-4 376,6 Q392,-4 408,6 Q422,-4 440,8 Q455,-4 472,6 Q487,-4 503,6 Q518,-4 534,6 Q550,-4 566,8 Q582,-4 598,6 Q614,-4 630,6 Q646,-4 662,8 Q678,-4 694,6 Q710,-4 726,6 Q742,-4 758,8 Q774,-4 790,6 Q806,-4 822,6 Q838,-4 854,8 Q870,-4 886,6 Q902,-4 918,6 Q934,-4 950,8 Q966,-4 982,6 Q998,-4 1014,6 Q1030,-4 1046,8 Q1062,-4 1078,6 Q1094,-4 1110,8 Q1126,-4 1142,6 Q1158,-4 1174,8 L1200,8 L1200,72 Z" fill="rgba(0,0,0,0.88)" />
          {/* Individual crowd heads – dense rows */}
          {Array.from({ length: 60 }, (_, i) => {
            const x = (i * 20) + (i % 3) * 4;
            const row = i % 4;
            const y = 12 + row * 8;
            const r = 4 + (i % 3);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={r} fill="rgba(10,0,0,0.85)" />
                <rect x={x - 3} y={y + r - 1} width={6} height={10 + (i % 3) * 3} rx={2} fill="rgba(10,0,0,0.85)" />
              </g>
            );
          })}
          {/* Back row — smaller, lighter */}
          {Array.from({ length: 80 }, (_, i) => {
            const x = (i * 15) + (i % 2) * 5;
            const y = 6 + (i % 3) * 3;
            return <circle key={i} cx={x} cy={y} r={2.5} fill="rgba(20,0,5,0.7)" />;
          })}
        </svg>
        {/* Red colour overlay — simulates red gradient over dark photo */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(160,8,22,0.86) 0%, rgba(220,20,60,0.78) 50%, rgba(140,6,18,0.86) 100%)' }} />
        <h1 style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Barlow', sans-serif", fontWeight: 900,
          fontSize: 26, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em',
        }}>
          Voters &amp; Constituencies
        </h1>
      </div>

      {/* ── Filter bar ── */}
      <div style={{
        backgroundColor: '#0B1320',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '11px 20px',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid #334155', borderRadius: 6, padding: '7px 12px', cursor: 'pointer', backgroundColor: '#1E293B' }}>
          <span style={{ fontSize: 13, color: '#CBD5E1' }}>All 11 Constituencies</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid #334155', borderRadius: 6, padding: '7px 12px', cursor: 'pointer', backgroundColor: '#1E293B', flex: 1, maxWidth: 280 }}>
          <span style={{ fontSize: 13, color: '#475569' }}>Search voter by name or ID</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ padding: '8px 20px', borderRadius: 6, border: 'none', backgroundColor: '#DC143C', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Export Data
        </button>
      </div>

      {/* ── Main two-column layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* LEFT: Map + Table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', minWidth: 0, padding: '14px 16px 16px' }}>
          <ConstituencyMapPlaceholder />

          {/* Table */}
          <div style={{ marginTop: 12, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1E293B' }}>
                  <th style={{ padding: '11px 12px', width: 40 }}>
                    <input type="checkbox" checked={allSelected} onChange={() => setSelectedRows(allSelected ? [] : VOTERS.map(v => v.id))} style={{ accentColor: '#DC143C', width: 14, height: 14 }} />
                  </th>
                  <th style={{ padding: '11px 8px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748B', width: 32 }}>#</th>
                  {TABLE_HEADERS.map(h => (
                    <th key={h} style={{ padding: '11px 12px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>{h}<SortIcon /></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VOTERS.map((v, i) => {
                  const isSel = selectedRows.includes(v.id);
                  return (
                    <tr key={v.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: isSel ? 'rgba(220,20,60,0.07)' : '#0B1320', cursor: 'pointer' }} onClick={() => toggleRow(v.id)}>
                      <td style={{ padding: '10px 12px' }}>
                        <input type="checkbox" checked={isSel} onChange={() => toggleRow(v.id)} onClick={e => e.stopPropagation()} style={{ accentColor: '#DC143C', width: 14, height: 14 }} />
                      </td>
                      <td style={{ padding: '10px 8px', fontSize: 13, color: '#475569' }}>{v.id}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: '#CBD5E1', fontWeight: 600 }}>{v.vid}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: '#94A3B8' }}>{v.name}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: '#94A3B8' }}>{v.constituency}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: '#64748B' }}>{v.phone}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: '#94A3B8' }}>{v.support}</td>
                      <td style={{ padding: '10px 12px', fontSize: 12, color: '#64748B', whiteSpace: 'nowrap' }}>{v.last}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <div style={{ width: 22, height: 22, borderRadius: 4, backgroundColor: '#DC143C', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                          <div style={{ width: 22, height: 22, borderRadius: 4, backgroundColor: '#1877F2', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>f</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Constituency Quick Stats — each item as own bordered card */}
        <div style={{ width: 272, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#0B1320', overflow: 'auto', padding: '14px 14px' }}>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', margin: '0 0 12px' }}>Constituency Quick Stats</h3>

          {/* Column headers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Voter Total</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Voter Total</span>
          </div>

          {/* Individual bordered stat cards */}
          {QUICK_STATS.map((s, i) => (
            <div key={i} style={{
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '11px 12px',
              backgroundColor: '#1E293B',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', lineHeight: 1.3, flex: 1 }}>{s.label}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  {s.rightLabel && <span style={{ fontSize: 10, color: '#64748B' }}>{s.rightLabel}</span>}
                  {s.rightVal && <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>{s.rightVal}</span>}
                  {s.badge && (
                    <div style={{ width: 22, height: 22, borderRadius: 4, backgroundColor: s.badgeColor, color: 'white', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{s.badge}</div>
                  )}
                </div>
              </div>
              <span style={{ fontSize: 11, color: '#475569' }}>{s.sub}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
