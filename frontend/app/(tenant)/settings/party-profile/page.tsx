'use client';
import { useState } from 'react';

function SKNFlagBanner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0505 0%, #DC143C 30%, #8B000A 60%, #2D0A00 80%, #1a0a00 100%)',
      borderRadius: '12px 12px 0 0', padding: '22px 24px',
      position: 'relative', overflow: 'hidden', minHeight: 90,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Flag stripe overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(135deg,
            rgba(0,0,0,0) 0%, rgba(0,0,0,0) 38%,
            rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.6) 44%,
            rgba(212,160,23,0.7) 44%, rgba(212,160,23,0.7) 50%,
            rgba(0,0,0,0) 50%
          )
        `,
      }} />
      {/* Glow */}
      <div style={{ position: 'absolute', left: '30%', top: '-20px', width: '300px', height: '150px', background: 'radial-gradient(ellipse, rgba(255,200,50,0.35) 0%, transparent 70%)', }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 900, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Party Profile</h2>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 8 }}>
        <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>🏳</button>
        <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>⚙️</button>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 8,
          border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
          background: 'white', outline: 'none', boxSizing: 'border-box',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

function PreviewCard({ leader, email, phone }: { leader: string; email: string; phone: string }) {
  return (
    <div style={{
      background: 'white', borderRadius: 12, overflow: 'hidden',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* Flag header */}
      <div style={{
        height: 80,
        background: 'linear-gradient(135deg, #009E60 0%, #009E60 33%, #000 33%, #000 40%, #FCD116 40%, #FCD116 48%, #CE1126 48%, #CE1126 100%)',
        position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: 0,
      }}>
        {/* Circular logo */}
        <div style={{
          position: 'absolute', bottom: -28,
          width: 56, height: 56, borderRadius: '50%',
          background: 'white', border: '3px solid white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}>
          <svg viewBox="0 0 56 56" width="56" height="56">
            <rect width="56" height="56" fill="#f8f9fa" />
            <polygon points="0,56 56,56 0,0" fill="#009E60" />
            <polygon points="56,0 56,56 0,0" fill="#CE1126" />
            <polygon points="0,0 5,0 56,46 56,56 5,56 0,56" fill="#000" />
            <polygon points="5,0 12,0 56,34 56,46" fill="#FCD116" />
            <polygon points="0,44 0,56 5,56 56,10 56,0 50,0" fill="#FCD116" />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)' }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: '#DC143C', letterSpacing: '-0.5px' }}>SKNLP</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 16px 16px', textAlign: 'center' }}>
        <p style={{ color: '#111827', fontSize: 15, fontWeight: 800, margin: '0 0 2px' }}>Party Profile</p>
        <p style={{ color: '#DC143C', fontSize: 12, fontWeight: 600, margin: '0 0 14px' }}>Labour Party</p>

        <p style={{ color: '#374151', fontSize: 13, fontWeight: 700, margin: '0 0 10px', textAlign: 'left' }}>Leader&apos;s Name</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
          {[
            { icon: '✉️', text: email || 'info@sknlp.org' },
            { icon: '📞', text: phone || '+1 869 465 2535' },
            { icon: '📍', text: 'St. Kitts' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span style={{ color: '#6B7280', fontSize: 12 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, textAlign: 'left' }}>
          <p style={{ color: '#374151', fontSize: 11, fontWeight: 700, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</p>
          <p style={{ color: '#6B7280', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
            The St. Kitts Nevis Labour Party (SKNLP) is dedicated to serving people of St. Kitts and Nevis with integrity and vision.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PartyProfilePage() {
  const [partyName, setPartyName] = useState('St. Kitts Nevis Labour Party');
  const [leader, setLeader] = useState('Hon. Marcus Liburd');
  const [email, setEmail] = useState('info@sknlp.org');
  const [phone, setPhone] = useState('+1 869 465 2535');
  const [address, setAddress] = useState('Government Headquarters,\nChurch Street,\nBasseterre,\nSt. Kitts');
  const [desc, setDesc] = useState('The St. Kitts Nevis Labour Party (SKNLP) is dedicated to serving the people of St. Kitts and Nevis with integrity and vision.');

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: "'Inter',sans-serif", padding: '20px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, maxWidth: '100%' }}>

        {/* Left: form card */}
        <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
          <SKNFlagBanner />

          <div style={{ padding: '24px' }}>
            <h3 style={{ color: '#111827', fontSize: 18, fontWeight: 800, margin: '0 0 20px' }}>Party Settings</h3>

            {/* Party Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Party Name</label>
              <div style={{ position: 'relative' }}>
                <select value={partyName} onChange={e => setPartyName(e.target.value)} style={{
                  width: '100%', padding: '10px 36px 10px 14px', borderRadius: 8,
                  border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
                  background: 'white', outline: 'none', appearance: 'none', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>
                  <option>St. Kitts Nevis Labour Party</option>
                </select>
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 12 }}>▼</span>
              </div>
            </div>

            {/* Leader */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Leader</label>
              <div style={{ position: 'relative' }}>
                <input value={leader} onChange={e => setLeader(e.target.value)} style={{
                  width: '100%', padding: '10px 44px 10px 14px', borderRadius: 8,
                  border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
                  background: 'white', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                }} />
                <button style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 28, height: 28, borderRadius: 6, background: '#e5e7eb', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                }}>✓</button>
              </div>
            </div>

            {/* Email + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Contact Email</label>
                <div style={{ position: 'relative' }}>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{
                    width: '100%', padding: '10px 36px 10px 14px', borderRadius: 8, border: '1px solid #d1d5db',
                    fontSize: 14, color: '#111827', background: 'white', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                  }} />
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#9CA3AF' }}>📅</span>
                </div>
              </div>
              <InputField label="Phone" value={phone} onChange={setPhone} type="tel" />
            </div>

            {/* Address + Logo upload */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 12, marginBottom: 16, alignItems: 'start' }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows={4} style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db',
                  fontSize: 13, color: '#111827', background: 'white', outline: 'none',
                  resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.6,
                }} />
              </div>
              {/* Logo upload block */}
              <div style={{
                background: '#f8f9fa', border: '1px solid #e5e7eb', borderRadius: 10,
                padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              }}>
                {/* SKNLP mini logo */}
                <div style={{ width: 50, height: 50, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <svg viewBox="0 0 50 50" width="50" height="50">
                    <polygon points="0,50 50,50 0,0" fill="#009E60" />
                    <polygon points="50,0 50,50 0,0" fill="#CE1126" />
                    <polygon points="0,0 5,0 50,43 50,50 5,50 0,50" fill="#000" />
                    <polygon points="5,0 11,0 50,31 50,43" fill="#FCD116" />
                    <polygon points="0,40 0,50 5,50 50,9 50,0 45,0" fill="#FCD116" />
                    <text x="25" y="32" textAnchor="middle" fill="white" fontSize="8" fontWeight="900">SKNLP</text>
                  </svg>
                </div>
                <button style={{
                  width: '100%', background: '#DC143C', color: 'white', border: 'none',
                  borderRadius: 8, padding: '8px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>Upload Party Logo</button>
              </div>
            </div>

            {/* Description rich text */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</label>
              {/* Toolbar */}
              <div style={{
                display: 'flex', gap: 4, padding: '6px 10px',
                border: '1px solid #d1d5db', borderBottom: 'none', borderRadius: '8px 8px 0 0',
                background: '#f9fafb',
              }}>
                {['Rich','Task','B','I','≡','≡','⌘','≡','≡','⋮'].map((btn, i) => (
                  <button key={i} style={{
                    background: i < 2 ? '#e5e7eb' : 'none', border: 'none', borderRadius: 4,
                    padding: '3px 7px', fontSize: i < 2 ? 10 : 13, color: '#374151', cursor: 'pointer', fontWeight: 600,
                  }}>{btn}</button>
                ))}
              </div>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} style={{
                width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                borderRadius: '0 0 8px 8px', fontSize: 13, color: '#111827', background: 'white',
                outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.6,
              }} />
            </div>

            {/* Save button */}
            <button style={{
              background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
              padding: '11px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
            }}>Save Party Profile</button>
          </div>
        </div>

        {/* Right: preview */}
        <div>
          <div style={{ background: '#DC143C', borderRadius: 8, padding: '8px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>🔍</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Search</span>
            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>↓ ⋮</span>
          </div>
          <PreviewCard leader={leader} email={email} phone={phone} />
        </div>
      </div>
    </div>
  );
}
