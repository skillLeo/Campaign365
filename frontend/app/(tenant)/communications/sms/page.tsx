'use client';
import { useState } from 'react';
import { MessageSquare, Plus, Send, Clock, CheckCircle2, Users, BarChart3, Search, ChevronRight, Smartphone, X } from 'lucide-react';

const PRIMARY = '#E30613';

const SMS_CAMPAIGNS = [
  { id: 1, name: 'GOTV Reminder — Election Day', message: "Don't forget to vote today! Polls are open until 6PM. Your vote matters. — SKNLP", status: 'sent', recipients: 9200, delivered: 8740, failed: 460, date: '2025-11-14' },
  { id: 2, name: 'Town Hall Reminder', message: "Reminder: Town Hall tonight at 6PM at Independence Square. Come hear our plan! — SKNLP", status: 'sent', recipients: 4100, delivered: 3922, failed: 178, date: '2025-10-15' },
  { id: 3, name: 'Undecided Voter Outreach', message: "Hi {{first_name}}, we'd love your support on Nov 14. Reply STOP to opt out.", status: 'scheduled', recipients: 3200, delivered: 0, failed: 0, date: '2025-11-10' },
  { id: 4, name: 'Volunteer Thank You', message: "Thank you for volunteering with SKNLP! Your help makes a difference.", status: 'draft', recipients: 0, delivered: 0, failed: 0, date: '—' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  sent:      { label: 'Sent',      color: '#16A34A', bg: '#F0FDF4' },
  scheduled: { label: 'Scheduled', color: '#D97706', bg: '#FFFBEB' },
  draft:     { label: 'Draft',     color: '#94A3B8', bg: '#F8FAFC' },
};

const MAX_SMS = 160;

export default function SMSCampaignsPage() {
  const [tab, setTab] = useState<'campaigns' | 'compose'>('campaigns');
  const [message, setMessage] = useState('');
  const [segment, setSegment] = useState('all');
  const [campaignName, setCampaignName] = useState('');
  const [sent, setSent] = useState(false);

  const charsLeft = MAX_SMS - message.length;
  const smsCount = Math.ceil(message.length / MAX_SMS) || 1;

  const totalSent = SMS_CAMPAIGNS.filter(c => c.status === 'sent').reduce((s, c) => s + c.recipients, 0);
  const totalDelivered = SMS_CAMPAIGNS.filter(c => c.status === 'sent').reduce((s, c) => s + c.delivered, 0);
  const deliveryRate = totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0;

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 5vw, 24px)', color: '#0F172A', letterSpacing: '-0.02em' }}>SMS Campaigns</h1>
          <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B', marginTop: 3 }}>Communications › SMS</p>
        </div>
        <button onClick={() => setTab('compose')}
          className="flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: PRIMARY, color: 'white', border: 'none', padding: '8px 16px', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={13} className="sm:w-[15px] sm:h-[15px]" /> New SMS Blast
        </button>
      </div>

      {/* Stats - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Sent', value: totalSent.toLocaleString(), icon: Send, color: PRIMARY },
          { label: 'Delivery Rate', value: `${deliveryRate}%`, icon: CheckCircle2, color: '#16A34A' },
          { label: 'Campaigns', value: SMS_CAMPAIGNS.length.toString(), icon: BarChart3, color: '#2563EB' },
          { label: 'Opt-outs', value: '124', icon: Users, color: '#94A3B8' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div style={{ width: 'clamp(30px, 7vw, 34px)', height: 'clamp(30px, 7vw, 34px)', borderRadius: 9, backgroundColor: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Icon size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: card.color }} />
              </div>
              <p style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A' }}>{card.value}</p>
              <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#94A3B8', marginTop: 2 }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {[['campaigns', 'All Campaigns'], ['compose', 'Send New SMS']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className="whitespace-nowrap transition-all"
            style={{ padding: 'clamp(5px, 1.5vw, 7px) clamp(12px, 3vw, 18px)', borderRadius: 8, border: 'none', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Campaign', 'Message Preview', 'Recipients', 'Delivered', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SMS_CAMPAIGNS.map(c => {
                  const sc = STATUS_CONFIG[c.status];
                  const delivRate = c.recipients > 0 ? Math.round((c.delivered / c.recipients) * 100) : 0;
                  return (
                    <tr key={c.id} style={{ borderTop: '1px solid #F8FAFC' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>{c.name}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#64748B', maxWidth: 200 }}>
                        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{c.message}</span>
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#475569', whiteSpace: 'nowrap' }}>{c.recipients > 0 ? c.recipients.toLocaleString() : '—'}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        {c.delivered > 0 ? (
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 4, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${delivRate}%`, backgroundColor: '#16A34A', borderRadius: 99 }} />
                            </div>
                            <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#0F172A' }}>{delivRate}%</span>
                          </div>
                        ) : <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#CBD5E1' }}>—</span>}
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: sc.color, backgroundColor: sc.bg, padding: '2px 8px', borderRadius: 6 }}>{sc.label}</span>
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8', whiteSpace: 'nowrap' }}>{c.date}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        <button onClick={() => setTab('compose')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#2563EB', background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                          Duplicate <ChevronRight size={10} />
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

      {tab === 'compose' && (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 space-y-3 sm:space-y-4">
              <h3 style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A' }}>Compose SMS</h3>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Campaign Name</label>
                <input value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g. GOTV Reminder — Nov 14"
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-red-400" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
                  placeholder="Type your SMS message. Use {{first_name}} to personalize. Reply STOP to opt out."
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none resize-none font-inherit focus:border-red-400" />
                <div className="flex flex-wrap justify-between gap-2 mt-1.5">
                  <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: charsLeft < 20 ? '#E30613' : '#94A3B8' }}>{charsLeft} characters remaining</span>
                  <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8' }}>{smsCount} SMS message{smsCount > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Send To</label>
                <select value={segment} onChange={e => setSegment(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-700 outline-none bg-white">
                  <option value="all">All Contacts (12,840)</option>
                  <option value="supporters">Supporters Only (7,420)</option>
                  <option value="undecided">Undecided Voters (3,210)</option>
                  <option value="constituency">Central Basseterre (2,100)</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 11px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>
                  Schedule
                </button>
                <button onClick={() => setSent(true)}
                  style={{ flex: 2, backgroundColor: sent ? '#16A34A' : PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 11px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {sent ? <><CheckCircle2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Sent!</> : <><Send size={13} className="sm:w-[14px] sm:h-[14px]" /> Send SMS Now</>}
                </button>
              </div>
            </div>
          </div>

          {/* Phone preview - Responsive */}
          <div className="lg:w-80 xl:w-96">
            <h3 style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Phone Preview</h3>
            <div style={{ maxWidth: 'clamp(180px, 50vw, 200px)', margin: '0 auto', backgroundColor: '#0F172A', borderRadius: 36, padding: 'clamp(10px, 2.5vw, 12px)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ backgroundColor: '#1E293B', borderRadius: 28, padding: 'clamp(12px, 3vw, 16px) clamp(10px, 2.5vw, 12px)', minHeight: 'clamp(280px, 60vw, 320px)' }}>
                <p style={{ fontSize: 'clamp(8px, 2vw, 9px)', color: '#64748B', textAlign: 'center', marginBottom: 12 }}>SKNLP Campaign</p>
                <div style={{ backgroundColor: '#334155', borderRadius: '12px 12px 12px 4px', padding: 'clamp(8px, 2vw, 10px) clamp(10px, 2.5vw, 12px)', maxWidth: '85%' }}>
                  <p style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: 'white', lineHeight: 1.5, margin: 0 }}>
                    {message || 'Your SMS preview will appear here...'}
                  </p>
                </div>
                <p style={{ fontSize: 'clamp(7px, 2vw, 8px)', color: '#64748B', marginTop: 6 }}>now · {message.length} chars</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}