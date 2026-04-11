'use client';
import { useState } from 'react';
import { Mail, Plus, Send, Clock, CheckCircle2, Eye, BarChart3, Users, ChevronRight, Search, Filter, Trash2, Copy, X } from 'lucide-react';

const PRIMARY = 'var(--tenant-primary)';

const CAMPAIGNS = [
  { id: 1, name: 'GOTV Final Push — Nov 14', subject: 'Your vote matters this Thursday', status: 'sent', recipients: 8420, opens: 4210, clicks: 1893, date: '2025-11-12', openRate: 50, clickRate: 22 },
  { id: 2, name: 'Healthcare Policy Update', subject: "Here's our plan for better healthcare", status: 'sent', recipients: 6100, opens: 2744, clicks: 980, date: '2025-10-28', openRate: 45, clickRate: 16 },
  { id: 3, name: 'Town Hall Invitation — Basseterre', subject: "You're invited: Grand Town Hall Oct 15", status: 'sent', recipients: 3200, opens: 1920, clicks: 1104, date: '2025-10-10', openRate: 60, clickRate: 35 },
  { id: 4, name: 'Youth Employment Newsletter', subject: 'Our promise to young workers', status: 'scheduled', recipients: 5400, opens: 0, clicks: 0, date: '2025-11-20', openRate: 0, clickRate: 0 },
  { id: 5, name: 'Volunteer Recruitment', subject: 'Join our campaign team today', status: 'draft', recipients: 0, opens: 0, clicks: 0, date: '2025-11-18', openRate: 0, clickRate: 0 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  sent:      { label: 'Sent',      color: '#16A34A', bg: '#F0FDF4', icon: CheckCircle2 },
  scheduled: { label: 'Scheduled', color: '#D97706', bg: '#FFFBEB', icon: Clock },
  draft:     { label: 'Draft',     color: '#94A3B8', bg: '#F8FAFC', icon: Mail },
  sending:   { label: 'Sending',   color: '#2563EB', bg: '#EFF6FF', icon: Send },
};

const TEMPLATES = [
  { name: 'GOTV Final Push', category: 'GOTV' },
  { name: 'Policy Announcement', category: 'Policy' },
  { name: 'Event Invitation', category: 'Events' },
  { name: 'Thank You — Donors', category: 'Fundraising' },
  { name: 'Volunteer Recruitment', category: 'Team' },
  { name: 'Survey Invitation', category: 'Polling' },
];

export default function EmailCampaignsPage() {
  const [tab, setTab] = useState<'campaigns' | 'compose' | 'templates'>('campaigns');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [subject, setSubject] = useState('');
  const [fromName, setFromName] = useState('SKNLP Campaign Team');
  const [body, setBody] = useState('');
  const [segment, setSegment] = useState('all');
  const [composeStep, setComposeStep] = useState(1);

  const totalSent = CAMPAIGNS.filter(c => c.status === 'sent').reduce((s, c) => s + c.recipients, 0);
  const avgOpen = Math.round(CAMPAIGNS.filter(c => c.status === 'sent').reduce((s, c) => s + c.openRate, 0) / CAMPAIGNS.filter(c => c.status === 'sent').length);
  const avgClick = Math.round(CAMPAIGNS.filter(c => c.status === 'sent').reduce((s, c) => s + c.clickRate, 0) / CAMPAIGNS.filter(c => c.status === 'sent').length);

  const filtered = CAMPAIGNS.filter(c => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 5vw, 24px)', color: '#0F172A', letterSpacing: '-0.02em' }}>Email Campaigns</h1>
          <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B', marginTop: 3 }}>Communications › Email</p>
        </div>
        <button onClick={() => { setTab('compose'); setComposeStep(1); }}
          className="flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: PRIMARY, color: 'white', border: 'none', padding: '8px 16px', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={13} className="sm:w-[15px] sm:h-[15px]" /> New Email Campaign
        </button>
      </div>

      {/* KPI Cards - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Sent', value: totalSent.toLocaleString(), icon: Send, color: PRIMARY },
          { label: 'Avg Open Rate', value: `${avgOpen}%`, icon: Eye, color: '#2563EB' },
          { label: 'Avg Click Rate', value: `${avgClick}%`, icon: BarChart3, color: '#7C3AED' },
          { label: 'Subscribers', value: '12,840', icon: Users, color: '#16A34A' },
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
        {[['campaigns', 'Campaigns'], ['compose', 'Compose'], ['templates', 'Templates']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className="whitespace-nowrap transition-all"
            style={{ padding: 'clamp(5px, 1.5vw, 7px) clamp(12px, 3vw, 18px)', borderRadius: 8, border: 'none', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <div className="relative flex-1">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..."
                className="w-full border border-slate-200 rounded-lg sm:rounded-xl pl-8 pr-2.5 py-1.5 text-xs sm:text-sm outline-none" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-600 outline-none bg-white w-full sm:w-auto">
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '900px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Campaign', 'Subject', 'Recipients', 'Open Rate', 'Click Rate', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const sc = STATUS_CONFIG[c.status];
                  const Icon = sc.icon;
                  return (
                    <tr key={c.id} style={{ borderTop: '1px solid #F8FAFC' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>{c.name}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#64748B', maxWidth: 200, whiteSpace: 'nowrap' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', maxWidth: '180px' }}>{c.subject}</span>
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#475569', whiteSpace: 'nowrap' }}>{c.recipients > 0 ? c.recipients.toLocaleString() : '—'}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        {c.openRate > 0 ? (
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 4, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${c.openRate}%`, backgroundColor: '#2563EB', borderRadius: 99 }} />
                            </div>
                            <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#0F172A' }}>{c.openRate}%</span>
                          </div>
                        ) : <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#CBD5E1' }}>—</span>}
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        {c.clickRate > 0 ? (
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 4, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${c.clickRate}%`, backgroundColor: '#7C3AED', borderRadius: 99 }} />
                            </div>
                            <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#0F172A' }}>{c.clickRate}%</span>
                          </div>
                        ) : <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#CBD5E1' }}>—</span>}
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: sc.color, backgroundColor: sc.bg, padding: '2px 8px', borderRadius: 6 }}>
                          <Icon size={9} className="sm:w-[10px] sm:h-[10px]" />{sc.label}
                        </span>
                      </td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8', whiteSpace: 'nowrap' }}>{c.date}</td>
                      <td style={{ padding: 'clamp(10px, 2.5vw, 13px) clamp(12px, 2.5vw, 16px)', whiteSpace: 'nowrap' }}>
                        <div className="flex gap-1">
                          <button className="flex items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition-colors" style={{ width: 'clamp(28px, 7vw, 32px)', height: 'clamp(28px, 7vw, 32px)' }}>
                            <Eye size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
                          </button>
                          <button className="flex items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition-colors" style={{ width: 'clamp(28px, 7vw, 32px)', height: 'clamp(28px, 7vw, 32px)' }}>
                            <Copy size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
                          </button>
                        </div>
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
            {/* Step indicator - Responsive */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              {[['1', 'Setup'], ['2', 'Content'], ['3', 'Audience'], ['4', 'Review']].map(([num, label], i) => (
                <div key={num} className="flex items-center gap-1 sm:gap-2">
                  <div style={{ width: 'clamp(22px, 5vw, 26px)', height: 'clamp(22px, 5vw, 26px)', borderRadius: '50%', backgroundColor: composeStep > i ? '#16A34A' : composeStep === i + 1 ? PRIMARY : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(10px, 2.5vw, 11px)', fontWeight: 700, color: composeStep >= i + 1 ? 'white' : '#94A3B8' }}>
                    {composeStep > i ? '✓' : num}
                  </div>
                  <span style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, color: composeStep === i + 1 ? '#0F172A' : '#94A3B8' }} className="hidden xs:inline">{label}</span>
                  {i < 3 && <div style={{ width: 'clamp(15px, 3vw, 24px)', height: 1, backgroundColor: '#E2E8F0' }} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 space-y-3 sm:space-y-4">
              <h3 style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                {['Campaign Setup', 'Email Content', 'Choose Audience', 'Review & Send'][composeStep - 1]}
              </h3>

              {composeStep === 1 && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Campaign Name</label>
                    <input placeholder="e.g. GOTV Final Push — Nov 14" className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-red-400" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>From Name</label>
                    <input value={fromName} onChange={e => setFromName(e.target.value)} className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-red-400" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Subject Line</label>
                    <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Write a compelling subject..." className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-red-400" />
                  </div>
                </div>
              )}

              {composeStep === 2 && (
                <div className="space-y-3 sm:space-y-4">
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '6px 10px', borderBottom: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {['Bold', 'Italic', 'Link', 'Image', 'Button'].map(t => (
                        <button key={t} style={{ padding: '3px 8px', borderRadius: 5, border: '1px solid #E2E8F0', background: 'white', fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>{t}</button>
                      ))}
                    </div>
                    <textarea value={body} onChange={e => setBody(e.target.value)}
                      placeholder="Write your email content here. Use {{first_name}} to personalize..."
                      rows={8} className="w-full border-none p-3 text-xs sm:text-sm outline-none resize-vertical font-inherit" />
                  </div>
                </div>
              )}

              {composeStep === 3 && (
                <div className="space-y-3 sm:space-y-4">
                  <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Send To</label>
                  {[
                    { key: 'all', label: 'All Subscribers', count: '12,840' },
                    { key: 'supporters', label: 'Supporters Only', count: '7,420' },
                    { key: 'undecided', label: 'Undecided Voters', count: '3,210' },
                    { key: 'constituency', label: 'Central Basseterre Only', count: '2,100' },
                    { key: 'donors', label: 'Donors', count: '890' },
                  ].map(s => (
                    <label key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)', border: `2px solid ${segment === s.key ? PRIMARY : '#E2E8F0'}`, borderRadius: 10, cursor: 'pointer', backgroundColor: segment === s.key ? '#FEF2F2' : 'white' }}>
                      <input type="radio" name="segment" value={s.key} checked={segment === s.key} onChange={() => setSegment(s.key)} style={{ accentColor: PRIMARY }} />
                      <span style={{ flex: 1, fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A' }}>{s.label}</span>
                      <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8' }}>{s.count} recipients</span>
                    </label>
                  ))}
                </div>
              )}

              {composeStep === 4 && (
                <div className="space-y-3 sm:space-y-4">
                  <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: 'clamp(12px, 3vw, 16px)', border: '1px solid #E2E8F0' }}>
                    <div className="space-y-2 sm:space-y-3">
                      {[['From', fromName + ' <campaign@sknlp.org>'], ['Subject', subject || '(no subject)'], ['Audience', segment], ['Est. Recipients', '12,840']].map(([k, v]) => (
                        <div key={k} className="flex flex-wrap justify-between gap-2">
                          <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8', fontWeight: 500 }}>{k}</span>
                          <span style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 12px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>
                      Schedule for Later
                    </button>
                    <button style={{ flex: 1, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 12px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Send size={13} className="sm:w-[14px] sm:h-[14px]" /> Send Now
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button onClick={() => setComposeStep(s => Math.max(1, s - 1))} disabled={composeStep === 1}
                  style={{ padding: 'clamp(7px, 2vw, 9px) clamp(14px, 3vw, 18px)', borderRadius: 9, border: '1px solid #E2E8F0', background: 'white', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: composeStep === 1 ? 'not-allowed' : 'pointer', color: '#475569', opacity: composeStep === 1 ? 0.4 : 1 }}>
                  Back
                </button>
                {composeStep < 4 && (
                  <button onClick={() => setComposeStep(s => Math.min(4, s + 1))}
                    style={{ padding: 'clamp(7px, 2vw, 9px) clamp(14px, 3vw, 18px)', borderRadius: 9, border: 'none', backgroundColor: PRIMARY, color: 'white', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                    Next <ChevronRight size={13} className="sm:w-[14px] sm:h-[14px]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: preview - Responsive */}
          <div className="lg:w-80 xl:w-96">
            <h3 style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Live Preview</h3>
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <div style={{ backgroundColor: PRIMARY, padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)' }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 'clamp(12px, 2.5vw, 13px)', margin: 0 }}>{fromName || 'SKNLP Campaign Team'}</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(10px, 2.5vw, 11px)', marginTop: 2, marginBottom: 0 }} className="truncate">{subject || 'Your subject line will appear here'}</p>
              </div>
              <div style={{ padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)' }}>
                <p style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {body || 'Your email content will preview here as you type...'}
                </p>
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 16, paddingTop: 12 }}>
                  <p style={{ fontSize: 'clamp(9px, 2vw, 10px)', color: '#94A3B8', textAlign: 'center' }}>SKNLP · info@sknlp.org · Unsubscribe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TEMPLATES.map(t => (
            <div key={t.name} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div style={{ backgroundColor: PRIMARY + '12', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 12px)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={20} className="sm:w-[24px] sm:h-[24px]" style={{ color: PRIMARY }} />
              </div>
              <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, color: '#0F172A' }} className="truncate">{t.name}</p>
              <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8', marginTop: 3 }}>{t.category}</p>
              <button onClick={() => { setTab('compose'); setComposeStep(1); }}
                style={{ width: '100%', marginTop: 12, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: 'clamp(7px, 2vw, 8px)', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, cursor: 'pointer' }}
                className="hover:bg-slate-200 transition-colors">
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}