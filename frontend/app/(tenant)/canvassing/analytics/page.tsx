'use client';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, SmilePlus, Clock3, Trophy, MessageSquareHeart } from 'lucide-react';

const SENTIMENT = [
  { name: 'Supportive', value: 46, color: '#16A34A' },
  { name: 'Undecided', value: 34, color: '#F59E0B' },
  { name: 'Opposed', value: 20, color: '#EF4444' },
];

const TEAM_PERFORMANCE = [
  { team: 'Team Alpha', contacts: 382, positive: 62 },
  { team: 'Team Bravo', contacts: 344, positive: 58 },
  { team: 'Team Echo', contacts: 296, positive: 51 },
  { team: 'Team Delta', contacts: 245, positive: 44 },
];

const LEADERBOARD = [
  { name: 'Alicia Grant', region: 'Kingston East', score: 98, conversations: 84, sentiment: '+18' },
  { name: 'Devon Lewis', region: 'Kingston Central', score: 94, conversations: 76, sentiment: '+14' },
  { name: 'Marsha Blake', region: 'Portmore North', score: 89, conversations: 69, sentiment: '+11' },
  { name: 'Kareem Brown', region: 'St. Catherine', score: 82, conversations: 61, sentiment: '+7' },
];

export default function CanvassingAnalyticsPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Canvassing Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Track sentiment shifts, team performance, and field leaderboards from recent canvassing runs.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          Export analytics pack
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label: 'Conversations Logged', value: '1,267', icon: TrendingUp, bg: '#FEF2F2', color: 'var(--tenant-primary)' },
          { label: 'Positive Sentiment', value: '46%', icon: SmilePlus, bg: '#ECFDF5', color: '#16A34A' },
          { label: 'Avg Door Time', value: '4.8m', icon: Clock3, bg: '#EFF6FF', color: '#2563EB' },
          { label: 'Top Team Score', value: '98', icon: Trophy, bg: '#FEFCE8', color: '#CA8A04' },
          { label: 'Issue Mentions', value: '312', icon: MessageSquareHeart, bg: '#F5F3FF', color: '#7C3AED' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800">Sentiment Breakdown</h2>
            <span className="text-xs text-slate-400">Last 7 days</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-4 items-center">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SENTIMENT} dataKey="value" innerRadius={52} outerRadius={82} paddingAngle={3}>
                    {SENTIMENT.map(item => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {SENTIMENT.map(item => (
                <div key={item.name} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-semibold text-slate-800">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {item.name === 'Supportive' && 'Strong pull from housing and jobs messaging.'}
                    {item.name === 'Undecided' && 'Best conversion opportunity for second-touch persuasion.'}
                    {item.name === 'Opposed' && 'Concentrated in two urban precinct clusters.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800">Team Contact Volume</h2>
            <span className="text-xs text-slate-400">By walk list</span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEAM_PERFORMANCE} margin={{ top: 4, right: 12, left: -18, bottom: 0 }}>
                <XAxis dataKey="team" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="contacts" fill="var(--tenant-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Canvasser Leaderboard</h2>
            <span className="text-xs text-slate-400">Weighted by quality and completion</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {['Rank', 'Canvasser', 'Region', 'Score', 'Conversations', 'Sentiment Lift'].map(head => (
                    <th key={head} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((row, index) => (
                  <tr key={row.name} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-bold text-slate-800">#{index + 1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600">{row.region}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
                        {row.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.conversations}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{row.sentiment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-800">Field Coaching Notes</h2>
          <div className="space-y-3 mt-4">
            {[
              'Undecided voters responded best when the cost-of-living script was used in the first 30 seconds.',
              'Team Alpha is outperforming in repeat-touch neighborhoods where visit windows are after 5 PM.',
              'Opposition resistance spikes in two precincts where issue concerns are public safety and road repairs.',
            ].map(note => (
              <div key={note} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                <p className="text-sm text-slate-600 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
