'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Upload, CheckCircle, X } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { useAuthStore } from '@/lib/store';

const CLIENTS = [
  { id: 1, name: 'Canvass', color: '#2563EB', secondary: '#0F172A' },
  { id: 2, name: 'SKNLP', color: '#CC0000', secondary: '#1E293B' },
  { id: 3, name: 'JLP', color: '#006400', secondary: '#0F172A' },
];

export default function BrandingPage() {
  const router = useRouter();
  const { setBranding, branding } = useAuthStore();
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0]);
  const [primaryColor, setPrimaryColor] = useState(CLIENTS[0].color);
  const [secondaryColor, setSecondaryColor] = useState(CLIENTS[0].secondary);

  useEffect(() => {
    if (!branding) return;
    const saved = CLIENTS.find(c => c.name === branding.name);
    if (saved) setSelectedClient(saved);
    if (branding.primary_color) setPrimaryColor(branding.primary_color);
    if (branding.secondary_color) setSecondaryColor(branding.secondary_color);
    if (branding.logo_url) setUploadedLogoUrl(branding.logo_url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [customDomain, setCustomDomain] = useState(true);
  const [showSecondary, setShowSecondary] = useState(false);
  const [uploadRadio, setUploadRadio] = useState<'upload' | 'url'>('upload');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null);
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoFile = (file: File) => {
    if (!file.type.match(/^image\//)) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedLogoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const effectiveLogoUrl = uploadRadio === 'url'
    ? (logoUrlInput || null)
    : uploadedLogoUrl;

  const handlePublish = async () => {
    setPublishing(true);
    setPublished(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        await fetch(`${apiUrl}/super/branding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('c365_token') : ''}`,
          },
          body: JSON.stringify({
            client_id: selectedClient.id,
            name: selectedClient.name,
            primary_color: primaryColor,
            secondary_color: secondaryColor,
          }),
        });
      }
    } catch {
      // Ignore API errors in dev — still apply locally
    }
    const tenantKey = selectedClient.name.toLowerCase();

    setBranding({
      name: selectedClient.name,
      logo_url: effectiveLogoUrl,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      font: 'Inter',
      subdomain: tenantKey,
    });

    localStorage.setItem('c365_tenant', tenantKey);
    window.dispatchEvent(new Event('branding-updated'));
    setPublishing(false);
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const handleClientSelect = (c: typeof CLIENTS[0]) => {
    setSelectedClient(c);
    setPrimaryColor(c.color);
    setSecondaryColor(c.secondary);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-slate-100 w-full sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-400 mb-1 sm:mb-2">
            <button 
              onClick={() => router.push('/super/dashboard')} 
              className="hover:text-slate-600 transition-colors flex items-center gap-1 truncate"
            >
              Dashboard
              <ChevronRight size={10} className="sm:w-3 sm:h-3" />
            </button>
            <span className="text-slate-600 font-medium whitespace-nowrap">White Label</span>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">White Label Branding Studio</h1>
            <div className="relative ml-0 sm:ml-4 min-w-[120px] sm:min-w-[140px]">
              <select
                value={selectedClient.id}
                onChange={e => {
                  const c = CLIENTS.find(cl => cl.id === Number(e.target.value));
                  if (c) handleClientSelect(c);
                }}
                className="appearance-none w-full bg-white border border-slate-200 rounded-xl pl-3 sm:pl-4 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
              >
                {CLIENTS.map(c => (
                  <option key={c.id} value={c.id} className="text-sm">
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown 
                size={11} 
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 h-full">
          
          {/* LEFT: Preview */}
          <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 order-1 lg:order-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 lg:p-5 flex-1 min-h-[400px] flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                <h3 className="font-semibold text-slate-700 text-sm sm:text-base">Preview</h3>
                <div className="relative min-w-[90px]">
                  <select className="appearance-none w-full bg-slate-100 border-0 rounded-lg pl-2 sm:pl-3 pr-5 sm:pr-6 py-1 sm:py-1.5 text-xs sm:text-sm text-slate-600 focus:outline-none cursor-pointer">
                    <option>Desktop</option>
                    <option>Mobile</option>
                    <option>Tablet</option>
                  </select>
                  <ChevronDown 
                    size={9} 
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
                  />
                </div>
              </div>

              {/* Phone mockup */}
              <div className="flex flex-col items-center flex-1 justify-center">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800 mx-auto"
                  style={{ 
                    width: 'clamp(140px, 35vw, 160px)', 
                    height: 'clamp(280px, 60vw, 300px)',
                    maxWidth: '160px',
                    maxHeight: '300px'
                  }}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: '#F8FAFC' }}>
                    <div className="h-8 sm:h-9 flex items-center justify-between px-2 sm:px-3" style={{ backgroundColor: primaryColor }}>
                      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
                        {effectiveLogoUrl ? (
                          <img 
                            src={effectiveLogoUrl} 
                            alt="logo" 
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded object-contain bg-white/20 flex-shrink-0" 
                          />
                        ) : null}
                        <span className="text-white text-xs sm:text-sm font-bold truncate pr-1">{selectedClient.name}</span>
                      </div>
                      <div
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)', fontSize: '8px' }}
                      >
                        {effectiveLogoUrl ? (
                          <img src={effectiveLogoUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          selectedClient.name.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="p-1.5 sm:p-2 space-y-1.5 sm:space-y-2 overflow-hidden">
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-full">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className="rounded-lg p-1.5 sm:p-2 bg-white border border-slate-100 min-h-[32px]">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-0.5 sm:mb-1 mx-auto" style={{ backgroundColor: `${primaryColor}30` }} />
                            <div className="h-0.5 sm:h-1 bg-slate-100 rounded w-full mb-0.5 sm:mb-0.5 mx-auto" />
                            <div className="h-1 sm:h-1.5 rounded w-1/2 mx-auto" style={{ backgroundColor: primaryColor }} />
                          </div>
                        ))}
                      </div>
                      <div
                        className="w-full py-1.5 sm:py-2 rounded-lg text-center text-white text-xs sm:text-sm font-semibold mx-1 sm:mx-0"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swatches */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3 sm:mt-4 w-full px-1">
                  <div className="text-center flex-1 sm:flex-none">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg mx-auto shadow-md" style={{ backgroundColor: primaryColor }} />
                    <p className="text-xs font-mono text-slate-400 mt-1 truncate">{primaryColor}</p>
                    <p className="text-xs text-slate-400">Primary</p>
                  </div>
                  <div className="text-center flex-1 sm:flex-none">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg mx-auto shadow-md" style={{ backgroundColor: secondaryColor }} />
                    <p className="text-xs font-mono text-slate-400 mt-1 truncate">{secondaryColor}</p>
                    <p className="text-xs text-slate-400">Secondary</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3 flex flex-col">
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60 px-4"
                style={{ backgroundColor: published ? '#16A34A' : '#2563EB' }}
              >
                {published ? <CheckCircle size={14} /> : null}
                {publishing ? 'Publishing…' : published ? 'Published!' : 'Publish Branding to All Apps'}
              </button>
              <button
                className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all border px-4 hover:bg-blue-50"
                style={{ color: '#2563EB', borderColor: '#2563EB' }}
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* MIDDLE: Color refs + mini sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 order-3 lg:order-2 hidden lg:flex">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 lg:p-5 flex-1">
              <div className="space-y-2 mb-4 lg:mb-5">
                {[
                  { id: 'primary', hex: primaryColor, label: 'Primary' },
                  { id: 'secondary', hex: secondaryColor, label: 'Secondary' },
                  { id: 'navy', hex: '#0F172A', label: 'Navy' },
                  { id: 'teal', hex: '#14B8A6', label: 'Teal' },
                ].map(({ id, hex, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex-shrink-0" style={{ backgroundColor: hex }} />
                    <span className="text-xs font-mono text-slate-500 truncate">{hex}</span>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Mini sidebar mockup */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
                <div className="px-2.5 sm:px-3 pt-2.5 sm:pt-3 pb-2 sm:pb-2">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                      {selectedClient.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs sm:text-sm font-bold leading-tight truncate">{selectedClient.name}</p>
                      <p className="text-[8px] sm:text-[9px] mt-0.5" style={{ color: secondaryColor }}>App</p>
                    </div>
                  </div>
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg mb-0.5 sm:mb-1"
                      style={i === 0 ? { backgroundColor: primaryColor } : {}}
                    >
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.8)' : '#64748B' }} />
                      <div className="h-1 sm:h-1.5 rounded flex-1" style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.7)' : '#334155' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form controls */}
          <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 order-2 lg:order-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 lg:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0 pb-1">
                <h3 className="font-semibold text-slate-700 text-sm sm:text-base">Brand Settings</h3>
                <button className="text-sm font-semibold whitespace-nowrap hover:opacity-80" style={{ color: '#2563EB' }}>
                  Select
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Logo */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 sm:mb-3">Logo</p>

                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-2 sm:mb-3 pb-1">
                    {(['upload', 'url'] as const).map(opt => (
                      <label 
                        key={opt} 
                        className="flex items-center gap-1.5 cursor-pointer flex-1 sm:flex-none min-w-[80px] py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors" 
                        onClick={() => setUploadRadio(opt)}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: uploadRadio === opt ? '#2563EB' : '#CBD5E1' }}>
                          {uploadRadio === opt && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2563EB' }} />}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-600 capitalize whitespace-nowrap">{opt}</span>
                      </label>
                    ))}
                  </div>

                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); }}
                  />

                  {uploadRadio === 'upload' ? (
                    uploadedLogoUrl ? (
                      <div className="relative border border-slate-200 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-full">
                        <img 
                          src={uploadedLogoUrl} 
                          alt="Logo preview" 
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg border border-slate-100 flex-shrink-0" 
                        />
                        <span className="text-xs sm:text-sm text-slate-500 flex-1 truncate">Logo uploaded</span>
                        <button 
                          onClick={() => { setUploadedLogoUrl(null); if (logoInputRef.current) logoInputRef.current.value = ''; }}
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-red-50 flex items-center justify-center flex-shrink-0 transition-colors"
                        >
                          <X size={10} className="text-slate-500" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => logoInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 rounded-xl p-3 sm:p-4 text-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all w-full"
                      >
                        <Upload size={14} className="mx-auto text-slate-400 mb-1 sm:mb-2 block w-5 h-5 sm:w-6 sm:h-6" />
                        <p className="text-xs sm:text-sm text-slate-400 leading-tight">Click to upload PNG / SVG / JPG</p>
                      </div>
                    )
                  ) : (
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoUrlInput}
                      onChange={e => setLogoUrlInput(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  )}
                </div>

                {/* Primary Color */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#2563EB' }}
                    >
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Primary Color</p>
                  </div>
                  <p className="text-xs text-slate-500 mb-1.5">Primary Color Pick</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-9 h-8 sm:w-10 sm:h-9 rounded-lg border border-slate-200 cursor-pointer shrink-0"
                    />
                    <div
                      className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-sm font-mono text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {primaryColor}
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
                        className="w-9 h-8 sm:w-10 sm:h-9 rounded-lg border border-slate-200 cursor-pointer shrink-0"
                      />
                      <input
                        value={secondaryColor}
                        onChange={e => setSecondaryColor(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 text-sm font-mono text-slate-700 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Font Selector */}
                <div>
                  <p className="text-xs text-slate-500 mb-1.5">Font Selector</p>
                  <div className="relative">
                    <select className="w-full appearance-none border border-slate-200 rounded-xl pl-2 sm:pl-3 pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer bg-white">
                      {['Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins'].map(f => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                    <ChevronDown size={11} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Custom Domain */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custom Domain</p>
                  <Toggle on={customDomain} onChange={() => setCustomDomain(!customDomain)} />
                </div>

                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: published ? '#16A34A' : '#2563EB' }}
                >
                  {published ? <CheckCircle size={14} /> : null}
                  {publishing ? 'Publishing…' : published ? 'Published!' : 'Publish Branding to All Apps'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}