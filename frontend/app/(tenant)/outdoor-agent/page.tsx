'use client';
import { useState } from 'react';
import {
  MapPin, Users, TrendingUp, Send, CheckCircle2,
  Clock, AlertTriangle, Flag, RefreshCw, ChevronDown,
  Car, Phone, Wifi, WifiOff, Plus, Minus
} from 'lucide-react';

const PRIMARY = '#E30613';

const POLLING_STATIONS = [
  { id: 1, name: 'Basseterre Primary School', constituency: 'Central Basseterre', registered: 842, active: true },
  { id: 2, name: 'Independence Square Polling Hall', constituency: 'Central Basseterre', registered: 634, active: false },
  { id: 3, name: 'St. Peter\'s Anglican School', constituency: 'East Basseterre', registered: 521, active: false },
];

const INITIAL_VOTERS = [
  { id: 1, name: 'Patricia Williams', voted: false, contacted: true },
  { id: 2, name: 'Derek Williams', voted: true, contacted: true },
  { id: 3, name: 'Leon Thomas', voted: false, contacted: false },
  { id: 4, name: 'Arthur Francis', voted: true, contacted: true },
  { id: 5, name: 'Mable Francis', voted: true, contacted: true },
  { id: 6, name: 'Stacy Roberts', voted: false, contacted: false },
  { id: 7, name: 'Keisha Thomas', voted: false, contacted: true },
  { id: 8, name: 'Carlton Browne', voted: false, contacted: false },
];

export default function OutdoorAgentPage() {
  const [selectedStation, setSelectedStation] = useState(POLLING_STATIONS[0]);
  const [voters, setVoters] = useState(INITIAL_VOTERS);
  const [turnoutCount, setTurnoutCount] = useState(287);
  const [incident, setIncident] = useState('');
  const [incidentType, setIncidentType] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [runnerRequested, setRunnerRequested] = useState(false);
  const [lastSync, setLastSync] = useState('2 min ago');

  const votedCount = voters.filter(v => v.voted).length;
  const notVotedCount = voters.filter(v => !v.voted && v.contacted).length;
  const unreachable = voters.filter(v => !v.contacted).length;
  const turnoutRate = Math.round((turnoutCount / selectedStation.registered) * 100);

  const toggleVoted = (id: number) => {
    setVoters(prev => prev.map(v => v.id === id ? { ...v, voted: !v.voted } : v));
  };

  const handleSubmitReport = () => {
    if (!incident.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setIncident(''); }, 3000);
  };

  const handleSendTurnout = () => {
    setReportSent(true);
    setTimeout(() => setReportSent(false), 3000);
  };

  const handleRequestRunner = () => {
    setRunnerRequested(true);
    setTimeout(() => setRunnerRequested(false), 5000);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 5vw, 24px)', color: '#0F172A', letterSpacing: '-0.02em' }}>Outdoor Agent — Election Day</h1>
          <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B', marginTop: 3 }}>Dashboard › Outdoor Agent</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="flex items-center justify-center gap-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
            style={{ background: isOnline ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${isOnline ? '#BBF7D0' : '#FECACA'}`, padding: '6px 12px', color: isOnline ? '#16A34A' : '#E30613', cursor: 'pointer' }}
          >
            {isOnline ? <Wifi size={12} className="sm:w-[14px] sm:h-[14px]" /> : <WifiOff size={12} className="sm:w-[14px] sm:h-[14px]" />}
            {isOnline ? 'Online' : 'Offline Mode'}
          </button>
          <div className="flex items-center gap-1.5 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px' }}>
            <RefreshCw size={11} className="sm:w-[13px] sm:h-[13px]" style={{ color: '#94A3B8' }} />
            <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#94A3B8' }}>Synced {lastSync}</span>
          </div>
        </div>
      </div>

      {/* Station selector - Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4">
        <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Assigned Polling Station</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {POLLING_STATIONS.map(station => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className="flex-1 text-left transition-all"
              style={{
                padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)',
                borderRadius: 12,
                border: `2px solid ${selectedStation.id === station.id ? PRIMARY : '#E2E8F0'}`,
                backgroundColor: selectedStation.id === station.id ? '#FEF2F2' : 'white',
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={11} className="sm:w-[13px] sm:h-[13px]" style={{ color: selectedStation.id === station.id ? PRIMARY : '#94A3B8' }} />
                <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, color: selectedStation.id === station.id ? PRIMARY : '#0F172A' }} className="truncate">{station.name}</p>
              </div>
              <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8' }} className="truncate">{station.constituency} · {station.registered.toLocaleString()} registered</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

        {/* Col 1: Turnout counter - Responsive */}
        <div className="lg:flex-1 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Live Turnout Counter</h3>
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8', marginBottom: 6 }}>{selectedStation.name}</p>

            {/* Big counter */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <p style={{ fontSize: 'clamp(40px, 10vw, 52px)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{turnoutCount}</p>
              <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: '#64748B', marginTop: 4 }}>of {selectedStation.registered.toLocaleString()} voted</p>
              <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, color: turnoutRate > 50 ? '#16A34A' : PRIMARY, marginTop: 4 }}>{turnoutRate}% turnout</p>
            </div>

            {/* Turnout bar */}
            <div style={{ height: 10, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: '100%', width: `${turnoutRate}%`, backgroundColor: turnoutRate > 50 ? '#16A34A' : PRIMARY, borderRadius: 99, transition: 'width 0.3s' }} />
            </div>

            {/* +/- controls - Responsive */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <button
                onClick={() => setTurnoutCount(c => Math.max(0, c - 1))}
                className="flex items-center justify-center rounded-xl transition-all hover:bg-slate-50"
                style={{ width: 'clamp(40px, 10vw, 44px)', height: 'clamp(40px, 10vw, 44px)', border: '2px solid #E2E8F0', background: 'white', cursor: 'pointer' }}
              >
                <Minus size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: '#475569' }} />
              </button>
              <button
                onClick={() => setTurnoutCount(c => c + 1)}
                className="flex items-center justify-center rounded-xl transition-all hover:opacity-90"
                style={{ width: 'clamp(50px, 12vw, 56px)', height: 'clamp(50px, 12vw, 56px)', border: 'none', backgroundColor: PRIMARY, cursor: 'pointer' }}
              >
                <Plus size={20} className="sm:w-[22px] sm:h-[22px]" style={{ color: 'white' }} />
              </button>
              <div style={{ width: 'clamp(40px, 10vw, 44px)', height: 'clamp(40px, 10vw, 44px)', opacity: 0 }} />
            </div>

            <button
              onClick={handleSendTurnout}
              className="w-full flex items-center justify-center gap-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: reportSent ? '#16A34A' : '#0F172A', border: 'none', padding: 'clamp(10px, 2.5vw, 11px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer' }}
            >
              {reportSent ? <><CheckCircle2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Report Sent!</> : <><Send size={12} className="sm:w-[13px] sm:h-[13px]" /> Send Turnout Report</>}
            </button>
          </div>

          {/* Request runner - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Request Runner</h3>
            <p style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#64748B', marginBottom: 12 }}>Need transport assistance? Alert the runner assigned to this polling station.</p>
            <button
              onClick={handleRequestRunner}
              disabled={runnerRequested}
              className="w-full flex items-center justify-center gap-2 rounded-xl transition-all"
              style={{ backgroundColor: runnerRequested ? '#F0FDF4' : PRIMARY, color: runnerRequested ? '#16A34A' : 'white', border: runnerRequested ? '1px solid #BBF7D0' : 'none', padding: 'clamp(10px, 2.5vw, 11px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: runnerRequested ? 'default' : 'pointer' }}
            >
              {runnerRequested ? <><CheckCircle2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Runner Alerted!</> : <><Car size={13} className="sm:w-[14px] sm:h-[14px]" /> Request Runner</>}
            </button>
            <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Phone size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
              <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#64748B' }}>Runner: James Morrison · +1 869 555 0200</span>
            </div>
          </div>
        </div>

        {/* Col 2: Voter tick-off list - Responsive */}
        <div className="lg:flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A' }}>Voter Tick-Off</h3>
              <div className="flex gap-2 sm:gap-3">
                <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#16A34A', fontWeight: 600 }}>{votedCount} voted</span>
                <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#94A3B8' }}>{notVotedCount} pending</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto" style={{ maxHeight: 400 }}>
            {voters.map(voter => (
              <div
                key={voter.id}
                className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3"
                style={{ opacity: !voter.contacted ? 0.5 : 1 }}
              >
                <button
                  onClick={() => toggleVoted(voter.id)}
                  className="flex items-center justify-center rounded-lg transition-all"
                  style={{
                    width: 'clamp(22px, 6vw, 26px)', height: 'clamp(22px, 6vw, 26px)', flexShrink: 0,
                    border: `2px solid ${voter.voted ? '#16A34A' : '#CBD5E1'}`,
                    backgroundColor: voter.voted ? '#16A34A' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {voter.voted && <CheckCircle2 size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color: 'white' }} />}
                </button>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A', textDecoration: voter.voted ? 'line-through' : 'none', opacity: voter.voted ? 0.6 : 1 }} className="truncate">{voter.name}</p>
                  {!voter.contacted && <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8' }}>Not yet contacted</p>}
                </div>
                {voter.voted && <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, color: '#16A34A', backgroundColor: '#F0FDF4', padding: '2px 7px', borderRadius: 5 }}>Voted</span>}
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid #F1F5F9', backgroundColor: '#FAFAFA' }}>
            <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(votedCount / voters.length) * 100}%`, backgroundColor: '#16A34A', borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8', marginTop: 5 }}>{votedCount} of {voters.length} supporters confirmed voted</p>
          </div>
        </div>

        {/* Col 3: Incident reporting - Responsive */}
        <div className="lg:flex-1 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Report Incident</h3>
            <div className="space-y-3">
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Incident Type</label>
                <select
                  value={incidentType}
                  onChange={e => setIncidentType(e.target.value)}
                  className="w-full rounded-lg text-sm focus:outline-none"
                  style={{ border: '1px solid #E2E8F0', padding: '8px 12px', fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#0F172A', outline: 'none', backgroundColor: 'white' }}
                >
                  <option value="general">General Observation</option>
                  <option value="intimidation">Voter Intimidation</option>
                  <option value="irregularity">Voting Irregularity</option>
                  <option value="equipment">Equipment Failure</option>
                  <option value="access">Accessibility Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, color: '#475569', marginBottom: 6 }}>Description</label>
                <textarea
                  value={incident}
                  onChange={e => setIncident(e.target.value)}
                  placeholder="Describe what you observed..."
                  rows={3}
                  className="w-full rounded-lg text-sm focus:outline-none resize-none"
                  style={{ border: '1px solid #E2E8F0', padding: '9px 12px', fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#0F172A', outline: 'none', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <button
                onClick={handleSubmitReport}
                disabled={!incident.trim() || submitted}
                className="w-full flex items-center justify-center gap-2 rounded-xl transition-all"
                style={{ backgroundColor: submitted ? '#16A34A' : !incident.trim() ? '#E2E8F0' : PRIMARY, color: !incident.trim() ? '#94A3B8' : 'white', border: 'none', padding: 'clamp(10px, 2.5vw, 11px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, cursor: !incident.trim() ? 'not-allowed' : 'pointer' }}
              >
                {submitted ? <><CheckCircle2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Report Filed!</> : <><AlertTriangle size={13} className="sm:w-[14px] sm:h-[14px]" /> Submit Incident Report</>}
              </button>
            </div>
          </div>

          {/* Hourly check-in - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Hourly Check-In</h3>
            <div className="space-y-1.5">
              {[
                { time: '7:00 AM', status: 'sent', count: 82 },
                { time: '8:00 AM', status: 'sent', count: 134 },
                { time: '9:00 AM', status: 'sent', count: 198 },
                { time: '10:00 AM', status: 'sent', count: 241 },
                { time: '11:00 AM', status: 'sent', count: 287 },
                { time: '12:00 PM', status: 'pending', count: null },
              ].map(checkin => (
                <div key={checkin.time} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-1.5">
                    {checkin.status === 'sent'
                      ? <CheckCircle2 size={11} className="sm:w-[13px] sm:h-[13px]" style={{ color: '#16A34A' }} />
                      : <Clock size={11} className="sm:w-[13px] sm:h-[13px]" style={{ color: '#F59E0B' }} />}
                    <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#475569', fontWeight: 500 }}>{checkin.time}</span>
                  </div>
                  <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: checkin.status === 'sent' ? '#16A34A' : '#94A3B8', fontWeight: checkin.status === 'sent' ? 600 : 400 }}>
                    {checkin.count ? `${checkin.count} votes` : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl mt-3 transition-all hover:opacity-90"
              style={{ backgroundColor: '#0F172A', color: 'white', border: 'none', padding: 'clamp(9px, 2.5vw, 10px)', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}
            >
              <Send size={12} className="sm:w-[13px] sm:h-[13px]" /> Send 12PM Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}