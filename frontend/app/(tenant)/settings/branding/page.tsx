'use client';
import { useState } from 'react';

function SidebarPreview({ primary }: { primary: string }) {
  const navItems = ['Dashboard', 'Contacts', 'Emails', 'Website', 'Branding', 'Settings'];
  return (
    <div style={{
      background: '#0F172A', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ color: 'white', fontSize: 13, fontWeight: 900 }}>Campaign 365</span>
      </div>
      {navItems.map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 16px',
          background: item === 'Branding' ? primary : 'transparent',
          borderRadius: item === 'Branding' ? '0 8px 8px 0' : 0,
          marginRight: item === 'Branding' ? 8 : 0,
        }}>
          <span style={{ fontSize: 12 }}>
            {['🏠','👥','✉️','🌐','🎨','⚙️'][i]}
          </span>
          <span style={{ color: item === 'Branding' ? 'white' : '#94A3B8', fontSize: 12, fontWeight: item === 'Branding' ? 700 : 400 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function BrandingVisualsPage() {
  const [primary, setPrimary] = useState('#DC143C');
  const [accent, setAccent] = useState('#FFD700');
  const [domain, setDomain] = useState('www.sknlp.org');

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: "'Inter',sans-serif", padding: '24px' }}>
      <h1 style={{ color: '#0F172A', fontSize: 24, fontWeight: 900, margin: '0 0 24px' }}>Branding &amp; Visuals</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>

        {/* Left: form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Logo & Favicon */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ color: '#111827', fontSize: 15, fontWeight: 700, margin: 0 }}>Logo &amp; Favicon</h3>
              <button style={{
                background: primary, color: 'white', border: 'none', borderRadius: 8,
                padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: `0 3px 12px ${primary}44`,
              }}>Upload New Logo</button>
            </div>
            {/* Checkerboard placeholder */}
            <div style={{
              width: '100%', height: 80,
              background: `repeating-conic-gradient(#f3f4f6 0% 25%, white 0% 50%) 0 0 / 16px 16px`,
              borderRadius: 8, marginBottom: 12, border: '1px solid #e5e7eb',
            }} />
            <label style={{ display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Current Logo</label>
            <input defaultValue="sknlp-logo.png" style={{
              width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db',
              fontSize: 13, color: '#111827', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
            }} />
          </div>

          {/* Color swatches */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Primary */}
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Primary Colour</label>
                <div style={{ width: '100%', height: 72, borderRadius: 10, background: primary, marginBottom: 10, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input value={primary} onChange={e => setPrimary(e.target.value)} style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db',
                    fontSize: 13, color: '#111827', outline: 'none', fontFamily: 'inherit',
                  }} />
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <input type="color" value={primary} onChange={e => setPrimary(e.target.value)} style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: primary, border: '2px solid white', boxShadow: '0 0 0 1px #d1d5db', cursor: 'pointer' }} />
                  </div>
                  <button style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 8px', fontSize: 11, color: '#374151', cursor: 'pointer' }}>▼</button>
                </div>
              </div>
              {/* Accent */}
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Accent Colour</label>
                <div style={{ width: '100%', height: 72, borderRadius: 10, background: accent, marginBottom: 10, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input value={accent} onChange={e => setAccent(e.target.value)} style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db',
                    fontSize: 13, color: '#111827', outline: 'none', fontFamily: 'inherit',
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Domain + App Icon */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Custom Domain</label>
                <input value={domain} onChange={e => setDomain(e.target.value)} style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db',
                  fontSize: 13, color: '#111827', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>App Icon</label>
                <div style={{ position: 'relative' }}>
                  <select style={{
                    width: '100%', padding: '9px 32px 9px 12px', borderRadius: 8, border: '1px solid #d1d5db',
                    fontSize: 13, color: '#111827', background: 'white', outline: 'none', appearance: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    <option>Default SKNLP Icon</option>
                  </select>
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 11, pointerEvents: 'none' }}>▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Signature */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Email Signature</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#374151', fontSize: 13, margin: '0 0 4px' }}>Best regards,</p>
                <p style={{ color: '#374151', fontSize: 13, margin: 0 }}>The SKNLP Team</p>
              </div>
              <svg viewBox="0 0 100 60" width="90" height="55">
                <text x="5" y="50" fontSize="52" fontWeight="900" fill="#DC143C" fontFamily="'Arial Black',sans-serif">S</text>
                <text x="48" y="50" fontSize="52" fontWeight="900" fill="#D4A017" fontFamily="'Arial Black',sans-serif">K</text>
              </svg>
            </div>
          </div>

          <button style={{
            background: primary, color: 'white', border: 'none', borderRadius: 8,
            padding: '12px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            width: 'fit-content', boxShadow: `0 4px 14px ${primary}44`,
          }}>Save Branding Settings</button>
        </div>

        {/* Right: live preview */}
        <div>
          <h3 style={{ color: '#374151', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Live Preview</h3>
          <SidebarPreview primary={primary} />
          <div style={{ marginTop: 12, background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <p style={{ color: '#374151', fontSize: 12, fontWeight: 600, margin: '0 0 8px' }}>Header Preview</p>
            <div style={{ background: primary, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'white', fontSize: 13, fontWeight: 800 }}>Campaign 365</span>
              <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: accent }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
