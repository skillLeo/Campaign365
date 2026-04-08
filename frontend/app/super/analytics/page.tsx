'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { ChevronRight, ChevronDown, TrendingUp, Download } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', store: 420, personal: 280 },
  { month: 'Feb', store: 380, personal: 310 },
  { month: 'Mar', store: 510, personal: 340 },
  { month: 'Apr', store: 490, personal: 290 },
  { month: 'May', store: 620, personal: 410 },
  { month: 'Jun', store: 580, personal: 380 },
  { month: 'Jul', store: 710, personal: 460 },
  { month: 'Aug', store: 680, personal: 430 },
];

const miniBarData = [
  { v: 30 }, { v: 50 }, { v: 40 }, { v: 70 }, { v: 55 }, { v: 80 },
];

const subBreakdown = [
  { name: 'Starter', value: 14, color: '#2563EB' },
  { name: 'Professional', value: 9, color: '#3B82F6' },
  { name: 'Enterprise', value: 18, color: '#0F172A' },
  { name: 'Enterprise+', value: 6, color: '#F59E0B' },
];

function MiniBar({ color = '#2563EB' }: { color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <BarChart data={miniBarData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Bar dataKey="v" fill={color} radius={[2, 2, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function MiniLine({ color = '#3B82F6' }: { color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={miniBarData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function SuperAnalyticsPage() {
  const router = useRouter();
  const [regionTab, setRegionTab] = useState<'all' | 'region'>('all');

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Reports</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-slate-800">Global Reports & Analytics</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-all">
              Date Range <ChevronDown size={13} />
            </button>
            <div className="flex rounded-xl overflow-hidden border border-slate-200">
              {['All Clients', 'By Region'].map(t => {
                const isActive = (t === 'All Clients' && regionTab === 'all') || (t === 'By Region' && regionTab === 'region');
                return (
                  <button
                    key={t}
                    onClick={() => setRegionTab(t === 'All Clients' ? 'all' : 'region')}
                    className="px-3 py-1.5 text-sm font-medium transition-all"
                    style={isActive ? { backgroundColor: '#2563EB', color: 'white' } : { color: '#64748B', backgroundColor: 'white' }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-all">
              <Download size={13} /> Export <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-all">
              Sebra <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* 4 KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-2">Total Active Campaigns</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">312</p>
            <MiniBar color="#2563EB" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-1">Average Turnout Lift</p>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-bold text-slate-800">49%</p>
              <div className="flex items-center gap-0.5 mb-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
                <TrendingUp size={12} />
                <span>↑ +4%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-2">Feature Adoption Rate</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">73%</p>
            <MiniLine color="#3B82F6" />
          </div>

          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: '#2563EB' }}>
            <p className="text-xs font-semibold opacity-80 mb-2">Revenue Trend</p>
            <p className="text-3xl font-bold mb-2">$184K</p>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={miniBarData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.85)" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Usage chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 text-sm">Monthly Usage Across All Clients</h3>
            <div className="flex items-center gap-2">
              {['CSV', 'PDF'].map(btn => (
                <button
                  key={btn}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
                formatter={(v: string) => v === 'store' ? 'Store Itmems' : 'Personal ments'}
              />
              <Line type="monotone" dataKey="store" stroke="#2563EB" strokeWidth={2.5} dot={false} name="store" />
              <Line type="monotone" dataKey="personal" stroke="#3B82F6" strokeWidth={2.5} dot={false} name="personal" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Tier Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-4">Subscription Tier Breakdown</h3>
          <div className="flex items-center gap-8">
            <div style={{ width: 180, height: 180, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {subBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {subBreakdown.map(s => {
                const total = subBreakdown.reduce((a, b) => a + b.value, 0);
                const pct = Math.round((s.value / total) * 100);
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-slate-600 font-medium">{s.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">
                        {s.value} <span className="text-slate-400 font-normal text-xs">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
