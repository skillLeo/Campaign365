'use client';
import { useState } from 'react';
import { MessageCircle, Plus, Send, CheckCircle2, Users, BarChart3 } from 'lucide-react';

const PRIMARY = '#E30613';
const WA_GREEN = '#25D366';

const BLASTS = [
  { id: 1, name: 'Election Day GOTV', message: "🗳️ Today is Election Day! Polls open 7AM–6PM. Let's make history together! #SKNLP", status: 'sent', recipients: 4820, read: 4210, date: '2025-11-14' },
  { id: 2, name: 'Town Hall Announcement', message: "📢 Join us TONIGHT at Independence Square, 6PM for our Grand Town Hall. Bring a friend!", status: 'sent', recipients: 3100, read: 2790, date: '2025-10-15' },
  { id: 3, name: 'Policy Newsletter', message: "📋 Read our full healthcare policy plan. Link in bio. Questions? Reply to this message.", status: 'scheduled', recipients: 5200, read: 0, date: '2025-11-20' },
];

const CHAT_MESSAGES = [
  { from: 'them', text: 'Will there be transportation to the polls?', time: '9:14 AM' },
  { from: 'bot', text: 'Yes! We have runners available. Reply with your address and we\'ll arrange a pickup. 🚗', time: '9:14 AM' },
  { from: 'them', text: 'Great! 14 Cayon Street Basseterre', time: '9:16 AM' },
  { from: 'bot', text: 'Perfect! A runner will pick you up at 10AM. You\'ll receive a confirmation shortly. ✅', time: '9:16 AM' },
];

export default function WhatsAppPage() {
  const [tab, setTab] = useState<'blasts' | 'compose' | 'inbox'>('blasts');
  const [message, setMessage] = useState('');
  const [segment, setSegment] = useState('all');
  const [reply, setReply] = useState('');

  const readRate = (r: number, total: number) => total > 0 ? Math.round((r / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>WhatsApp Campaigns</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Communications › WhatsApp</p>
        </div>
        <div className="flex items-center gap-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '6px 12px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: WA_GREEN }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#16A34A' }}>WhatsApp Connected</span>
          </div>
          <button onClick={() => setTab('compose')}
            style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: WA_GREEN, color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={15} /> New Blast
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Total Sent', value: BLASTS.filter(b => b.status === 'sent').reduce((s, b) => s + b.recipients, 0).toLocaleString(), color: WA_GREEN },
          { label: 'Avg Read Rate', value: '87%', color: '#2563EB' },
          { label: 'Active Contacts', value: '8,240', color: '#7C3AED' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <p style={{ fontSize: 24, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {[['blasts', 'Blasts'], ['compose', 'Compose'], ['inbox', 'Inbox (Auto-Reply)']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? WA_GREEN : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'blasts' && (
        <div className="space-y-3">
          {BLASTS.map(b => (
            <div key={b.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-5">
              <div style={{ width: 44, height: 44, backgroundColor: WA_GREEN + '15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={20} style={{ color: WA_GREEN }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{b.name}</p>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.message}</p>
              </div>
              <div className="flex items-center gap-6">
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{b.recipients.toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>sent</p>
                </div>
                {b.read > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: WA_GREEN }}>{readRate(b.read, b.recipients)}%</p>
                    <p style={{ fontSize: 11, color: '#94A3B8' }}>read</p>
                  </div>
                )}
                <span style={{ fontSize: 11, fontWeight: 600, color: b.status === 'sent' ? '#16A34A' : '#D97706', backgroundColor: b.status === 'sent' ? '#F0FDF4' : '#FFFBEB', padding: '4px 10px', borderRadius: 6 }}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{b.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'compose' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Compose WhatsApp Blast</h3>
            <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: 8, padding: '10px 14px' }}>
              <p style={{ fontSize: 12, color: '#92400E', margin: 0 }}>⚠️ WhatsApp Business Policy: Messages must not be promotional without user opt-in. Include an opt-out option.</p>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Message</label>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '8px 12px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                  {['😊', '📷', '📎', '🔗'].map(icon => (
                    <button key={icon} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', fontSize: 13 }}>{icon}</button>
                  ))}
                </div>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6}
                  placeholder="Write your WhatsApp message. Emojis are supported! 🎉&#10;&#10;Reply STOP to unsubscribe."
                  style={{ width: '100%', border: 'none', padding: '12px 14px', fontSize: 13, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Send To</label>
              <select value={segment} onChange={e => setSegment(e.target.value)}
                style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}>
                <option value="all">All WhatsApp Contacts (8,240)</option>
                <option value="supporters">Supporters (4,820)</option>
                <option value="undecided">Undecided (2,100)</option>
                <option value="donors">Donors (890)</option>
              </select>
            </div>
            <button style={{ width: '100%', backgroundColor: WA_GREEN, color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <Send size={14} /> Send WhatsApp Blast
            </button>
          </div>
          {/* WA preview */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Preview</h3>
            <div style={{ backgroundColor: '#ECE5DD', borderRadius: 16, padding: '12px', minHeight: 280 }}>
              <p style={{ fontSize: 9, color: '#64748B', textAlign: 'center', marginBottom: 12 }}>SKNLP Campaign</p>
              {message && (
                <div style={{ backgroundColor: 'white', borderRadius: '8px 8px 8px 2px', padding: '10px 12px', maxWidth: '85%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  <p style={{ fontSize: 12, color: '#0F172A', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, gap: 3, alignItems: 'center' }}>
                    <span style={{ fontSize: 9, color: '#94A3B8' }}>now</span>
                    <span style={{ fontSize: 10, color: WA_GREEN }}>✓✓</span>
                  </div>
                </div>
              )}
              {!message && <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 40 }}>Preview appears here</p>}
            </div>
          </div>
        </div>
      )}

      {tab === 'inbox' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Auto-Reply Bot Preview</h3>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>How voters experience your WhatsApp bot</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#ECE5DD', minHeight: 300 }}>
              {CHAT_MESSAGES.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'them' ? 'flex-start' : 'flex-end', marginBottom: 8 }}>
                  <div style={{ backgroundColor: msg.from === 'them' ? 'white' : '#DCF8C6', borderRadius: msg.from === 'them' ? '8px 8px 8px 2px' : '8px 8px 2px 8px', padding: '8px 12px', maxWidth: '75%', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    <p style={{ fontSize: 12, color: '#0F172A', margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                    <p style={{ fontSize: 9, color: '#94A3B8', margin: '4px 0 0', textAlign: 'right' }}>{msg.time} {msg.from === 'bot' && '✓✓'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Bot Settings</h3>
            {[
              { keyword: 'RIDE', response: 'Reply with your address and we\'ll arrange a pickup.' },
              { keyword: 'POLL', response: 'Your polling station is {polling_station}. Hours: 7AM-6PM.' },
              { keyword: 'STOP', response: 'You have been removed from our list. Thank you.' },
              { keyword: 'JOIN', response: 'Welcome! You\'ll receive updates from SKNLP. Reply STOP anytime.' },
            ].map(rule => (
              <div key={rule.keyword} style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: 11, fontWeight: 700, color: WA_GREEN, backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: 4 }}>Keyword: {rule.keyword}</span>
                </div>
                <p style={{ fontSize: 12, color: '#475569', margin: 0, lineHeight: 1.5 }}>{rule.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
