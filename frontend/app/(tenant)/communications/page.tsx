'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Mail, MessageSquare, Phone, Send, Plus, Search } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

type Tab = 'email' | 'sms' | 'whatsapp';

const MOCK_CAMPAIGNS = [
  { id: 1, name: 'GOTV Final Push', type: 'email', status: 'sent', recipients: 24100, opens: 14460, clicks: 3800, sent_at: 'Oct 5 09:30 AM' },
  { id: 2, name: 'Voter Registration Reminder', type: 'sms', status: 'sent', recipients: 18200, opens: 18200, clicks: 0, sent_at: 'Oct 4 02:00 PM' },
  { id: 3, name: 'Rally Announcement', type: 'whatsapp', status: 'sent', recipients: 5400, opens: 4200, clicks: 1100, sent_at: 'Oct 3 10:00 AM' },
  { id: 4, name: 'Volunteer Recruitment', type: 'email', status: 'draft', recipients: 0, opens: 0, clicks: 0, sent_at: '—' },
  { id: 5, name: 'Election Day Alert', type: 'sms', status: 'scheduled', recipients: 45000, opens: 0, clicks: 0, sent_at: 'Nov 5 06:00 AM' },
];

const statusStyle = (s: string) => {
  if (s === 'sent') return { backgroundColor: '#D1FAE5', color: '#065F46' };
  if (s === 'scheduled') return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
  return { backgroundColor: '#F1F5F9', color: '#475569' };
};

export default function CommunicationsPage() {
  const [tab, setTab] = useState<Tab>('email');
  const [compose, setCompose] = useState(false);
  const [search, setSearch] = useState('');
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const filtered = MOCK_CAMPAIGNS.filter(c =>
    c.type === tab && c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Communications Hub</h1>
          <p className="text-sm text-slate-400 mt-0.5">Email, SMS & WhatsApp campaigns</p>
        </div>
        <button
          onClick={() => setCompose(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={14} />
          New Campaign
        </button>
      </div>

      {/* Channel stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { key: 'email', label: 'Email Campaigns', icon: Mail, sent: '24,100', openRate: '60%', color: '#E30613' },
          { key: 'sms', label: 'SMS Campaigns', icon: MessageSquare, sent: '18,200', openRate: '99%', color: '#E30613' },
          { key: 'whatsapp', label: 'WhatsApp', icon: Phone, sent: '5,400', openRate: '78%', color: '#E30613' },
        ].map(({ key, label, icon: Icon, sent, openRate, color }) => (
          <button
            key={key}
            onClick={() => setTab(key as Tab)}
            className="text-left p-5 rounded-2xl border-2 transition-all"
            style={tab === key
              ? { backgroundColor: `${color}10`, borderColor: color }
              : { backgroundColor: 'white', borderColor: '#E2E8F0' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: tab === key ? color : '#F1F5F9' }}
              >
                <Icon size={16} style={{ color: tab === key ? 'white' : '#64748B' }} />
              </div>
              <p className="text-sm font-semibold text-slate-700">{label}</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{sent}</p>
            <p className="text-xs text-slate-400 mt-0.5">sent · {openRate} open rate</p>
          </button>
        ))}
      </div>

      {/* Campaign table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-700 text-sm capitalize">{tab} Campaigns</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="bg-slate-100 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-600 focus:outline-none w-44"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead style={{ backgroundColor: '#F8FAFC' }}>
            <tr>
              {['Campaign', 'Status', 'Recipients', 'Opens', tab === 'email' ? 'Click Rate' : '—', 'Sent At', 'Action'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-400">No {tab} campaigns yet</td>
              </tr>
            ) : filtered.map(row => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-700">{row.name}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={statusStyle(row.status)}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{row.recipients.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-slate-600">{row.opens.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-slate-500">
                  {tab === 'email' && row.recipients > 0
                    ? `${((row.clicks / row.recipients) * 100).toFixed(1)}%`
                    : '—'}
                </td>
                <td className="py-3.5 px-4 text-slate-400">{row.sent_at}</td>
                <td className="py-3.5 px-4">
                  <button className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity" style={{ color: primaryColor }}>
                    <Send size={11} /> {row.status === 'draft' ? 'Send' : 'Resend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compose modal */}
      {compose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-4">New {tab.toUpperCase()} Campaign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Campaign Name</label>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="e.g. GOTV Final Push" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Audience</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                  <option>All Voters</option>
                  <option>Supporters Only</option>
                  <option>Undecided Voters</option>
                  <option>Custom Segment</option>
                </select>
              </div>
              {tab === 'email' && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Subject Line</label>
                  <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="Email subject" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none resize-none"
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setCompose(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white border border-slate-200 text-slate-600 hover:bg-slate-50">
                  Schedule
                </button>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
