'use client';
import { useState } from 'react';

/* ─── Mock Data ────────────────────────────────────────────────── */
const CANVASSERS = [
  { id: 1, name: 'At. Kitts Nevis',  party: 'Labour Parts', initials: 'AK', color: '#CC1525' },
  { id: 2, name: 'Ahraun Fam',       party: 'Labour Parts', initials: 'AF', color: '#2563EB' },
  { id: 3, name: 'Marort Heat',      party: 'Labour Parts', initials: 'MH', color: '#16A34A' },
  { id: 4, name: 'Jarin D',          party: 'Labour Parts', initials: 'JD', color: '#9333EA' },
  { id: 5, name: 'Rabd Gompler',     party: '',             initials: 'RG', color: '#EA580C' },
];

const CLUSTERS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: 'Cluster 1 - Basseterre',
  canvassers: 12,
  complete: 68,
  panicAlerts: 0,
}));

/* ─── Avatar pin on map ─────────────────────────────────────────── */
function AvatarPin({ x, y, initials, color }: { x: number; y: number; initials: string; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="white" stroke="white" strokeWidth={3}
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }} />
      <circle cx={x} cy={y} r={20} fill={color} />
      <text x={x} y={y + 5} textAnchor="middle" fill="white"
        fontSize={12} fontWeight="800" fontFamily="Inter, sans-serif">
        {initials}
      </text>
    </g>
  );
}

/* ─── St. Kitts & Nevis Map ─────────────────────────────────────── */
function TurfMap() {
  return (
    <svg viewBox="0 0 680 380" style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#1a2a4a" />
          <stop offset="100%" stopColor="#0a1020" />
        </radialGradient>
        <filter id="mapShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,0.5)" />
        </filter>
        <filter id="regionGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="680" height="380" fill="url(#bgGrad)" />

      {/* Ocean shimmer lines */}
      {[60,110,160,210,260,310,360].map(y => (
        <line key={y} x1="0" y1={y} x2="680" y2={y}
          stroke="#1e3a5a" strokeWidth="0.5" opacity="0.4" />
      ))}

      {/* ── ST. KITTS — main island ─────────────────── */}
      {/* Full island fill (red base) */}
      <path
        d="M 155,80
           C 175,55 215,45 245,50
           C 270,55 290,65 310,72
           C 335,80 355,85 375,88
           C 400,92 425,95 445,100
           C 468,106 485,112 500,122
           C 518,134 528,148 535,162
           C 542,176 542,192 535,205
           C 528,218 515,228 500,235
           C 485,242 468,244 452,242
           C 435,240 418,232 402,224
           C 385,215 368,205 350,198
           C 330,190 308,185 288,182
           C 265,179 242,178 220,180
           C 200,182 182,187 168,196
           C 152,206 142,220 138,236
           C 134,250 136,266 142,278
           C 130,272 118,260 110,246
           C 100,230 98,210 102,192
           C 106,172 116,154 128,138
           C 140,122 152,100 155,80 Z"
        fill="#CC1525" filter="url(#mapShadow)" opacity="0.95"
      />

      {/* Constituency dividers on St. Kitts */}
      <path d="M 220,60 C 210,110 205,160 210,200 C 215,240 225,270 235,290"
        fill="none" stroke="#8B0000" strokeWidth="1.5" opacity="0.6" />
      <path d="M 310,75 C 305,120 300,165 298,205 C 296,240 298,265 302,285"
        fill="none" stroke="#8B0000" strokeWidth="1.5" opacity="0.6" />
      <path d="M 400,95 C 395,130 390,165 388,200 C 386,230 388,255 392,270"
        fill="none" stroke="#8B0000" strokeWidth="1.5" opacity="0.5" />
      <path d="M 165,165 C 220,162 280,160 340,162 C 400,164 450,168 510,172"
        fill="none" stroke="#8B0000" strokeWidth="1" opacity="0.5" />

      {/* NW peninsula — management orange */}
      <path
        d="M 155,80
           C 148,72 138,62 128,55
           C 118,48 106,44 96,46
           C 84,50 76,60 74,72
           C 72,84 76,96 84,105
           C 92,114 104,118 116,118
           C 130,118 145,112 155,102 Z"
        fill="#D4860A" opacity="0.9"
      />

      {/* SE tip — management orange */}
      <path
        d="M 500,122
           C 515,130 528,140 538,152
           C 548,164 552,178 548,192
           C 544,206 532,216 518,220
           C 510,222 502,222 495,218
           C 505,210 515,200 522,188
           C 528,175 528,162 522,150
           C 516,138 508,130 500,126 Z"
        fill="#D4860A" opacity="0.85"
      />

      {/* ── NEVIS — smaller island (gold) ────────────── */}
      <ellipse cx="490" cy="298" rx="62" ry="52"
        fill="#C4900A" filter="url(#mapShadow)" opacity="0.95" />
      <ellipse cx="490" cy="298" rx="50" ry="42"
        fill="#D4A010" opacity="0.6" />
      {/* Nevis peak */}
      <ellipse cx="490" cy="290" rx="22" ry="18" fill="#B87800" opacity="0.5" />

      {/* ── CANVASSER AVATARS ────────────────────────── */}
      <AvatarPin x={200} y={90}  initials="JD" color="#9333EA" />
      <AvatarPin x={310} y={130} initials="MH" color="#16A34A" />
      <AvatarPin x={415} y={155} initials="AF" color="#2563EB" />
      <AvatarPin x={148} y={195} initials="AK" color="#CC1525" />
      <AvatarPin x={500} y={298} initials="RG" color="#EA580C" />

      {/* ── LEGEND ──────────────────────────────────── */}
      <rect x="520" y="30" width="148" height="78" rx="8"
        fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {[
        { color: '#CC1525', label: 'St. Kitts Nevis', y: 52 },
        { color: '#C4900A', label: 'Nevis',           y: 72 },
        { color: '#D4860A', label: 'Management',      y: 92 },
      ].map(({ color, label, y }) => (
        <g key={label}>
          <rect x="532" y={y - 8} width="14" height="14" rx="3" fill={color} />
          <text x="552" y={y + 3} fill="white" fontSize="12"
            fontFamily="Inter, sans-serif" fontWeight="500">{label}</text>
        </g>
      ))}

      {/* Island label */}
      <text x="100" y="330" fill="white" fontSize="16" fontWeight="800"
        fontFamily="Inter, sans-serif" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
        St. Kitts Nevis
      </text>
      <text x="100" y="350" fill="rgba(255,255,255,0.8)" fontSize="13"
        fontFamily="Inter, sans-serif">
        &amp; Nevis
      </text>

      {/* Carousel dots */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx={300 + i * 18} cy={368} r={i === 0 ? 5 : 4}
          fill={i === 0 ? 'white' : 'rgba(255,255,255,0.35)'} />
      ))}
    </svg>
  );
}

/* ─── Cluster Card ──────────────────────────────────────────────── */
function ClusterCard({ cluster }: { cluster: typeof CLUSTERS[0] }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: '14px 16px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
          {cluster.name}
        </span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#94A3B8', fontSize: 16, lineHeight: 1 }}>
          ⋮
        </button>
      </div>

      {/* Stats */}
      <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 2px', fontWeight: 500 }}>
        {cluster.canvassers} Canvassers &nbsp;|&nbsp; {cluster.complete}% Complete
      </p>
      <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 12px', fontWeight: 500 }}>
        {cluster.complete}% Complete, Panic Alerts: {cluster.panicAlerts}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1,
          backgroundColor: '#CC1525',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 5,
          padding: '7px 0',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
        }}>
          Reassign
        </button>
        <div
          onClick={() => {}}
          style={{
            flex: 1.4,
            backgroundColor: '#FFFFFF',
            color: '#374151',
            border: '1.5px solid #CBD5E1',
            borderRadius: 5,
            padding: '7px 0',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          Edit Boundaries
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function TurfManagementPage() {
  const [selectedCanvasser, setSelectedCanvasser] = useState('');
  const [searchTurf, setSearchTurf] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F0F2F5',
      padding: '20px 24px 32px',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* Breadcrumb */}
      <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px', fontWeight: 500 }}>
        Client Web Dashboard (SKNLP)
      </p>

      {/* Page title */}
      <h1 style={{
        fontSize: 28,
        fontWeight: 800,
        color: '#0F172A',
        margin: '0 0 18px',
        letterSpacing: '-0.02em',
      }}>
        Turf Management
      </h1>

      {/* ── Top section: Map + Quick Assignment ─────── */}
      <div className="rg-chart-panel" style={{ gap: 16,
        marginBottom: 20,
        alignItems: 'start',
      }}>

        {/* Map card */}
        <div style={{
          backgroundColor: '#111827',
          borderRadius: 12,
          overflow: 'hidden',
          height: 380,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          <TurfMap />
        </div>

        {/* Quick Turf Assignment */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}>
            Quick Turf Assignment
          </h3>

          {/* Select canvasser dropdown */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <select
              value={selectedCanvasser}
              onChange={e => setSelectedCanvasser(e.target.value)}
              style={{
                width: '100%',
                appearance: 'none',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: 7,
                padding: '8px 32px 8px 12px',
                fontSize: 13,
                color: '#374151',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="">Select Canvasser</option>
              {CANVASSERS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Canvasser list */}
          <div style={{
            border: '1px solid #E2E8F0',
            borderRadius: 7,
            overflow: 'hidden',
            marginBottom: 12,
          }}>
            {CANVASSERS.map((c, i) => (
              <div key={c.id} style={{
                padding: '9px 12px',
                borderBottom: i < CANVASSERS.length - 1 ? '1px solid #F1F5F9' : 'none',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F8FAFC'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FFFFFF'; }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>{c.name}</p>
                {c.party && (
                  <p style={{ fontSize: 11, color: '#CC1525', margin: '1px 0 0', fontWeight: 600 }}>{c.party}</p>
                )}
              </div>
            ))}
          </div>

          {/* Search turf */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #E2E8F0',
            borderRadius: 7,
            padding: '8px 12px',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={searchTurf}
              onChange={e => setSearchTurf(e.target.value)}
              placeholder="Search Turf"
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: 13,
                color: '#374151',
                width: '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Cluster Cards Grid ──────────────────────── */}
      <div className="rg-4" style={{ gap: 14,
      }}>
        {CLUSTERS.map(cluster => (
          <ClusterCard key={cluster.id} cluster={cluster} />
        ))}
      </div>
    </div>
  );
}
