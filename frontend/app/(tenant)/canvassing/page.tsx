'use client';
import { useState } from 'react';

const CLUSTERS = [
  { name: 'Cluster 1 - Basseterre', canvassers: 12, count: 12, progress: 89, barColor: '#E8622A', barFull: true },
  { name: "Cluster 2 - St. Paul's", canvassers: 6,  count: 10, progress: 72, barColor: '#DC143C', barFull: false },
  { name: "Cluster 1 - St. Paul's", canvassers: 6,  count: 20, progress: 89, barColor: '#DC143C', barFull: false },
  { name: "Cluster 1 - St. Paul's", canvassers: 6,  count: 13, progress: 72, barColor: '#3B82F6', barFull: false },
  { name: "Cluster 1 - St. Paul's", canvassers: 6,  count: 20, progress: 72, barColor: '#DC143C', barFull: false },
  { name: "Cluster 2 - St. Paul's", canvassers: 8,  count: 10, progress: 72, barColor: '#DC143C', barFull: false },
  { name: "Cluster 1 - St. Paul's", canvassers: 3,  count: 20, progress: 76, barColor: '#3B82F6', barFull: false },
  { name: "Cluster 2 - St. Paul's", canvassers: 8,  count: 11, progress: 76, barColor: '#DC143C', barFull: false },
];

const ACTIVE_RUNS = [
  { runner: 'John Doe',   turf: 'Basseterre',           visited: '2234.Pm', offline: '500.Pm'  },
  { runner: 'Jane Smith', turf: 'St. Anne Sandy Point', visited: '2236.Pm', offline: '450.Pm'  },
  { runner: 'Jane Smith', turf: 'St. Anne Sandy Point', visited: '12.34.Pm', offline: '456.Pm' },
];

const TABS = ['Live Field Teams', 'Assigned Turfs', 'Route Optimizer'] as const;

function CanvassingMap() {
  const pins = [
    { x: 118, y: 108 }, { x: 145, y: 95  }, { x: 168, y: 84  }, { x: 192, y: 78 },
    { x: 218, y: 88  }, { x: 240, y: 98  }, { x: 260, y: 112 }, { x: 278, y: 102 },
    { x: 300, y: 118 }, { x: 314, y: 128 }, { x: 290, y: 134 }, { x: 248, y: 124 },
    { x: 322, y: 142 }, { x: 338, y: 155 }, { x: 355, y: 165 },
  ];

  return (
    <div style={{ width: '100%', position: 'relative', height: 300, borderRadius: 8, overflow: 'hidden' }}>
      <svg viewBox="0 0 500 300" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="oceanBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1a2d42" />
            <stop offset="100%" stopColor="#0e1e2e" />
          </radialGradient>
          <filter id="pinShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
          </filter>
        </defs>

        <rect width="500" height="300" fill="url(#oceanBg)" />

        {[40,80,120,160,200,240,280].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        ))}
        {[60,120,180,240,300,360,420,480].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        ))}

        <path
          d="M72,148 Q78,128 92,118 Q108,106 128,100 Q150,90 172,85
             Q194,78 218,82 Q242,80 262,88 Q280,94 296,104
             Q316,116 332,130 Q344,142 352,156 Q358,168 356,180
             Q352,192 340,198 Q324,204 308,200 Q290,198 272,190
             Q252,184 238,192 Q228,198 218,200 Q204,202 194,196
             Q178,188 162,175 Q148,164 136,158 Q118,150 104,150 Q86,150 76,150 Z"
          fill="#2e4a62" stroke="#4a6e88" strokeWidth="1.5"
        />

        <path d="M150,100 Q148,130 152,155" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        <path d="M200,88 Q196,120 198,150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        <path d="M258,92 Q252,125 255,165" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        <path d="M306,110 Q300,140 305,175" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>

        <path
          d="M340,198 Q354,205 368,212 Q380,218 390,224 Q400,230 405,235"
          stroke="#4a6e88" strokeWidth="7" fill="none" strokeLinecap="round"
        />

        <ellipse cx="435" cy="240" rx="32" ry="24" fill="#2e4a62" stroke="#4a6e88" strokeWidth="1.2" />

        {pins.map((p, i) => (
          <g key={i} filter="url(#pinShadow)">
            <circle cx={p.x} cy={p.y + 20} r="8" fill="#DC143C" />
            <circle cx={p.x} cy={p.y + 20} r="3" fill="white" />
            <circle cx={p.x} cy={p.y + 20} r="12" fill="#DC143C" fillOpacity="0.18" />
          </g>
        ))}

        <rect x="58" y="168" width="34" height="18" rx="4" fill="#1E293B" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <text x="75" y="181" fill="white" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="800">47</text>

        <text x="8" y="292" fill="#64748B" fontSize="9" fontFamily="Inter,sans-serif">#0F17A</text>
      </svg>

      {/* Panic Button */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: '#F97316', color: 'white',
        borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 700,
        boxShadow: '0 0 16px rgba(249,115,22,0.55)',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
        Panic Button Activated
      </div>

      {/* Minus zoom */}
      <div style={{ position: 'absolute', bottom: 20, left: 10 }}>
        <button style={{
          width: 28, height: 28, borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'white', fontSize: 18, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}>−</button>
      </div>
    </div>
  );
}

export default function CanvassingPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Live Field Teams');

  return (
    /* 1. Page background: deep crimson/dark red */
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#7B1525',
      fontFamily: "'Inter', sans-serif",
      padding: '28px 28px 36px',
    }}>

      {/* Page title: white text on dark red */}
      <h1 style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 800,
        fontSize: 30,
        color: '#FFFFFF',
        margin: '0 0 22px',
        letterSpacing: '-0.01em',
      }}>
        Canvassing Operations
      </h1>

      {/* 2. Main container: dark navy */}
      <div style={{
        backgroundColor: '#0F172A',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 24,
      }}>

        {/* 5. Tab bar: dark navy bg, white text, red active underline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0 20px',
          backgroundColor: '#0F172A',
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '14px 18px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === tab ? '#FFFFFF' : '#64748B',
                borderBottom: activeTab === tab ? '2px solid #DC143C' : '2px solid transparent',
                transition: 'all 0.15s',
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{
            fontSize: 12,
            color: '#FFFFFF',
            backgroundColor: '#0F172A',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 5,
            padding: '4px 10px',
            fontFamily: 'monospace',
            fontWeight: 600,
          }}>
            #0F172A
          </span>
        </div>

        {/* Two-column: map left + clusters right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 400 }}>

          {/* Left: Map */}
          <div style={{
            padding: '20px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px' }}>
              St. Kitts &amp; Nevis
            </p>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 14px' }}>
              47 Canvasser
            </p>
            <CanvassingMap />
            <p style={{ fontSize: 10, color: '#475569', margin: '8px 0 0', fontFamily: 'monospace' }}>
              #0F17A
            </p>
          </div>

          {/* 3. Cluster cards: WHITE cards with dark text inside dark navy container */}
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CLUSTERS.map((c, i) => (
                <div key={i} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  padding: '14px 16px',
                  border: 'none',
                }}>
                  <p style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: '0 0 3px',
                    lineHeight: 1.3,
                  }}>
                    {c.name}
                  </p>
                  <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 12px' }}>
                    {c.canvassers} Canvassers
                  </p>

                  {/* Progress row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#475569', minWidth: 22, flexShrink: 0 }}>
                      {c.count}
                    </span>
                    {c.barFull ? (
                      /* First cluster: full orange progress bar */
                      <div style={{ flex: 1, height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${c.progress}%`, height: '100%', backgroundColor: c.barColor, borderRadius: 3 }} />
                      </div>
                    ) : (
                      /* Other clusters: small colored square */
                      <div style={{
                        width: 18, height: 18, borderRadius: 4,
                        backgroundColor: c.barColor, flexShrink: 0,
                      }} />
                    )}
                    <span style={{
                      fontSize: 15, fontWeight: 700, color: '#0F172A',
                      minWidth: 38, textAlign: 'right', flexShrink: 0,
                    }}>
                      {c.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. "Active Canvassing Run" — NO white wrapper, sits directly on dark red bg */}
      <div>
        {/* Section title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            Active Canvassing Run
          </h3>
          <button style={{
            padding: '7px 20px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Spage
          </button>
        </div>

        {/* Table: dark rows, white text */}
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1E293B' }}>
                {['', 'Runner Name', 'Turf', 'Voters Visited', 'Offline Sync Status'].map((h, i) => (
                  <th key={i} style={{
                    padding: '12px 20px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVE_RUNS.map((r, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: i % 2 === 0 ? '#0F172A' : '#111827',
                }}>
                  <td style={{ padding: '14px 20px' }}>
                    <input type="checkbox" style={{ accentColor: '#DC143C', width: 15, height: 15 }} />
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#FFFFFF', fontWeight: 600 }}>
                    {r.runner}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#94A3B8' }}>
                    {r.turf}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#94A3B8' }}>
                    {r.visited}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#94A3B8' }}>
                    {r.offline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
