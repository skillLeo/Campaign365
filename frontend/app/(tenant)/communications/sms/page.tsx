'use client';
import { useState } from 'react';
import { MessageSquare, Plus, Send, Clock, CheckCircle2, Users, BarChart3, Search, ChevronRight, Smartphone } from 'lucide-react';

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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>SMS Campaigns</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Communications › SMS</p>
        </div>
        <button onClick={() => setTab('compose')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={15} /> New SMS Blast
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Sent', value: totalSent.toLocaleString(), icon: Send, color: PRIMARY },
          { label: 'Delivery Rate', value: `${deliveryRate}%`, icon: CheckCircle2, color: '#16A34A' },
          { label: 'Campaigns', value: SMS_CAMPAIGNS.length.toString(), icon: BarChart3, color: '#2563EB' },
          { label: 'Opt-outs', value: '124', icon: Users, color: '#94A3B8' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
              <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={15} style={{ color: card.color }} />
              </div>
              <p style={{ fontSize: 22, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A' }}>{card.value}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {[['campaigns', 'All Campaigns'], ['compose', 'Send New SMS']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Campaign', 'Message Preview', 'Recipients', 'Delivered', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
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
                    <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#64748B', maxWidth: 220 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#475569' }}>{c.recipients > 0 ? c.recipients.toLocaleString() : '—'}</td>
                    <td style={{ padding: '13px 16px' }}>
                      {c.delivered > 0 ? (
                        <div className="flex items-center gap-2">
                          <div style={{ width: 50, height: 5, backgroundColor: '#F1F5F9', borderRadius: 99 }}>
                            <div style={{ height: '100%', width: `${delivRate}%`, backgroundColor: '#16A34A', borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{delivRate}%</span>
                        </div>
                      ) : <span style={{ fontSize: 12, color: '#CBD5E1' }}>—</span>}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: sc.color, backgroundColor: sc.bg, padding: '3px 9px', borderRadius: 6 }}>{sc.label}</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#94A3B8' }}>{c.date}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <button onClick={() => setTab('compose')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#2563EB', background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                        Duplicate <ChevronRight size={10} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'compose' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Compose SMS</h3>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Campaign Name</label>
                <input value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g. GOTV Reminder — Nov 14"
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                  placeholder="Type your SMS message. Use {{first_name}} to personalize. Reply STOP to opt out."
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                <div className="flex justify-between mt-1.5">
                  <span style={{ fontSize: 11, color: charsLeft < 20 ? '#E30613' : '#94A3B8' }}>{charsLeft} characters remaining</span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{smsCount} SMS message{smsCount > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Send To</label>
                <select value={segment} onChange={e => setSegment(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}>
                  <option value="all">All Contacts (12,840)</option>
                  <option value="supporters">Supporters Only (7,420)</option>
                  <option value="undecided">Undecided Voters (3,210)</option>
                  <option value="constituency">Central Basseterre (2,100)</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Schedule
                </button>
                <button onClick={() => setSent(true)}
                  style={{ flex: 2, backgroundColor: sent ? '#16A34A' : PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  {sent ? <><CheckCircle2 size={14} /> Sent!</> : <><Send size={14} /> Send SMS Now</>}
                </button>
              </div>
            </div>
          </div>

          {/* Phone preview */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Phone Preview</h3>
            <div style={{ maxWidth: 200, margin: '0 auto', backgroundColor: '#0F172A', borderRadius: 36, padding: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ backgroundColor: '#1E293B', borderRadius: 28, padding: '16px 12px', minHeight: 320 }}>
                <p style={{ fontSize: 9, color: '#64748B', textAlign: 'center', marginBottom: 12 }}>SKNLP Campaign</p>
                <div style={{ backgroundColor: '#334155', borderRadius: '12px 12px 12px 4px', padding: '10px 12px', maxWidth: '85%' }}>
                  <p style={{ fontSize: 11, color: 'white', lineHeight: 1.5, margin: 0 }}>
                    {message || 'Your SMS preview will appear here...'}
                  </p>
                </div>
                <p style={{ fontSize: 8, color: '#64748B', marginTop: 6 }}>now · {message.length} chars</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
