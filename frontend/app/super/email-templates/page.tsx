'use client';
import { useState } from 'react';
import { Mail, Bell, MessageSquare, Smartphone, Save, Send, Bold, Italic, Link, List, AlignLeft, Eye, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const TEMPLATES = [
  { id: 'welcome', label: 'Welcome Email', icon: '👋', category: 'Onboarding' },
  { id: 'invoice', label: 'Invoice Reminder', icon: '💳', category: 'Billing' },
  { id: 'campaign_launch', label: 'Campaign Launch', icon: '🚀', category: 'Campaign' },
  { id: 'abandoned', label: 'Abandoned Cart', icon: '🛒', category: 'Billing' },
  { id: 'password_reset', label: 'Password Reset', icon: '🔐', category: 'Auth' },
  { id: 'account_verify', label: 'Account Verification', icon: '✅', category: 'Auth' },
  { id: 'newsletter', label: 'Newsletter', icon: '📰', category: 'Marketing' },
  { id: 'feedback', label: 'Feedback Request', icon: '💬', category: 'Engagement' },
  { id: 'custom', label: 'Custom Template', icon: '⚙️', category: 'Custom' },
];

const MOCK_CONTENT: Record<string, { subject: string; body: string }> = {
  welcome: {
    subject: 'Welcome to {{client.name}}!',
    body: `Hi {{user.name}},\n\nWelcome to {{client.name}} Campaign 365 — your complete political campaign management platform.\n\nYour account is ready. Click below to access your dashboard and start managing your campaign.\n\n<button>Access Your Dashboard →</button>\n\nYour login credentials:\nEmail: {{user.email}}\nTemporary Password: {{user.temp_password}}\n\nIf you have any questions, contact party support at {{client.support_email}}.\n\nBest regards,\nThe Campaign 365 Team`,
  },
  invoice: {
    subject: 'Invoice #{{invoice.id}} — {{client.name}} Campaign 365',
    body: `Dear {{billing.contact}},\n\nYour invoice for {{billing.period}} is ready.\n\nAmount: {{invoice.amount}}\nDue Date: {{invoice.due_date}}\nStatus: {{invoice.status}}\n\n<button>View Invoice →</button>\n\nThank you for your continued subscription.\n\nCampaign 365 Billing Team`,
  },
  campaign_launch: {
    subject: '🚀 {{campaign.name}} is now live!',
    body: `Your campaign has been activated.\n\nCampaign: {{campaign.name}}\nStart Date: {{campaign.start_date}}\nEnd Date: {{campaign.end_date}}\nTarget Voters: {{campaign.voter_count}}\n\nYour field team has been notified.\n\n<button>View Campaign Dashboard →</button>`,
  },
  password_reset: {
    subject: 'Reset your {{client.name}} password',
    body: `Hi {{user.name}},\n\nWe received a request to reset your password.\n\nClick the link below to set a new password. This link expires in 24 hours.\n\n<button>Reset Password →</button>\n\nIf you didn't request this, ignore this email.\n\nCampaign 365 Security Team`,
  },
};

type Channel = 'email' | 'push' | 'sms' | 'inapp';

export default function EmailTemplatesPage() {
  const [selected, setSelected] = useState('welcome');
  const [channel, setChannel] = useState<Channel>('email');
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(MOCK_CONTENT['welcome'].subject);
  const [body, setBody] = useState(MOCK_CONTENT['welcome'].body);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectTemplate = (id: string) => {
    setSelected(id);
    const c = MOCK_CONTENT[id as keyof typeof MOCK_CONTENT];
    if (c) { setSubject(c.subject); setBody(c.body); }
    else { setSubject(''); setBody(''); }
    setSidebarOpen(false);
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleSend = () => { setSent(true); setTimeout(() => setSent(false), 2000); };

  const CHANNELS: { id: Channel; label: string; icon: React.ReactNode }[] = [
    { id: 'email', label: 'Email', icon: <Mail size={14} /> },
    { id: 'push', label: 'Push', icon: <Bell size={14} /> },
    { id: 'sms', label: 'SMS', icon: <MessageSquare size={14} /> },
    { id: 'inapp', label: 'In-App', icon: <Smartphone size={14} /> },
  ];

  const templatesByCategory = TEMPLATES.reduce<Record<string, typeof TEMPLATES>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar - Clean, no profile icon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white border-b border-slate-100">
        <div>
          <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
            Dashboard › Templates
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 4vw, 20px)', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Email &amp; Notification Templates
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden" style={{ height: 'auto', minHeight: 'calc(100vh - 73px)' }}>
        
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden px-3 pt-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium w-full justify-between"
          >
            <span>Select Template</span>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Left sidebar: template list */}
        <div className={`
          ${sidebarOpen ? 'fixed inset-0 z-50 bg-white w-64' : 'hidden lg:block lg:w-64'}
          lg:relative lg:inset-auto lg:z-auto lg:bg-transparent
          bg-white border-r border-slate-100 overflow-y-auto flex-shrink-0
        `}>
          {sidebarOpen && (
            <div className="flex items-center justify-between p-4 border-b border-slate-100 lg:hidden">
              <p className="font-semibold text-slate-800">Templates</p>
              <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
          )}
          <div className="px-3 pt-4 pb-2">
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Templates</p>
          </div>
          {Object.entries(templatesByCategory).map(([cat, tmps]) => (
            <div key={cat} className="mb-2">
              <p style={{ fontSize: 9, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 12px 2px' }}>{cat}</p>
              {tmps.map(t => (
                <button
                  key={t.id}
                  onClick={() => selectTemplate(t.id)}
                  style={{
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    backgroundColor: selected === t.id ? '#EFF6FF' : 'transparent',
                    borderLeft: selected === t.id ? '3px solid #2563EB' : '3px solid transparent',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{t.icon}</span>
                  <span style={{ fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: selected === t.id ? 600 : 400, color: selected === t.id ? '#1D4ED8' : '#475569' }}>{t.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Middle: editor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Channel tabs - Better spacing */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 pb-0 bg-white border-b border-slate-100">
            {CHANNELS.map(c => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all"
                style={{
                  borderBottom: channel === c.id ? '2px solid #2563EB' : '2px solid transparent',
                  backgroundColor: channel === c.id ? '#EFF6FF' : 'transparent',
                  color: channel === c.id ? '#1D4ED8' : '#64748B',
                  fontSize: 'clamp(12px, 2vw, 13px)',
                  fontWeight: channel === c.id ? 600 : 500,
                  marginBottom: -1,
                }}
              >
                {c.icon}
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 p-3 sm:p-4 md:p-5 overflow-y-auto">
            <div className="mb-4">
              <label style={{ fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Subject Line</label>
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                style={{ fontSize: 'clamp(13px, 2.5vw, 14px)' }}
                placeholder="Subject line..."
              />
            </div>

            {/* Toolbar - Better spacing */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-t-lg">
              {[
                { Icon: Bold, label: 'Bold' },
                { Icon: Italic, label: 'Italic' },
                { Icon: Link, label: 'Link' },
                { Icon: List, label: 'List' },
                { Icon: AlignLeft, label: 'Align' },
              ].map(({ Icon, label }, i) => (
                <button
                  key={i}
                  className="p-1.5 rounded-md hover:bg-white transition-colors"
                  style={{ border: '1px solid #E2E8F0', background: 'white', color: '#475569' }}
                  title={label}
                >
                  <Icon size={13} />
                </button>
              ))}
              <div className="flex-1" />
              <span className="hidden lg:inline text-[10px] text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                Variables: {'{{user.name}}, {{client.name}}'}
              </span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={12}
                className="w-full border border-slate-200 border-t-0 rounded-b-lg p-3 text-sm focus:outline-none focus:border-blue-400 font-mono"
                style={{ fontSize: 'clamp(12px, 2vw, 13px)', lineHeight: 1.6, resize: 'vertical' }}
              />
            </div>

            {/* Actions - Better button styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-lg text-white transition-all hover:opacity-90 px-4 py-2"
                style={{ backgroundColor: '#2563EB', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600 }}
              >
                <Save size={15} />
                {saved ? 'Saved!' : 'Save Template'}
              </button>
              <button
                onClick={handleSend}
                className="flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-slate-200 px-4 py-2"
                style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600 }}
              >
                <Send size={15} />
                {sent ? 'Test Sent!' : 'Send Test'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview - Only on large screens */}
        <div className="hidden xl:flex w-80 bg-white border-l border-slate-100 flex-col flex-shrink-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <Eye size={14} style={{ color: '#2563EB' }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Live Preview</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {/* Email mockup */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-blue-600 p-4 text-center">
                <p className="text-white font-bold text-sm">Campaign 365</p>
                <p className="text-white/70 text-[10px] mt-1">
                  {TEMPLATES.find(t => t.id === selected)?.label}
                </p>
              </div>
              <div className="p-3 bg-white">
                <p className="font-semibold text-slate-800 text-xs mb-2">
                  {subject
                    .replace('{{client.name}}', 'SKNLP')
                    .replace('{{invoice.id}}', '2024-001')
                    .replace('{{campaign.name}}', 'Gen. Election 2025')
                    .replace('{{billing.period}}', 'December 2024')}
                </p>
                <div className="text-slate-500 text-[11px] leading-relaxed whitespace-pre-line">
                  {body.split('\n').slice(0, 6).map((line, i) => {
                    if (line.includes('<button>')) {
                      const btnText = line.replace('<button>', '').replace('</button>', '');
                      return (
                        <div key={i} className="my-2">
                          <button className="bg-blue-600 text-white border-none rounded-md px-3 py-1.5 text-[11px] cursor-pointer">
                            {btnText}
                          </button>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="my-1">
                        {line
                          .replace('{{user.name}}', 'John Smith')
                          .replace('{{client.name}}', 'SKNLP')
                          .replace('{{user.email}}', 'j.smith@sknlp.org')
                          .replace('{{user.temp_password}}', '••••••••')}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 text-center">
                <p className="text-[9px] text-slate-400">Powered by Campaign 365 · Unsubscribe</p>
              </div>
            </div>
            
            {/* Variables info */}
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-[10px] font-semibold text-blue-700 mb-2">Available Variables:</p>
              <div className="flex flex-wrap gap-1">
                {['{{user.name}}', '{{user.email}}', '{{client.name}}', '{{client.support_email}}', '{{invoice.amount}}'].map(v => (
                  <span key={v} className="inline-block bg-white border border-blue-200 rounded px-1.5 py-0.5 text-[9px] text-blue-600 font-mono">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}