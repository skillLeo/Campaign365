'use client';
import { useState } from 'react';

// St Kitts flag
function FlagSVG({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={size * 1.5} height={size} style={{ borderRadius: 3, flexShrink: 0 }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60" />
      <polygon points="0,0 30,0 30,20" fill="#CE1126" />
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
      <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
    </svg>
  );
}

export default function GotvPage() {
  const [finalPushSent, setFinalPushSent] = useState(false);
  const [endReportSent, setEndReportSent] = useState(false);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column' }}>

      {/* ── Breadcrumb bar ── */}
      <div style={{ backgroundColor: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 12, color: '#64748B', margin: 0, fontWeight: 500 }}>
          Dashboard &gt; <span style={{ color: '#CBD5E1' }}>GOTV Command Center</span>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#DC143C', fontFamily: 'monospace' }}>LIVE</span>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
        </div>
      </div>

      {/* ── Main heading ── */}
      <div style={{ backgroundColor: '#0F172A', padding: '20px 24px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(20px,3.5vw,28px)', color: '#F1F5F9', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Election Day GOTV Command Center - National
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>St. Kitts and Nevis Labour Party · Client Dashboard</p>
          </div>
          <FlagSVG size={28} />
        </div>
      </div>

      {/* ── 3 BIG stat boxes ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', backgroundColor: '#1E293B', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Turnout Projection */}
        <div style={{ padding: '24px 28px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Turnout Projection</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(36px,6vw,54px)', color: '#F1F5F9', lineHeight: 1, letterSpacing: '-0.04em' }}>72%</span>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#DC143C" strokeWidth="2.5">
              <line x1="5" y1="19" x2="19" y2="5" /><polyline points="6 5 19 5 19 18" />
            </svg>
          </div>
        </div>

        {/* Voters Still Needed */}
        <div style={{ padding: '24px 28px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Voters Still Needed</p>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(36px,6vw,54px)', color: '#DC143C', lineHeight: 1, letterSpacing: '-0.04em' }}>4,821</span>
        </div>

        {/* Runners Deployed */}
        <div style={{ padding: '24px 28px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Runners Deployed</p>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(36px,6vw,54px)', color: '#22C55E', lineHeight: 1, letterSpacing: '-0.04em' }}>28</span>
        </div>
      </div>

      {/* ── Map + polling status legend ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(200px,1fr)', backgroundColor: '#1E293B', borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 0 }}>

        {/* Map area */}
        <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
          <svg viewBox="0 0 640 260" style={{ width: '100%', display: 'block' }}>
            {/* Dark ocean background */}
            <defs>
              <radialGradient id="gotvOcean" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1a3a5c"/>
                <stop offset="100%" stopColor="#0d1f35"/>
              </radialGradient>
            </defs>
            <rect width="640" height="260" fill="url(#gotvOcean)" />
            {[0, 1, 2, 3].map(i => (
              <line key={i} x1="0" y1={i * 65} x2="640" y2={i * 65} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}

            {/* St Kitts island */}
            <path d="M80,60 C110,40 180,35 260,50 C340,65 400,90 430,125 C460,160 450,200 405,215 C360,230 280,225 230,195 C180,165 130,145 108,115 C86,85 50,80 80,60Z"
              fill="#2D4A6B" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Nevis island */}
            <ellipse cx="510" cy="195" rx="55" ry="62" fill="#2D4A6B" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Red dots — polling stations */}
            {[
              { cx: 140, cy: 90  }, { cx: 180, cy: 75  }, { cx: 220, cy: 65  },
              { cx: 265, cy: 55  }, { cx: 310, cy: 65  }, { cx: 350, cy: 80  },
              { cx: 390, cy: 100 }, { cx: 405, cy: 130 }, { cx: 390, cy: 165 },
              { cx: 350, cy: 190 }, { cx: 300, cy: 200 }, { cx: 250, cy: 195 },
              { cx: 200, cy: 185 }, { cx: 160, cy: 165 }, { cx: 130, cy: 140 },
              { cx: 150, cy: 115 }, { cx: 200, cy: 125 }, { cx: 250, cy: 130 },
              { cx: 300, cy: 125 }, { cx: 340, cy: 140 },
              // Nevis
              { cx: 490, cy: 175 }, { cx: 530, cy: 175 }, { cx: 510, cy: 195 },
              { cx: 490, cy: 215 }, { cx: 530, cy: 215 },
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r="7" fill="rgba(220,20,60,0.2)" />
                <circle cx={p.cx} cy={p.cy} r="4.5" fill="#DC143C" />
                <circle cx={p.cx} cy={p.cy} r="1.8" fill="#fff" />
              </g>
            ))}
          </svg>
        </div>

        {/* Polling Station Status */}
        <div style={{ padding: '20px 24px' }}>
          <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 16, color: '#F1F5F9', margin: '0 0 16px' }}>Polling Station Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Active',    color: '#DC143C',  count: 14 },
              { label: 'Pending',   color: '#F97316',  count: 7  },
              { label: 'Completed', color: '#22C55E',  count: 4  },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#CBD5E1' }}>{item.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 700, color: '#F1F5F9' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two full-width red buttons ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, backgroundColor: '#FFFFFF' }}>
        <button
          onClick={() => setFinalPushSent(true)}
          style={{ padding: '18px', border: 'none', borderRight: '1px solid rgba(255,255,255,0.2)', backgroundColor: finalPushSent ? '#16A34A' : '#C8102E', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 'clamp(14px,2vw,18px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, letterSpacing: '0.01em' }}
          onMouseEnter={e => !finalPushSent && (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {finalPushSent ? '✓ Alert Sent to All Teams' : 'Final Push Alert to All Teams'}
        </button>
        <button
          onClick={() => setEndReportSent(true)}
          style={{ padding: '18px', border: 'none', backgroundColor: endReportSent ? '#374151' : '#C8102E', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 'clamp(14px,2vw,18px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, letterSpacing: '0.01em' }}
          onMouseEnter={e => !endReportSent && (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {endReportSent ? '✓ Report Submitted' : 'End Day Report'}
        </button>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1A1A1A', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: '#fff', fontFamily: "'Barlow', sans-serif" }}>S</span>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>© 2023 SKNLP</span>
      </div>

      <style>{`
        @media(max-width:640px){
          div[style*="gridTemplateColumns: repeat(3,1fr)"]{grid-template-columns:1fr!important}
          div[style*="gridTemplateColumns: minmax(0,1.6fr)"]{grid-template-columns:1fr!important}
          div[style*="gridTemplateColumns: 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
