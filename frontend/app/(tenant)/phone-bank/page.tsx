'use client';
import { useState } from 'react';
import {
  Phone, PhoneOff, PhoneMissed, Clock, CheckCircle2,
  ChevronRight, BarChart3, Users, Calendar, Mic, MicOff,
  SkipForward, MessageSquare, RefreshCw, Flag
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PRIMARY = '#E30613';

const OUTCOMES = [
  { key: 'answered_support', label: 'Answered — Supporter', color: '#16A34A', icon: CheckCircle2 },
  { key: 'answered_undecided', label: 'Answered — Undecided', color: '#F59E0B', icon: Phone },
  { key: 'answered_oppose', label: 'Answered — Opposition', color: '#E30613', icon: PhoneOff },
  { key: 'not_home', label: 'Not Home / No Answer', color: '#94A3B8', icon: PhoneMissed },
  { key: 'callback', label: 'Requested Callback', color: '#2563EB', icon: RefreshCw },
  { key: 'wrong_number', label: 'Wrong Number', color: '#CBD5E1', icon: Flag },
];

const CALL_LIST = [
  { id: 1, name: 'Patricia Williams', phone: '+1 869 555 0101', age: 52, address: '14 Cayon Street', constituency: 'Central Basseterre', lastContact: 'Never', priority: 'high', script: 'Hi Patricia, my name is [your name] and I\'m calling on behalf of the St. Kitts and Nevis Labour Party. We\'re reaching out to voters in Central Basseterre ahead of the upcoming election.' },
  { id: 2, name: 'Carlton Browne', phone: '+1 869 555 0108', age: 45, address: '58 Victoria Road', constituency: 'Central Basseterre', lastContact: 'Never', priority: 'medium', script: 'Hi Carlton, my name is [your name] and I\'m calling on behalf of the SKNLP to talk about our plans for Central Basseterre.' },
  { id: 3, name: 'Stacy Roberts', phone: '+1 869 555 0107', age: 33, address: '88 Wellington Road', constituency: 'Central Basseterre', lastContact: '2 weeks ago', priority: 'high', script: 'Hi Stacy, I\'m following up from our previous conversation. I wanted to share more about our youth employment initiative.' },
  { id: 4, name: 'Michael Clarke', phone: '+1 869 555 0104', age: 41, address: '22 Church Street', constituency: 'Central Basseterre', lastContact: 'Never', priority: 'low', script: 'Hi Michael, I\'m calling on behalf of the SKNLP. Do you have a few minutes to discuss the upcoming election?' },
  { id: 5, name: 'Frederick Samuel', phone: '+1 869 555 0122', age: 58, address: '12 Hanley Road', constituency: 'St. Paul\'s', lastContact: 'Never', priority: 'medium', script: 'Hi Frederick, my name is [your name] calling from the SKNLP campaign. We\'d love your thoughts on the upcoming election.' },
];

const DAILY_STATS = [
  { hour: '9am', calls: 8 },
  { hour: '10am', calls: 14 },
  { hour: '11am', calls: 19 },
  { hour: '12pm', calls: 11 },
  { hour: '1pm', calls: 6 },
  { hour: '2pm', calls: 17 },
  { hour: '3pm', calls: 22 },
  { hour: '4pm', calls: 15 },
];

export default function PhoneBankPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [notes, setNotes] = useState('');
  const [callTimer, setCallTimer] = useState(0);
  const [completedCalls, setCompletedCalls] = useState<any[]>([]);
  const [logSubmitted, setLogSubmitted] = useState(false);

  const current = CALL_LIST[currentIndex];

  const todayStats = {
    total: 47,
    supporters: 18,
    undecided: 12,
    notHome: 13,
    callbacks: 4,
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setSelectedOutcome('');
    setNotes('');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  const handleLogAndNext = () => {
    if (!selectedOutcome) return;
    setCompletedCalls(prev => [...prev, { ...current, outcome: selectedOutcome, notes }]);
    setLogSubmitted(true);
    setTimeout(() => {
      setLogSubmitted(false);
      setSelectedOutcome('');
      setNotes('');
      setCurrentIndex(i => Math.min(i + 1, CALL_LIST.length - 1));
    }, 800);
  };

  const handleSkip = () => {
    setCurrentIndex(i => Math.min(i + 1, CALL_LIST.length - 1));
    setSelectedOutcome('');
    setNotes('');
    setIsCallActive(false);
  };

  const priorityColor = (p: string) => p === 'high' ? '#E30613' : p === 'medium' ? '#F59E0B' : '#94A3B8';

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 5vw, 24px)', color: '#0F172A', letterSpacing: '-0.02em' }}>Phone Bank</h1>
          <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B', marginTop: 3 }}>Dashboard › Phone Bank</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '6px 12px' }} className="w-fit">
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A' }} />
          <span style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, color: '#16A34A' }}>Session Active</span>
        </div>
      </div>

      {/* Today's stats - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Calls Today', value: todayStats.total, color: '#0F172A' },
          { label: 'Supporters', value: todayStats.supporters, color: '#16A34A' },
          { label: 'Undecided', value: todayStats.undecided, color: '#F59E0B' },
          { label: 'Not Home', value: todayStats.notHome, color: '#94A3B8' },
          { label: 'Callbacks', value: todayStats.callbacks, color: '#2563EB' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <p style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#94A3B8', marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Left: Call list - Responsive */}
        <div className="lg:w-2/5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-4 py-3 border-b border-slate-100">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A' }}>Call Queue ({CALL_LIST.length} remaining)</h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
            {CALL_LIST.map((voter, i) => (
              <button
                key={voter.id}
                onClick={() => { setCurrentIndex(i); setIsCallActive(false); setSelectedOutcome(''); setNotes(''); }}
                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left transition-colors"
                style={{ backgroundColor: i === currentIndex ? '#FEF2F2' : 'transparent', borderLeft: i === currentIndex ? `3px solid ${PRIMARY}` : '3px solid transparent' }}
                onMouseEnter={e => { if (i !== currentIndex) e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                onMouseLeave={e => { if (i !== currentIndex) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ width: 'clamp(32px, 8vw, 36px)', height: 'clamp(32px, 8vw, 36px)', borderRadius: '50%', backgroundColor: i === currentIndex ? PRIMARY + '20' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(12px, 3vw, 13px)', fontWeight: 700, color: i === currentIndex ? PRIMARY : '#64748B', flexShrink: 0 }}>
                  {voter.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A' }} className="truncate">{voter.name}</p>
                  <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8' }} className="truncate">{voter.constituency}</p>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: priorityColor(voter.priority), flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active call panel - Responsive */}
        <div className="lg:flex-1 space-y-3 sm:space-y-4">
          {/* Voter card + dial */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div style={{ width: 'clamp(44px, 10vw, 52px)', height: 'clamp(44px, 10vw, 52px)', borderRadius: '50%', backgroundColor: PRIMARY + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 800, color: PRIMARY }}>
                  {current.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 style={{ fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: '#0F172A' }} className="truncate">{current.name}</h3>
                  <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B' }}>{current.phone}</p>
                  <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#94A3B8', marginTop: 2 }} className="truncate">{current.address} · {current.constituency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: priorityColor(current.priority), backgroundColor: priorityColor(current.priority) + '15', padding: '3px 9px', borderRadius: 6 }} className="whitespace-nowrap">
                  {current.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>

            {/* Call controls - Responsive */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              {!isCallActive ? (
                <button
                  onClick={handleStartCall}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg sm:rounded-xl text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#16A34A', border: 'none', padding: 'clamp(10px, 2.5vw, 12px)', fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Phone size={14} className="sm:w-[16px] sm:h-[16px]" /> Start Call
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEndCall}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg sm:rounded-xl text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: PRIMARY, border: 'none', padding: 'clamp(10px, 2.5vw, 12px)', fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, cursor: 'pointer' }}
                  >
                    <PhoneOff size={14} className="sm:w-[16px] sm:h-[16px]" /> End Call
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-lg sm:rounded-xl transition-all flex items-center justify-center"
                    style={{ width: 'clamp(40px, 10vw, 46px)', height: 'clamp(40px, 10vw, 46px)', border: '1px solid #E2E8F0', backgroundColor: isMuted ? '#FEF2F2' : 'white', cursor: 'pointer' }}
                  >
                    {isMuted ? <MicOff size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: PRIMARY }} /> : <Mic size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#475569' }} />}
                  </button>
                </>
              )}
              <button
                onClick={handleSkip}
                className="rounded-lg sm:rounded-xl transition-all flex items-center justify-center"
                style={{ width: 'clamp(40px, 10vw, 46px)', height: 'clamp(40px, 10vw, 46px)', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer' }}
              >
                <SkipForward size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#94A3B8' }} />
              </button>
            </div>

            {/* Call script - Responsive */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '12px', border: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#94A3B8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Script</p>
              <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#475569', lineHeight: 1.6 }}>{current.script}</p>
              <p style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8', marginTop: 8, lineHeight: 1.6 }}>
                "I was wondering — have you had a chance to think about who you'll be voting for? Are there any concerns you'd like the party to address?"
              </p>
            </div>
          </div>

          {/* Log outcome - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Log Call Outcome</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {OUTCOMES.map(o => {
                const Icon = o.icon;
                const isSelected = selectedOutcome === o.key;
                return (
                  <button
                    key={o.key}
                    onClick={() => setSelectedOutcome(o.key)}
                    style={{
                      padding: '8px 8px', borderRadius: 9, border: `2px solid ${isSelected ? o.color : '#E2E8F0'}`,
                      backgroundColor: isSelected ? o.color + '12' : 'white', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left',
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Icon size={12} className="sm:w-[13px] sm:h-[13px]" style={{ color: isSelected ? o.color : '#94A3B8', flexShrink: 0 }} />
                    <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: isSelected ? 600 : 400, color: isSelected ? o.color : '#64748B', lineHeight: 1.3 }}>{o.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Key points from the conversation..."
                rows={2}
                style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 9, padding: '9px 12px', fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#0F172A', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = PRIMARY)}
                onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            <button
              onClick={handleLogAndNext}
              disabled={!selectedOutcome || logSubmitted}
              style={{
                width: '100%', backgroundColor: logSubmitted ? '#16A34A' : !selectedOutcome ? '#E2E8F0' : PRIMARY,
                color: !selectedOutcome ? '#94A3B8' : 'white', border: 'none', borderRadius: 10, padding: 'clamp(10px, 2.5vw, 11px)',
                fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, cursor: !selectedOutcome ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              className="transition-all hover:opacity-90"
            >
              {logSubmitted ? <><CheckCircle2 size={14} className="sm:w-[15px] sm:h-[15px]" /> Logged!</> : <>Log &amp; Next Caller <ChevronRight size={14} className="sm:w-[15px] sm:h-[15px]" /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Daily chart - Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
        <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Today's Call Activity</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={DAILY_STATS} barSize={clamp(16, 20, 24)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
            <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
              {DAILY_STATS.map((_, i) => <Cell key={i} fill={i === 6 ? PRIMARY : '#E2E8F0'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Helper function for responsive bar size
function clamp(min: number, preferred: number, max: number): number {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 640) return min;
    if (width > 1024) return max;
    return min + (max - min) * ((width - 640) / (1024 - 640));
  }
  return preferred;
}