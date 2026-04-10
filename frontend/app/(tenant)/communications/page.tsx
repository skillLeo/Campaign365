'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Mail, MessageSquare, Phone, Send, Plus, Search, Eye, Edit2, Trash2, X } from 'lucide-react';
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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Communications Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Email, SMS & WhatsApp campaigns</p>
        </div>
        <button
          onClick={() => setCompose(true)}
          className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
          New Campaign
        </button>
      </div>

      {/* Channel stats - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[
          { key: 'email', label: 'Email Campaigns', icon: Mail, sent: '24,100', openRate: '60%', color: '#E30613' },
          { key: 'sms', label: 'SMS Campaigns', icon: MessageSquare, sent: '18,200', openRate: '99%', color: '#E30613' },
          { key: 'whatsapp', label: 'WhatsApp', icon: Phone, sent: '5,400', openRate: '78%', color: '#E30613' },
        ].map(({ key, label, icon: Icon, sent, openRate, color }) => (
          <button
            key={key}
            onClick={() => setTab(key as Tab)}
            className="text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all hover:shadow-md"
            style={tab === key
              ? { backgroundColor: `${color}10`, borderColor: color }
              : { backgroundColor: 'white', borderColor: '#E2E8F0' }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ backgroundColor: tab === key ? color : '#F1F5F9' }}
              >
                <Icon size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: tab === key ? 'white' : '#64748B' }} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">{label}</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-800">{sent}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">sent · {openRate} open rate</p>
          </button>
        ))}
      </div>

      {/* Campaign table - Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700 text-xs sm:text-sm capitalize">{tab} Campaigns</h3>
          <div className="relative w-full sm:w-44">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full bg-slate-100 rounded-lg sm:rounded-xl pl-8 pr-2.5 py-1.5 text-[11px] sm:text-xs text-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-xs" style={{ minWidth: '700px' }}>
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Campaign</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Status</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden sm:table-cell">Recipients</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden sm:table-cell">Opens</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden lg:table-cell">{tab === 'email' ? 'Click Rate' : '—'}</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden md:table-cell">Sent At</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">No {tab} campaigns yet</td>
                </tr>
              ) : filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-semibold text-slate-700 text-[11px] sm:text-xs max-w-[140px] truncate">{row.name}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold capitalize" style={statusStyle(row.status)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-slate-600 text-[11px] sm:text-xs hidden sm:table-cell whitespace-nowrap">{row.recipients.toLocaleString()}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-slate-600 text-[11px] sm:text-xs hidden sm:table-cell whitespace-nowrap">{row.opens.toLocaleString()}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-slate-500 text-[11px] sm:text-xs hidden lg:table-cell whitespace-nowrap">
                    {tab === 'email' && row.recipients > 0
                      ? `${((row.clicks / row.recipients) * 100).toFixed(1)}%`
                      : '—'}
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-slate-400 text-[11px] sm:text-xs hidden md:table-cell whitespace-nowrap">{row.sent_at}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View" style={{ color: primaryColor }}>
                        <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                      </button>
                      <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title={row.status === 'draft' ? 'Send' : 'Resend'}>
                        <Send size={11} className="sm:w-[13px] sm:h-[13px]" />
                      </button>
                      <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hidden sm:inline-flex" title="Edit">
                        <Edit2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                      </button>
                      <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: '#EF4444' }}>
                        <Trash2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose modal - Responsive */}
      {compose && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setCompose(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">New {tab.toUpperCase()} Campaign</h3>
              <button onClick={() => setCompose(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Campaign Name</label>
                <input className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="e.g. GOTV Final Push" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Audience</label>
                <select className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none">
                  <option>All Voters</option>
                  <option>Supporters Only</option>
                  <option>Undecided Voters</option>
                  <option>Custom Segment</option>
                </select>
              </div>
              {tab === 'email' && (
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Subject Line</label>
                  <input className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="Email subject" />
                </div>
              )}
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Message</label>
                <textarea
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400 resize-none"
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button onClick={() => setCompose(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                  Schedule
                </button>
                <button
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}