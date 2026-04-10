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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Welcome header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate" style={{ color: '#0F172A' }}>
            Welcome, {name.toLowerCase().includes('general') ? 'General Secretary' : name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 truncate" style={{ color: '#64748B' }}>Campaign 365 Dashboard</p>
        </div>
        <button
          onClick={() => router.push('/campaigns')}
          className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          style={{ backgroundColor: 'var(--tenant-primary)' }}
        >
          <Plus size={14} className="sm:w-[15px] sm:h-[15px]" />
          <span className="hidden xs:inline">Launch New Campaign</span>
          <span className="xs:hidden">New Campaign</span>
        </button>
      </div>

      {/* Stat cards - Responsive grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, subAccent }) => (
          <div key={label} className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 hover:shadow-md transition-shadow" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
              <p className="text-[11px] sm:text-xs md:text-sm font-medium truncate" style={{ color: '#64748B' }}>{label}</p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 15%, transparent)' }}>
                <Icon size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" style={{ color: 'var(--tenant-primary)' }} />
              </div>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 truncate" style={{ color: '#0F172A' }}>{value}</p>
            <p className="text-[10px] sm:text-xs truncate" style={{ color: subAccent ? 'var(--tenant-primary)' : '#94A3B8' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Live Map + Voter Sentiment - Responsive */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        {/* Live Map */}
        <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-5 lg:flex-1 min-w-0" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Map size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: 'var(--tenant-primary)' }} />
              <span className="font-semibold text-xs sm:text-sm" style={{ color: '#0F172A' }}>Live Map</span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium whitespace-nowrap" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
                0 Active
              </span>
            </div>
            <button className="text-[11px] sm:text-xs font-medium hover:opacity-70 whitespace-nowrap" style={{ color: 'var(--tenant-primary)' }}>
              Full Screen →
            </button>
          </div>
          {/* Map placeholder */}
          <div
            className="rounded-xl flex flex-col items-center justify-center"
            style={{ height: 'clamp(200px, 40vw, 260px)', backgroundColor: '#F0FDF4' }}
          >
            <Map size={28} className="sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] mb-2 sm:mb-3" style={{ color: '#CBD5E1' }} />
            <p className="text-xs sm:text-sm font-medium text-center px-2" style={{ color: '#94A3B8' }}>Live map requires Mapbox token</p>
            <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 text-center px-2" style={{ color: '#CBD5E1' }}>Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
          </div>
        </div>

        {/* Voter Sentiment */}
        <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-5 lg:w-[300px] lg:shrink-0" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: '#0F172A' }}>Voter Sentiment</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={MOCK_STATS.sentiment}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={55}
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
          <div className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
            {MOCK_STATS.sentiment.map(s => (
              <div key={s.name} className="flex items-center justify-between text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="truncate" style={{ color: '#64748B' }}>{s.name}</span>
                </div>
                <span className="font-semibold whitespace-nowrap" style={{ color: '#0F172A' }}>
                  {s.value.toLocaleString()}
                  <span style={{ color: '#94A3B8' }} className="font-normal ml-0.5 sm:ml-1">
                    ({Math.round((s.value / totalSentiment) * 100)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action buttons - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {quickActions.map(({ label, mobileLabel, href, color, accent }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className="py-3 sm:py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity text-center"
            style={{ 
              backgroundColor: accent ? 'var(--tenant-primary)' : color, 
              fontSize: 'clamp(11px, 3vw, 14px)',
              paddingLeft: 'clamp(8px, 2vw, 16px)',
              paddingRight: 'clamp(8px, 2vw, 16px)'
            }}
          >
            <span className="hidden xs:inline">{label}</span>
            <span className="xs:hidden">{mobileLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}