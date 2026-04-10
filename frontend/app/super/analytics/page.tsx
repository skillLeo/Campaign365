'use client';
import { useState, useRef, useEffect } from 'react';
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
  { month: 'Sep', store: 720, personal: 450 },
  { month: 'Oct', store: 690, personal: 440 },
  { month: 'Nov', store: 750, personal: 480 },
  { month: 'Dec', store: 800, personal: 500 },
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

const dateRanges = [
  { label: 'Last 30 Days', value: '30days', months: 1 },
  { label: 'Last 3 Months', value: '3months', months: 3 },
  { label: 'Last 6 Months', value: '6months', months: 6 },
  { label: 'Last 12 Months', value: '12months', months: 12 },
  { label: 'Year to Date', value: 'ytd', months: 12 },
  { label: 'All Time', value: 'all', months: 12 },
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
  const [dateRange, setDateRange] = useState('3months');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter data based on selected date range
  const getFilteredData = () => {
    const range = dateRanges.find(r => r.value === dateRange);
    if (!range) return monthlyData;
    
    const monthsToShow = range.months;
    return monthlyData.slice(-monthsToShow);
  };

  const filteredData = getFilteredData();

  // Calculate KPIs based on filtered data
  const getTotalCampaigns = () => {
    return filteredData.reduce((sum, item) => sum + item.store + item.personal, 0);
  };

  const getAvgTurnoutLift = () => {
    const ranges: Record<string, number> = {
      '30days': 52,
      '3months': 49,
      '6months': 47,
      '12months': 45,
      'ytd': 46,
      'all': 44,
    };
    return ranges[dateRange] || 49;
  };

  const getFeatureAdoption = () => {
    const ranges: Record<string, number> = {
      '30days': 78,
      '3months': 73,
      '6months': 71,
      '12months': 68,
      'ytd': 69,
      'all': 65,
    };
    return ranges[dateRange] || 73;
  };

  const getRevenue = () => {
    const ranges: Record<string, string> = {
      '30days': '$48K',
      '3months': '$92K',
      '6months': '$138K',
      '12months': '$184K',
      'ytd': '$156K',
      'all': '$210K',
    };
    return ranges[dateRange] || '$184K';
  };

  const getTrend = () => {
    const ranges: Record<string, string> = {
      '30days': '+8%',
      '3months': '+7%',
      '6months': '+6%',
      '12months': '+5%',
      'ytd': '+5%',
      'all': '+4%',
    };
    return ranges[dateRange] || '+4%';
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-4 md:px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Reports</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-800">Global Reports & Analytics</h1>
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Range Dropdown - FIXED: Now overlays instead of pushing content */}
            <div className="relative" ref={dateDropdownRef}>
              <button
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-all whitespace-nowrap"
              >
                {dateRanges.find(r => r.value === dateRange)?.label || 'Date Range'}
                <ChevronDown size={13} className={`transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-50 py-1">
                  {dateRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => {
                        setDateRange(range.value);
                        setIsDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                        dateRange === range.value ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white">
              <button
                onClick={() => setRegionTab('all')}
                className={`px-4 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
                  regionTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Clients
              </button>
              <button
                onClick={() => setRegionTab('region')}
                className={`px-4 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
                  regionTab === 'region' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                By Region
              </button>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-all whitespace-nowrap">
              <Download size={13} /> Export <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* 4 KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-2">Total Active Campaigns</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">{getTotalCampaigns()}</p>
            <MiniBar color="#2563EB" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-1">Average Turnout Lift</p>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-bold text-slate-800">{getAvgTurnoutLift()}%</p>
              <div className="flex items-center gap-0.5 mb-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
                <TrendingUp size={12} />
                <span>{getTrend()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs font-semibold text-slate-400 mb-2">Feature Adoption Rate</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">{getFeatureAdoption()}%</p>
            <MiniLine color="#3B82F6" />
          </div>

          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: '#2563EB' }}>
            <p className="text-xs font-semibold opacity-80 mb-2">Revenue Trend</p>
            <p className="text-3xl font-bold mb-2">{getRevenue()}</p>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={miniBarData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.85)" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Usage chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-slate-700 text-sm">
              Monthly Usage Across All Clients
              <span className="ml-2 text-xs text-slate-400 font-normal">
                ({dateRanges.find(r => r.value === dateRange)?.label})
              </span>
            </h3>
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
            <LineChart data={filteredData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
                formatter={(v: string) => v === 'store' ? 'Campaign Activity' : 'Personal Usage'}
              />
              <Line type="monotone" dataKey="store" stroke="#2563EB" strokeWidth={2.5} dot={false} name="store" />
              <Line type="monotone" dataKey="personal" stroke="#3B82F6" strokeWidth={2.5} dot={false} name="personal" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Tier Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-4">Subscription Tier Breakdown</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full sm:w-[180px] h-[180px] shrink-0">
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