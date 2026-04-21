'use client';

const CHECKLIST_ITEMS = [
  'Election Expenses Return Filed',
  'Candidate Nomination Filed',
  'Donor List Exported & Verified',
  'Campaign Finance Disclosure',
  'Electoral Roll Submission',
  'Canvassing Activity Log Submitted',
  'Media Spend Disclosure',
  'Online Ads Transparency Report',
  'Third-Party Agent Declarations',
  'Post-Election Audit Ready',
];

const AI_ALERTS = [
  { severity: 'warning', text: 'Potential compliance issue detected in expenditure records for April 2026. Review before next filing deadline.' },
  { severity: 'warning', text: 'Unverified donor entry requires review. Filing deadline in 5 days.' },
  { severity: 'info',    text: 'Canvassing data export pending electoral authority submission.' },
  { severity: 'info',    text: 'Possible voter registration mismatch in Nevis constituency — review needed.' },
];

const REPORTS = [
  { type: 'Campaign Finance Return',     updated: 'Apr 10, 2026', status: 'Compliant',  size: '2.4 MB' },
  { type: 'Auto-generated Donor Report', updated: 'Apr 08, 2026', status: 'Compliant',  size: '1.1 MB' },
  { type: 'Electoral Roll Submission',   updated: 'Apr 05, 2026', status: 'Pending',    size: '890 KB' },
  { type: 'Canvassing Activity Log',     updated: 'Apr 03, 2026', status: 'Compliant',  size: '560 KB' },
  { type: 'Media Expenditure Disclosure',updated: 'Mar 28, 2026', status: 'Compliant',  size: '340 KB' },
];

const KPI_CARDS = [
  { label: 'Campaign Finance',    value: '$184,720',  sub: 'Within EC Limits',   icon: '💰', color: '#4ADE80', trend: 'Compliant' },
  { label: 'Donor Disclosure',    value: '100%',      sub: 'All Donors Verified', icon: '✓',  color: '#4ADE80', trend: 'Complete' },
  { label: 'Electoral Roll Sync', value: 'Complete',  sub: 'Last sync Apr 12',    icon: '🗳', color: '#60A5FA', trend: 'Synced' },
  { label: 'Party Compliance',    value: '98%',       sub: 'Score — Excellent',   icon: '⚖', color: '#D4A017', trend: '↑ 2%' },
];

function GoldShield() {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      <defs>
        <linearGradient id="gshBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="gshInner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF0A0" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      <path d="M40,4 L74,18 L74,46 C74,66 58,82 40,88 C22,82 6,66 6,46 L6,18 Z" fill="url(#gshBody)" opacity="0.9" />
      <path d="M40,12 L66,24 L66,46 C66,62 54,76 40,82 C26,76 14,62 14,46 L14,24 Z" fill="url(#gshInner)" opacity="0.6" />
      <text x="40" y="56" textAnchor="middle" fill="#8B6914" fontSize="28" fontWeight="900">✓</text>
    </svg>
  );
}

export default function CompliancePage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#1a0005 0%,#2d0008 50%,#1a0005 100%)',
        borderBottom: '1px solid rgba(220,20,60,0.2)',
      }}>
        <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
          <GoldShield />
        </div>
        <div style={{ position: 'relative', padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'linear-gradient(135deg,#FFD700,#B8860B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              boxShadow: '0 8px 24px rgba(212,160,23,0.4)',
            }}>⚖️</div>
            <div>
              <p style={{ color: '#D4A017', fontSize: 11, fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal & Compliance</p>
              <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 2px' }}>Compliance &amp; Reporting</h1>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>Election Commission Standards · St. Kitts &amp; Nevis · 2026 Cycle</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {KPI_CARDS.map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.label}</span>
                <span style={{ fontSize: 18 }}>{card.icon}</span>
              </div>
              <p style={{ color: 'white', fontSize: 20, fontWeight: 900, margin: '0 0 4px' }}>{card.value}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: 11 }}>{card.sub}</span>
                <span style={{
                  background: card.color + '22', color: card.color,
                  borderRadius: 5, padding: '2px 7px', fontSize: 10, fontWeight: 700,
                }}>{card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 20 }}>

          {/* Compliance Checklist */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>Compliance Checklist</p>
              <span style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>
                {CHECKLIST_ITEMS.length}/{CHECKLIST_ITEMS.length} Complete
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CHECKLIST_ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.12)',
                  borderRadius: 8, padding: '10px 12px',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: '#4ADE80',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 11, color: '#0F172A', fontWeight: 900,
                  }}>✓</div>
                  <span style={{ color: '#C9D1DA', fontSize: 12 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button style={{
                flex: 1, background: '#DC143C', color: 'white', border: 'none',
                borderRadius: 8, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
              }}>Generate Compliance Report</button>
              <button style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#E2E8F0', borderRadius: 8, padding: '11px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>Upload Document</button>
            </div>
          </div>

          {/* AI Flag Alerts */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 22 }}>🛡️</div>
              <div>
                <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>AI Flag Alerts</p>
                <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Powered by Grok</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AI_ALERTS.map((alert, i) => (
                <div key={i} style={{
                  background: alert.severity === 'warning' ? 'rgba(212,160,23,0.08)' : 'rgba(100,116,139,0.08)',
                  border: '1px solid ' + (alert.severity === 'warning' ? 'rgba(212,160,23,0.2)' : 'rgba(100,116,139,0.2)'),
                  borderRadius: 8, padding: '10px 12px',
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{alert.severity === 'warning' ? '⚠️' : 'ℹ️'}</span>
                  <p style={{ color: alert.severity === 'warning' ? '#D4A017' : '#94A3B8', fontSize: 11, margin: 0, lineHeight: 1.5 }}>{alert.text}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '📄', label: 'View Full Audit Trail' },
                { icon: '📤', label: 'Export Data to EC Portal' },
                { icon: '📋', label: 'Download Compliance PDF' },
              ].map((action, i) => (
                <button key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                }}>
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Filed Reports</p>
            <button style={{ background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)', color: '#DC143C', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Export All</button>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 140px 100px 80px 80px',
            padding: '8px 20px', color: '#475569', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {['Report Type', 'Last Updated', 'Status', 'Size', 'Actions'].map(h => <span key={h}>{h}</span>)}
          </div>
          {REPORTS.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 100px 80px 80px',
              padding: '12px 20px', alignItems: 'center',
              borderBottom: i < REPORTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
            }}>
              <span style={{ color: '#C9D1DA', fontSize: 13, fontWeight: 600 }}>{r.type}</span>
              <span style={{ color: '#64748B', fontSize: 12 }}>{r.updated}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                background: r.status === 'Compliant' ? 'rgba(74,222,128,0.12)' : 'rgba(212,160,23,0.12)',
                color: r.status === 'Compliant' ? '#4ADE80' : '#D4A017',
                border: '1px solid ' + (r.status === 'Compliant' ? 'rgba(74,222,128,0.25)' : 'rgba(212,160,23,0.25)'),
                borderRadius: 5, padding: '2px 10px', fontSize: 11, fontWeight: 700, width: 'fit-content',
              }}>{r.status}</span>
              <span style={{ color: '#475569', fontSize: 12 }}>{r.size}</span>
              <button style={{ background: 'none', border: 'none', color: '#DC143C', fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 0 }}>Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
