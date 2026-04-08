'use client';
import { useState } from 'react';
import { Check, ChevronUp, ChevronDown as ChevDown } from 'lucide-react';

const INIT_PLANS = [
  {
    id: 'starter', name: 'Starter', nameColor: '#F97316', active: false,
    monthlyPrice: 99, annualPrice: 299, maxUsersOptions: [5, 25, 100], selectedUsers: 5,
    badge: null as string | null, action: 'Edit Tier',
  },
  {
    id: 'professional', name: 'Professional', nameColor: '#F97316', active: true,
    monthlyPrice: 999, annualPrice: 999, maxUsersOptions: [5, 25, 100], selectedUsers: 25,
    badge: null as string | null, action: 'Edit Tier',
  },
  {
    id: 'enterprise', name: 'Enterprise', nameColor: '#F97316', active: true,
    monthlyPrice: 990, annualPrice: 2990, maxUsersOptions: [5, 25, 100], selectedUsers: 100,
    badge: 'Active', action: 'Clone Tier',
  },
  {
    id: 'enterprise_plus', name: 'Enterprise+', nameColor: '#FFFFFF', active: true,
    monthlyPrice: 9990, annualPrice: 19990, maxUsersOptions: [5, 25, 500], selectedUsers: 500,
    badge: null as string | null, action: 'Clone Tier',
  },
];

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: '#2D3748' }}>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-16 px-2 py-1.5 text-sm text-white bg-transparent focus:outline-none"
      />
      <div className="flex flex-col border-l" style={{ borderColor: '#2D3748' }}>
        <button onClick={() => onChange(value + 1)} className="px-1.5 py-0.5 hover:bg-white/10 transition-colors">
          <ChevronUp size={10} className="text-slate-400" />
        </button>
        <button onClick={() => onChange(Math.max(0, value - 1))} className="px-1.5 py-0.5 hover:bg-white/10 transition-colors">
          <ChevDown size={10} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-9 h-5 rounded-full transition-all duration-200 focus:outline-none shrink-0"
      style={{ backgroundColor: on ? '#2563EB' : '#374151' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(1.125rem)' : 'translateX(0.125rem)' }}
      />
    </button>
  );
}

export default function SubscriptionTiersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'create' | 'history'>('all');
  const [plans, setPlans] = useState(INIT_PLANS);
  const [whiteLabelToggle, setWhiteLabelToggle] = useState(true);

  const updatePlan = (id: string, key: string, value: unknown) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, [key]: value } : p));
  };

  const tabs = [
    { key: 'all' as const, label: 'All Tiers' },
    { key: 'create' as const, label: 'Create New Tier' },
    { key: 'history' as const, label: 'Pricing History' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#1E2433' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: 'white', letterSpacing: '-0.025em' }}>Subscription Tiers Manager</h1>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: '#2563EB' }}
        >
          S
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-6 border-b" style={{ borderColor: '#2D3748' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-5 py-3 text-sm font-medium transition-all relative"
            style={{ color: activeTab === tab.key ? '#2563EB' : '#94A3B8' }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                style={{ backgroundColor: '#2563EB' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === 'all' && (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {plans.map(plan => (
              <div
                key={plan.id}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ backgroundColor: '#0F172A' }}
              >
                {/* Name + toggles */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#F59E0B', textAlign: 'center' }}>{plan.name}</h3>
                    {plan.badge && (
                      <span
                        className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Active</span>
                      <Toggle on={plan.active} onChange={() => updatePlan(plan.id, 'active', !plan.active)} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Anaive</span>
                      <Toggle on={!plan.active} onChange={() => updatePlan(plan.id, 'active', !plan.active)} />
                    </div>
                  </div>
                </div>

                {/* Pricing inputs */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Monthly Price</p>
                    <NumberInput value={plan.monthlyPrice} onChange={v => updatePlan(plan.id, 'monthlyPrice', v)} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Annual Price</p>
                    <NumberInput value={plan.annualPrice} onChange={v => updatePlan(plan.id, 'annualPrice', v)} />
                  </div>
                </div>

                {/* Max users */}
                <div>
                  <p className="text-xs text-slate-400 mb-2">Max Users</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {plan.maxUsersOptions.map(u => (
                      <button
                        key={u}
                        onClick={() => updatePlan(plan.id, 'selectedUsers', u)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all"
                        style={{
                          backgroundColor: plan.selectedUsers === u ? '#2563EB' : 'transparent',
                          borderColor: plan.selectedUsers === u ? '#2563EB' : '#374151',
                          color: plan.selectedUsers === u ? 'white' : '#94A3B8',
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-400 mb-1">Features</p>
                  {['Active', 'Erable'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center"
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        <Check size={10} className="text-white" />
                      </div>
                      <span className="text-xs text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 mt-auto"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  {plan.action}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="rounded-2xl p-6 max-w-lg" style={{ backgroundColor: '#0F172A' }}>
            <h3 className="font-bold text-white text-lg mb-4">Create New Tier</h3>
            <div className="space-y-4">
              {[
                { label: 'Plan Name', placeholder: 'e.g. Professional', type: 'text' },
                { label: 'Monthly Price (USD)', placeholder: '799', type: 'number' },
                { label: 'Annual Price (USD)', placeholder: '7990', type: 'number' },
                { label: 'Max Users', placeholder: '50', type: 'number' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none border"
                    style={{ backgroundColor: '#1E2433', borderColor: '#2D3748' }}
                  />
                </div>
              ))}
              <button
                className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2"
                style={{ backgroundColor: '#2563EB' }}
              >
                Create Tier
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#0F172A' }}>
            <h3 className="font-bold text-white text-lg mb-4">Pricing History</h3>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {['Date', 'Plan', 'Old Price', 'New Price', 'Changed By'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['2025-10-01', 'Enterprise', '$1,999', '$2,499', 'admin@c365.app'],
                  ['2025-09-15', 'Professional', '$799', '$999', 'admin@c365.app'],
                  ['2025-08-01', 'Starter', '$199', '$299', 'admin@c365.app'],
                ].map(([date, plan, old, nw, by], i) => (
                  <tr key={i} className="border-t" style={{ borderColor: '#1E2433' }}>
                    <td className="py-2.5 px-3 text-slate-400 text-xs">{date}</td>
                    <td className="py-2.5 px-3 text-white font-medium">{plan}</td>
                    <td className="py-2.5 px-3 text-red-400 text-xs">{old}</td>
                    <td className="py-2.5 px-3 text-green-400 text-xs">{nw}</td>
                    <td className="py-2.5 px-3 text-slate-400 text-xs">{by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-6 py-4 border-t"
        style={{ backgroundColor: '#0F172A', borderColor: '#2D3748' }}
      >
        <div className="flex items-center gap-3">
          <Toggle on={whiteLabelToggle} onChange={() => setWhiteLabelToggle(!whiteLabelToggle)} />
          <span className="text-sm text-slate-300">Enable Custom White-Label Pricing per Tenant</span>
        </div>
        <span className="text-xs text-slate-500">{whiteLabelToggle ? 'Enabled globally' : 'Disabled'}</span>
      </div>
    </div>
  );
}
