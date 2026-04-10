'use client';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import {
  AreaChart, Area, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import { TrendingUp, ChevronDown, ChevronUp, MoreVertical, Check } from 'lucide-react';

const TENANTS = [
  { label: 'All Tenants',  color: '#2563EB' },
  { label: 'SKNLP',        color: '#DC2626' },
  { label: 'JLP',          color: '#16A34A' },
  { label: 'Jane Doe',     color: '#2563EB' },
];

const sparklineData = [
  { v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 30 }, { v: 50 }, { v: 40 }, { v: 60 },
];

const recentClients = [
  { name: 'Acme Party HQ',   initial: 'A', color: '#3B82F6' },
  { name: 'Metro Council',   initial: 'M', color: '#8B5CF6' },
  { name: 'Youth Alliance',  initial: 'Y', color: '#F59E0B' },
  { name: 'Alliance United', initial: 'A', color: '#EF4444' },
];

const subBreakdown = [
  { name: 'Starter',       value: 12, color: '#2563EB' },
  { name: 'Professional',  value: 8,  color: '#3B82F6' },
  { name: 'Enterprise',    value: 15, color: '#0F172A' },
  { name: 'Enterprise+',   value: 5,  color: '#F59E0B' },
];

const heatmapColors = ['#2563EB', '#3B82F6', '#0F172A', '#F59E0B', '#94A3B8'];
const heatmap = Array.from({ length: 40 }, (_, i) => heatmapColors[i % heatmapColors.length]);

function Sparkline({ color = '#2563EB' }: { color?: string }) {
  const id = `grad-${color.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={sparklineData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.45} />
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
  const [stats, setStats]               = useState<any>(null);
  const [loading, setLoading]           = useState(true);
  const [tenantOpen, setTenantOpen]     = useState(false);
  const [selectedTenant, setSelectedTenant] = useState('All Tenants');
  const dropdownRef                     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStats({ active_tenants: 47, total_revenue: '$184K', active_campaigns: 312 });
    setLoading(false);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTenantOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col min-h-screen"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5">

        {/* Page heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pt-1">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#94A3B8',
              marginBottom: 2,
            }}>
              Overview
            </p>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(22px, 4vw, 28px)',
              color: '#0F172A',
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              Overview Screen
            </h1>
          </div>
          {/* Tenant dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }} className="self-start sm:self-auto">
            <button
              onClick={() => setTenantOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border bg-white text-slate-600 hover:bg-slate-50 transition-all"
              style={{ borderColor: tenantOpen ? '#2563EB' : '#E2E8F0', boxShadow: tenantOpen ? '0 0 0 3px rgba(37,99,235,0.08)' : 'none', minWidth: 152 }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: TENANTS.find(t => t.label === selectedTenant)?.color ?? '#2563EB' }}
              />
              <span className="flex-1 text-left">{selectedTenant}</span>
              {tenantOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {tenantOpen && (
              <div
                className="absolute right-0 mt-2 bg-white rounded-xl border border-slate-100 py-1 z-50"
                style={{ minWidth: 180, boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}
              >
                {TENANTS.map(t => (
                  <button
                    key={t.label}
                    onClick={() => { setSelectedTenant(t.label); setTenantOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors text-left"
                    style={{ color: selectedTenant === t.label ? '#0F172A' : '#475569', fontWeight: selectedTenant === t.label ? 600 : 400 }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                    <span className="flex-1">{t.label}</span>
                    {selectedTenant === t.label && <Check size={13} style={{ color: '#2563EB' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* Active Tenants — blue */}
          <div className="rounded-2xl p-4 sm:p-5 text-white" style={{ backgroundColor: '#2563EB' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, opacity: 0.9, marginBottom: 4 }}>
              Active Tenants
            </p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {loading ? '—' : stats?.active_tenants ?? '47'}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold opacity-90">
                <TrendingUp size={14} />
                <span>↑ +3</span>
              </div>
            </div>
            <Sparkline color="rgba(255,255,255,0.85)" />
            <p className="text-xs font-mono opacity-50 mt-1">#2563EB</p>
          </div>

          {/* Total Revenue — white */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white border border-slate-100">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', marginBottom: 4 }}>
              Total Revenue
            </p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#0F172A' }}>
                {loading ? '—' : stats?.total_revenue ?? '$184K'}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
                <TrendingUp size={14} />
                <span>↑ 12%</span>
              </div>
            </div>
            <Sparkline color="#2563EB" />
            <p className="text-xs font-mono text-slate-300 mt-1">#F8FAFC</p>
          </div>

          {/* Campaigns Running — white */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white border border-slate-100 sm:col-span-2 lg:col-span-1">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', marginBottom: 4 }}>
              Campaigns Running
            </p>
            <div className="flex items-end justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#0F172A' }}>
                {loading ? '—' : stats?.active_campaigns ?? '312'}
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

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* Recent Clients */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>
              Recent Clients
            </h3>
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

          {/* Subscription Breakdown */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 8 }}>
              Subscription Breakdown
            </h3>
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
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
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
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 sm:col-span-2 lg:col-span-1">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>
              Feature Usage
            </h3>
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
                { label: 'Med',  color: '#3B82F6' },
                { label: 'Low',  color: '#94A3B8' },
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