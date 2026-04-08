'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Download, Users, TrendingUp, CheckCircle2,
  BarChart3, PieChart as PieIcon, Filter
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PRIMARY = '#E30613';

const MOCK_SURVEYS: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Voter Satisfaction Poll — June 2025',
    campaign: '2025 General Election Campaign',
    status: 'active',
    launched: '2025-06-01',
    responses: 1247,
    target: 2000,
    questions: [
      {
        id: 1,
        text: 'How would you rate the current government\'s performance?',
        type: 'scale',
        data: [
          { label: 'Very Poor', value: 89, color: '#E30613' },
          { label: 'Poor', value: 134, color: '#F97316' },
          { label: 'Fair', value: 298, color: '#F59E0B' },
          { label: 'Good', value: 412, color: '#22C55E' },
          { label: 'Excellent', value: 314, color: '#16A34A' },
        ],
      },
      {
        id: 2,
        text: 'Which issue matters most to you?',
        type: 'choice',
        data: [
          { label: 'Economy & Jobs', value: 342, color: PRIMARY },
          { label: 'Healthcare', value: 278, color: '#2563EB' },
          { label: 'Education', value: 231, color: '#7C3AED' },
          { label: 'Crime & Safety', value: 196, color: '#D97706' },
          { label: 'Housing', value: 145, color: '#0891B2' },
          { label: 'Other', value: 55, color: '#94A3B8' },
        ],
      },
      {
        id: 3,
        text: 'Are you likely to vote in the upcoming election?',
        type: 'choice',
        data: [
          { label: 'Definitely Yes', value: 678, color: '#16A34A' },
          { label: 'Probably Yes', value: 312, color: '#22C55E' },
          { label: 'Unsure', value: 187, color: '#F59E0B' },
          { label: 'Probably Not', value: 48, color: '#F97316' },
          { label: 'Definitely No', value: 22, color: '#E30613' },
        ],
      },
    ],
    breakdowns: {
      age: [
        { group: '18-24', support: 68, undecided: 22, oppose: 10 },
        { group: '25-34', support: 62, undecided: 25, oppose: 13 },
        { group: '35-44', support: 55, undecided: 28, oppose: 17 },
        { group: '45-54', support: 59, undecided: 21, oppose: 20 },
        { group: '55-64', support: 71, undecided: 15, oppose: 14 },
        { group: '65+', support: 76, undecided: 12, oppose: 12 },
      ],
      gender: [
        { group: 'Male', support: 58, undecided: 24, oppose: 18 },
        { group: 'Female', support: 67, undecided: 21, oppose: 12 },
        { group: 'Non-binary', support: 61, undecided: 28, oppose: 11 },
      ],
      constituency: [
        { group: 'Central Basseterre', support: 72, undecided: 18, oppose: 10 },
        { group: 'East Basseterre', support: 64, undecided: 22, oppose: 14 },
        { group: 'St. Paul\'s', support: 58, undecided: 27, oppose: 15 },
        { group: 'Trinity Palmetto', support: 55, undecided: 24, oppose: 21 },
        { group: 'West Basseterre', support: 69, undecided: 20, oppose: 11 },
      ],
    },
  },
};

const CROSSTAB_COLORS = { support: '#16A34A', undecided: '#F59E0B', oppose: '#E30613' };

export default function SurveyResultsPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);
  const survey = MOCK_SURVEYS[id] || MOCK_SURVEYS['1'];

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [breakdownBy, setBreakdownBy] = useState<'age' | 'gender' | 'constituency'>('age');

  const q = survey.questions[activeQuestion];
  const total = q.data.reduce((s: number, d: any) => s + d.value, 0);
  const breakdownData = survey.breakdowns[breakdownBy];
  const responseRate = Math.round((survey.responses / survey.target) * 100);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#475569' }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex-1">
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>{survey.name}</h1>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Polling › Survey Results</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F1F5F9', border: 'none', borderRadius: 9, padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Responses', value: survey.responses.toLocaleString(), sub: `of ${survey.target.toLocaleString()} target`, icon: Users, color: PRIMARY },
          { label: 'Response Rate', value: `${responseRate}%`, sub: 'of target reached', icon: TrendingUp, color: '#2563EB' },
          { label: 'Completion Rate', value: '84%', sub: 'finished all questions', icon: CheckCircle2, color: '#16A34A' },
          { label: 'Avg. Time', value: '3m 12s', sub: 'to complete survey', icon: BarChart3, color: '#7C3AED' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
              <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={16} style={{ color: card.color }} />
              </div>
              <p style={{ fontSize: 22, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A' }}>{card.value}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{card.label}</p>
              <p style={{ fontSize: 11, color: '#CBD5E1', marginTop: 1 }}>{card.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: Question list */}
        <div className="col-span-1 space-y-2">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Questions</p>
          {survey.questions.map((q: any, i: number) => (
            <button
              key={q.id}
              onClick={() => setActiveQuestion(i)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                backgroundColor: activeQuestion === i ? PRIMARY : 'white',
                color: activeQuestion === i ? 'white' : '#475569',
                border: activeQuestion === i ? 'none' : '1px solid #E2E8F0',
                fontSize: 12, fontWeight: activeQuestion === i ? 600 : 400, lineHeight: 1.4,
              }}
            >
              <span style={{ display: 'block', fontSize: 10, opacity: 0.7, marginBottom: 3 }}>Q{i + 1}</span>
              {q.text}
            </button>
          ))}
        </div>

        {/* Right: Chart area */}
        <div className="col-span-4 space-y-5">
          {/* Question chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>Q{activeQuestion + 1}</p>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginTop: 2 }}>{q.text}</h3>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{total.toLocaleString()} responses</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('bar')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, backgroundColor: chartType === 'bar' ? PRIMARY : '#F1F5F9', color: chartType === 'bar' ? 'white' : '#64748B' }}
                >
                  <BarChart3 size={13} /> Bar
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, backgroundColor: chartType === 'pie' ? PRIMARY : '#F1F5F9', color: chartType === 'pie' ? 'white' : '#64748B' }}
                >
                  <PieIcon size={13} /> Pie
                </button>
              </div>
            </div>

            {chartType === 'bar' ? (
              <div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={q.data} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: any) => [`${v} responses`, '']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                      {q.data.map((entry: any, i: number) => <Cell key={i} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2">
                  {q.data.map((d: any) => (
                    <div key={d.label} className="flex items-center gap-2">
                      <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: d.color }} />
                      <span style={{ fontSize: 12, color: '#475569' }}>{d.label}: <strong>{Math.round((d.value / total) * 100)}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={q.data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} label={({ label, percent }: any) => `${label} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: '#CBD5E1' }}>
                    {q.data.map((entry: any, i: number) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v} responses`]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Cross-tab breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter size={14} style={{ color: '#94A3B8' }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>Cross-Tab Breakdown</h3>
              </div>
              <div className="flex gap-2">
                {(['age', 'gender', 'constituency'] as const).map(k => (
                  <button
                    key={k}
                    onClick={() => setBreakdownBy(k)}
                    style={{ padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, backgroundColor: breakdownBy === k ? '#0F172A' : '#F1F5F9', color: breakdownBy === k ? 'white' : '#64748B', textTransform: 'capitalize' }}
                  >
                    {k === 'constituency' ? 'Constituency' : k.charAt(0).toUpperCase() + k.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {breakdownData.map((row: any) => (
                <div key={row.group}>
                  <div className="flex items-center justify-between mb-1">
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{row.group}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8' }}>Support {row.support}% · Undecided {row.undecided}% · Oppose {row.oppose}%</p>
                  </div>
                  <div style={{ height: 10, borderRadius: 99, overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${row.support}%`, backgroundColor: CROSSTAB_COLORS.support }} />
                    <div style={{ width: `${row.undecided}%`, backgroundColor: CROSSTAB_COLORS.undecided }} />
                    <div style={{ width: `${row.oppose}%`, backgroundColor: CROSSTAB_COLORS.oppose }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              {Object.entries(CROSSTAB_COLORS).map(([k, c]) => (
                <div key={k} className="flex items-center gap-2">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
                  <span style={{ fontSize: 12, color: '#64748B', textTransform: 'capitalize' }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
