'use client';
import { useState } from 'react';

const CAMPAIGNS = [
  { name: 'Election Rally',   status: 'Sent',    sent: '58%', click: '58%' },
  { name: 'Vote for Change',  status: 'Sent',    sent: '0%',  click: '0%'  },
  { name: 'Vote for Change',  status: 'Pending', sent: '0%',  click: '0%'  },
  { name: 'Vote for Change',  status: 'Pending', sent: '0%',  click: '0%'  },
  { name: 'Election Rally',   status: 'Sent',    sent: '15%', click: '58%' },
  { name: 'Vote for Change',  status: 'Pending', sent: '0%',  click: '0%'  },
  { name: 'Election Rally',   status: 'Sent',    sent: '0%',  click: '0%'  },
];

// Decorative bell SVG
function Bell({ color, size, style: s }: { color: string; size: number; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', ...s }}>
      <svg width={size} height={size * 1.1} viewBox="0 0 60 66">
        <defs>
          <radialGradient id={`bg${color.replace('#', '')}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor={color === '#gold' ? '#FFE566' : color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={color === '#gold' ? '#C49010' : color} stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {/* Bell shape */}
        <path d="M30,6 C20,6 12,14 12,24 L12,42 L6,48 L6,52 L54,52 L54,48 L48,42 L48,24 C48,14 40,6 30,6 Z"
          fill={color} opacity="0.9" />
        {/* Bell sheen */}
        <path d="M22,10 C18,14 16,20 16,26 L16,30" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Clapper */}
        <circle cx="30" cy="57" r="5" fill={color} opacity="0.8" />
        {/* Top loop */}
        <path d="M26,6 Q30,2 34,6" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
        {/* Rim highlight */}
        <rect x="6" y="48" width="48" height="4" rx="2" fill={color} opacity="0.7" />
      </svg>
    </div>
  );
}

export default function PushNotificationsPage() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [targetFilter, setTargetFilter] = useState('#0F172A');
  const [allUsers, setAllUsers] = useState(true);
  const [regVoters, setRegVoters] = useState(true);

  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Inter',sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* St Kitts flag background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          linear-gradient(135deg,
            #009E60 0%, #009E60 33%,
            #000 33%, #000 34%,
            #FCD116 34%, #FCD116 36%,
            #CE1126 36%, #CE1126 100%
          )
        `,
        opacity: 0.18,
      }} />
      {/* Dark overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'rgba(8,12,24,0.92)' }} />

      {/* Decorative bells */}
      <Bell color="#FFB300" size={90}  style={{ top: -10, left: -15, zIndex: 2, transform: 'rotate(-20deg)' }} />
      <Bell color="#9B59B6" size={75}  style={{ top: -8,  right: 30, zIndex: 2, transform: 'rotate(18deg)' }} />
      <Bell color="#DC143C" size={65}  style={{ bottom: 20, left: 20, zIndex: 2, transform: 'rotate(15deg)' }} />
      <Bell color="#FFB300" size={80}  style={{ bottom: 10, right: -10, zIndex: 2, transform: 'rotate(-12deg)' }} />
      <Bell color="#FFB300" size={50}  style={{ bottom: 80, right: 80, zIndex: 2, transform: 'rotate(8deg)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 12px',
              border: '1px solid rgba(255,255,255,0.1)', minWidth: 220,
            }}>
              <span style={{ color: '#64748B', fontSize: 14 }}>🔍</span>
              <span style={{ color: '#475569', fontSize: 13 }}>Search</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
            <div style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer',
            }}>
              <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>St. Kitts Nevis Labour Party</span>
              <span style={{ color: '#64748B', fontSize: 11 }}>▼</span>
            </div>
          </div>
        </div>

        {/* Red page title bar */}
        <div style={{
          background: 'linear-gradient(90deg,#B91C1C 0%,#991B1B 100%)',
          padding: '14px 20px',
        }}>
          <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0 }}>Push Notifications</h1>
        </div>

        <div style={{ padding: '16px 20px' }}>

          {/* Top action row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button style={{
                background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
                padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
              }}>Create New Push Campaign</button>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>
                Sent Today: <strong style={{ color: '#E2E8F0' }}>3,241</strong> &bull; Click Rate <strong style={{ color: '#4ADE80' }}>61%</strong>
              </span>
            </div>
          </div>

          <p style={{ color: '#475569', fontSize: 12, margin: '0 0 10px' }}>#Campaign</p>

          {/* 2-col: table + composer */}
          <div className="rg-chart-panel" style={{ gap: 16 }}>

            {/* Campaign table */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 90px 80px 90px', minWidth: 'max-content',
                padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
                color: '#94A3B8', fontSize: 12, fontWeight: 600,
              }}>
                <span>Campaign Name</span><span>Status</span><span>Sent</span><span>Click Rate</span>
              </div>
              {CAMPAIGNS.map((c, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr 90px 80px 90px', minWidth: 'max-content',
                  padding: '11px 16px', alignItems: 'center',
                  borderBottom: i < CAMPAIGNS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                }}>
                  <span style={{ color: '#E2E8F0', fontSize: 13 }}>{c.name}</span>
                  <span>
                    <span style={{
                      display: 'inline-block',
                      background: c.status === 'Sent' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.12)',
                      color: c.status === 'Sent' ? '#4ADE80' : '#FBBF24',
                      border: `1px solid ${c.status === 'Sent' ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.3)'}`,
                      fontSize: 11, fontWeight: 700,
                      padding: '2px 10px', borderRadius: 5,
                    }}>{c.status}</span>
                  </span>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{c.sent}</span>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{c.click}</span>
                </div>
              ))}
            </div>

            {/* Notification Composer */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10,
              padding: '16px',
            }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 14px' }}>Notification Composer</p>

              {/* Upload Image */}
              <label style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Upload Image</label>
              <div
                onClick={() => setImageUploaded(i => !i)}
                style={{
                  width: '100%', aspectRatio: '4/3',
                  background: imageUploaded ? 'linear-gradient(135deg,#DC143C,#7C1010)' : 'rgba(255,255,255,0.07)',
                  border: '1.5px dashed rgba(255,255,255,0.2)', borderRadius: 8,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', marginBottom: 12, color: '#475569',
                  transition: 'all 0.2s',
                }}
              >
                {imageUploaded
                  ? <span style={{ fontSize: 28, color: 'white' }}>✓</span>
                  : <>
                    <span style={{ fontSize: 28 }}>🖼️</span>
                    <span style={{ fontSize: 11, marginTop: 4 }}>Click to upload</span>
                  </>
                }
              </div>

              {/* Target filter dropdown */}
              <select
                value={targetFilter}
                onChange={e => setTargetFilter(e.target.value)}
                style={{
                  width: '100%', background: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                  color: '#E2E8F0', fontSize: 13, padding: '8px 10px',
                  marginBottom: 14, cursor: 'pointer', outline: 'none',
                }}
              >
                <option value="#0F172A">#0F172A</option>
                <option value="sknlp">SKNLP</option>
                <option value="basseterre">Basseterre</option>
              </select>

              {/* Targeting */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: 0 }}>Targeting</p>
                  <span style={{ color: '#475569', fontSize: 14, cursor: 'pointer' }}>›</span>
                </div>
                {[
                  { label: 'All Users',          value: allUsers,   set: setAllUsers },
                  { label: 'Registered Voters',  value: regVoters,  set: setRegVoters },
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div
                      onClick={() => t.set(!t.value)}
                      style={{
                        width: 16, height: 16, borderRadius: 3, cursor: 'pointer',
                        background: t.value ? '#DC143C' : 'rgba(255,255,255,0.1)',
                        border: t.value ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: 'white',
                        flexShrink: 0,
                      }}
                    >{t.value ? '✓' : ''}</div>
                    <span style={{ color: '#C9D1DA', fontSize: 13 }}>{t.label}</span>
                  </div>
                ))}
              </div>

              {/* Send button */}
              <button style={{
                width: '100%', background: '#DC143C', color: 'white',
                border: 'none', borderRadius: 8, padding: '12px',
                fontSize: 13, fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
              }}>🚀 Send Push Notification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
