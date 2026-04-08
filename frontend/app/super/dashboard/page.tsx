'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import {
  AreaChart, Area, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import { TrendingUp, Bell, ChevronDown, MoreVertical, Search } from 'lucide-react';

const sparklineData = [
  { v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 30 }, { v: 50 }, { v: 40 }, { v: 60 },
];

const recentClients = [
  { name: 'Acme Party HQ', initial: 'A', color: '#3B82F6' },
  { name: 'Metro Council', initial: 'M', color: '#8B5CF6' },
  { name: 'Youth Alliance', initial: 'Y', color: '#F59E0B' },
  { name: 'Alliance United', initial: 'A', color: '#EF4444' },
];

const subBreakdown = [
  { name: 'Starter', value: 12, color: '#2563EB' },
  { name: 'Professional', value: 8, color: '#3B82F6' },
  { name: 'Enterprise', value: 15, color: '#0F172A' },
  { name: 'Enterprise+', value: 5, color: '#F59E0B' },
];

const heatmapColors = ['#2563EB', '#3B82F6', '#0F172A', '#F59E0B', '#94A3B8'];
const heatmap = Array.from({ length: 40 }, (_, i) => heatmapColors[i % heatmapColors.length]);

function Sparkline({ color = '#2563EB', bg }: { color?: string; bg?: string }) {
  const id = `grad-${color.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={sparklineData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.45} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${id})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function SuperDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data — backend not yet connected
    setStats({ active_tenants: 47, total_revenue: '$184K', active_campaigns: 312 });
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>Super Admin</h2>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="bg-slate-100 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-600 focus:outline-none w-52 placeholder-slate-400"
              placeholder="Search..."
            />
          </div>
          <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Bell size={18} className="text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: '#2563EB' }} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: '#2563EB' }}
            >
              {user?.name?.charAt(0) || 'S'}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* Page heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: 2 }}>Overview</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: '#0F172A', letterSpacing: '-0.03em' }}>Overview Screen</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all">
            Tenant Select
            <ChevronDown size={14} />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Active Tenants — dark green */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: '#2563EB' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, opacity: 0.9, marginBottom: 4 }}>Active Tenants</p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 52, letterSpacing: '-0.04em', lineHeight: 1 }}>{loading ? '—' : stats?.active_tenants ?? '47'}</p>
              <div className="flex items-center gap-1 text-xs font-semibold opacity-90">
                <TrendingUp size={14} />
                <span>↑ +3</span>
              </div>
            </div>
            <Sparkline color="rgba(255,255,255,0.85)" />
            <p className="text-xs font-mono opacity-50 mt-1">#2563EB</p>
          </div>

          {/* Card 2: Total Revenue — white */}
          <div className="rounded-2xl p-5 bg-white border border-slate-100">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', marginBottom: 4 }}>Total Revenue</p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 40, letterSpacing: '-0.04em', lineHeight: 1, color: '#0F172A' }}>
                {loading ? '—' : (stats?.total_revenue ?? '$184K')}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
                <TrendingUp size={14} />
                <span>↑ 12%</span>
              </div>
            </div>
            <Sparkline color="#2563EB" />
            <p className="text-xs font-mono text-slate-300 mt-1">#F8FAFC</p>
          </div>

          {/* Card 3: Campaigns Running — white */}
          <div className="rounded-2xl p-5 bg-white border border-slate-100">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', marginBottom: 4 }}>Campaigns Running</p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 40, letterSpacing: '-0.04em', lineHeight: 1, color: '#0F172A' }}>
                {loading ? '—' : (stats?.active_campaigns ?? '312')}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
                <TrendingUp size={14} />
                <span>↑ 8%</span>
              </div>
            </div>
            <Sparkline color="#2563EB" />
            <p className="text-xs font-mono text-slate-300 mt-1">#F8FAFC</p>
          </div>
        </div>

        {/* Bottom row: 3 sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recent Clients */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Recent Clients</h3>
            <div className="space-y-3">
              {recentClients.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.initial}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{c.name}</span>
                  </div>
                  <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={14} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Breakdown donut */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 8 }}>Subscription Breakdown</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={subBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {subBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-1">
              {subBreakdown.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-500">{s.name}</span>
                  </div>
                  <span className="font-semibold text-slate-700">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Usage heatmap */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Feature Usage</h3>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
              {heatmap.map((color, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ backgroundColor: color, aspectRatio: '1' }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {[
                { label: 'High', color: '#2563EB' },
                { label: 'Med', color: '#3B82F6' },
                { label: 'Low', color: '#94A3B8' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1 text-xs text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
