'use client';
import { useRouter } from 'next/navigation';
import { Target, Users, TrendingUp, Car, Map, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_STATS = {
  active_campaigns: 8,
  voters_contacted: 14872,
  total_voters: 20000,
  turnout_goal: 68,
  pending_runners: 12,
  sentiment: [
    { name: 'Supporter', value: 12400, color: '#16A34A' },
    { name: 'Undecided', value: 3800, color: '#F59E0B' },
    { name: 'Opposition', value: 1900, color: '#EF4444' },
    { name: 'Unknown', value: 320, color: '#94A3B8' },
  ],
};

const statCards = [
  {
    label: 'Active Campaigns',
    value: MOCK_STATS.active_campaigns,
    sub: 'Running now',
    icon: Target,
  },
  {
    label: 'Voters Contacted',
    value: MOCK_STATS.voters_contacted.toLocaleString(),
    sub: `of ${MOCK_STATS.total_voters.toLocaleString()} total`,
    icon: Users,
    subAccent: true,
  },
  {
    label: 'Turnout Goal',
    value: `${MOCK_STATS.turnout_goal}%`,
    sub: 'Target achieved',
    icon: TrendingUp,
  },
  {
    label: 'Pending Runners',
    value: MOCK_STATS.pending_runners,
    sub: 'On assignment',
    icon: Car,
  },
];

const quickActions = [
  { label: 'Import Voters', mobileLabel: 'Import', href: '/voters/import', accent: true },
  { label: 'Create Walk List', mobileLabel: 'Walk List', href: '/canvassing', color: '#3B82F6' },
  { label: 'Send GOTV SMS', mobileLabel: 'GOTV SMS', href: '/communications', color: '#8B5CF6' },
  { label: 'View Live Map', mobileLabel: 'Live Map', href: '/tracking', color: '#F59E0B' },
];

const totalSentiment = MOCK_STATS.sentiment.reduce((a, b) => a + b.value, 0);

export default function DashboardPage() {
  const router = useRouter();

  const storedUser = typeof window !== 'undefined' ? (() => {
    try { return JSON.parse(localStorage.getItem('c365_user') || '{}'); } catch { return {}; }
  })() : {};
  const name = storedUser?.name || 'General Secretary';

  return (
    <div className="space-y-5">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>
            Welcome, {name.toLowerCase().includes('general') ? 'general secretary' : name.split(' ')[0]}!
          </h1>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Campaign 365 Dashboard</p>
        </div>
        <button
          onClick={() => router.push('/campaigns')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--tenant-primary)' }}
        >
          <Plus size={15} />
          Launch New Campaign
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, subAccent }) => (
          <div key={label} className="bg-white rounded-xl border p-5" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium" style={{ color: '#64748B' }}>{label}</p>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 15%, transparent)' }}>
                <Icon size={18} style={{ color: 'var(--tenant-primary)' }} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: '#0F172A' }}>{value}</p>
            <p className="text-xs" style={{ color: subAccent ? 'var(--tenant-primary)' : '#94A3B8' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Live Map + Voter Sentiment */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Live Map */}
        <div className="bg-white rounded-xl border p-5 lg:flex-1 min-w-0" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Map size={16} style={{ color: 'var(--tenant-primary)' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>Live Map</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
                0 Active
              </span>
            </div>
            <button className="text-xs font-medium hover:opacity-70" style={{ color: 'var(--tenant-primary)' }}>
              Full Screen →
            </button>
          </div>
          {/* Map placeholder */}
          <div
            className="rounded-xl flex flex-col items-center justify-center"
            style={{ height: 260, backgroundColor: '#F0FDF4' }}
          >
            <Map size={36} style={{ color: '#CBD5E1' }} className="mb-3" />
            <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Live map requires Mapbox token</p>
            <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
          </div>
        </div>

        {/* Voter Sentiment */}
        <div className="bg-white rounded-xl border p-5 lg:w-[300px] lg:shrink-0" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#0F172A' }}>Voter Sentiment</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={MOCK_STATS.sentiment}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {MOCK_STATS.sentiment.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {MOCK_STATS.sentiment.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span style={{ color: '#64748B' }}>{s.name}</span>
                </div>
                <span className="font-semibold" style={{ color: '#0F172A' }}>
                  {s.value.toLocaleString()}
                  <span style={{ color: '#94A3B8' }} className="font-normal ml-1">
                    ({Math.round((s.value / totalSentiment) * 100)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map(({ label, mobileLabel, href, color, accent }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className="py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent ? 'var(--tenant-primary)' : color, fontSize: 'clamp(12px, 3vw, 16px)' }}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{mobileLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
