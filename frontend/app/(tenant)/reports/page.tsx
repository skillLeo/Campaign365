'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Download, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from 'recharts';
import { formatNumber, formatCurrency } from '@/lib/utils';

const barData = [
  { constituency: 'Kingston Central', voters: 4200, contacted: 3800 },
  { constituency: 'Kingston East', voters: 3100, contacted: 2600 },
  { constituency: 'St. Catherine', voters: 2800, contacted: 1900 },
  { constituency: 'Clarendon', voters: 1800, contacted: 1600 },
  { constituency: 'St. James', voters: 1400, contacted: 1100 },
];

const sentimentTrend = [
  { week: 'W1', score: 62 }, { week: 'W2', score: 65 }, { week: 'W3', score: 58 },
  { week: 'W4', score: 70 }, { week: 'W5', score: 74 }, { week: 'W6', score: 72 },
];

export default function ReportsPage() {
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Campaign Performance & Insights</h1>
          <p className="text-sm text-slate-400 mt-0.5">Jan 1, 2025 — Dec 31, 2025</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
          <Download size={14} />
          Export PDF Report
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Voter Contact Rate', value: '75%', icon: Users, color: primaryColor, bg: '#F0FDFA' },
          { label: 'Turnout Rate', value: '85%', icon: TrendingUp, color: '#3B82F6', bg: '#EFF6FF' },
          { label: 'Canvassing Efficiency', value: '90%', icon: Target, color: '#8B5CF6', bg: '#F5F3FF' },
          { label: 'Funds Raised', value: '$107,441', icon: DollarSign, color: '#F59E0B', bg: '#FFFBEB' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 text-sm">Voter Turnout by Constituency</h3>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-slate-200" /> Total</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: primaryColor }} /> Contacted</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={16}>
              <XAxis dataKey="constituency" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              <Bar dataKey="voters" fill="#E2E8F0" radius={[3, 3, 0, 0]} />
              <Bar dataKey="contacted" fill={primaryColor} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-4">Canvassing Efficiency</h3>
          <div className="flex items-center justify-center h-44">
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                <circle
                  cx="80" cy="80" r="60" fill="none"
                  stroke={primaryColor} strokeWidth="16"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.9} ${2 * Math.PI * 60}`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">90%</p>
                  <p className="text-xs text-slate-400">Efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-2">Fundraising Progress</h3>
          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>$107,441</p>
            <p className="text-xs text-slate-400">Goal: $150,000</p>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
            <div className="h-3 rounded-full" style={{ width: '72%', backgroundColor: primaryColor }} />
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={[
              { m: 'Jan', v: 12000 }, { m: 'Feb', v: 18000 }, { m: 'Mar', v: 24000 },
              { m: 'Apr', v: 32000 }, { m: 'May', v: 42000 }, { m: 'Jun', v: 57000 },
              { m: 'Jul', v: 70000 }, { m: 'Aug', v: 84000 }, { m: 'Sep', v: 95000 }, { m: 'Oct', v: 107441 },
            ]}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Area type="monotone" dataKey="v" stroke={primaryColor} strokeWidth={2} fill="url(#rg)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-4">Voter Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={sentimentTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 90]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              <Line type="monotone" dataKey="score" stroke={primaryColor} strokeWidth={2.5} dot={{ fill: primaryColor, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
