'use client';
import { useState } from 'react';

const BLASTS = [
  { campaign: '#0F172A', preview: 'Election Rally',   sent: '1,2970', delivered: '12,506', responses: '0 pnp' },
  { campaign: '#0F172A', preview: 'Get Out the Vote', sent: '1,2800', delivered: '1',      responses: '0 pnp' },
  { campaign: '#0F172A', preview: 'Get Out the Vote', sent: '1,3040', delivered: '1,12%',  responses: '0 pnp' },
  { campaign: '#0F172A', preview: 'Get Out the Vote', sent: '1,4949', delivered: '-',      responses: '2 pnp' },
  { campaign: '#0F172A', preview: 'Get Out the Vote', sent: '1,3909', delivered: '8,1%',   responses: '2 pnp' },
  { campaign: '#0F172A', preview: 'Election Rally',   sent: '1,1499', delivered: '0,05%',  responses: '2 pnp' },
  { campaign: '#0F172A', preview: 'Election Rally',   sent: '1,2829', delivered: '0,46%',  responses: '4 pnp' },
];

const PREVIEW_TAGS: Record<string, string> = {
  'Election Rally':   '#1E3A5F',
  'Get Out the Vote': '#1A3D28',
};

export default function SMSBlastsPage() {
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('All Constituencies');
  const maxLen = 160;

  return (
    <div style={{ backgroundColor: '#0C1220', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Red top banner */}
      <div style={{
        background: 'linear-gradient(90deg,#B91C1C 0%,#7F1D1D 100%)',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 52,
      }}>
        <h2 style={{ color: 'white', fontSize: 18, fontWeight: 800, margin: 0 }}>SMS Blasts</h2>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: 18 }}>🔍</button>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Page title + button */}
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 14px' }}>SMS Blasts</h1>

        <button style={{
          background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
          padding: '12px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(220,20,60,0.4)',
          marginBottom: 12,
        }}>
          Send New SMS Blast <span style={{ fontSize: 18, fontWeight: 900 }}>+</span>
        </button>

        <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 16px' }}>
          Sent Today: <strong style={{ color: '#E2E8F0' }}>1,872</strong> &bull; Delivery Rate <strong style={{ color: '#4ADE80' }}>98%</strong>
        </p>

        {/* 2-col layout: table + composer */}
        <div className="rg-chart-panel" style={{ gap: 16 }}>

          {/* Table */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '130px 1fr 90px 100px 100px', minWidth: 'max-content',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              color: '#94A3B8', fontSize: 12, fontWeight: 600,
            }}>
              <span>Campaign Name</span>
              <span>Message Preview</span>
              <span>Sent</span>
              <span>Delivered</span>
              <span>Responses</span>
            </div>

            {BLASTS.map((b, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '130px 1fr 90px 100px 100px', minWidth: 'max-content',
                padding: '11px 16px', alignItems: 'center',
                borderBottom: i < BLASTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              }}>
                {/* Campaign name with phone icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(220,20,60,0.15)', border: '1.5px solid rgba(220,20,60,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0,
                  }}>📱</div>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{b.campaign}</span>
                </div>
                {/* Preview tag */}
                <div>
                  <span style={{
                    background: PREVIEW_TAGS[b.preview] || '#1E293B',
                    color: 'white', fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', borderRadius: 5,
                    display: 'inline-block',
                  }}>{b.preview}</span>
                </div>
                <span style={{ color: '#E2E8F0', fontSize: 12 }}>{b.sent}</span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{b.delivered}</span>
                <span style={{
                  color: b.responses === '0 pnp' ? '#475569' : '#4ADE80',
                  fontSize: 12, fontWeight: b.responses !== '0 pnp' ? 700 : 400,
                }}>{b.responses}</span>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
            padding: '18px',
          }}>
            <p style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: '0 0 14px' }}>Compose SMS Blast</p>

            {/* Recipient Filter */}
            <label style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 5 }}>Recipient Filter</label>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{
                width: '100%', background: '#1E293B', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 6, color: '#E2E8F0', fontSize: 13, padding: '8px 10px',
                marginBottom: 14, cursor: 'pointer', outline: 'none',
              }}
            >
              <option>All Constituencies</option>
              <option>Basseterre</option>
              <option>Sandy Point</option>
              <option>Cayon</option>
              <option>Charlestown</option>
            </select>

            {/* Message label */}
            <label style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 5 }}>Fundraised</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value.slice(0, maxLen))}
              placeholder="Type your SMS message..."
              rows={7}
              style={{
                width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1',
                borderRadius: 6, color: '#0F172A', fontSize: 13, padding: '10px',
                resize: 'none', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', lineHeight: 1.5,
                marginBottom: 10,
              }}
            />

            {/* Char count */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 6, padding: '4px 10px',
              color: message.length >= maxLen ? '#EF4444' : '#94A3B8',
              fontSize: 12, fontWeight: 600, marginBottom: 12,
            }}>
              {message.length}/{maxLen}
            </div>

            {/* Send Now */}
            <button style={{
              width: '100%', background: 'linear-gradient(90deg,#C4A000,#D4B000)',
              color: '#1a1000', border: 'none', borderRadius: 8,
              padding: '13px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(196,160,0,0.35)',
            }}>
              <span style={{ fontSize: 16 }}>✔</span> Send Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
