'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const CONSENT_DATA = [
  { name: 'Granted', value: 82, color: '#22C55E' },
  { name: 'Pending', value: 12, color: '#F59E0B' },
  { name: 'Withdrawn', value: 4, color: '#DC143C' },
  { name: 'Expired', value: 2, color: '#475569' },
];

const AUDIT_DATA = [
  { m: 'Oct', v: 42 }, { m: 'Nov', v: 58 }, { m: 'Dec', v: 35 },
  { m: 'Jan', v: 62 }, { m: 'Feb', v: 48 }, { m: 'Mar', v: 75 },
  { m: 'Apr', v: 55 },
];

const ACCESS_REQUESTS = [
  { id: 'REQ-2026-041', user: 'Marcus Liburd', date: 'Apr 22, 2026', purpose: 'Campaign Analytics',    status: 5 },
  { id: 'REQ-2026-040', user: 'Sarah Williams', date: 'Apr 19, 2026', purpose: 'Voter Outreach',       status: 5 },
  { id: 'REQ-2026-039', user: 'James Clarke',   date: 'Apr 17, 2026', purpose: 'Compliance Audit',     status: 4 },
  { id: 'REQ-2026-038', user: 'SKNLP HQ Admin', date: 'Apr 15, 2026', purpose: 'Electoral Commission', status: 5 },
];

const PRIVACY_INSIGHTS = [
  { name: 'Data Retention Compliance',    code: 'SKN-2026-A' },
  { name: 'Consent Management Score',     code: 'SKN-2026-B' },
  { name: 'Data Breach Prevention',       code: 'SKN-2026-C' },
  { name: 'Third-Party Access Control',   code: 'SKN-2026-D' },
  { name: 'St. Kitts Nevis Labour Party', code: 'SKN-2026-E' },
];

function PrivacyShield() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 90 }}>
      <div style={{
        position: 'absolute',
        width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
      }} />
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="privShield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <path d="M36,2 L68,14 L68,42 C68,60 54,72 36,78 C18,72 4,60 4,42 L4,14 Z" fill="url(#privShield)" />
        <path d="M36,10 L60,20 L60,42 C60,56 48,66 36,70 C24,66 12,56 12,42 L12,20 Z" fill="rgba(255,255,255,0.15)" />
        <rect x="24" y="44" width="24" height="18" rx="3" fill="rgba(255,255,255,0.25)" />
        <path d="M28,44 L28,36 C28,30 44,30 44,36 L44,44" stroke="rgba(255,255,255,0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="36" cy="52" r="3" fill="rgba(255,255,255,0.8)" />
        <rect x="34.5" y="54" width="3" height="4" rx="1.5" fill="rgba(255,255,255,0.8)" />
      </svg>
    </div>
  );
}

function GoldAuditorShield() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 90 }}>
      <div style={{
        position: 'absolute',
        width: 110, height: 110, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,160,23,0.4) 0%, transparent 70%)',
      }} />
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <radialGradient id="auditorG" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="60%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#8B6000" />
          </radialGradient>
        </defs>
        <path d="M36,2 L68,14 L68,42 C68,60 54,72 36,78 C18,72 4,60 4,42 L4,14 Z" fill="url(#auditorG)" />
        <path d="M36,10 L60,20 L60,42 C60,56 48,66 36,70 C24,66 12,56 12,42 L12,20 Z" fill="rgba(255,255,255,0.15)" />
        <rect x="24" y="44" width="24" height="18" rx="3" fill="rgba(0,0,0,0.35)" />
        <path d="M28,44 L28,36 C28,30 44,30 44,36 L44,44" stroke="rgba(0,0,0,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="36" cy="52" r="3" fill="#FFD700" />
        <rect x="34.5" y="54" width="3" height="4" rx="1.5" fill="#FFD700" />
        {/* Stars */}
        {[-1, 0, 1].map((offset, i) => (
          <text key={i} x={28 + i * 8} y={26} fontSize="7" fill="#FFE566" textAnchor="middle">★</text>
        ))}
      </svg>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: 42, height: 24, borderRadius: 12,
      background: on ? '#DC143C' : '#374151',
      position: 'relative', flexShrink: 0, cursor: 'pointer',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        position: 'absolute', top: 3, left: on ? 21 : 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

export default function DataPrivacyPage() {
  const [tab, setTab] = useState<'overview' | 'consent' | 'requests'>('overview');

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Red hero banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #DC143C 0%, #8B000A 55%, #1a0a0a 100%)',
        padding: '28px 28px 22px',
        marginBottom: 24,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 50%, rgba(255,100,50,0.25) 0%, transparent 55%)' }} />
        {/* Palm tree silhouette */}
        <svg style={{ position: 'absolute', right: 200, top: 0, opacity: 0.25 }} width="70" height="120" viewBox="0 0 70 120">
          <path d="M38,120 Q36,80 38,50 Q40,32 42,20" stroke="#1a6a10" strokeWidth="5" fill="none" />
          <path d="M42,20 Q25,8 8,6 Q25,18 30,32" fill="#228b22" />
          <path d="M42,20 Q32,4 24,0 Q44,14 44,26" fill="#1a6a10" />
          <path d="M42,20 Q58,6 68,0 Q54,18 48,28" fill="#228b22" />
        </svg>
        {/* SK flag badge */}
        <div style={{ position: 'absolute', right: 24, top: 16 }}>
          <div style={{ width: 80, height: 50, borderRadius: 8, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)' }}>
            <svg viewBox="0 0 80 50" width="80" height="50">
              <rect width="80" height="50" fill="#009E60" />
              <polygon points="0,50 52,50 0,0" fill="#000" />
              <polygon points="80,0 80,50 28,0" fill="#CE1126" />
              <line x1="0" y1="22" x2="80" y2="22" stroke="#FCD116" strokeWidth="4" />
              <line x1="0" y1="30" x2="80" y2="30" stroke="#FCD116" strokeWidth="4" />
              <line x1="26" y1="0" x2="26" y2="50" stroke="#FCD116" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <h1 style={{ color: 'white', fontSize: 28, fontWeight: 900, margin: '0 0 6px' }}>Data Privacy &amp; Protection</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: 0 }}>
            Consent Logs &nbsp;•&nbsp; Data Access Requests &nbsp;•&nbsp; Retention Policies &nbsp;•&nbsp; Data Protection Act
          </p>
        </div>
      </div>

      <div style={{ padding: '0 24px 28px' }}>

        {/* Compliance status pill */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(220,20,60,0.9), rgba(139,0,10,0.9))',
          borderRadius: 10, padding: '12px 20px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', flexShrink: 0 }} />
          <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
            GDPR &amp; St Kitts-Nevis Data Protection Act Compliant &nbsp;•&nbsp; 100%
          </span>
        </div>

        {/* 3 stat cards */}
        <div className="rg-3" style={{ gap: 16, marginBottom: 24 }}>

          {/* Data Privacy Score */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>Data Privacy Score</p>
            <PrivacyShield />
            <p style={{ color: 'white', fontSize: 42, fontWeight: 900, margin: '4px 0 0', letterSpacing: '-0.02em', lineHeight: 1 }}>100%</p>
            <p style={{ color: '#22C55E', fontSize: 12, margin: '6px 0 0', fontWeight: 600 }}>● Fully Compliant</p>
          </div>

          {/* Consent Overview */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>Consent Overview</p>
            <div style={{ position: 'relative', width: '100%', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={CONSENT_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" startAngle={90} endAngle={-270}>
                    {CONSENT_DATA.map((e, i) => <Cell key={i} fill={e.color} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>82%</span>
                <span style={{ color: '#64748B', fontSize: 10 }}>Granted</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {CONSENT_DATA.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ color: '#64748B', fontSize: 10 }}>{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Privacy Auditor */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>AI Privacy Auditor</p>
            <GoldAuditorShield />
            <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textAlign: 'center' }}>AI Privacy Summary</p>
            <p style={{ color: '#64748B', fontSize: 11, margin: '0 0 12px', textAlign: 'center' }}>No violations detected in last 30 days</p>
            <button style={{
              width: '100%', background: 'linear-gradient(90deg, #C9A227, #D4A017)',
              color: 'white', border: 'none', borderRadius: 8,
              padding: '10px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(212,160,23,0.4)',
            }}>Export All Consent Records</button>
          </div>
        </div>

        {/* Bottom 2-col: Privacy Settings + Audit + Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

          {/* Consent Management */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px' }}>
            <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: '0 0 14px' }}>Consent Management</p>
            {[
              { label: 'Voter Consent (Texting)',    val: '86%', ok: true },
              { label: 'Voter Consent (Email)',      val: '100%', ok: true },
              { label: 'Voter Consent (Calling)',    val: '1,152', ok: true },
              { label: 'Data Retention Active',      val: '200 days', ok: true },
              { label: 'GDPR Opt-Out Rate',          val: '0.0%', ok: true },
              { label: 'Withdrawn Consent',          val: '0.5%', ok: true },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{row.label}</span>
                <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 600 }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Privacy Settings + AI Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px' }}>
              <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: '0 0 14px' }}>Privacy Settings</p>
              {[
                { label: 'Enable Offline Data Encryption', on: true },
                { label: 'Anonymize Voter Notes', on: false },
                { label: 'Auto-Delete After Retention Period', on: true },
                { label: 'Restrict Third-Party Data Access', on: false },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{row.label}</span>
                  <Toggle on={row.on} />
                </div>
              ))}
            </div>

            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px' }}>
              <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>AI Privacy Insights</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 4 }}>
                <span style={{ color: '#475569', fontSize: 11, fontWeight: 700, padding: '4px 0' }}>Policy Name</span>
                <span style={{ color: '#475569', fontSize: 11, fontWeight: 700, padding: '4px 0' }}>Code</span>
                {PRIVACY_INSIGHTS.map((p, i) => (
                  <>
                    <span key={`l${i}`} style={{ color: '#CBD5E1', fontSize: 12, padding: '5px 0', borderBottom: i < PRIVACY_INSIGHTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>{p.name}</span>
                    <span key={`c${i}`} style={{ color: '#64748B', fontSize: 11, padding: '5px 0', borderBottom: i < PRIVACY_INSIGHTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>{p.code}</span>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Access Requests */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 700, margin: 0 }}>Recent Access Requests</p>
            <button style={{ background: '#DC143C', color: 'white', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              + New Request
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr auto', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#475569', fontSize: 11, fontWeight: 700, gap: 12 }}>
            <span>Request ID</span><span>User</span><span>Date</span><span>Purpose</span><span>Status</span>
          </div>
          {ACCESS_REQUESTS.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr auto',
              padding: '12px 20px', alignItems: 'center', gap: 12,
              borderBottom: i < ACCESS_REQUESTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ color: '#DC143C', fontSize: 12, fontWeight: 600 }}>{r.id}</span>
              <span style={{ color: '#CBD5E1', fontSize: 12 }}>{r.user}</span>
              <span style={{ color: '#64748B', fontSize: 12 }}>{r.date}</span>
              <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.purpose}</span>
              <div style={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} style={{ color: si < r.status ? '#D4A017' : '#374151', fontSize: 12 }}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
