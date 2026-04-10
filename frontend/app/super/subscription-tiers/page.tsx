'use client';
import { useState } from 'react';
import { Check, ChevronUp, ChevronDown as ChevDown, Menu, X } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';

const INIT_PLANS = [
  {
    id: 'starter', name: 'Starter', active: false,
    monthlyPrice: 99, annualPrice: 299, maxUsersOptions: [5, 25, 100], selectedUsers: 5,
    badge: null as string | null, action: 'Edit Tier',
  },
  {
    id: 'professional', name: 'Professional', active: true,
    monthlyPrice: 999, annualPrice: 999, maxUsersOptions: [5, 25, 100], selectedUsers: 25,
    badge: null as string | null, action: 'Edit Tier',
  },
  {
    id: 'enterprise', name: 'Enterprise', active: true,
    monthlyPrice: 990, annualPrice: 2990, maxUsersOptions: [5, 25, 100], selectedUsers: 100,
    badge: 'Active', action: 'Clone Tier',
  },
  {
    id: 'enterprise_plus', name: 'Enterprise+', active: true,
    monthlyPrice: 9990, annualPrice: 19990, maxUsersOptions: [5, 25, 500], selectedUsers: 500,
    badge: null as string | null, action: 'Clone Tier',
  },
];

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div
      className="flex items-center border rounded-lg overflow-hidden w-full"
      style={{ borderColor: '#E2E8F0' }}
    >
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 min-w-0 px-2 py-2 text-sm text-slate-800 bg-transparent focus:outline-none"
      />
      <div className="flex flex-col border-l flex-shrink-0" style={{ borderColor: '#E2E8F0' }}>
        <button
          onClick={() => onChange(value + 1)}
          className="px-2 py-1 hover:bg-slate-100 transition-colors"
        >
          <ChevronUp size={10} className="text-slate-400" />
        </button>
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="px-2 py-1 hover:bg-slate-100 transition-colors"
        >
          <ChevDown size={10} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionTiersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'create' | 'history'>('all');
  const [plans, setPlans] = useState(INIT_PLANS);
  const [whiteLabelToggle, setWhiteLabelToggle] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updatePlan = (id: string, key: string, value: unknown) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, [key]: value } : p));
  };

  const tabs = [
    { key: 'all' as const, label: 'All Tiers' },
    { key: 'create' as const, label: 'Create New Tier' },
    { key: 'history' as const, label: 'Pricing History' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b"
        style={{ borderColor: '#E2E8F0' }}
      >
        <h1
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 truncate mr-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Subscription Tiers Manager
        </h1>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} className="text-slate-600" /> : <Menu size={18} className="text-slate-600" />}
          </button>
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: '#2563EB' }}
          >
            S
          </div>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-medium border-b last:border-0 transition-colors"
              style={{
                borderColor: '#F1F5F9',
                backgroundColor: activeTab === tab.key ? '#EFF6FF' : 'transparent',
                color: activeTab === tab.key ? '#2563EB' : '#64748B',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop Tabs */}
      <div
        className="hidden sm:flex items-center px-4 sm:px-6 border-b bg-white overflow-x-auto"
        style={{ borderColor: '#E2E8F0' }}
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap flex-shrink-0"
            style={{ color: activeTab === tab.key ? '#2563EB' : '#64748B' }}
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
      <div className="flex-1 p-3 sm:p-4 md:p-6">

        {/* ALL TIERS TAB - 3 per row on desktop */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {plans.map(plan => (
              <div
                key={plan.id}
                className="rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 border w-full"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
              >
                {/* Name + toggles - improved for better spacing */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2563EB' }}
                    >
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span
                        className="mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10px] text-slate-400">Active</span>
                      <Toggle on={plan.active} onChange={() => updatePlan(plan.id, 'active', !plan.active)} color="#2563EB" />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10px] text-slate-400">Inactive</span>
                      <Toggle on={!plan.active} onChange={() => updatePlan(plan.id, 'active', !plan.active)} color="#94A3B8" />
                    </div>
                  </div>
                </div>

                {/* Pricing inputs */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Monthly Price</p>
                    <NumberInput value={plan.monthlyPrice} onChange={v => updatePlan(plan.id, 'monthlyPrice', v)} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Annual Price</p>
                    <NumberInput value={plan.annualPrice} onChange={v => updatePlan(plan.id, 'annualPrice', v)} />
                  </div>
                </div>

                {/* Max users */}
                <div>
                  <p className="text-xs text-slate-500 mb-2">Max Users</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {plan.maxUsersOptions.map(u => (
                      <button
                        key={u}
                        onClick={() => updatePlan(plan.id, 'selectedUsers', u)}
                        className="px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium border transition-all"
                        style={{
                          backgroundColor: plan.selectedUsers === u ? '#2563EB' : 'transparent',
                          borderColor: plan.selectedUsers === u ? '#2563EB' : '#CBD5E1',
                          color: plan.selectedUsers === u ? 'white' : '#64748B',
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-500 mb-1">Features</p>
                  {['All Core Modules', 'White-Label Branding'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
                      >
                        <Check size={10} className="text-blue-600" />
                      </div>
                      <span className="text-xs text-slate-600 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button
                  className="w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 mt-auto"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  {plan.action}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CREATE TAB */}
        {activeTab === 'create' && (
          <div className="w-full max-w-lg mx-auto">
            <div
              className="rounded-2xl p-4 sm:p-6 border w-full"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
            >
              <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-4">Create New Tier</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Plan Name', placeholder: 'e.g. Professional', type: 'text' },
                  { label: 'Monthly Price (USD)', placeholder: '799', type: 'number' },
                  { label: 'Annual Price (USD)', placeholder: '7990', type: 'number' },
                  { label: 'Max Users', placeholder: '50', type: 'number' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full rounded-xl px-3 py-2 sm:py-2.5 text-sm text-slate-800 focus:outline-none border focus:border-blue-400 transition-colors"
                      style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}
                    />
                  </div>
                ))}
                <button
                  className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white mt-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  Create Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div
            className="rounded-2xl p-4 sm:p-6 border w-full"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
          >
            <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-4">Pricing History</h3>

            {/* Mobile: card list */}
            <div className="flex flex-col gap-3 sm:hidden">
              {[
                { date: '2025-10-01', plan: 'Enterprise', old: '$1,999', nw: '$2,499', by: 'admin@c365.app' },
                { date: '2025-09-15', plan: 'Professional', old: '$799', nw: '$999', by: 'admin@c365.app' },
                { date: '2025-08-01', plan: 'Starter', old: '$199', nw: '$299', by: 'admin@c365.app' },
              ].map((row, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border"
                  style={{ borderColor: '#F1F5F9', backgroundColor: '#F8FAFC' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800 text-sm whitespace-nowrap">{row.plan}</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{row.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-slate-500">Price:</span>
                    <span className="text-xs text-red-500 line-through whitespace-nowrap">{row.old}</span>
                    <span className="text-xs text-slate-400">→</span>
                    <span className="text-xs text-green-600 font-medium whitespace-nowrap">{row.nw}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">By: {row.by}</div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr>
                    {['Date', 'Plan', 'Old Price', 'New Price', 'Changed By'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs text-slate-500 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['2025-10-01', 'Enterprise', '$1,999', '$2,499', 'admin@c365.app'],
                    ['2025-09-15', 'Professional', '$799', '$999', 'admin@c365.app'],
                    ['2025-08-01', 'Starter', '$199', '$299', 'admin@c365.app'],
                  ].map(([date, plan, old, nw, by], i) => (
                    <tr key={i} className="border-t" style={{ borderColor: '#F1F5F9' }}>
                      <td className="py-2.5 px-3 text-slate-400 text-xs whitespace-nowrap">{date}</td>
                      <td className="py-2.5 px-3 text-slate-800 font-medium text-xs sm:text-sm whitespace-nowrap">{plan}</td>
                      <td className="py-2.5 px-3 text-red-500 text-xs whitespace-nowrap">{old}</td>
                      <td className="py-2.5 px-3 text-green-600 text-xs whitespace-nowrap">{nw}</td>
                      <td className="py-2.5 px-3 text-slate-400 text-xs whitespace-nowrap">{by}</td>
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
        className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 justify-between px-4 sm:px-6 py-3 sm:py-4 border-t bg-white"
        style={{ borderColor: '#E2E8F0' }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <Toggle on={whiteLabelToggle} onChange={() => setWhiteLabelToggle(!whiteLabelToggle)} offColor="#CBD5E1" />
          <span className="text-xs sm:text-sm text-slate-600 leading-snug whitespace-nowrap">
            Enable Custom White-Label Pricing per Tenant
          </span>
        </div>
        <span className="text-xs text-slate-400 whitespace-nowrap">{whiteLabelToggle ? 'Enabled globally' : 'Disabled'}</span>
      </div>
    </div>
  );
}