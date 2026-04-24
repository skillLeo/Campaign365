'use client';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const MINI_WAVE = [
  { v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 30 }, { v: 55 }, { v: 40 }, { v: 60 }, { v: 45 }, { v: 70 },
];

const KPI_CARDS = [
  {
    label: 'Campaign Finance Tracking',
    value: '$184,720',
    sub: '(Within Limits)',
    subColor: '#4ADE80',
    icon: '🔒',
  },
  {
    label: 'Donor Disclosure Status',
    value: '100%',
    sub: 'All Donors Verified',
    subColor: '#94A3B8',
    icon: '👤',
  },
  {
    label: 'Electoral Roll Sync',
    value: 'Complete',
    sub: 'Last sync: Apr 12',
    subColor: '#94A3B8',
    icon: '📄',
  },
  {
    label: 'Party Compliance Score',
    value: '98%',
    sub: 'Excellent Standing',
    subColor: '#94A3B8',
    icon: '🔒',
  },
];

// 4 rows of 10 checkmarks — first 2 rows green, last 2 grey
const CHECKLIST_ROWS = [
  Array(10).fill(true),
  Array(10).fill(true),
  Array(10).fill(false),
  Array(10).fill(false),
];

const QUICK_ACTION_ICONS = ['🔒', '👤', '👥', '⚙️'];

function GoldLockShield() {
  return (
    <div style={{ position: 'relative', width: 140, height: 140 }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: -20,
        background: 'radial-gradient(circle, rgba(212,160,23,0.6) 0%, rgba(212,160,23,0.2) 40%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="60%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#8B6000" />
          </radialGradient>
          <radialGradient id="shieldInner" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFF4AA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Shield body */}
        <path d="M70,8 L118,28 L118,72 C118,100 96,122 70,132 C44,122 22,100 22,72 L22,28 Z"
          fill="url(#shieldGlow)" />
        <path d="M70,8 L118,28 L118,72 C118,100 96,122 70,132 C44,122 22,100 22,72 L22,28 Z"
          fill="url(#shieldInner)" opacity="0.5" />
        {/* Lock body */}
        <rect x="50" y="72" width="40" height="30" rx="5" fill="#8B6000" opacity="0.9" />
        <rect x="52" y="74" width="36" height="26" rx="4" fill="#5A3200" opacity="0.7" />
        {/* Lock shackle */}
        <path d="M56,72 L56,60 C56,50 84,50 84,60 L84,72" stroke="#8B6000" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M56,72 L56,60 C56,52 84,52 84,60 L84,72" stroke="#C8950A" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="70" cy="85" r="5" fill="#C8950A" />
        <rect x="68" y="88" width="4" height="8" rx="2" fill="#C8950A" />
      </svg>
    </div>
  );
}

function SKNLPShieldBadge() {
  return (
    <div style={{ position: 'relative' }}>
      <svg width="110" height="120" viewBox="0 0 110 120" fill="none">
        <defs>
          <radialGradient id="badgeGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        {/* Shield */}
        <path d="M55,4 L102,22 L102,58 C102,86 80,106 55,116 C30,106 8,86 8,58 L8,22 Z"
          fill="url(#badgeGrad)" />
        <path d="M55,12 L94,28 L94,58 C94,82 74,100 55,108 C36,100 16,82 16,58 L16,28 Z"
          fill="rgba(255,255,255,0.15)" />
        {/* Lock icon */}
        <rect x="38" y="64" width="34" height="24" rx="4" fill="rgba(0,0,0,0.5)" />
        <path d="M44,64 L44,54 C44,46 66,46 66,54 L66,64" stroke="rgba(0,0,0,0.6)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="55" cy="74" r="4" fill="#FFD700" />
        <rect x="53" y="76" width="4" height="6" rx="2" fill="#FFD700" />
        {/* Stars around */}
        {[0,1,2,3,4,5].map(i => {
          const angle = (i * 60 - 90) * Math.PI / 180;
          const rx2 = 48, ry = 44;
          return <text key={i} x={55 + rx2 * Math.cos(angle) - 5} y={60 + ry * Math.sin(angle) + 5} fontSize="8" fill="#FFE566">★</text>;
        })}
      </svg>
    </div>
  );
}

export default function CompliancePage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero banner — tropical sunset */}
      <div style={{
        position: 'relative', overflow: 'hidden', minHeight: 130,
        background: 'linear-gradient(135deg,#8B0000 0%,#C41E3A 30%,#B22222 55%,#8B1A1A 75%,#4a0a0a 100%)',
      }}>
        {/* Palm/tropical overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(255,140,60,0.35) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 80%, rgba(100,0,0,0.5) 0%, transparent 50%)
          `,
        }} />
        {/* Decorative palm silhouettes */}
        <svg style={{ position: 'absolute', right: 180, top: 0, opacity: 0.3 }} width="80" height="130" viewBox="0 0 80 130">
          <path d="M45,130 Q43,90 46,60 Q48,42 50,30" stroke="#1a4a10" strokeWidth="5" fill="none" />
          <path d="M50,30 Q32,18 14,16 Q32,28 36,42" fill="#1a6a10" />
          <path d="M50,30 Q38,12 30,2 Q52,18 52,32" fill="#228b22" />
          <path d="M50,30 Q68,14 78,8 Q62,26 56,36" fill="#1a6a10" />
        </svg>
        <svg style={{ position: 'absolute', left: 10, top: 0, opacity: 0.25, transform: 'scaleX(-1)' }} width="60" height="130" viewBox="0 0 80 130">
          <path d="M45,130 Q43,90 46,60 Q48,42 50,30" stroke="#1a4a10" strokeWidth="5" fill="none" />
          <path d="M50,30 Q32,18 14,16 Q32,28 36,42" fill="#1a6a10" />
          <path d="M50,30 Q38,12 30,2 Q52,18 52,32" fill="#228b22" />
        </svg>

        {/* Shield badge top-right */}
        <div style={{ position: 'absolute', right: 24, top: 8 }}>
          <SKNLPShieldBadge />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', padding: '28px 24px 20px' }}>
          <h1 style={{ color: 'white', fontSize: 30, fontWeight: 900, margin: '0 0 8px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Compliance &amp; Reporting
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80' }} />
            <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 500 }}>All Reports Up-to-Date</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
            <span style={{ color: '#E2E8F0', fontSize: 13 }}>Next Filing: <strong>14 Days</strong></span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>

        {/* 4 KPI Cards with mini wave charts */}
        <div className="rg-4" style={{ gap: 14, marginBottom: 20 }}>
          {KPI_CARDS.map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 12, padding: '16px 16px 0', overflow: 'hidden', position: 'relative',
            }}>
              <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</p>
              <p style={{ color: 'white', fontSize: card.value.length > 7 ? 22 : 28, fontWeight: 900, margin: '0 0 4px', lineHeight: 1 }}>{card.value}</p>
              <p style={{ color: card.subColor, fontSize: 12, margin: '0 0 10px', fontWeight: 500 }}>{card.sub}</p>
              {/* Mini wave + icon row */}
              <div style={{ position: 'relative', height: 48 }}>
                <ResponsiveContainer width="100%" height={48}>
                  <AreaChart data={MINI_WAVE} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`waveG${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DC143C" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#DC143C" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#DC143C" strokeWidth={1.5} fill={`url(#waveG${i})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
                {/* Floating icon bottom-right */}
                <div style={{
                  position: 'absolute', bottom: 4, right: 4,
                  width: 28, height: 28, borderRadius: 6,
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3-col: Checklist | AI Flag | Quick Actions */}
        <div className="rg-3" style={{ gap: 14 }}>

          {/* Compliance Checklist */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '18px',
          }}>
            <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>Compliance Checklist</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKLIST_ROWS.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {row.map((checked, ci) => (
                    <div key={ci} style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: checked ? '#22C55E' : 'rgba(100,116,139,0.3)',
                      border: checked ? 'none' : '1px solid rgba(100,116,139,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, color: checked ? 'white' : '#475569', fontWeight: 900,
                    }}>✓</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* AI Flag Alerts */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '18px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: '0 0 16px', alignSelf: 'flex-start' }}>AI Flag Alerts</p>
            <GoldLockShield />
            <p style={{ color: '#64748B', fontSize: 12, margin: '12px 0 0', textAlign: 'center' }}>
              Powered by <span style={{ color: '#D4A017', fontWeight: 700 }}>Grok AI</span> — No critical flags
            </p>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '18px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>Quick Actions</p>

            {/* Icon row */}
            <div style={{ display: 'flex', gap: 8 }}>
              {QUICK_ACTION_ICONS.map((icon, i) => (
                <button key={i} style={{
                  flex: 1, height: 38, borderRadius: 8, background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)', color: '#94A3B8', fontSize: 15,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{icon}</button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {/* Buttons */}
            <button style={{
              width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#E2E8F0', borderRadius: 8, padding: '11px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>Generate Report</button>
            <button style={{
              width: '100%', background: '#DC143C', color: 'white', border: 'none',
              borderRadius: 8, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
            }}>Upload Document</button>
          </div>
        </div>
      </div>
    </div>
  );
}
