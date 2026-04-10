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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Party Profile &amp; Branding</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Dashboard › Party Profile</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg px-2 sm:px-3 py-1.5" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
            <Lock size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#E30613' }} />
            <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap" style={{ color: '#B91C1C' }}>Colors locked by your administrator</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
        {/* Left: Settings Form */}
        <div className="flex-1 space-y-4 sm:space-y-5">
          {/* Party Logo */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3 sm:mb-4">Party Logo</h3>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
              {/* Current logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0" style={{ backgroundColor: SKNLP_RED }}>
                <div className="text-center">
                  <p className="text-white text-[10px] sm:text-xs font-bold leading-tight">SKNLP</p>
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all hover:border-red-500"
                  style={{ borderColor: '#E2E8F0' }}
                >
                  <Upload size={18} className="sm:w-[20px] sm:h-[20px] mx-auto mb-2" style={{ color: '#94A3B8' }} />
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600">Drop your logo here or click to upload</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1">PNG, SVG recommended · Min 200×200px</p>
                </div>
              </div>
            </div>
          </div>

          {/* Party Info */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3 sm:mb-4">Party Information</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">Party Name</label>
                <input
                  value={partyName}
                  onChange={e => setPartyName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">Party Slogan</label>
                <input
                  value={slogan}
                  onChange={e => setSlogan(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">Canvas App Label</label>
                <input
                  value={appLabel}
                  onChange={e => setAppLabel(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Color Scheme — locked */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">Color Scheme</h3>
              <div className="flex items-center gap-1">
                <Lock size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#94A3B8' }} />
                <span className="text-[10px] sm:text-xs text-slate-400">Locked by admin</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs text-slate-400 mb-1">Primary Color</p>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded" style={{ backgroundColor: SKNLP_RED }} />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-600">{SKNLP_RED}</span>
                  <Lock size={10} className="ml-auto text-slate-300" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs text-slate-400 mb-1">Secondary Color</p>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded" style={{ backgroundColor: '#0F172A' }} />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-600">#0F172A</span>
                  <Lock size={10} className="ml-auto text-slate-300" />
                </div>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-3">
              To change colors, contact your Campaign 365 administrator.
            </p>
          </div>

          {/* Email Footer */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3 sm:mb-4">Email Footer</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5">Footer Text / Contact Info</label>
                <input
                  value={emailFooter}
                  onChange={e => setEmailFooter(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAddBranding(!addBranding)}
                  className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: addBranding ? SKNLP_RED : '#CBD5E1',
                    backgroundColor: addBranding ? SKNLP_RED : 'white',
                  }}
                >
                  {addBranding && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </button>
                <span className="text-[11px] sm:text-xs text-slate-600 cursor-pointer" onClick={() => setAddBranding(!addBranding)}>
                  Add SKNLP branding to the login screen
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-bold transition-all hover:opacity-90 py-3 sm:py-3.5 text-sm sm:text-base"
            style={{ backgroundColor: SKNLP_RED }}
          >
            {saved ? <><Check size={14} className="sm:w-[15px] sm:h-[15px]" /> Changes Saved!</> : 'Publish Branding Changes'}
          </button>
        </div>

        {/* Right: Live Preview - Responsive */}
        <div className="lg:w-96 xl:w-[420px]">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3 sm:mb-4">Live Preview</h3>

          {/* Mobile mockup */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 mb-4 sm:mb-5">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Login Screen Preview</p>
            <div className="max-w-[220px] sm:max-w-[240px] mx-auto">
              <div className="rounded-t-xl sm:rounded-t-2xl text-center p-4 sm:p-5" style={{ backgroundColor: SKNLP_RED }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <span className="text-white text-xs sm:text-sm font-bold">SK</span>
                </div>
                <p className="text-white font-bold text-xs sm:text-sm">{partyName.split(' ').slice(0, 2).join(' ')}</p>
                <p className="text-white/80 text-[9px] sm:text-[10px] mt-1">{slogan}</p>
              </div>
              <div className="bg-white rounded-b-xl sm:rounded-b-2xl p-3 sm:p-4 border border-t-0 border-slate-100">
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 mb-2">Welcome to {partyName.split(' ').slice(0, 2).join(' ')} Campaign 365</p>
                <div className="h-7 sm:h-8 bg-slate-50 rounded-md border border-slate-200 mb-1.5 flex items-center px-2">
                  <span className="text-[9px] sm:text-[10px] text-slate-300">Email</span>
                </div>
                <div className="h-7 sm:h-8 bg-slate-50 rounded-md border border-slate-200 mb-2 flex items-center px-2">
                  <span className="text-[9px] sm:text-[10px] text-slate-300">Password</span>
                </div>
                <div className="rounded-md py-1.5 sm:py-2 text-center" style={{ backgroundColor: SKNLP_RED }}>
                  <span className="text-white text-[10px] sm:text-xs font-bold">Log In</span>
                </div>
                {addBranding && <p className="text-[8px] sm:text-[9px] text-slate-400 text-center mt-2">Need help? Contact party support</p>}
              </div>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Dashboard Preview</p>
            <div className="flex gap-2 sm:gap-3">
              {/* Mini sidebar */}
              <div className="w-16 sm:w-20 rounded-xl p-2" style={{ backgroundColor: '#0F172A' }}>
                <div className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: SKNLP_RED }}>
                  <span className="text-white text-[8px] sm:text-[9px] font-bold">SK</span>
                </div>
                {['Dashboard', 'Voters', 'Campaign', 'GOTV'].map((label, i) => (
                  <div key={i} className="px-1 py-1 rounded mb-0.5" style={{ backgroundColor: i === 0 ? SKNLP_RED : 'transparent' }}>
                    <p className="text-[7px] sm:text-[8px] font-medium truncate" style={{ color: i === 0 ? 'white' : '#94A3B8' }}>{label}</p>
                  </div>
                ))}
              </div>
              {/* Content area */}
              <div className="flex-1">
                <div className="bg-slate-50 rounded-lg p-2 sm:p-3 mb-1.5">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-800">Welcome, General Secretary</p>
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex-1 bg-white rounded p-1.5 border border-slate-100">
                        <div className="w-3/4 h-1 rounded mb-0.5" style={{ backgroundColor: SKNLP_RED }} />
                        <div className="w-1/2 h-0.5 rounded" style={{ backgroundColor: '#E2E8F0' }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 border border-slate-100">
                  <div className="w-2/3 h-8 rounded opacity-15" style={{ backgroundColor: SKNLP_RED }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}