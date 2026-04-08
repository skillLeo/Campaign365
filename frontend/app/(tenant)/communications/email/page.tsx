'use client';
import { useState } from 'react';
import { Mail, Plus, Send, Clock, CheckCircle2, Eye, BarChart3, Users, ChevronRight, Search, Filter, Trash2, Copy } from 'lucide-react';

const PRIMARY = '#E30613';

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

  // Compose state
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Email Campaigns</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Communications › Email</p>
        </div>
        <button onClick={() => { setTab('compose'); setComposeStep(1); }}
          style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={15} /> New Email Campaign
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Sent', value: totalSent.toLocaleString(), icon: Send, color: PRIMARY },
          { label: 'Avg Open Rate', value: `${avgOpen}%`, icon: Eye, color: '#2563EB' },
          { label: 'Avg Click Rate', value: `${avgClick}%`, icon: BarChart3, color: '#7C3AED' },
          { label: 'Subscribers', value: '12,840', icon: Users, color: '#16A34A' },
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
        {[['campaigns', 'Campaigns'], ['compose', 'Compose'], ['templates', 'Templates']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..."
                style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 10px 8px 28px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#475569', outline: 'none', backgroundColor: 'white' }}>
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Campaign', 'Subject', 'Recipients', 'Open Rate', 'Click Rate', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
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
                    <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#64748B', maxWidth: 200 }}><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.subject}</span></td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#475569' }}>{c.recipients > 0 ? c.recipients.toLocaleString() : '—'}</td>
                    <td style={{ padding: '13px 16px' }}>
                      {c.openRate > 0 ? (
                        <div className="flex items-center gap-2">
                          <div style={{ width: 50, height: 5, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${c.openRate}%`, backgroundColor: '#2563EB', borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{c.openRate}%</span>
                        </div>
                      ) : <span style={{ fontSize: 12, color: '#CBD5E1' }}>—</span>}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      {c.clickRate > 0 ? (
                        <div className="flex items-center gap-2">
                          <div style={{ width: 50, height: 5, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${c.clickRate}%`, backgroundColor: '#7C3AED', borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{c.clickRate}%</span>
                        </div>
                      ) : <span style={{ fontSize: 12, color: '#CBD5E1' }}>—</span>}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: sc.color, backgroundColor: sc.bg, padding: '3px 9px', borderRadius: 6 }}>
                        <Icon size={10} />{sc.label}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#94A3B8' }}>{c.date}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div className="flex gap-1">
                        <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Eye size={12} style={{ color: '#64748B' }} />
                        </button>
                        <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Copy size={12} style={{ color: '#64748B' }} />
                        </button>
                      </div>
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
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-2">
              {[['1', 'Setup'], ['2', 'Content'], ['3', 'Audience'], ['4', 'Review']].map(([num, label], i) => (
                <div key={num} className="flex items-center gap-2">
                  <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: composeStep > i ? '#16A34A' : composeStep === i + 1 ? PRIMARY : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: composeStep >= i + 1 ? 'white' : '#94A3B8' }}>
                    {composeStep > i ? '✓' : num}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: composeStep === i + 1 ? '#0F172A' : '#94A3B8' }}>{label}</span>
                  {i < 3 && <div style={{ width: 24, height: 1, backgroundColor: '#E2E8F0' }} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                {['Campaign Setup', 'Email Content', 'Choose Audience', 'Review & Send'][composeStep - 1]}
              </h3>

              {composeStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Campaign Name</label>
                    <input placeholder="e.g. GOTV Final Push — Nov 14" style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>From Name</label>
                    <input value={fromName} onChange={e => setFromName(e.target.value)} style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Subject Line</label>
                    <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Write a compelling subject..." style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                </div>
              )}

              {composeStep === 2 && (
                <div className="space-y-4">
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 12px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                      {['Bold', 'Italic', 'Link', 'Image', 'Button'].map(t => (
                        <button key={t} style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid #E2E8F0', background: 'white', fontSize: 11, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>{t}</button>
                      ))}
                    </div>
                    <textarea value={body} onChange={e => setBody(e.target.value)}
                      placeholder="Write your email content here. Use {{first_name}} to personalize..."
                      rows={10} style={{ width: '100%', border: 'none', padding: '14px', fontSize: 13, color: '#0F172A', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              {composeStep === 3 && (
                <div className="space-y-4">
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Send To</label>
                  {[
                    { key: 'all', label: 'All Subscribers', count: '12,840' },
                    { key: 'supporters', label: 'Supporters Only', count: '7,420' },
                    { key: 'undecided', label: 'Undecided Voters', count: '3,210' },
                    { key: 'constituency', label: 'Central Basseterre Only', count: '2,100' },
                    { key: 'donors', label: 'Donors', count: '890' },
                  ].map(s => (
                    <label key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `2px solid ${segment === s.key ? PRIMARY : '#E2E8F0'}`, borderRadius: 10, cursor: 'pointer', backgroundColor: segment === s.key ? '#FEF2F2' : 'white' }}>
                      <input type="radio" name="segment" value={s.key} checked={segment === s.key} onChange={() => setSegment(s.key)} style={{ accentColor: PRIMARY }} />
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{s.label}</span>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>{s.count} recipients</span>
                    </label>
                  ))}
                </div>
              )}

              {composeStep === 4 && (
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '16px', border: '1px solid #E2E8F0' }}>
                    <div className="space-y-3">
                      {[['From', fromName + ' <campaign@sknlp.org>'], ['Subject', subject || '(no subject)'], ['Audience', segment], ['Est. Recipients', '12,840']].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{k}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Schedule for Later
                    </button>
                    <button style={{ flex: 1, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                      <Send size={14} /> Send Now
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button onClick={() => setComposeStep(s => Math.max(1, s - 1))} disabled={composeStep === 1}
                  style={{ padding: '9px 18px', borderRadius: 9, border: '1px solid #E2E8F0', background: 'white', fontSize: 13, fontWeight: 600, cursor: composeStep === 1 ? 'not-allowed' : 'pointer', color: '#475569', opacity: composeStep === 1 ? 0.4 : 1 }}>
                  Back
                </button>
                {composeStep < 4 && (
                  <button onClick={() => setComposeStep(s => Math.min(4, s + 1))}
                    style={{ padding: '9px 18px', borderRadius: 9, border: 'none', backgroundColor: PRIMARY, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Next <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Live Preview</h3>
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <div style={{ backgroundColor: PRIMARY, padding: '16px 20px' }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 13, margin: 0 }}>{fromName || 'SKNLP Campaign Team'}</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 2, marginBottom: 0 }}>{subject || 'Your subject line will appear here'}</p>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {body || 'Your email content will preview here as you type...'}
                </p>
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 16, paddingTop: 12 }}>
                  <p style={{ fontSize: 10, color: '#94A3B8', textAlign: 'center' }}>SKNLP · info@sknlp.org · Unsubscribe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map(t => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div style={{ backgroundColor: PRIMARY + '12', borderRadius: 10, padding: '12px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} style={{ color: PRIMARY }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{t.name}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>{t.category}</p>
              <button onClick={() => { setTab('compose'); setComposeStep(1); }}
                style={{ width: '100%', marginTop: 12, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '8px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
