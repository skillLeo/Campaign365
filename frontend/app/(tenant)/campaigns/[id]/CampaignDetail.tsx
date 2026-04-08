'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Target, Users, Calendar, MapPin, TrendingUp, Edit2, Play, Pause, CheckCircle, Clock, ChevronRight, Plus, Download, MessageSquare, Map } from 'lucide-react';
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

  const progress = Math.round((campaign.voters_contacted / campaign.voters_targeted) * 100);
  const budgetPct = Math.round((campaign.budget_used / campaign.budget_total) * 100);

  const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: '#DCFCE7', color: '#15803D', label: 'Active' },
    draft: { bg: '#F1F5F9', color: '#475569', label: 'Draft' },
    completed: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Completed' },
    paused: { bg: '#FFFBEB', color: '#B45309', label: 'Paused' },
  };
  const sc = statusConfig[campaign.status] || statusConfig.draft;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <button onClick={() => router.push('/campaigns')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
            <ArrowLeft size={14} /> Back to Campaigns
          </button>
          <div className="flex items-center gap-3">
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>{campaign.name}</h1>
            <span style={{ background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{sc.label}</span>
            <span style={{ background: '#F1F5F9', color: '#475569', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{campaign.type}</span>
          </div>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{campaign.constituency} · {campaign.start_date}{campaign.end_date ? ` → ${campaign.end_date}` : ' · Ongoing'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button style={{ background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 9, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Edit2 size={13} /> Edit
          </button>
          <button style={{ background: campaign.status === 'active' ? '#FFFBEB' : '#DCFCE7', color: campaign.status === 'active' ? '#B45309' : '#15803D', border: 'none', borderRadius: 9, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            {campaign.status === 'active' ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Activate</>}
          </button>
          <button style={{ background: '#E30613', color: 'white', border: 'none', borderRadius: 9, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageSquare size={13} /> Send GOTV SMS
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Voters Contacted', value: campaign.voters_contacted.toLocaleString(), sub: `of ${campaign.voters_targeted.toLocaleString()}`, icon: Users, color: '#E30613', bg: '#FEF2F2' },
          { label: 'Doors Knocked', value: campaign.doors_knocked.toLocaleString(), sub: `${progress}% complete`, icon: Target, color: '#1D4ED8', bg: '#EFF6FF' },
          { label: 'Active Canvassers', value: campaign.active_canvassers, sub: 'On the ground', icon: Map, color: '#7C3AED', bg: '#F5F3FF' },
          { label: 'Runners Deployed', value: campaign.runners, sub: 'On assignment', icon: TrendingUp, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Turnout Goal', value: `${Math.round((campaign.doors_knocked / campaign.turnout_goal) * 100)}%`, sub: `${campaign.turnout_goal.toLocaleString()} target`, icon: CheckCircle, color: '#15803D', bg: '#F0FDF4' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div className="min-w-0">
              <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500, marginBottom: 1 }}>{s.label}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: 10, color: '#94A3B8' }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {(['overview', 'canvassing', 'communications', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === t ? '#E30613' : 'transparent', color: tab === t ? 'white' : '#64748B', textTransform: 'capitalize' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 4 }}>Voter Contact Progress</h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>Cumulative voters contacted over campaign duration</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={campaign.progress_data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="progGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E30613" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Area type="monotone" dataKey="contacted" stroke="#E30613" strokeWidth={2.5} fill="url(#progGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 12 }}>Voter Sentiment</h3>
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie data={SENTIMENT(campaign)} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                    {SENTIMENT(campaign).map((s: any, i: number) => <Cell key={i} fill={s.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => v?.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {SENTIMENT(campaign).map((s: any) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: s.color }} /><span style={{ fontSize: 12, color: '#475569' }}>{s.name}</span></div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{s.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 10 }}>Budget Usage</h3>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>${campaign.budget_used.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>of ${campaign.budget_total.toLocaleString()} total</p>
              <div style={{ height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${budgetPct}%`, backgroundColor: budgetPct > 85 ? '#E30613' : '#16A34A', borderRadius: 4 }} />
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{budgetPct}% used</p>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 8 }}>Campaign Description</h3>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{campaign.description}</p>
          </div>
        </div>
      )}

      {tab === 'canvassing' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Walk Lists ({campaign.canvassing_lists.length})</h3>
            <button style={{ background: '#E30613', color: 'white', border: 'none', borderRadius: 9, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={13} /> New Walk List
            </button>
          </div>
          <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Walk List', 'Canvasser', 'Doors', 'Progress', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaign.canvassing_lists.map((wl: any, i: number) => {
                const wsc = wl.status === 'active' ? { bg: '#DCFCE7', color: '#15803D' } : wl.status === 'completed' ? { bg: '#DBEAFE', color: '#1D4ED8' } : { bg: '#FEF3C7', color: '#92400E' };
                return (
                  <tr key={wl.id} style={{ borderBottom: i < campaign.canvassing_lists.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{wl.name}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569' }}>{wl.canvasser}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569' }}>{wl.doors}</td>
                    <td style={{ padding: '14px 20px', minWidth: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${wl.progress}%`, backgroundColor: '#E30613', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', width: 32 }}>{wl.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ background: wsc.bg, color: wsc.color, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, textTransform: 'capitalize' }}>{wl.status}</span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <button onClick={() => {}} style={{ background: '#EFF6FF', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: 5 }}>
                        View <ChevronRight size={11} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'SMS Sent', value: campaign.sms_sent.toLocaleString(), color: '#E30613', bg: '#FEF2F2', sub: 'This campaign' },
            { label: 'Emails Sent', value: campaign.emails_sent.toLocaleString(), color: '#1D4ED8', bg: '#EFF6FF', sub: 'This campaign' },
            { label: 'WhatsApp Blasts', value: '3', color: '#16A34A', bg: '#F0FDF4', sub: 'Sent' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#94A3B8' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Contact Rate by Area</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ area: 'St. Chris 1', rate: 87 }, { area: 'St. Chris 2', rate: 100 }, { area: 'Nevis 1', rate: 44 }, { area: 'St. Chris 3', rate: 0 }]} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="area" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 12 }} formatter={(v) => `${v}%`} />
                <Bar dataKey="rate" fill="#E30613" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 12 }}>Canvasser Performance</h3>
            {[{ name: 'Team Alpha', doors: 280, rate: 87 }, { name: 'Team Beta', doors: 290, rate: 100 }, { name: 'Team Gamma', doors: 180, rate: 44 }, { name: 'Team Delta', doors: 0, rate: 0 }].map((t, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <span style={{ fontSize: 12, color: '#475569', width: 90 }}>{t.name}</span>
                <div style={{ flex: 1, height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${t.rate}%`, backgroundColor: t.rate > 80 ? '#16A34A' : t.rate > 40 ? '#F59E0B' : '#EF4444', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', width: 36 }}>{t.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
