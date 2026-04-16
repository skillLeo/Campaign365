'use client';

const CHECKLIST = [
  { text: 'Election Expenses Return', done: true },
  { text: 'Candidate Nomination Filed', done: true },
  { text: 'Donor List Export', done: true },
  { text: 'Campaign Finance Disclosure', done: true },
];

const AI_ALERTS = [
  'Auto-generated Report: Potential compliance issue detected in expenditure records.',
  'AI Flag: Unverified donor entry requires review before next filing deadline.',
  'Auto-generated Report: Canvassing data export pending electoral authority submission.',
  "Possible voter registration mismatch in Nevis constituency — review needed.",
];

const REPORTS = [
  { type: 'Campaign Finance Return', updated: 'Apr 10, 2026', status: 'Compliant' },
  { type: 'Auto-generated Donor Report', updated: 'Apr 08, 2026', status: 'Compliant' },
  { type: 'Electoral Roll Submission', updated: 'Apr 05, 2026', status: 'Pending' },
  { type: 'Canvassing Activity Log', updated: 'Apr 03, 2026', status: 'Compliant' },
];

/* ── 3D Shield SVG ── */
function Shield3D() {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sh_body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="40%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#B45309"/>
        </linearGradient>
        <linearGradient id="sh_shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <filter id="sh_shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.45"/>
        </filter>
      </defs>
      {/* Shield body */}
      <path
        d="M45 4 L82 18 L82 52 C82 72 62 90 45 97 C28 90 8 72 8 52 L8 18 Z"
        fill="url(#sh_body)"
        filter="url(#sh_shadow)"
      />
      {/* Shine overlay */}
      <path
        d="M45 4 L82 18 L82 52 C82 72 62 90 45 97 C28 90 8 72 8 52 L8 18 Z"
        fill="url(#sh_shine)"
        opacity="0.35"
      />
      {/* Inner border */}
      <path
        d="M45 13 L73 24 L73 52 C73 68 58 83 45 88 C32 83 17 68 17 52 L17 24 Z"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />
      {/* Red checkmark circle */}
      <circle cx="45" cy="52" r="17" fill="#DC143C" opacity="0.95"/>
      <circle cx="45" cy="52" r="17" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      {/* Checkmark */}
      <path d="M36 52 L42 58 L55 44" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Top glint */}
      <ellipse cx="34" cy="22" rx="8" ry="4" fill="rgba(255,255,255,0.35)" transform="rotate(-20 34 22)"/>
    </svg>
  );
}

/* ── 3D Scroll/Document SVG ── */
function Scroll3D() {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sc_body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8F0DC"/>
          <stop offset="100%" stopColor="#E8D8A0"/>
        </linearGradient>
        <linearGradient id="sc_roll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A850"/>
          <stop offset="50%" stopColor="#E8C870"/>
          <stop offset="100%" stopColor="#C8A850"/>
        </linearGradient>
        <filter id="sc_shadow">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.4"/>
        </filter>
      </defs>
      {/* Main scroll body */}
      <rect x="10" y="14" width="60" height="72" rx="4" fill="url(#sc_body)" filter="url(#sc_shadow)"/>
      {/* Top roll */}
      <ellipse cx="40" cy="14" rx="30" ry="7" fill="url(#sc_roll)"/>
      <ellipse cx="40" cy="14" rx="22" ry="4" fill="#F5E090"/>
      {/* Bottom roll */}
      <ellipse cx="40" cy="86" rx="30" ry="7" fill="url(#sc_roll)"/>
      <ellipse cx="40" cy="86" rx="22" ry="4" fill="#F5E090"/>
      {/* Text lines */}
      <rect x="20" y="28" width="40" height="3" rx="1.5" fill="#C8A850" opacity="0.6"/>
      <rect x="20" y="36" width="32" height="3" rx="1.5" fill="#C8A850" opacity="0.45"/>
      <rect x="20" y="44" width="38" height="3" rx="1.5" fill="#C8A850" opacity="0.45"/>
      <rect x="20" y="52" width="28" height="3" rx="1.5" fill="#C8A850" opacity="0.45"/>
      <rect x="20" y="60" width="36" height="3" rx="1.5" fill="#C8A850" opacity="0.45"/>
      {/* SKN flag mini */}
      <rect x="28" y="68" width="24" height="14" rx="2" fill="#009E60"/>
      <polygon points="28,68 52,68 52,82 28,82" fill="#CE1126" clipPath="url(#sc_flag_clip)"/>
      <defs>
        <clipPath id="sc_flag_clip">
          <rect x="28" y="68" width="24" height="14" rx="2"/>
        </clipPath>
      </defs>
      <path d="M28 68 L52 82" stroke="#000" strokeWidth="4"/>
      <path d="M28 68 L52 82" stroke="#FCD116" strokeWidth="2"/>
    </svg>
  );
}

/* ── 3D Finance Icon ── */
function FinanceIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fi_coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="100%" stopColor="#B8860B"/>
        </linearGradient>
        <linearGradient id="fi_chart" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1D4ED8"/>
          <stop offset="100%" stopColor="#60A5FA"/>
        </linearGradient>
      </defs>
      {/* Chart bars */}
      <rect x="4" y="28" width="8" height="14" rx="2" fill="url(#fi_chart)"/>
      <rect x="15" y="20" width="8" height="22" rx="2" fill="url(#fi_chart)" opacity="0.85"/>
      <rect x="26" y="14" width="8" height="28" rx="2" fill="url(#fi_chart)"/>
      {/* Coin */}
      <circle cx="37" cy="14" r="9" fill="url(#fi_coin)"/>
      <circle cx="37" cy="14" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <text x="37" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7C4D00">$</text>
      {/* Shine */}
      <ellipse cx="34" cy="10" rx="3" ry="1.5" fill="rgba(255,255,255,0.5)" transform="rotate(-30 34 10)"/>
    </svg>
  );
}

/* ── 3D Padlock Icon ── */
function PadlockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pl_body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="100%" stopColor="#B8860B"/>
        </linearGradient>
        <linearGradient id="pl_shackle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E5A800"/>
          <stop offset="100%" stopColor="#FFE55C"/>
        </linearGradient>
      </defs>
      {/* Shackle */}
      <path d="M16 22 L16 16 Q16 6 24 6 Q32 6 32 16 L32 22" stroke="url(#pl_shackle)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Body */}
      <rect x="10" y="22" width="28" height="22" rx="5" fill="url(#pl_body)"/>
      {/* Keyhole */}
      <circle cx="24" cy="32" r="4" fill="#7C4D00"/>
      <rect x="22" y="34" width="4" height="5" rx="1" fill="#7C4D00"/>
      {/* Shine */}
      <ellipse cx="18" cy="26" rx="4" ry="2" fill="rgba(255,255,255,0.4)" transform="rotate(-20 18 26)"/>
    </svg>
  );
}

/* ── 3D Scroll Icon (small) ── */
function ScrollIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="si_body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8F0DC"/>
          <stop offset="100%" stopColor="#D4B870"/>
        </linearGradient>
        <linearGradient id="si_roll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A850"/>
          <stop offset="50%" stopColor="#E8C870"/>
          <stop offset="100%" stopColor="#C8A850"/>
        </linearGradient>
      </defs>
      <rect x="8" y="10" width="32" height="30" rx="3" fill="url(#si_body)"/>
      <ellipse cx="24" cy="10" rx="16" ry="4.5" fill="url(#si_roll)"/>
      <ellipse cx="24" cy="40" rx="16" ry="4.5" fill="url(#si_roll)"/>
      <rect x="14" y="17" width="20" height="2" rx="1" fill="#B8960A" opacity="0.6"/>
      <rect x="14" y="22" width="15" height="2" rx="1" fill="#B8960A" opacity="0.45"/>
      <rect x="14" y="27" width="18" height="2" rx="1" fill="#B8960A" opacity="0.45"/>
      <rect x="14" y="32" width="12" height="2" rx="1" fill="#B8960A" opacity="0.45"/>
      <ellipse cx="19" cy="8" rx="4" ry="1.5" fill="rgba(255,255,255,0.4)" transform="rotate(-15 19 8)"/>
    </svg>
  );
}

export default function CompliancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgb(11, 19, 32)', fontFamily: "'Inter', sans-serif" }}>

      {/* Top Navbar */}
      <div style={{
        backgroundColor: '#0F172A',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>Campaign</span>
          <span style={{ fontSize: 11, color: '#475569' }}>Client Web Dashboard</span>
          {/* Dark pill badge */}
          <span style={{
            fontSize: 10, color: '#94A3B8',
            backgroundColor: '#0F172A',
            border: '1px solid #334155',
            borderRadius: 20,
            padding: '2px 10px',
            fontFamily: 'monospace',
          }}>#0F172A</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Clipboard icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="4" rx="1"/>
            <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3"/>
            <line x1="9" y1="12" x2="15" y2="12"/>
            <line x1="9" y1="16" x2="13" y2="16"/>
          </svg>

          {/* Globe icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>

          {/* Blue cluster/network icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" fill="#2563EB"/>
            <circle cx="5" cy="6" r="2.5" fill="#2563EB" opacity="0.75"/>
            <circle cx="19" cy="6" r="2.5" fill="#2563EB" opacity="0.75"/>
            <circle cx="5" cy="18" r="2.5" fill="#2563EB" opacity="0.75"/>
            <circle cx="19" cy="18" r="2.5" fill="#2563EB" opacity="0.75"/>
            <line x1="9.2" y1="10.2" x2="7" y2="7.8" stroke="#2563EB" strokeWidth="1.5" opacity="0.6"/>
            <line x1="14.8" y1="10.2" x2="17" y2="7.8" stroke="#2563EB" strokeWidth="1.5" opacity="0.6"/>
            <line x1="9.2" y1="13.8" x2="7" y2="16.2" stroke="#2563EB" strokeWidth="1.5" opacity="0.6"/>
            <line x1="14.8" y1="13.8" x2="17" y2="16.2" stroke="#2563EB" strokeWidth="1.5" opacity="0.6"/>
          </svg>

          {/* Separator */}
          <div style={{ width: 1, height: 20, backgroundColor: '#334155' }}/>

          {/* Arit profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
            {/* Circular photo */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="av_nav_skin" x1="0.3" y1="0.1" x2="0.9" y2="1">
                  <stop offset="0%" stopColor="#C68642"/>
                  <stop offset="60%" stopColor="#A0522D"/>
                  <stop offset="100%" stopColor="#8B4513"/>
                </linearGradient>
                <clipPath id="av_nav_clip">
                  <circle cx="14" cy="14" r="13"/>
                </clipPath>
              </defs>
              <circle cx="14" cy="14" r="13" fill="#1E293B" stroke="#DC143C" strokeWidth="1.5"/>
              <g clipPath="url(#av_nav_clip)">
                <ellipse cx="14" cy="30" rx="9" ry="6" fill="#DC143C"/>
                <rect cx="14" cy="19" x="10" y="18" width="8" height="12" fill="url(#av_nav_skin)"/>
                <ellipse cx="14" cy="15" rx="6" ry="7" fill="url(#av_nav_skin)"/>
                <ellipse cx="14" cy="9" rx="7" ry="5" fill="#1A0A00"/>
                <ellipse cx="14" cy="8" rx="5" ry="3" fill="#2D1200"/>
              </g>
            </svg>
            <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 500 }}>Arit</span>
            <span style={{ fontSize: 10, color: '#64748B' }}>▾</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Title row with 3D decorations */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 26,
              color: '#DC143C',
              margin: '0 0 5px',
              letterSpacing: '-0.5px',
            }}>
              Compliance &amp; Reporting
            </h1>
            <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
              All Reports Up-to-Date &nbsp;•&nbsp; Next Filing: 14 Days
            </p>
          </div>

          {/* 3D Illustrations top-right */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: -8 }}>
            <div style={{ filter: 'drop-shadow(0 8px 18px rgba(220,20,60,0.35))' }}>
              <Shield3D />
            </div>
            <div style={{ filter: 'drop-shadow(0 8px 18px rgba(200,168,80,0.3))' }}>
              <Scroll3D />
            </div>
          </div>
        </div>

        {/* Stat Cards — 3 columns, no progress bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

          {/* Campaign Finance Tracking */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                Campaign Finance<br/>Tracking
              </p>
              <FinanceIcon />
            </div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 30,
              color: '#FFFFFF',
              margin: '0 0 4px',
              letterSpacing: '-0.5px',
            }}>$184,720</p>
            <span style={{
              fontSize: 11,
              color: '#16A34A',
              backgroundColor: 'rgba(22,163,74,0.12)',
              padding: '2px 8px',
              borderRadius: 20,
              fontWeight: 600,
            }}>within limits</span>
          </div>

          {/* Donor Disclosure Status */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                Donor Disclosure<br/>Status
              </p>
              <PadlockIcon />
            </div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 30,
              color: '#FFFFFF',
              margin: '0 0 4px',
              letterSpacing: '-0.5px',
            }}>100%</p>
            <span style={{
              fontSize: 11,
              color: '#FFD700',
              backgroundColor: 'rgba(255,215,0,0.1)',
              padding: '2px 8px',
              borderRadius: 20,
              fontWeight: 600,
            }}>fully disclosed</span>
          </div>

          {/* Electoral Roll Sync */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                Electoral Roll<br/>Sync
              </p>
              <ScrollIcon />
            </div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 30,
              color: '#FFFFFF',
              margin: '0 0 4px',
              letterSpacing: '-0.5px',
            }}>Complete</p>
            <span style={{
              fontSize: 11,
              color: '#16A34A',
              backgroundColor: 'rgba(22,163,74,0.12)',
              padding: '2px 8px',
              borderRadius: 20,
              fontWeight: 600,
            }}>all districts synced</span>
          </div>
        </div>

        {/* Checklist + AI Alerts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Compliance Checklist */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: 12,
            padding: '18px 20px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', margin: '0 0 14px' }}>Compliance Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKLIST.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Checkbox tick */}
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    backgroundColor: '#16A34A',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Flag Alerts — simple bullet list */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: 12,
            padding: '18px 20px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', margin: '0 0 14px' }}>AI Flag Alerts</h3>
            <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AI_ALERTS.map((alert, i) => (
                <li key={i} style={{
                  fontSize: 13,
                  color: '#FCD34D',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}>
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Auto-generated Reports Table */}
        <div style={{
          backgroundColor: '#111827',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', margin: 0 }}>
              Reports <span style={{ color: '#64748B', fontSize: 12 }}>▾</span>
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                fontSize: 11,
                color: '#94A3B8',
                padding: '5px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.04)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>Filter Status ▾</button>
              <button style={{
                fontSize: 11,
                color: '#DC143C',
                padding: '5px 12px',
                border: '1px solid rgba(220,20,60,0.3)',
                borderRadius: 6,
                background: 'rgba(220,20,60,0.08)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 600,
              }}>Export CSV</button>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
                {['Report Type', 'Last Updated', 'Status', '', '', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#E2E8F0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REPORTS.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{r.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94A3B8' }}>{r.updated}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 12,
                      color: r.status === 'Compliant' ? '#16A34A' : '#F59E0B',
                      backgroundColor: r.status === 'Compliant' ? 'rgba(22,163,74,0.12)' : 'rgba(245,158,11,0.12)',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontWeight: 600,
                    }}>{r.status}</span>
                  </td>
                  {/* Checkbox tick icon */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      backgroundColor: '#16A34A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      backgroundColor: r.status === 'Compliant' ? '#16A34A' : '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748B', fontSize: 16, cursor: 'pointer' }}>⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
