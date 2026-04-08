'use client';
import { useState } from 'react';
import { Brain, TrendingUp, Users, Target, Zap, ChevronRight, RefreshCw, ArrowUp, MessageSquare, Star } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const SENTIMENT_DATA = [
  { name: 'Supporters', value: 58, color: '#16A34A' },
  { name: 'Undecided', value: 27, color: '#F59E0B' },
  { name: 'Opposition', value: 15, color: '#EF4444' },
];

const TURNOUT_TREND = [
  { day: 'Mon', predicted: 62, actual: 58 },
  { day: 'Tue', predicted: 65, actual: 61 },
  { day: 'Wed', predicted: 68, actual: 67 },
  { day: 'Thu', predicted: 71, actual: 70 },
  { day: 'Fri', predicted: 74, actual: null },
  { day: 'Sat', predicted: 76, actual: null },
];

const AI_INSIGHTS = [
  {
    type: 'persuasion',
    title: 'High Persuasion Opportunity',
    body: '2,847 undecided voters in St. Christopher 3 match the profile of likely persuadable voters based on age (25–34), voting history (skipped 2020), and recent canvassing interactions. Recommend targeted outreach this week.',
    priority: 'high',
    action: 'Apply AI Suggestion',
    color: '#E30613',
    bg: '#FEF2F2',
    icon: Target,
  },
  {
    type: 'turnout',
    title: 'Turnout Risk — Nevis 2',
    body: 'Predictive model shows Nevis 2 polling division at only 51% turnout probability. 3 runners assigned to this area have GPS gaps in the last 48 hours. Consider reassigning or adding 2 additional runners.',
    priority: 'high',
    action: 'Assign Runners',
    color: '#D97706',
    bg: '#FEE2E2',
    icon: TrendingUp,
  },
  {
    type: 'messaging',
    title: 'Personalized Messaging Ready',
    body: 'AI has generated 1,240 personalized SMS messages for undecided voters in St. Christopher 1–4. Messages are tailored by age group, top concern (infrastructure/youth employment), and preferred language.',
    priority: 'medium',
    action: 'Review Messages',
    color: '#7C3AED',
    bg: '#FEE2E2',
    icon: MessageSquare,
  },
  {
    type: 'timing',
    title: 'Optimal Canvassing Window',
    body: 'Analysis of 14,872 door knocks shows 6–8 PM weekdays and 10 AM–2 PM weekends have the highest contact rates (+34% above average). Recommend shifting 40% of active canvassers to these windows.',
    priority: 'medium',
    action: 'Update Schedule',
    color: '#0891B2',
    bg: '#ECFEFF',
    icon: Zap,
  },
];

const INFLUENCERS = [
  { name: 'Hon. Dr. Terrance Drew', constituency: 'St. Christopher 7', reach: '12,400', sentiment: 92, type: 'Candidate' },
  { name: 'Councillor Marie Williams', constituency: 'St. Christopher 3', reach: '4,200', sentiment: 88, type: 'Party Rep' },
  { name: 'Youth Alliance SKNLP', constituency: 'All', reach: '8,900', sentiment: 85, type: 'Organisation' },
  { name: 'Rev. James Hendricks', constituency: 'Nevis 1', reach: '2,100', sentiment: 78, type: 'Community Leader' },
];

export default function AIInsightsPage() {
  const [generating, setGenerating] = useState(false);
  const [appliedInsight, setAppliedInsight] = useState<string | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const handleApply = (type: string) => {
    setAppliedInsight(type);
    setTimeout(() => setAppliedInsight(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
              <Brain size={16} style={{ color: '#E30613' }} />
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>AI Campaign Insights</h1>
            <span style={{ background: '#FEF2F2', color: '#E30613', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>Powered by Campaign 365</span>
          </div>
          <p style={{ fontSize: 13, color: '#64748B' }}>GPT-4o analysis of your campaign data · Last updated just now</p>
        </div>
        <button
          onClick={handleGenerate}
          style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {generating ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <><Brain size={14} /> Refresh AI Analysis</>}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Persuasion Rate', value: '+18%', sub: 'vs last week', color: '#E30613', bg: '#FEF2F2', trend: 'up' },
          { label: 'Predicted Turnout', value: '72%', sub: 'St. Christopher', color: '#E30613', bg: '#FEE2E2', trend: 'up' },
          { label: 'Voter Sentiment Score', value: '7.4/10', sub: 'Avg across all', color: '#15803D', bg: '#F0FDF4', trend: 'up' },
          { label: 'AI Actions Pending', value: '4', sub: 'Awaiting approval', color: '#E30613', bg: '#FEE2E2', trend: null },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between mb-2">
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{m.label}</p>
              {m.trend === 'up' && <ArrowUp size={14} style={{ color: '#16A34A' }} />}
            </div>
            <p style={{ fontSize: 26, fontWeight: 800, color: m.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{m.value}</p>
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* AI Insights Feed */}
        <div className="col-span-2 space-y-4">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>AI Insights Panel</h2>
          {AI_INSIGHTS.map((insight) => (
            <div key={insight.type} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: insight.bg }}>
                  <insight.icon size={16} style={{ color: insight.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{insight.title}</h3>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, backgroundColor: insight.priority === 'high' ? '#FEF2F2' : '#F8FAFC', color: insight.priority === 'high' ? '#E30613' : '#94A3B8', textTransform: 'uppercase' }}>
                      {insight.priority}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.7, marginBottom: 12 }}>{insight.body}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleApply(insight.type)}
                      style={{
                        backgroundColor: appliedInsight === insight.type ? '#16A34A' : insight.color,
                        color: 'white', border: 'none', borderRadius: 8, padding: '7px 16px',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {appliedInsight === insight.type ? '✓ Applied!' : <><Zap size={12} /> {insight.action}</>}
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Dismiss <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Recommended Next Action */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} style={{ color: '#E30613' }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Recommended Next Action</h3>
            </div>
            <div style={{ background: '#FEF2F2', borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>Target Group</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#E30613' }}>Age 25–34</p>
              <p style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>in St. Christopher Nevis</p>
            </div>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, marginBottom: 12 }}>
              With 1,240 targeted messages ready, deploying to this age group could move the persuasion needle by an estimated 12–18 percentage points based on historical patterns.
            </p>
            <button style={{ width: '100%', backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Zap size={13} /> Apply AI Suggestion
            </button>
          </div>

          {/* Voter Sentiment Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Voter Sentiment Summary</h3>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={SENTIMENT_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {SENTIMENT_DATA.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {SENTIMENT_DATA.map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: s.color }} />
                    <span style={{ fontSize: 12, color: '#475569' }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Influencers */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Key Influencers</h3>
            <div className="space-y-3">
              {INFLUENCERS.map((inf, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{inf.name}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8' }}>{inf.type} · {inf.constituency}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#E30613' }}>{inf.reach}</p>
                    <p style={{ fontSize: 10, color: '#94A3B8' }}>reach</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Turnout Prediction Trend */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Turnout Prediction</h3>
            <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>7-day forecast vs actual</p>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={TURNOUT_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="tpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E30613" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="predicted" stroke="#E30613" strokeWidth={2} fill="url(#tpGrad)" dot={false} strokeDasharray="4 2" />
                <Area type="monotone" dataKey="actual" stroke="#16A34A" strokeWidth={2} fill="none" dot={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} formatter={(v) => v ? `${v}%` : 'N/A'} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div style={{ width: 12, height: 2, backgroundColor: '#E30613' }} />
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Predicted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div style={{ width: 12, height: 2, backgroundColor: '#16A34A' }} />
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Actual</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
