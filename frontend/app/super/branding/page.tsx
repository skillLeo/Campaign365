'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Upload } from 'lucide-react';

const CLIENTS = [
  { id: 1, name: 'Canvass', color: '#2563EB', secondary: '#0F172A' },
  { id: 2, name: 'SKNLP', color: '#CC0000', secondary: '#1E293B' },
  { id: 3, name: 'JLP', color: '#006400', secondary: '#0F172A' },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-9 h-5 rounded-full transition-all duration-200 focus:outline-none shrink-0"
      style={{ backgroundColor: on ? '#2563EB' : '#CBD5E1' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(1.125rem)' : 'translateX(0.125rem)' }}
      />
    </button>
  );
}

export default function BrandingPage() {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0]);
  const [primaryColor, setPrimaryColor] = useState(CLIENTS[0].color);
  const [secondaryColor, setSecondaryColor] = useState(CLIENTS[0].secondary);
  const [customDomain, setCustomDomain] = useState(true);
  const [showSecondary, setShowSecondary] = useState(false);
  const [uploadRadio, setUploadRadio] = useState<'upload' | 'url'>('upload');

  const handleClientSelect = (c: typeof CLIENTS[0]) => {
    setSelectedClient(c);
    setPrimaryColor(c.color);
    setSecondaryColor(c.secondary);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">White Label</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">White Label Branding Studio</h1>
          <div className="relative">
            <select
              value={selectedClient.id}
              onChange={e => {
                const c = CLIENTS.find(cl => cl.id === Number(e.target.value));
                if (c) handleClientSelect(c);
              }}
              className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-sm text-slate-600 focus:outline-none cursor-pointer"
            >
              {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* LEFT: Preview */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700 text-sm">Preview</h3>
                <div className="relative">
                  <select className="appearance-none bg-slate-100 border-0 rounded-lg pl-3 pr-6 py-1 text-xs text-slate-600 focus:outline-none cursor-pointer">
                    <option>Nertding</option>
                    <option>Mobile</option>
                    <option>Desktop</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone mockup */}
              <div className="flex flex-col items-center">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800"
                  style={{ width: 150, height: 260 }}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: '#F8FAFC' }}>
                    {/* Status bar */}
                    <div className="h-9 flex items-center justify-between px-3" style={{ backgroundColor: primaryColor }}>
                      <span className="text-white text-xs font-bold">{selectedClient.name}</span>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)', fontSize: 9 }}
                      >
                        {selectedClient.name.charAt(0)}
                      </div>
                    </div>
                    {/* App content */}
                    <div className="p-2 space-y-2">
                      <div className="grid grid-cols-2 gap-1.5">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className="rounded-lg p-2 bg-white border border-slate-100">
                            <div className="w-5 h-5 rounded mb-1" style={{ backgroundColor: `${primaryColor}30` }} />
                            <div className="h-1 bg-slate-100 rounded w-full mb-0.5" />
                            <div className="h-1.5 rounded w-1/2" style={{ backgroundColor: primaryColor }} />
                          </div>
                        ))}
                      </div>
                      <div
                        className="w-full py-2 rounded-lg text-center text-white text-xs font-semibold"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swatches */}
                <div className="flex items-center gap-3 mt-4 w-full">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor }} />
                    <p className="text-xs font-mono text-slate-400 mt-1">{primaryColor}</p>
                    <p className="text-xs text-slate-400">Tetal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: secondaryColor }} />
                    <p className="text-xs font-mono text-slate-400 mt-1">{secondaryColor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#2563EB' }}
              >
                Publish Branding to All Apps
              </button>
              <button
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all border"
                style={{ color: '#2563EB', borderColor: '#2563EB' }}
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* MIDDLE: Color refs + mini sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex-1">
              <div className="space-y-2 mb-5">
                {[
                  { hex: '#0F172A', label: 'Navy' },
                  { hex: '#14B8A6', label: 'Teal' },
                ].map(({ hex, label }) => (
                  <div key={hex} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: hex }} />
                    <span className="text-xs font-mono text-slate-500">{hex}</span>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Mini sidebar mockup */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
                <div className="px-3 pt-3 pb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: primaryColor }}>
                      {selectedClient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-none">{selectedClient.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: primaryColor, fontSize: 9 }}>App</p>
                    </div>
                  </div>
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-1"
                      style={i === 0 ? { backgroundColor: primaryColor } : {}}
                    >
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.8)' : '#64748B' }} />
                      <div className="h-1.5 rounded flex-1" style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.7)' : '#334155' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form controls */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700 text-sm">Brand Settings</h3>
              <button className="text-sm font-semibold" style={{ color: '#2563EB' }}>Select</button>
            </div>

            <div className="space-y-4">
              {/* Logo */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Logo</p>
                <div className="flex items-center gap-4 mb-2">
                  {(['upload', 'url'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer" onClick={() => setUploadRadio(opt)}>
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: uploadRadio === opt ? '#2563EB' : '#CBD5E1' }}
                      >
                        {uploadRadio === opt && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2563EB' }} />
                        )}
                      </div>
                      <span className="text-sm text-slate-600 capitalize">{opt}</span>
                    </label>
                  ))}
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <Upload size={16} className="mx-auto text-slate-400 mb-1" />
                  <p className="text-xs text-slate-400">Click to upload PNG/SVG</p>
                </div>
              </div>

              {/* Primary Color */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upnary Color</p>
                </div>
                <p className="text-xs text-slate-500 mb-1.5">Primary Color Pick</p>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer shrink-0"
                  />
                  <div
                    className="flex-1 px-3 py-2 rounded-xl text-sm font-mono text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Tele
                  </div>
                </div>
              </div>

              {/* Secondary Color */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-500">Secondary Color Pick</p>
                  <Toggle on={showSecondary} onChange={() => setShowSecondary(!showSecondary)} />
                </div>
                {showSecondary && (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer shrink-0"
                    />
                    <input
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-700 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Font Selector */}
              <div>
                <p className="text-xs text-slate-500 mb-1.5">Font Selector</p>
                <div className="relative">
                  <select className="w-full appearance-none border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-sm text-slate-600 focus:outline-none cursor-pointer">
                    {['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins'].map(f => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Custom Domain */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custom Domain</p>
                <Toggle on={customDomain} onChange={() => setCustomDomain(!customDomain)} />
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#2563EB' }}
              >
                Publish Branding to All Apps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
