'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/lib/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, BarChart2, Users, TrendingUp, MessageSquare, Eye, Copy, Trash2 } from 'lucide-react';

interface Survey {
  id: number;
  title: string;
  type: 'poll' | 'survey' | 'canvassing_form';
  responses: number;
  status: 'active' | 'draft' | 'closed';
  created_at: string;
}

const mockSurveys: Survey[] = [
  { id: 1, title: 'Voter Priority Issues — Oct 2025', type: 'poll', responses: 1842, status: 'active', created_at: '2025-10-01' },
  { id: 2, title: 'Post-Rally Satisfaction Survey', type: 'survey', responses: 634, status: 'active', created_at: '2025-10-06' },
  { id: 3, title: 'Door-Knock Canvassing Form', type: 'canvassing_form', responses: 3210, status: 'active', created_at: '2025-09-15' },
  { id: 4, title: 'Economic Policy Feedback', type: 'poll', responses: 0, status: 'draft', created_at: '2025-10-07' },
  { id: 5, title: 'August Town Hall Feedback', type: 'survey', responses: 288, status: 'closed', created_at: '2025-08-20' },
];

const topIssuesData = [
  { issue: 'Economy', pct: 38 },
  { issue: 'Healthcare', pct: 24 },
  { issue: 'Education', pct: 18 },
  { issue: 'Crime', pct: 12 },
  { issue: 'Infrastructure', pct: 8 },
];

const sentimentData = [
  { name: 'Positive', value: 52, color: '#E30613' },
  { name: 'Neutral', value: 28, color: '#94A3B8' },
  { name: 'Negative', value: 20, color: '#EF4444' },
];

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'surveys' | 'results'>('surveys');
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const totalResponses = surveys.reduce((s, r) => s + r.responses, 0);

  const typeBadge = (t: Survey['type']) => ({
    poll: 'info', survey: 'success', canvassing_form: 'warning',
  }[t] as any);

  const statusBadge = (s: Survey['status']) => ({
    active: 'success', draft: 'default', closed: 'danger',
  }[s] as any);

  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Polling & Surveys</h1>
          <p className="text-sm text-slate-500">Voter sentiment tracking and field data collection</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowModal(true)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
          New Survey
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Responses', value: totalResponses.toLocaleString(), icon: MessageSquare, color: primaryColor },
          { label: 'Active Surveys', value: surveys.filter(s => s.status === 'active').length, icon: BarChart2, color: '#E30613' },
          { label: 'Avg Sentiment', value: '52% +ve', icon: TrendingUp, color: '#3B82F6' },
          { label: 'Respondents', value: '4,892', icon: Users, color: '#F59E0B' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-100">
        {(['surveys', 'results'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-current' : 'border-transparent text-slate-400'}`}
            style={activeTab === tab ? { color: primaryColor, borderColor: primaryColor } : {}}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'surveys' ? (
        <div className="space-y-3">
          {surveys.map(survey => (
            <Card key={survey.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                    <BarChart2 size={18} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{survey.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant={typeBadge(survey.type)}>{survey.type.replace('_', ' ')}</Badge>
                      <Badge variant={statusBadge(survey.status)}>{survey.status}</Badge>
                      <span className="text-xs text-slate-400">{survey.responses.toLocaleString()} responses</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" icon={<Eye size={13} />}>View</Button>
                  <Button variant="ghost" size="sm" icon={<Copy size={13} />}>Copy Link</Button>
                  <Button variant="ghost" size="sm" icon={<Trash2 size={13} />} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Top Voter Issues</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topIssuesData} layout="vertical">
                <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="issue" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v) => [`${v}%`, 'Respondents']} />
                <Bar dataKey="pct" fill={primaryColor} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Voter Sentiment Breakdown</h3>
            <div className="flex items-center justify-center">
              <PieChart width={200} height={180}>
                <Pie data={sentimentData} cx={100} cy={90} innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`]} />
              </PieChart>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {sentimentData.map(s => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: s.color }} />
                  {s.name} ({s.value}%)
                </div>
              ))}
            </div>
          </Card>

          <Card className="col-span-2 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-3">Recent Canvassing Responses</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Voter', 'Constituency', 'Support Level', 'Top Issue', 'Date'].map(h => (
                      <th key={h} className="text-left py-2 px-3 font-medium text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['John A.', 'St. Chris 1', 'Strong Support', 'Economy', 'Oct 7'],
                    ['Mary B.', 'Nevis 1', 'Leaning Support', 'Healthcare', 'Oct 7'],
                    ['Carlos M.', 'St. Chris 2', 'Undecided', 'Education', 'Oct 6'],
                    ['Angela P.', 'St. Chris 3', 'Strong Support', 'Crime', 'Oct 6'],
                    ['Denzel T.', 'St. Chris 1', 'Opposition', 'Economy', 'Oct 5'],
                  ].map(([voter, cons, support, issue, date], i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-700">{voter}</td>
                      <td className="py-2 px-3 text-slate-500">{cons}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${support === 'Strong Support' ? 'bg-emerald-50 text-emerald-700' : support === 'Opposition' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{support}</span>
                      </td>
                      <td className="py-2 px-3 text-slate-500">{issue}</td>
                      <td className="py-2 px-3 text-slate-400">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Survey / Poll" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
            <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Survey title" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {['Poll', 'Survey', 'Canvassing Form'].map(t => (
                <button key={t} className="p-2 border border-slate-200 rounded-lg text-xs text-center hover:border-slate-400 transition-colors">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Questions</label>
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
              <input className="w-full text-sm border-b border-slate-100 pb-1 focus:outline-none" placeholder="Question 1: e.g. What is your top priority?" />
              <button className="text-xs font-medium flex items-center gap-1" style={{ color: primaryColor }}>
                <Plus size={12} /> Add Question
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Create Survey</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
