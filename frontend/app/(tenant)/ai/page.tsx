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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
              <Brain size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#E30613' }} />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>AI Campaign Insights</h1>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: '#FEF2F2', color: '#E30613' }}>Powered by Campaign 365</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500">GPT-4o analysis of your campaign data · Last updated just now</p>
        </div>
        <button
          onClick={handleGenerate}
          className="flex items-center justify-center gap-1.5 rounded-xl text-white transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: '#E30613', border: 'none', padding: '8px 16px', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}
        >
          {generating ? <><RefreshCw size={13} className="animate-spin" /> Analyzing...</> : <><Brain size={13} /> Refresh AI Analysis</>}
        </button>
      </div>

      {/* Key Metrics - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Persuasion Rate', value: '+18%', sub: 'vs last week', color: '#E30613', bg: '#FEF2F2', trend: 'up' },
          { label: 'Predicted Turnout', value: '72%', sub: 'St. Christopher', color: '#E30613', bg: '#FEE2E2', trend: 'up' },
          { label: 'Voter Sentiment Score', value: '7.4/10', sub: 'Avg across all', color: '#15803D', bg: '#F0FDF4', trend: 'up' },
          { label: 'AI Actions Pending', value: '4', sub: 'Awaiting approval', color: '#E30613', bg: '#FEE2E2', trend: null },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-1 sm:mb-2">
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{m.label}</p>
              {m.trend === 'up' && <ArrowUp size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color: '#16A34A' }} />}
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight" style={{ color: m.color, lineHeight: 1 }}>{m.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* AI Insights Feed */}
        <div className="lg:flex-1 space-y-3 sm:space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-1">AI Insights Panel</h2>
          {AI_INSIGHTS.map((insight) => (
            <div key={insight.type} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: insight.bg }}>
                  <insight.icon size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: insight.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">{insight.title}</h3>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase whitespace-nowrap" style={{ backgroundColor: insight.priority === 'high' ? '#FEF2F2' : '#F8FAFC', color: insight.priority === 'high' ? '#E30613' : '#94A3B8' }}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-3">{insight.body}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleApply(insight.type)}
                      className="flex items-center justify-center gap-1 rounded-lg text-white font-semibold transition-all hover:opacity-90 whitespace-nowrap"
                      style={{
                        backgroundColor: appliedInsight === insight.type ? '#16A34A' : insight.color,
                        border: 'none', padding: '5px 12px', fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      {appliedInsight === insight.type ? <><CheckCircle size={11} /> Applied!</> : <><Zap size={11} /> {insight.action}</>}
                    </button>
                    <button className="flex items-center gap-0.5 text-[11px] sm:text-xs text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer">
                      Dismiss <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Responsive */}
        <div className="lg:w-80 xl:w-96 space-y-3 sm:space-y-4">
          {/* Recommended Next Action */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star size={13} className="sm:w-[14px] sm:h-[14px]" style={{ color: '#E30613' }} />
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">Recommended Next Action</h3>
            </div>
            <div className="rounded-xl p-3 sm:p-4 mb-3" style={{ background: '#FEF2F2' }}>
              <p className="text-[10px] sm:text-xs text-slate-400 mb-1">Target Group</p>
              <p className="text-base sm:text-lg font-extrabold" style={{ color: '#E30613' }}>Age 25–34</p>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-1">in St. Christopher Nevis</p>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-3">
              With 1,240 targeted messages ready, deploying to this age group could move the persuasion needle by an estimated 12–18 percentage points based on historical patterns.
            </p>
            <button className="w-full flex items-center justify-center gap-1.5 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#E30613', border: 'none', padding: '9px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>
              <Zap size={12} className="sm:w-[13px] sm:h-[13px]" /> Apply AI Suggestion
            </button>
          </div>

          {/* Voter Sentiment Summary */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3">Voter Sentiment Summary</h3>
            <div className="w-full h-[110px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SENTIMENT_DATA} cx="50%" cy="50%" innerRadius={30} outerRadius={45} dataKey="value" strokeWidth={0}>
                    {SENTIMENT_DATA.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {SENTIMENT_DATA.map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span className="text-[11px] sm:text-xs text-slate-600">{s.name}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Influencers */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3">Key Influencers</h3>
            <div className="space-y-2.5">
              {INFLUENCERS.map((inf, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate">{inf.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{inf.type} · {inf.constituency}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-[11px] sm:text-xs font-bold" style={{ color: '#E30613' }}>{inf.reach}</p>
                    <p className="text-[9px] text-slate-400">reach</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Turnout Prediction Trend */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">Turnout Prediction</h3>
            <p className="text-[10px] text-slate-400 mb-3">7-day forecast vs actual</p>
            <div className="w-full h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TURNOUT_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="tpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30613" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#E30613" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="predicted" stroke="#E30613" strokeWidth={2} fill="url(#tpGrad)" dot={false} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="actual" stroke="#16A34A" strokeWidth={2} fill="none" dot={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 10 }} formatter={(v) => v ? `${v}%` : 'N/A'} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-red-500" />
                <span className="text-[9px] text-slate-400">Predicted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-green-500" />
                <span className="text-[9px] text-slate-400">Actual</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for checkmark
function CheckCircle({ size, className }: { size: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}