'use client';
import { useState } from 'react';
import { Key, Plus, RefreshCw, Eye, EyeOff, Copy, Trash2, Bell, BarChart2, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const MOCK_KEYS = [
  { id: 1, client: 'SKNLP', key: 'sk_live_SKNLP_Ke1_••••••••••••••••', permissions: 'Full Access', lastUsed: 'Dec 15', mode: 'Live', requests: 2450, status: 'active' },
  { id: 2, client: 'JLP', key: 'sk_live_JLP_Ke2_••••••••••••••••', permissions: 'Read Only', lastUsed: 'Dec 15', mode: 'Live', requests: 892, status: 'active' },
  { id: 3, client: 'BLP', key: 'sk_test_BLP_Ke3_••••••••••••••••', permissions: 'Webhook Only', lastUsed: 'Dec 12', mode: 'Test', requests: 156, status: 'active' },
  { id: 4, client: 'Campaign Atec', key: 'sk_live_ATEC_Ke4_••••••••••••••••', permissions: 'Full Access', lastUsed: 'Dec 10', mode: 'Live', requests: 3201, status: 'active' },
  { id: 5, client: 'Train Grounds', key: 'sk_test_TG_Ke5_••••••••••••••••', permissions: 'Restricted', lastUsed: 'Dec 8', mode: 'Test', requests: 47, status: 'inactive' },
];

const WEBHOOKS = [
  { event: 'voter.imported', endpoint: 'https://sknlp.org/webhooks/voters', status: 'active', lastTriggered: '2 min ago' },
  { event: 'panic.triggered', endpoint: 'https://jlp.org/webhooks/panic', status: 'active', lastTriggered: '1h ago' },
  { event: 'donation.received', endpoint: 'https://blp.org/webhooks/donations', status: 'error', lastTriggered: '3h ago' },
  { event: 'canvassing.synced', endpoint: 'https://sknlp.org/webhooks/canvass', status: 'active', lastTriggered: '4h ago' },
];

const RATE_LIMITS = [
  { tier: 'Sovereign', requests: 'Unlimited', burst: 1000, current: 89 },
  { tier: 'Enterprise', requests: '10,000/hr', burst: 500, current: 62 },
  { tier: 'Professional', requests: '5,000/hr', burst: 200, current: 48 },
  { tier: 'Starter', requests: '1,000/hr', burst: 50, current: 31 },
];

const USAGE_DATA = [
  { day: 'Mon', calls: 1200 }, { day: 'Tue', calls: 1900 }, { day: 'Wed', calls: 1400 },
  { day: 'Thu', calls: 2400 }, { day: 'Fri', calls: 2100 }, { day: 'Sat', calls: 800 }, { day: 'Sun', calls: 600 },
];

const INTEGRATIONS = [
  { name: 'Twilio SMS', status: 'connected', lastTest: 'Dec 14', icon: '📱' },
  { name: 'Mailgun', status: 'connected', lastTest: 'Dec 15', icon: '📧' },
  { name: 'Amazon SES', status: 'connected', lastTest: 'Dec 13', icon: '📨' },
  { name: 'Pusher', status: 'connected', lastTest: 'Dec 15', icon: '⚡' },
  { name: 'OpenAI GPT-4o', status: 'connected', lastTest: 'Dec 12', icon: '🤖' },
  { name: 'Stripe', status: 'warning', lastTest: 'Dec 10', icon: '💳' },
  { name: 'Firebase FCM', status: 'connected', lastTest: 'Dec 15', icon: '🔔' },
  { name: 'WhatsApp Business', status: 'pending', lastTest: 'Dec 5', icon: '💬' },
];

type Tab = 'keys' | 'webhooks' | 'integrations' | 'rate-limits';

export default function APIManagementPage() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>('keys');
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<number | null>(null);

  const toggleKey = (id: number) => setShowKeys(p => ({ ...p, [id]: !p[id] }));
  const copyKey = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: 'keys', label: 'Active Keys' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'rate-limits', label: 'Rate Limits' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Dashboard › API Management</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>API Keys &amp; Integrations</h2>
        </div>
        <div className="flex items-center gap-3">
          <button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={14} /> Generate New Key
          </button>
          <Bell size={18} style={{ color: '#94A3B8', cursor: 'pointer' }} />
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#2563EB' }}>
            {user?.name?.charAt(0) || 'S'}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active API Keys', value: '5', color: '#2563EB', bg: '#EFF6FF', icon: Key },
            { label: 'API Calls Today', value: '8,420', color: '#7C3AED', bg: '#F5F3FF', icon: BarChart2 },
            { label: 'Active Webhooks', value: '4', color: '#16A34A', bg: '#F0FDF4', icon: RefreshCw },
            { label: 'Failed Calls (24h)', value: '12', color: '#DC2626', bg: '#FEF2F2', icon: AlertCircle },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                backgroundColor: tab === t.id ? '#2563EB' : 'transparent',
                color: tab === t.id ? 'white' : '#64748B',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'keys' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      {['Client', 'API Key', 'Permissions', 'Last Used', 'Mode', 'Requests', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_KEYS.map((k, i) => (
                      <tr key={k.id} style={{ borderBottom: i < MOCK_KEYS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{k.client}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div className="flex items-center gap-2">
                            <code style={{ fontSize: 11, color: '#475569', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: 4, fontFamily: 'monospace' }}>
                              {showKeys[k.id] ? k.key.replace('••••••••••••••••', 'xK9mL2pQ8nR5sT1v') : k.key}
                            </code>
                            <button onClick={() => toggleKey(k.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}>
                              {showKeys[k.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                            <button onClick={() => copyKey(k.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === k.id ? '#16A34A' : '#94A3B8', padding: 0 }}>
                              {copied === k.id ? <CheckCircle size={12} /> : <Copy size={12} />}
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{k.permissions}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748B' }}>{k.lastUsed}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: k.mode === 'Live' ? '#F0FDF4' : '#FFFBEB', color: k.mode === 'Live' ? '#15803D' : '#B45309', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{k.mode}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#0F172A', fontWeight: 600 }}>{k.requests.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div className="flex items-center gap-2">
                            <button style={{ background: '#F1F5F9', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#475569', fontSize: 11 }}>Review</button>
                            <button style={{ background: '#FEF2F2', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#DC2626' }}>
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
            {/* Usage Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 4 }}>API Usage — Last 30 Days</h3>
              <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>Total calls across all tenants</p>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={USAGE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="apiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="calls" stroke="#2563EB" strokeWidth={2} fill="url(#apiGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 12, background: '#EFF6FF', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 600 }}>Key ID: sk_live_••••2345</p>
                <p style={{ fontSize: 11, color: '#3B82F6', marginTop: 2 }}>API Usage (Last 30 Days): 30,241 calls</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'webhooks' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Active Webhooks</h3>
              <button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Plus size={13} /> Add Webhook
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {WEBHOOKS.map((w, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: w.status === 'active' ? '#16A34A' : w.status === 'error' ? '#DC2626' : '#F59E0B', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{w.event}</p>
                      <code style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>{w.endpoint}</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>Last: {w.lastTriggered}</span>
                    <span style={{ background: w.status === 'active' ? '#F0FDF4' : w.status === 'error' ? '#FEF2F2' : '#FFFBEB', color: w.status === 'active' ? '#15803D' : w.status === 'error' ? '#DC2626' : '#B45309', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
                      {w.status}
                    </span>
                    <button style={{ background: '#F1F5F9', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', color: '#475569', fontSize: 12 }}>Test</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'integrations' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((int, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
                <div className="flex items-start justify-between mb-3">
                  <span style={{ fontSize: 24 }}>{int.icon}</span>
                  <span style={{
                    background: int.status === 'connected' ? '#F0FDF4' : int.status === 'warning' ? '#FFFBEB' : '#F8FAFC',
                    color: int.status === 'connected' ? '#15803D' : int.status === 'warning' ? '#B45309' : '#94A3B8',
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                  }}>
                    {int.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{int.name}</p>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>Tested: {int.lastTest}</p>
                <button style={{ marginTop: 10, width: '100%', background: '#F1F5F9', border: 'none', borderRadius: 7, padding: '7px', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  Configure
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'rate-limits' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Rate Limits by Tier</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {RATE_LIMITS.map((r, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{r.tier}</p>
                      <p style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>{r.requests} · Burst: {r.burst}/min</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{r.current}%</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${r.current}%`, backgroundColor: r.current > 80 ? '#DC2626' : r.current > 60 ? '#F59E0B' : '#2563EB', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
