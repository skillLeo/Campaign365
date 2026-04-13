'use client';
import { Bot, MessageSquare, ShieldCheck, BookOpenText, PhoneCall, Users } from 'lucide-react';

const INTENTS = [
  { label: 'Registration help', share: 32, color: '#2563EB' },
  { label: 'Polling location', share: 28, color: '#16A34A' },
  { label: 'Manifesto questions', share: 23, color: 'var(--tenant-primary)' },
  { label: 'Volunteer sign-up', share: 17, color: '#7C3AED' },
];

const SOURCES = [
  'Campaign FAQ and manifesto library',
  'Polling place and constituency lookup',
  'Volunteer onboarding guides',
  'Escalation script for live support handoff',
];

export default function AiChatbotPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">AI Chatbot</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Configure a voter-facing assistant for FAQ responses, registration help, and human handoff.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          Deploy chatbot
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Sessions This Week', value: '4,280', icon: MessageSquare, bg: '#EFF6FF', color: '#2563EB' },
          { label: 'Containment Rate', value: '71%', icon: Bot, bg: '#FEF2F2', color: 'var(--tenant-primary)' },
          { label: 'Escalated to Human', value: '182', icon: PhoneCall, bg: '#FFF7ED', color: '#C2410C' },
          { label: 'Verified Answers', value: '96%', icon: ShieldCheck, bg: '#ECFDF5', color: '#15803D' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.bg }}>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.95fr] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} style={{ color: 'var(--tenant-primary)' }} />
            <h2 className="text-sm font-semibold text-slate-800">Top Voter Intents</h2>
          </div>
          <div className="space-y-4">
            {INTENTS.map(intent => (
              <div key={intent.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-600">{intent.label}</span>
                  <span className="font-semibold text-slate-800">{intent.share}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${intent.share}%`, backgroundColor: intent.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenText size={16} style={{ color: 'var(--tenant-primary)' }} />
            <h2 className="text-sm font-semibold text-slate-800">Knowledge Sources</h2>
          </div>
          <div className="space-y-3">
            {SOURCES.map(source => (
              <div key={source} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                <p className="text-sm text-slate-600">{source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Experience Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            ['Public web widget', 'Add the chatbot to the campaign website and landing pages.'],
            ['WhatsApp handoff', 'Escalate unanswered questions to live agents with context.'],
            ['Election-safe mode', 'Limit answers to verified policy, registration, and turnout guidance.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-800">{title}</p>
              <p className="text-xs text-slate-500 mt-2">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
