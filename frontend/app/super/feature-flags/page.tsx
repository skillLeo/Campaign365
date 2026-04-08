'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Search, Zap, Info } from 'lucide-react';

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

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-9 h-5 rounded-full transition-all duration-200 focus:outline-none"
      style={{ backgroundColor: on ? '#2563EB' : '#CBD5E1' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(1.125rem)' : 'translateX(0.125rem)' }}
      />
    </button>
  );
}

export default function FeatureFlagsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState(INITIAL_TENANTS);
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<number | null>(null);

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

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Feature Flags</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Feature Flags — Per-Tenant Overrides</h1>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search client..."
              className="bg-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none w-48"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* Notice */}
        <div className="flex items-start gap-3 rounded-2xl p-4" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <Info size={15} style={{ color: '#F59E0B' }} className="shrink-0 mt-0.5" />
          <div className="text-xs" style={{ color: '#92400E' }}>
            <p className="font-semibold mb-0.5">Feature overrides take precedence over plan limits.</p>
            <p>Enabling a feature here grants the tenant access regardless of their subscription tier. Disabling restricts access even if their plan normally includes it.</p>
          </div>
        </div>

        {/* Feature matrix table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  <th className="text-left py-3 px-5 font-semibold text-slate-500 sticky left-0 bg-slate-50 min-w-[160px]">Client</th>
                  {FEATURE_KEYS.map(f => (
                    <th key={f.key} className="text-center py-3 px-3 font-semibold text-slate-500 whitespace-nowrap">{f.label}</th>
                  ))}
                  <th className="text-center py-3 px-5 font-semibold text-slate-500">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(tenant => (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 sticky left-0 bg-white">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{tenant.flag}</span>
                        <div>
                          <p className="font-semibold text-slate-800">{tenant.name}</p>
                          <p className="text-xs font-medium" style={{ color: planColors[tenant.plan] || '#94A3B8' }}>
                            {tenant.plan}
                          </p>
                        </div>
                      </div>
                    </td>
                    {FEATURE_KEYS.map(f => (
                      <td key={f.key} className="py-4 px-3 text-center">
                        <div className="flex justify-center">
                          <Toggle
                            on={tenant.features[f.key as keyof typeof tenant.features]}
                            onChange={() => toggle(tenant.id, f.key)}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => handleSave(tenant.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: saved === tenant.id ? '#2563EB' : '#2563EB' }}
                      >
                        {saved === tenant.id ? 'Saved ✓' : 'Save'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature legend */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-3">Feature Descriptions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURE_KEYS.map(f => (
              <div key={f.key} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#2563EB' }} />
                <div>
                  <p className="text-xs font-semibold text-slate-700">{f.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
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
