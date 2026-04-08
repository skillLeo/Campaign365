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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Phone Bank</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Dashboard › Phone Bank</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '8px 14px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#16A34A' }}>Session Active</span>
        </div>
      </div>

      {/* Today's stats */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Calls Today', value: todayStats.total, color: '#0F172A' },
          { label: 'Supporters', value: todayStats.supporters, color: '#16A34A' },
          { label: 'Undecided', value: todayStats.undecided, color: '#F59E0B' },
          { label: 'Not Home', value: todayStats.notHome, color: '#94A3B8' },
          { label: 'Callbacks', value: todayStats.callbacks, color: '#2563EB' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <p style={{ fontSize: 24, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: Call list */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3.5 border-b border-slate-100">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Call Queue ({CALL_LIST.length} remaining)</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {CALL_LIST.map((voter, i) => (
              <button
                key={voter.id}
                onClick={() => { setCurrentIndex(i); setIsCallActive(false); setSelectedOutcome(''); setNotes(''); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ border: 'none', cursor: 'pointer', backgroundColor: i === currentIndex ? '#FEF2F2' : 'transparent', borderLeft: i === currentIndex ? `3px solid ${PRIMARY}` : '3px solid transparent' }}
                onMouseEnter={e => { if (i !== currentIndex) e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                onMouseLeave={e => { if (i !== currentIndex) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: i === currentIndex ? PRIMARY + '20' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i === currentIndex ? PRIMARY : '#64748B', flexShrink: 0 }}>
                  {voter.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{voter.name}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>{voter.constituency}</p>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: priorityColor(voter.priority), flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active call panel */}
        <div className="col-span-3 space-y-4">
          {/* Voter card + dial */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: PRIMARY + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: PRIMARY }}>
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{current.name}</h3>
                  <p style={{ fontSize: 13, color: '#64748B' }}>{current.phone}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{current.address} · {current.constituency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 11, fontWeight: 600, color: priorityColor(current.priority), backgroundColor: priorityColor(current.priority) + '15', padding: '3px 9px', borderRadius: 6 }}>
                  {current.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>

            {/* Call controls */}
            <div className="flex items-center gap-3 mb-4">
              {!isCallActive ? (
                <button
                  onClick={handleStartCall}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#16A34A', color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                >
                  <Phone size={16} /> Start Call
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEndCall}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                  >
                    <PhoneOff size={16} /> End Call
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{ width: 46, height: 46, borderRadius: 10, border: '1px solid #E2E8F0', backgroundColor: isMuted ? '#FEF2F2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isMuted ? <MicOff size={16} style={{ color: PRIMARY }} /> : <Mic size={16} style={{ color: '#475569' }} />}
                  </button>
                </>
              )}
              <button
                onClick={handleSkip}
                style={{ width: 46, height: 46, borderRadius: 10, border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <SkipForward size={16} style={{ color: '#94A3B8' }} />
              </button>
            </div>

            {/* Call script */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '14px', border: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Script</p>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{current.script}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 8, lineHeight: 1.6 }}>
                "I was wondering — have you had a chance to think about who you'll be voting for? Are there any concerns you'd like the party to address?"
              </p>
            </div>
          </div>

          {/* Log outcome */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Log Call Outcome</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              {OUTCOMES.map(o => {
                const Icon = o.icon;
                const isSelected = selectedOutcome === o.key;
                return (
                  <button
                    key={o.key}
                    onClick={() => setSelectedOutcome(o.key)}
                    style={{
                      padding: '8px 10px', borderRadius: 9, border: `2px solid ${isSelected ? o.color : '#E2E8F0'}`,
                      backgroundColor: isSelected ? o.color + '12' : 'white', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left',
                    }}
                  >
                    <Icon size={13} style={{ color: isSelected ? o.color : '#94A3B8', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: isSelected ? 600 : 400, color: isSelected ? o.color : '#64748B', lineHeight: 1.3 }}>{o.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Key points from the conversation..."
                rows={2}
                style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 9, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = PRIMARY)}
                onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            <button
              onClick={handleLogAndNext}
              disabled={!selectedOutcome || logSubmitted}
              style={{
                width: '100%', backgroundColor: logSubmitted ? '#16A34A' : !selectedOutcome ? '#E2E8F0' : PRIMARY,
                color: !selectedOutcome ? '#94A3B8' : 'white', border: 'none', borderRadius: 10, padding: '11px',
                fontSize: 14, fontWeight: 700, cursor: !selectedOutcome ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {logSubmitted ? <><CheckCircle2 size={15} /> Logged!</> : <>Log &amp; Next Caller <ChevronRight size={15} /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mt-5">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Today's Call Activity</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={DAILY_STATS} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
              {DAILY_STATS.map((_, i) => <Cell key={i} fill={i === 6 ? PRIMARY : '#E2E8F0'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
