'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Target, Users, Calendar, MapPin, TrendingUp, Edit2, Play, Pause, CheckCircle, Clock, ChevronRight, Plus, Download, MessageSquare, Map, X } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MOCK_CAMPAIGNS: Record<string, any> = {
  '1': {
    id: 1, name: '2025 General Election Campaign', type: 'General Election', status: 'active',
    constituency: 'St. Christopher & Nevis', start_date: '2025-09-01', end_date: '2025-11-15',
    description: 'Main general election campaign for all constituencies across St. Kitts and Nevis. Target: secure majority in all 11 seats.',
    turnout_goal: 15432, voters_targeted: 45000, voters_contacted: 14872,
    doors_knocked: 8721, supporters: 9400, undecided: 3800, opposition: 1672,
    canvassing_lists: [
      { id: 1, name: 'St. Christopher 1 — Zone A', canvasser: 'Team Alpha', progress: 87, status: 'active', doors: 320 },
      { id: 2, name: 'St. Christopher 2 — Zone B', canvasser: 'Team Beta', progress: 100, status: 'completed', doors: 290 },
      { id: 3, name: 'Nevis 1 — Sandy Point', canvasser: 'Team Gamma', progress: 44, status: 'active', doors: 410 },
      { id: 4, name: 'St. Christopher 3 — South', canvasser: 'Team Delta', progress: 0, status: 'pending', doors: 220 },
    ],
    progress_data: [
      { day: 'Sep 1', contacted: 800 }, { day: 'Sep 8', contacted: 2400 }, { day: 'Sep 15', contacted: 5100 },
      { day: 'Sep 22', contacted: 7800 }, { day: 'Oct 1', contacted: 10200 }, { day: 'Oct 8', contacted: 12900 },
      { day: 'Oct 15', contacted: 14872 },
    ],
    runners: 28, active_canvassers: 34, sms_sent: 12400, emails_sent: 8900,
    budget_used: 68400, budget_total: 120000,
  },
  '2': {
    id: 2, name: 'Door-to-Door Canvassing Drive', type: 'Canvassing', status: 'active',
    constituency: 'St. Christopher 3', start_date: '2025-09-15', end_date: null,
    description: 'Focused canvassing campaign targeting undecided voters in St. Christopher 3.',
    turnout_goal: 8400, voters_targeted: 12000, voters_contacted: 4200,
    doors_knocked: 3200, supporters: 2100, undecided: 1400, opposition: 700,
    canvassing_lists: [
      { id: 5, name: 'Zone A — Residential', canvasser: 'John Doe', progress: 65, status: 'active', doors: 180 },
      { id: 6, name: 'Zone B — Commercial', canvasser: 'Jane Smith', progress: 30, status: 'active', doors: 220 },
    ],
    progress_data: [
      { day: 'Sep 15', contacted: 400 }, { day: 'Sep 22', contacted: 1200 },
      { day: 'Oct 1', contacted: 2800 }, { day: 'Oct 8', contacted: 4200 },
    ],
    runners: 8, active_canvassers: 12, sms_sent: 3200, emails_sent: 1800,
    budget_used: 18000, budget_total: 45000,
  },
};

const DEFAULT = MOCK_CAMPAIGNS['1'];

const SENTIMENT = (c: any) => [
  { name: 'Supporters', value: c.supporters, color: '#16A34A' },
  { name: 'Undecided', value: c.undecided, color: '#F59E0B' },
  { name: 'Opposition', value: c.opposition, color: '#EF4444' },
];

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const campaign = MOCK_CAMPAIGNS[String(params?.id)] || DEFAULT;
  const [tab, setTab] = useState<'overview' | 'canvassing' | 'communications' | 'analytics'>('overview');
  const [showWalkListModal, setShowWalkListModal] = useState(false);
  const [newWalkList, setNewWalkList] = useState({
    name: '',
    canvasser: '',
    doors: '',
    zone: ''
  });

  const progress = Math.round((campaign.voters_contacted / campaign.voters_targeted) * 100);
  const budgetPct = Math.round((campaign.budget_used / campaign.budget_total) * 100);

  const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: '#DCFCE7', color: '#15803D', label: 'Active' },
    draft: { bg: '#F1F5F9', color: '#475569', label: 'Draft' },
    completed: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Completed' },
    paused: { bg: '#FFFBEB', color: '#B45309', label: 'Paused' },
  };
  const sc = statusConfig[campaign.status] || statusConfig.draft;

  const handleAddWalkList = () => {
    if (!newWalkList.name.trim() || !newWalkList.canvasser.trim()) return;
    // Here you would add the new walk list to the campaign
    console.log('New Walk List:', newWalkList);
    setShowWalkListModal(false);
    setNewWalkList({ name: '', canvasser: '', doors: '', zone: '' });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="min-w-0">
          <button 
            onClick={() => router.push('/campaigns')} 
            className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm hover:text-slate-700 transition-colors mb-2 sm:mb-3"
          >
            <ArrowLeft size={13} className="sm:w-[14px] sm:h-[14px]" /> Back to Campaigns
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-slate-800 tracking-tight break-words">
              {campaign.name}
            </h1>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap" style={{ background: sc.bg, color: sc.color }}>
              {sc.label}
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-100 text-slate-600 whitespace-nowrap">
              {campaign.type}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-1.5 sm:mt-2 break-words">
            {campaign.constituency} · {campaign.start_date}{campaign.end_date ? ` → ${campaign.end_date}` : ' · Ongoing'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all whitespace-nowrap">
            <Edit2 size={12} className="sm:w-[13px] sm:h-[13px]" /> Edit
          </button>
          <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap" 
            style={{ background: campaign.status === 'active' ? '#FFFBEB' : '#DCFCE7', color: campaign.status === 'active' ? '#B45309' : '#15803D' }}>
            {campaign.status === 'active' ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Activate</>}
          </button>
          <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: '#E30613' }}>
            <MessageSquare size={12} className="sm:w-[13px] sm:h-[13px]" /> Send GOTV SMS
          </button>
        </div>
      </div>

      {/* KPI Row - Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label: 'Voters Contacted', value: campaign.voters_contacted.toLocaleString(), sub: `of ${campaign.voters_targeted.toLocaleString()}`, icon: Users, color: '#E30613', bg: '#FEF2F2' },
          { label: 'Doors Knocked', value: campaign.doors_knocked.toLocaleString(), sub: `${progress}% complete`, icon: Target, color: '#1D4ED8', bg: '#EFF6FF' },
          { label: 'Active Canvassers', value: campaign.active_canvassers, sub: 'On the ground', icon: Map, color: '#7C3AED', bg: '#F5F3FF' },
          { label: 'Runners Deployed', value: campaign.runners, sub: 'On assignment', icon: TrendingUp, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Turnout Goal', value: `${Math.round((campaign.doors_knocked / campaign.turnout_goal) * 100)}%`, sub: `${campaign.turnout_goal.toLocaleString()} target`, icon: CheckCircle, color: '#15803D', bg: '#F0FDF4' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
              <s.icon size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: s.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mb-0.5 truncate">{s.label}</p>
              <p className="text-sm sm:text-base md:text-lg font-extrabold text-slate-800 tracking-tight">{s.value}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-4 sm:mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
        {(['overview', 'canvassing', 'communications', 'analytics'] as const).map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold capitalize transition-all whitespace-nowrap"
            style={{ 
              backgroundColor: tab === t ? '#E30613' : 'transparent', 
              color: tab === t ? 'white' : '#64748B' 
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-1">Voter Contact Progress</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4">Cumulative voters contacted over campaign duration</p>
            <div className="w-full h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={campaign.progress_data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="progGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30613" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }} />
                  <Area type="monotone" dataKey="contacted" stroke="#E30613" strokeWidth={2.5} fill="url(#progGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
              <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-2 sm:mb-3">Voter Sentiment</h3>
              <div className="w-full h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SENTIMENT(campaign)} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                      {SENTIMENT(campaign).map((s: any, i: number) => <Cell key={i} fill={s.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: any) => v?.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {SENTIMENT(campaign).map((s: any) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-[11px] sm:text-xs text-slate-600">{s.name}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800">{s.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
              <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-2">Budget Usage</h3>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-800">${campaign.budget_used.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 mb-2">of ${campaign.budget_total.toLocaleString()} total</p>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${budgetPct}%`, backgroundColor: budgetPct > 85 ? '#E30613' : '#16A34A' }} />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5">{budgetPct}% used</p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-2">Campaign Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{campaign.description}</p>
          </div>
        </div>
      )}

      {tab === 'canvassing' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-bold text-sm sm:text-base text-slate-800">Walk Lists ({campaign.canvassing_lists.length})</h3>
            <button 
              onClick={() => setShowWalkListModal(true)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap" 
              style={{ background: '#E30613' }}
            >
              <Plus size={12} className="sm:w-[13px] sm:h-[13px]" /> New Walk List
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs sm:text-sm" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Walk List', 'Canvasser', 'Doors', 'Progress', 'Status', 'Actions'].map(h => (
                    <th key={h} className="py-2 sm:py-3 px-3 sm:px-5 text-left text-[11px] sm:text-xs font-bold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaign.canvassing_lists.map((wl: any, i: number) => {
                  const wsc = wl.status === 'active' ? { bg: '#DCFCE7', color: '#15803D' } : wl.status === 'completed' ? { bg: '#DBEAFE', color: '#1D4ED8' } : { bg: '#FEF3C7', color: '#92400E' };
                  return (
                    <tr key={wl.id} style={{ borderBottom: i < campaign.canvassing_lists.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 font-semibold text-slate-800 text-xs sm:text-sm whitespace-nowrap">{wl.name}</td>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 text-slate-600 text-xs sm:text-sm whitespace-nowrap">{wl.canvasser}</td>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 text-slate-600 text-xs sm:text-sm whitespace-nowrap">{wl.doors}</td>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${wl.progress}%`, backgroundColor: '#E30613' }} />
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-800 w-8">{wl.progress}%</span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 whitespace-nowrap">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold capitalize" style={{ background: wsc.bg, color: wsc.color }}>{wl.status}</span>
                      </td>
                      <td className="py-2 sm:py-3 px-3 sm:px-5 whitespace-nowrap">
                        <button className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all">
                          View <ChevronRight size={10} className="sm:w-[11px] sm:h-[11px]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'communications' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'SMS Sent', value: campaign.sms_sent.toLocaleString(), color: '#E30613', bg: '#FEF2F2', sub: 'This campaign' },
            { label: 'Emails Sent', value: campaign.emails_sent.toLocaleString(), color: '#1D4ED8', bg: '#EFF6FF', sub: 'This campaign' },
            { label: 'WhatsApp Blasts', value: '3', color: '#16A34A', bg: '#F0FDF4', sub: 'Sent' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium mb-1">{s.label}</p>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] sm:text-xs text-slate-400">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-3 sm:mb-4">Contact Rate by Area</h3>
            <div className="w-full h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ area: 'St. Chris 1', rate: 87 }, { area: 'St. Chris 2', rate: 100 }, { area: 'Nevis 1', rate: 44 }, { area: 'St. Chris 3', rate: 0 }]} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <XAxis dataKey="area" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} formatter={(v) => `${v}%`} />
                  <Bar dataKey="rate" fill="#E30613" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-3 sm:mb-4">Canvasser Performance</h3>
            <div className="space-y-3">
              {[{ name: 'Team Alpha', doors: 280, rate: 87 }, { name: 'Team Beta', doors: 290, rate: 100 }, { name: 'Team Gamma', doors: 180, rate: 44 }, { name: 'Team Delta', doors: 0, rate: 0 }].map((t, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-[11px] sm:text-xs text-slate-600 w-full sm:w-24 font-medium">{t.name}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${t.rate}%`, backgroundColor: t.rate > 80 ? '#16A34A' : t.rate > 40 ? '#F59E0B' : '#EF4444' }} />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 w-8">{t.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Walk List Modal */}
      {showWalkListModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowWalkListModal(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Create New Walk List</h3>
              <button 
                onClick={() => setShowWalkListModal(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={18} className="sm:w-[20px] sm:h-[20px]" />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
                  Walk List Name *
                </label>
                <input
                  type="text"
                  value={newWalkList.name}
                  onChange={e => setNewWalkList({ ...newWalkList, name: e.target.value })}
                  placeholder="e.g., Zone A — Residential"
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200"
                />
              </div>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
                  Canvasser / Team *
                </label>
                <select
                  value={newWalkList.canvasser}
                  onChange={e => setNewWalkList({ ...newWalkList, canvasser: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                >
                  <option value="">Select canvasser</option>
                  <option value="Team Alpha">Team Alpha</option>
                  <option value="Team Beta">Team Beta</option>
                  <option value="Team Gamma">Team Gamma</option>
                  <option value="Team Delta">Team Delta</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
                  Zone / Area
                </label>
                <input
                  type="text"
                  value={newWalkList.zone}
                  onChange={e => setNewWalkList({ ...newWalkList, zone: e.target.value })}
                  placeholder="e.g., North Residential Area"
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                />
              </div>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
                  Number of Doors
                </label>
                <input
                  type="number"
                  value={newWalkList.doors}
                  onChange={e => setNewWalkList({ ...newWalkList, doors: e.target.value })}
                  placeholder="e.g., 250"
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-3 sm:pt-4">
                <button
                  onClick={() => setShowWalkListModal(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWalkList}
                  disabled={!newWalkList.name.trim() || !newWalkList.canvasser.trim()}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#E30613' }}
                >
                  Create Walk List
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}