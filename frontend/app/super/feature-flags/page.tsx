'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Search, Info, Menu, X } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';

const FEATURE_KEYS = [
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'openai', label: 'AI Insights' },
  { key: 'gps_tracking', label: 'GPS Tracking' },
  { key: 'fundraising', label: 'Fundraising' },
  { key: 'polling', label: 'Polling' },
  { key: 'compliance_full', label: 'Compliance' },
  { key: 'white_label', label: 'White Label' },
  { key: 'api_access', label: 'API Access' },
];

const INITIAL_TENANTS = [
  { id: 1, name: 'SKNLP', flag: '🇰🇳', plan: 'Enterprise', features: { whatsapp: true, openai: true, gps_tracking: true, fundraising: true, polling: true, compliance_full: true, white_label: true, api_access: true } },
  { id: 2, name: 'JLP', flag: '🇯🇲', plan: 'Professional', features: { whatsapp: true, openai: false, gps_tracking: true, fundraising: true, polling: true, compliance_full: false, white_label: false, api_access: false } },
  { id: 3, name: 'DLP Barbados', flag: '🇧🇧', plan: 'Essentials', features: { whatsapp: false, openai: false, gps_tracking: false, fundraising: false, polling: false, compliance_full: false, white_label: false, api_access: false } },
  { id: 4, name: 'PNP', flag: '🇯🇲', plan: 'Sovereign', features: { whatsapp: true, openai: true, gps_tracking: true, fundraising: true, polling: true, compliance_full: true, white_label: true, api_access: true } },
  { id: 5, name: 'UK Labour', flag: '🇬🇧', plan: 'Enterprise', features: { whatsapp: true, openai: true, gps_tracking: false, fundraising: true, polling: true, compliance_full: true, white_label: true, api_access: true } },
];

const planColors: Record<string, string> = {
  Essentials: '#94A3B8',
  Professional: '#3B82F6',
  Enterprise: '#2563EB',
  Sovereign: '#8B5CF6',
};

export default function FeatureFlagsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState(INITIAL_TENANTS);
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggle = (tenantId: number, featureKey: string) => {
    setTenants(prev => prev.map(t =>
      t.id === tenantId ? { ...t, features: { ...t.features, [featureKey]: !t.features[featureKey as keyof typeof t.features] } } : t
    ));
  };

  const handleSave = (tenantId: number) => {
    setSaved(tenantId);
    setTimeout(() => setSaved(null), 1500);
  };

  const filtered = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  // Fix for scroll issue - prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top bar - sticky fixed */}
      <div className="sticky top-0 z-20 px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-xs text-slate-400 mb-1 sm:mb-2 flex-wrap">
              <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors whitespace-nowrap">
                Dashboard
              </button>
              <ChevronRight size={10} className="flex-shrink-0" />
              <span className="text-slate-600 font-medium truncate">Feature Flags</span>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 truncate">
              Feature Flags — Per-Tenant Overrides
            </h1>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} className="text-slate-600" /> : <Menu size={18} className="text-slate-600" />}
            </button>
            
            {/* Search - visible on desktop */}
            <div className="hidden sm:block relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search client..."
                className="bg-slate-100 rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200 w-32 sm:w-40 md:w-48"
              />
            </div>
          </div>
        </div>
        
        {/* Mobile search panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t" style={{ borderColor: '#E2E8F0' }}>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search client..."
                className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
        
        {/* Notice - fully responsive - FIXED: removed invalid sm:size prop */}
        <div className="flex items-start gap-2 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <Info size={14} style={{ color: '#F59E0B' }} className="shrink-0 mt-0.5" />
          <div className="text-[11px] sm:text-xs" style={{ color: '#92400E' }}>
            <p className="font-semibold mb-0.5">Feature overrides take precedence over plan limits.</p>
            <p className="hidden sm:block">Enabling a feature here grants the tenant access regardless of their subscription tier. Disabling restricts access even if their plan normally includes it.</p>
            <p className="sm:hidden">Overrides beat plan limits. Enable = grant access. Disable = restrict access.</p>
          </div>
        </div>

        {/* Feature matrix table - with proper z-index and overflow handling */}
        <div className="bg-white rounded-xl sm:rounded-2xl border overflow-hidden" style={{ borderColor: '#E2E8F0' }}>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            
            {/* Desktop Table View - hidden on mobile */}
            <div className="hidden md:block min-w-[800px]">
              <table className="w-full text-xs">
                <thead className="sticky top-0 z-10" style={{ backgroundColor: '#F8FAFC' }}>
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-500 bg-white w-[180px]">Client</th>
                    {FEATURE_KEYS.map(f => (
                      <th key={f.key} className="text-center py-3 px-2 font-semibold text-slate-500 whitespace-nowrap bg-white">{f.label}</th>
                    ))}
                    <th className="text-center py-3 px-4 font-semibold text-slate-500 w-[80px] bg-white">Save</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#F1F5F9' }}>
                  {filtered.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg flex-shrink-0">{tenant.flag}</span>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{tenant.name}</p>
                            <p className="text-[10px] sm:text-xs font-medium" style={{ color: planColors[tenant.plan] || '#94A3B8' }}>
                              {tenant.plan}
                            </p>
                          </div>
                        </div>
                      </td>
                      {FEATURE_KEYS.map(f => (
                        <td key={f.key} className="py-3 px-2 text-center">
                          <div className="flex justify-center">
                            <Toggle
                              on={tenant.features[f.key as keyof typeof tenant.features] as boolean}
                              onChange={() => toggle(tenant.id, f.key)}
                              color="#2563EB"
                              offColor="#CBD5E1"
                            />
                          </div>
                        </td>
                      ))}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleSave(tenant.id)}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
                          style={{ backgroundColor: saved === tenant.id ? '#16A34A' : '#2563EB' }}
                        >
                          {saved === tenant.id ? 'Saved ✓' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - shown on small screens */}
            <div className="md:hidden space-y-3 p-3">
              {filtered.map(tenant => (
                <div
                  key={tenant.id}
                  className="rounded-xl border p-3"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: '#F1F5F9' }}>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-xl flex-shrink-0">{tenant.flag}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{tenant.name}</p>
                        <p className="text-[10px] font-medium" style={{ color: planColors[tenant.plan] || '#94A3B8' }}>
                          {tenant.plan}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSave(tenant.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all flex-shrink-0"
                      style={{ backgroundColor: saved === tenant.id ? '#16A34A' : '#2563EB' }}
                    >
                      {saved === tenant.id ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>
                  
                  {/* Features grid - 2 columns on mobile */}
                  <div className="grid grid-cols-2 gap-2">
                    {FEATURE_KEYS.map(f => (
                      <div key={f.key} className="flex items-center justify-between py-1">
                        <span className="text-[11px] text-slate-600">{f.label}</span>
                        <Toggle
                          on={tenant.features[f.key as keyof typeof tenant.features] as boolean}
                          onChange={() => toggle(tenant.id, f.key)}
                          color="#2563EB"
                          offColor="#CBD5E1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filtered.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No clients found matching "{search}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature legend - fully responsive grid */}
        <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-5" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="font-semibold text-slate-700 text-xs sm:text-sm mb-3">Feature Descriptions</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {FEATURE_KEYS.map(f => (
              <div key={f.key} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#2563EB' }} />
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-700">{f.label}</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 break-words">
                    {f.key === 'whatsapp' && 'WhatsApp campaign messaging'}
                    {f.key === 'openai' && 'GPT-4o AI analytics'}
                    {f.key === 'gps_tracking' && 'Live GPS canvasser tracking'}
                    {f.key === 'fundraising' && 'Donation management module'}
                    {f.key === 'polling' && 'Surveys & sentiment polls'}
                    {f.key === 'compliance_full' && 'Full compliance reporting'}
                    {f.key === 'white_label' && 'Custom branding & domain'}
                    {f.key === 'api_access' && 'External API integration'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}