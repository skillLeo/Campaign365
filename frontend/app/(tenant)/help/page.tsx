'use client';
import { useState } from 'react';
import { Phone, Play, HelpCircle, MessageCircle, ChevronDown, ChevronRight, Search, ExternalLink, Mail, Clock, X } from 'lucide-react';

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

const SKNLP_RED = 'var(--tenant-primary)';

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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Help &amp; Support Center</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Dashboard › Help &amp; Support</p>
        </div>
        <div className="relative w-full sm:w-60">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
            placeholder="Search help topics..."
          />
        </div>
      </div>

      {/* Support Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
              <card.icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: card.color }} />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2">{card.title}</p>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed flex-1 mb-3">{card.desc}</p>
            <button
              onClick={'onClick' in card ? (card as any).onClick : undefined}
              className="w-full rounded-lg text-white font-semibold transition-all hover:opacity-90 py-2 text-[11px] sm:text-xs"
              style={{ backgroundColor: card.actionBg }}
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* Call Support CTA - Responsive */}
      <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--tenant-primary), var(--tenant-primary-dark))' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <Phone size={18} className="sm:w-[20px] sm:h-[20px]" style={{ color: 'white' }} />
          </div>
          <div>
            <p className="text-white font-bold text-sm sm:text-base">Call Support Hotline</p>
            <p className="text-white/75 text-[11px] sm:text-xs mt-0.5">Available Monday–Friday 8 AM–8 PM · Election Day: 24 hours</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <p className="text-white font-bold text-base sm:text-lg">+1-869-XXX-XXXX</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }} />
              <span className="text-[10px] sm:text-xs text-white/60">Average response: &lt;5 min</span>
            </div>
          </div>
          <button className="bg-white rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all hover:bg-slate-100" style={{ color: SKNLP_RED }}>
            Call Now
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
        {/* FAQ Accordion */}
        <div className="flex-1">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
            {filteredFAQs.map((faq, i) => (
              <div key={i} className="border-b border-slate-50 last:border-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left px-4 py-3 sm:py-3.5 bg-transparent border-none cursor-pointer flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[11px] sm:text-xs font-medium text-slate-800 leading-relaxed pr-2">{faq.q}</span>
                  {openFAQ === i ? <ChevronDown size={13} className="flex-shrink-0" style={{ color: SKNLP_RED }} /> : <ChevronRight size={13} className="flex-shrink-0" style={{ color: '#94A3B8' }} />}
                </button>
                {openFAQ === i && (
                  <div className="px-4 pb-3 pt-0 bg-slate-50">
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Training Videos */}
        <div className="flex-1">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-3">Training Videos</h2>
          <div className="space-y-2.5">
            {TRAINING_VIDEOS.slice(0, 6).map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: '#F8FAFC' }}>
                  {v.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate">{v.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-[10px] sm:text-xs text-slate-400">{v.duration}</span>
                    <span className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded whitespace-nowrap">{v.category}</span>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 sm:p-2 flex-shrink-0 transition-all hover:opacity-90" style={{ background: SKNLP_RED, border: 'none', cursor: 'pointer', color: 'white' }}>
                  <Play size={12} className="sm:w-[13px] sm:h-[13px]" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all hover:bg-slate-200 flex items-center justify-center gap-1" style={{ background: '#F1F5F9', color: '#475569', border: 'none', cursor: 'pointer' }}>
            View All {TRAINING_VIDEOS.length} Training Videos <ExternalLink size={12} className="sm:w-[13px] sm:h-[13px]" />
          </button>
        </div>
      </div>

      {/* Live Chat Modal - Responsive */}
      {chatOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setChatOpen(false)} />
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
            <div className="flex items-center justify-between p-3 sm:p-4" style={{ backgroundColor: SKNLP_RED }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <MessageCircle size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: 'white' }} />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm">Live Chat — Campaign 365</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-white/80 text-[10px] sm:text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors text-lg leading-none">×</button>
            </div>
            <div className="h-64 overflow-y-auto p-3 flex flex-col gap-2" style={{ backgroundColor: '#F8FAFC' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl text-[11px] sm:text-xs leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-800 bg-white border border-slate-100'}`} style={msg.role === 'user' ? { backgroundColor: SKNLP_RED } : {}}>
                    {msg.msg}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 flex gap-2">
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Type your message..."
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm outline-none focus:border-red-400"
              />
              <button onClick={sendChat} className="rounded-lg px-4 py-1.5 text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: SKNLP_RED }}>
                Send
              </button>
            </div>
          </div>
        </>
      )}

      {/* Floating chat button when closed - Responsive */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-105"
          style={{ backgroundColor: SKNLP_RED, border: 'none', cursor: 'pointer' }}
        >
          <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" style={{ color: 'white' }} />
        </button>
      )}
    </div>
  );
}