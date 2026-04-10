'use client';
import { useState } from 'react';
import { Phone, Play, HelpCircle, MessageCircle, ChevronDown, ChevronRight, Search, ExternalLink, Mail, Clock } from 'lucide-react';

const FAQS = [
  { q: 'How do I reset my password?', a: 'SKNLP Dashboard password has been reset by the Canvass App. We\'ve sent your new login credentials to your registered email. If you don\'t receive them, please contact IT support at support@sknlp.org.' },
  { q: 'What are the office hours?', a: 'SKNLP headquarters is open Monday–Friday, 8:00 AM – 5:00 PM Eastern Caribbean Time (ECT). Emergency campaign support is available 24/7 during election periods.' },
  { q: 'How do I sync offline data from the mobile app?', a: 'When your phone regains internet connection, the Canvass App automatically syncs all offline door knocks, voice notes, and GPS data in the background. You\'ll see a sync confirmation notification when complete.' },
  { q: 'How do I add a new team member?', a: 'Go to Team Management → Add New Member. Fill in their name, role, email, and phone number. They\'ll receive an invitation email with login credentials and a link to download the appropriate mobile app.' },
  { q: 'What happens if a canvasser\'s GPS shows wrong location?', a: 'GPS accuracy can be affected by indoor areas or poor signal. The system uses a 5-minute average position. If GPS tracking is consistently inaccurate, ask the canvasser to enable High Accuracy mode in their phone settings.' },
  { q: 'How do I generate a compliance report?', a: 'Navigate to Compliance → Generate Compliance Report. Select the date range and report type (financial disclosure, voter data, or full campaign activity). The report is generated as a PDF ready for submission to the Electoral Commission.' },
  { q: 'Can I export the voter database?', a: 'Yes. Go to Voters → Export. You can export filtered segments or the full database as CSV or PDF. Note: exports are logged in the audit trail per GDPR and SK&N election law requirements.' },
  { q: 'How does the panic button work?', a: 'When a field worker presses the panic button, an alert is immediately sent to all campaign managers via push notification, SMS (even without internet), and the live dashboard. The alert shows their GPS location and stays active until dismissed by a manager.' },
];

const TRAINING_VIDEOS = [
  { title: 'Getting Started with Campaign 365', duration: '8:24', category: 'Onboarding', thumb: '🎬' },
  { title: 'Canvassing with the Mobile App', duration: '12:15', category: 'Field Ops', thumb: '🏠' },
  { title: 'Setting Up Turf & Walk Lists', duration: '9:47', category: 'Canvassing', thumb: '🗺️' },
  { title: 'GOTV Election Day Command Center', duration: '15:32', category: 'Election Day', thumb: '🗳️' },
  { title: 'Runner Management & Tracking', duration: '7:18', category: 'Runners', thumb: '🚗' },
  { title: 'Sending Bulk SMS to Voters', duration: '6:03', category: 'Communications', thumb: '📱' },
  { title: 'AI Insights & Talking Points', duration: '11:44', category: 'AI Features', thumb: '🤖' },
  { title: 'Compliance Reports for Electoral Commission', duration: '8:56', category: 'Compliance', thumb: '📋' },
];

const SKNLP_RED = '#E30613';

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; msg: string }[]>([
    { role: 'bot', msg: 'Hi! I\'m the Campaign 365 support assistant. How can I help you today?' }
  ]);

  const filteredFAQs = FAQS.filter(f =>
    search === '' || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg;
    setChatMsg('');
    setChatHistory(h => [...h, { role: 'user', msg: userMsg }]);
    setTimeout(() => {
      setChatHistory(h => [...h, { role: 'bot', msg: 'Thanks for your message! Our support team will get back to you shortly. For urgent campaign day issues, please call the SKNLP IT support hotline directly.' }]);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Help &amp; Support Center</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Dashboard › Help &amp; Support</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none w-full sm:w-60"
            placeholder="Search help topics..."
          />
        </div>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: 'Contact SKNLP IT Support',
            desc: 'We\'re here to help you get the most out of Campaign 365. Contact us for all technical support needs.',
            icon: Phone,
            color: SKNLP_RED,
            bg: '#FEF2F2',
            action: 'Call Support Hotline',
            actionBg: SKNLP_RED,
          },
          {
            title: 'Party Training Videos',
            desc: 'Step-by-step video tutorials for every feature. Perfect for onboarding new team members.',
            icon: Play,
            color: '#1D4ED8',
            bg: '#EFF6FF',
            action: 'Watch Tutorials',
            actionBg: '#1D4ED8',
          },
          {
            title: 'FAQs — Election Day',
            desc: 'Quick answers to the most common questions about runner tracking, GOTV, and field operations.',
            icon: HelpCircle,
            color: '#D97706',
            bg: '#FFFBEB',
            action: 'View FAQs',
            actionBg: '#D97706',
          },
          {
            title: 'Live Chat with Campaign 365',
            desc: 'If you need help, just message us and we\'ll respond within minutes during campaign hours.',
            icon: MessageCircle,
            color: '#7C3AED',
            bg: '#F5F3FF',
            action: 'Start Live Chat',
            actionBg: '#7C3AED',
            onClick: () => setChatOpen(true),
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: card.bg }}>
              <card.icon size={20} style={{ color: card.color }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>{card.title}</p>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, flex: 1, marginBottom: 12 }}>{card.desc}</p>
            <button
              onClick={'onClick' in card ? (card as any).onClick : undefined}
              style={{ width: '100%', backgroundColor: card.actionBg, color: 'white', border: 'none', borderRadius: 8, padding: '9px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* Call Support CTA */}
      <div style={{ background: 'linear-gradient(135deg, #E30613, #991B1B)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center gap-4">
          <div style={{ width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={20} style={{ color: 'white' }} />
          </div>
          <div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>Call Support Hotline</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>Available Monday–Friday 8 AM–8 PM · Election Day: 24 hours</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>+1-869-XXX-XXXX</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <Clock size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Average response: &lt;5 min</span>
            </div>
          </div>
          <button style={{ backgroundColor: 'white', color: SKNLP_RED, border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Call Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* FAQ Accordion */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {filteredFAQs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < filteredFAQs.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', lineHeight: 1.5 }}>{faq.q}</span>
                  {openFAQ === i ? <ChevronDown size={14} style={{ color: SKNLP_RED, flexShrink: 0 }} /> : <ChevronRight size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />}
                </button>
                {openFAQ === i && (
                  <div style={{ padding: '0 20px 14px', backgroundColor: '#FAFAFA' }}>
                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Training Videos */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Training Videos</h2>
          <div className="space-y-3">
            {TRAINING_VIDEOS.slice(0, 6).map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow">
                <div style={{ width: 40, height: 40, backgroundColor: '#F8FAFC', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {v.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{v.duration}</span>
                    <span style={{ fontSize: 10, backgroundColor: '#F1F5F9', color: '#475569', padding: '1px 6px', borderRadius: 4, fontWeight: 500 }}>{v.category}</span>
                  </div>
                </div>
                <button style={{ background: SKNLP_RED, border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <Play size={13} />
                </button>
              </div>
            ))}
          </div>
          <button style={{ marginTop: 12, width: '100%', background: '#F1F5F9', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            View All {TRAINING_VIDEOS.length} Training Videos <ExternalLink size={13} />
          </button>
        </div>
      </div>

      {/* Live Chat Modal */}
      {chatOpen && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, width: 340, backgroundColor: 'white', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid #E2E8F0', zIndex: 1000, overflow: 'hidden' }}>
          <div style={{ backgroundColor: SKNLP_RED, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="flex items-center gap-3">
              <div style={{ width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={15} style={{ color: 'white' }} />
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>Live Chat — Campaign 365</p>
                <div className="flex items-center gap-1.5"><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ADE80' }} /><span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Online</span></div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ height: 220, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', backgroundColor: msg.role === 'user' ? SKNLP_RED : '#F1F5F9', color: msg.role === 'user' ? 'white' : '#0F172A', borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding: '8px 12px', fontSize: 12, lineHeight: 1.5 }}>
                  {msg.msg}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 12px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 8 }}>
            <input
              value={chatMsg}
              onChange={e => setChatMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChat()}
              placeholder="Type your message..."
              style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 10px', fontSize: 12, outline: 'none', color: '#0F172A' }}
            />
            <button onClick={sendChat} style={{ backgroundColor: SKNLP_RED, color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating chat button when closed */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          style={{ position: 'fixed', bottom: 24, right: 24, width: 52, height: 52, borderRadius: '50%', backgroundColor: SKNLP_RED, border: 'none', boxShadow: '0 8px 24px rgba(220,38,38,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
        >
          <MessageCircle size={22} style={{ color: 'white' }} />
        </button>
      )}
    </div>
  );
}
