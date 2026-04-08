'use client';
import { useState } from 'react';
import { Mail, Bell, MessageSquare, Smartphone, Save, Send, ChevronRight, Bold, Italic, Link, List, AlignLeft, Eye } from 'lucide-react';
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
  const { user } = useAuthStore();
  const [selected, setSelected] = useState('welcome');
  const [channel, setChannel] = useState<Channel>('email');
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(MOCK_CONTENT['welcome'].subject);
  const [body, setBody] = useState(MOCK_CONTENT['welcome'].body);

  const selectTemplate = (id: string) => {
    setSelected(id);
    const c = MOCK_CONTENT[id];
    if (c) { setSubject(c.subject); setBody(c.body); }
    else { setSubject(''); setBody(''); }
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleSend = () => { setSent(true); setTimeout(() => setSent(false), 2000); };

  const CHANNELS: { id: Channel; label: string; icon: React.ReactNode }[] = [
    { id: 'email', label: 'Email', icon: <Mail size={13} /> },
    { id: 'push', label: 'Push Notifications', icon: <Bell size={13} /> },
    { id: 'sms', label: 'SMS', icon: <MessageSquare size={13} /> },
    { id: 'inapp', label: 'In-App', icon: <Smartphone size={13} /> },
  ];

  const templatesByCategory = TEMPLATES.reduce<Record<string, typeof TEMPLATES>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Dashboard › Templates</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>Email &amp; Notification Templates</h2>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 12, color: '#94A3B8', background: '#F1F5F9', padding: '4px 12px', borderRadius: 20 }}>Enterprise template management studio</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#2563EB' }}>
            {user?.name?.charAt(0) || 'S'}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left sidebar: template list */}
        <div className="w-64 bg-white border-r border-slate-100 overflow-y-auto flex-shrink-0">
          <div className="px-4 pt-4 pb-2">
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Templates</p>
          </div>
          {Object.entries(templatesByCategory).map(([cat, tmps]) => (
            <div key={cat} className="mb-2">
              <p style={{ fontSize: 10, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 16px 4px' }}>{cat}</p>
              {tmps.map(t => (
                <button
                  key={t.id}
                  onClick={() => selectTemplate(t.id)}
                  style={{
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 16px', border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    backgroundColor: selected === t.id ? '#EFF6FF' : 'transparent',
                    borderLeft: selected === t.id ? '3px solid #2563EB' : '3px solid transparent',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{t.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: selected === t.id ? 600 : 400, color: selected === t.id ? '#1D4ED8' : '#475569' }}>{t.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Middle: editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel tabs */}
          <div className="flex items-center gap-1 px-5 pt-4 pb-0 bg-white border-b border-slate-100">
            {CHANNELS.map(c => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: 'none', cursor: 'pointer',
                  borderBottom: channel === c.id ? '2px solid #2563EB' : '2px solid transparent',
                  backgroundColor: 'transparent', color: channel === c.id ? '#1D4ED8' : '#94A3B8',
                  fontSize: 13, fontWeight: channel === c.id ? 600 : 400, marginBottom: -1,
                }}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            <div className="mb-4">
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Subject Line</label>
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                placeholder="Subject line..."
                onFocus={e => (e.target.style.borderColor = '#2563EB')}
                onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderBottom: 'none', borderRadius: '8px 8px 0 0' }}>
              {[Bold, Italic, Link, List, AlignLeft].map((Icon, i) => (
                <button key={i} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: 5, padding: '5px 7px', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center' }}>
                  <Icon size={13} />
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Variables: {'{{user.name}}, {{client.name}}, {{client.support_email}}'}</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={14}
                style={{
                  width: '100%', border: '1px solid #E2E8F0', borderTop: 'none', borderRadius: '0 0 8px 8px',
                  padding: '14px', fontSize: 13, color: '#0F172A', outline: 'none',
                  fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7,
                }}
                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.borderTopColor = 'transparent'; }}
                onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.borderTopColor = 'transparent'; }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Save size={14} />
                {saved ? 'Saved!' : 'Save Template'}
              </button>
              <button
                onClick={handleSend}
                style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Send size={14} />
                {sent ? 'Test Sent!' : 'Send Test'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="hidden lg:flex w-80 bg-white border-l border-slate-100 flex-col flex-shrink-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Eye size={14} style={{ color: '#2563EB' }} />
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Live Preview</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Email mockup */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', fontSize: 12 }}>
              {/* Email header */}
              <div style={{ backgroundColor: '#2563EB', padding: '20px 20px 16px', textAlign: 'center' }}>
                <p style={{ color: 'white', fontWeight: 800, fontSize: 16, margin: 0 }}>Campaign 365</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>
                  {TEMPLATES.find(t => t.id === selected)?.label}
                </p>
              </div>
              {/* Body */}
              <div style={{ padding: '16px 20px', backgroundColor: 'white' }}>
                <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 10, fontSize: 13 }}>{subject.replace('{{client.name}}', 'SKNLP').replace('{{invoice.id}}', '2024-001').replace('{{campaign.name}}', 'Gen. Election 2025').replace('{{billing.period}}', 'December 2024')}</p>
                <div style={{ color: '#475569', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {body.split('\n').slice(0, 8).map((line, i) => {
                    if (line.includes('<button>')) {
                      const btnText = line.replace('<button>', '').replace('</button>', '');
                      return <div key={i} style={{ margin: '10px 0' }}><button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>{btnText}</button></div>;
                    }
                    return <p key={i} style={{ margin: '3px 0', fontSize: 11 }}>{line.replace('{{user.name}}', 'John Smith').replace('{{client.name}}', 'SKNLP').replace('{{user.email}}', 'j.smith@sknlp.org').replace('{{user.temp_password}}', '••••••••')}</p>;
                  })}
                </div>
              </div>
              {/* Footer */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '12px 20px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Powered by Campaign 365 · Unsubscribe</p>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: '#EFF6FF', borderRadius: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#1D4ED8', marginBottom: 3 }}>Variables available:</p>
              {['{{user.name}}', '{{user.email}}', '{{client.name}}', '{{client.support_email}}', '{{invoice.amount}}'].map(v => (
                <span key={v} style={{ display: 'inline-block', background: 'white', border: '1px solid #BFDBFE', borderRadius: 4, padding: '1px 6px', fontSize: 10, color: '#1D4ED8', margin: '2px' }}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
