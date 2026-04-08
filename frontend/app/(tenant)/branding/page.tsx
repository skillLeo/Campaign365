'use client';
import { useState } from 'react';
import { Upload, Check, AlertCircle, Globe, Mail, Smartphone, Lock } from 'lucide-react';

const SKNLP_RED = '#E30613';

export default function BrandingPage() {
  const [partyName, setPartyName] = useState('St. Kitts and Nevis Labour Party');
  const [slogan, setSlogan] = useState('Moving St. Kitts and Nevis Forward');
  const [appLabel, setAppLabel] = useState('Canvass App');
  const [emailFooter, setEmailFooter] = useState('info@sknlp.org  •  www.sknlp.org');
  const [addBranding, setAddBranding] = useState(true);
  const [defaultTheme, setDefaultTheme] = useState('Default Theme');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Party Profile &amp; Branding</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Dashboard › Party Profile</p>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={12} style={{ color: '#E30613' }} />
            <span style={{ fontSize: 12, color: '#B91C1C', fontWeight: 500 }}>Colors locked by your administrator</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Settings Form */}
        <div className="space-y-5">
          {/* Party Logo */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Party Logo</h3>
            <div className="flex items-start gap-5">
              {/* Current logo */}
              <div style={{ width: 80, height: 80, backgroundColor: SKNLP_RED, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div className="text-center">
                  <p style={{ color: 'white', fontSize: 10, fontWeight: 800, lineHeight: 1 }}>SKNLP</p>
                </div>
              </div>
              <div className="flex-1">
                <div
                  style={{ border: '2px dashed #E2E8F0', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = SKNLP_RED)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                >
                  <Upload size={20} style={{ color: '#94A3B8', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Drop your logo here or click to upload</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>PNG, SVG recommended · Min 200×200px</p>
                </div>
              </div>
            </div>
          </div>

          {/* Party Info */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Party Information</h3>
            <div className="space-y-4">
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Party Name</label>
                <input
                  value={partyName}
                  onChange={e => setPartyName(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = SKNLP_RED)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Party Slogan</label>
                <input
                  value={slogan}
                  onChange={e => setSlogan(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = SKNLP_RED)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Canvas App Label</label>
                <input
                  value={appLabel}
                  onChange={e => setAppLabel(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = SKNLP_RED)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
            </div>
          </div>

          {/* Color Scheme — locked */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Color Scheme</h3>
              <div className="flex items-center gap-1.5">
                <Lock size={12} style={{ color: '#94A3B8' }} />
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Locked by admin</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>Primary Color</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: SKNLP_RED }} />
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#475569' }}>{SKNLP_RED}</span>
                  <Lock size={11} style={{ color: '#CBD5E1', marginLeft: 4 }} />
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>Secondary Color</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: '#0F172A' }} />
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#475569' }}>#0F172A</span>
                  <Lock size={11} style={{ color: '#CBD5E1', marginLeft: 4 }} />
                </div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 10 }}>
              To change colors, contact your Campaign 365 administrator.
            </p>
          </div>

          {/* Email Footer */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Email Footer</h3>
            <div className="space-y-3">
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Footer Text / Contact Info</label>
                <input
                  value={emailFooter}
                  onChange={e => setEmailFooter(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = SKNLP_RED)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAddBranding(!addBranding)}
                  style={{
                    width: 16, height: 16, borderRadius: 4, border: `2px solid ${addBranding ? SKNLP_RED : '#CBD5E1'}`,
                    backgroundColor: addBranding ? SKNLP_RED : 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0,
                  }}
                >
                  {addBranding && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </button>
                <span style={{ fontSize: 12, color: '#475569', cursor: 'pointer' }} onClick={() => setAddBranding(!addBranding)}>
                  Add SKNLP branding to the login screen
                </span>
              </div>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            style={{ width: '100%', backgroundColor: SKNLP_RED, color: 'white', border: 'none', borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {saved ? <><Check size={15} /> Changes Saved!</> : 'Publish Branding Changes'}
          </button>
        </div>

        {/* Right: Live Preview */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Live Preview</h3>

          {/* Mobile mockup */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
            <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Login Screen Preview</p>
            <div style={{ maxWidth: 240, margin: '0 auto' }}>
              <div style={{ backgroundColor: SKNLP_RED, borderRadius: '16px 16px 0 0', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>SK</span>
                </div>
                <p style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>{partyName.split(' ').slice(0, 2).join(' ')}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, marginTop: 2 }}>{slogan}</p>
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '0 0 16px 16px', padding: '16px', border: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>Welcome to {partyName.split(' ').slice(0, 2).join(' ')} Campaign 365</p>
                <div style={{ height: 30, backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                  <span style={{ fontSize: 10, color: '#CBD5E1' }}>Email</span>
                </div>
                <div style={{ height: 30, backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 10, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                  <span style={{ fontSize: 10, color: '#CBD5E1' }}>Password</span>
                </div>
                <div style={{ backgroundColor: SKNLP_RED, borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>Log In</span>
                </div>
                {addBranding && <p style={{ fontSize: 9, color: '#94A3B8', textAlign: 'center', marginTop: 8 }}>Need help? Contact party support</p>}
              </div>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dashboard Preview</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Mini sidebar */}
              <div style={{ width: 80, backgroundColor: '#0F172A', borderRadius: 10, padding: '10px 8px' }}>
                <div style={{ width: 28, height: 28, backgroundColor: SKNLP_RED, borderRadius: 6, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 8, fontWeight: 800 }}>SK</span>
                </div>
                {['Dashboard', 'Voters', 'Campaign', 'GOTV'].map((label, i) => (
                  <div key={i} style={{ padding: '4px 6px', borderRadius: 4, backgroundColor: i === 0 ? SKNLP_RED : 'transparent', marginBottom: 2 }}>
                    <p style={{ fontSize: 8, color: i === 0 ? 'white' : '#94A3B8', fontWeight: i === 0 ? 600 : 400 }}>{label}</p>
                  </div>
                ))}
              </div>
              {/* Content area */}
              <div style={{ flex: 1 }}>
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: '10px 12px', marginBottom: 6 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>Welcome, General Secretary</p>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ flex: 1, backgroundColor: 'white', borderRadius: 6, padding: '5px 6px', border: '1px solid #F1F5F9' }}>
                        <div style={{ width: '60%', height: 3, backgroundColor: SKNLP_RED, borderRadius: 2, marginBottom: 3 }} />
                        <div style={{ width: '40%', height: 2, backgroundColor: '#E2E8F0', borderRadius: 2 }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: 8, padding: '10px 12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ width: '50%', height: 40, backgroundColor: SKNLP_RED, borderRadius: 6, opacity: 0.15 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
