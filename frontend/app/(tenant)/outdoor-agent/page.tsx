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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Outdoor Agent — Election Day</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Dashboard › Outdoor Agent</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: isOnline ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${isOnline ? '#BBF7D0' : '#FECACA'}`, borderRadius: 10, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: isOnline ? '#16A34A' : '#E30613', cursor: 'pointer' }}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Online' : 'Offline Mode'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '7px 14px' }}>
            <RefreshCw size={13} style={{ color: '#94A3B8' }} />
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Synced {lastSync}</span>
          </div>
        </div>
      </div>

      {/* Station selector */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-5">
        <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Assigned Polling Station</p>
        <div className="flex gap-3">
          {POLLING_STATIONS.map(station => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              style={{
                flex: 1, padding: '12px 14px', borderRadius: 12, border: `2px solid ${selectedStation.id === station.id ? PRIMARY : '#E2E8F0'}`,
                backgroundColor: selectedStation.id === station.id ? '#FEF2F2' : 'white', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={13} style={{ color: selectedStation.id === station.id ? PRIMARY : '#94A3B8' }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: selectedStation.id === station.id ? PRIMARY : '#0F172A' }}>{station.name}</p>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8' }}>{station.constituency} · {station.registered.toLocaleString()} registered</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Col 1: Turnout counter */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Live Turnout Counter</h3>
            <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>{selectedStation.name}</p>

            {/* Big counter */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <p style={{ fontSize: 52, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{turnoutCount}</p>
              <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>of {selectedStation.registered.toLocaleString()} voted</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: turnoutRate > 50 ? '#16A34A' : PRIMARY, marginTop: 4 }}>{turnoutRate}% turnout</p>
            </div>

            {/* Turnout bar */}
            <div style={{ height: 12, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: '100%', width: `${turnoutRate}%`, backgroundColor: turnoutRate > 50 ? '#16A34A' : PRIMARY, borderRadius: 99, transition: 'width 0.3s' }} />
            </div>

            {/* +/- controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setTurnoutCount(c => Math.max(0, c - 1))}
                style={{ width: 44, height: 44, borderRadius: 12, border: '2px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#475569' }}
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => setTurnoutCount(c => c + 1)}
                style={{ width: 56, height: 56, borderRadius: 14, border: 'none', backgroundColor: PRIMARY, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Plus size={22} style={{ color: 'white' }} />
              </button>
              <button
                onClick={() => setTurnoutCount(c => Math.max(0, c - 1))}
                style={{ width: 44, height: 44, borderRadius: 12, border: '2px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#475569', opacity: 0 }}
              >
                <Minus size={18} />
              </button>
            </div>

            <button
              onClick={handleSendTurnout}
              style={{ width: '100%', backgroundColor: reportSent ? '#16A34A' : '#0F172A', color: 'white', border: 'none', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
            >
              {reportSent ? <><CheckCircle2 size={14} /> Report Sent!</> : <><Send size={13} /> Send Turnout Report</>}
            </button>
          </div>

          {/* Request runner */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Request Runner</h3>
            <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>Need transport assistance? Alert the runner assigned to this polling station.</p>
            <button
              onClick={handleRequestRunner}
              disabled={runnerRequested}
              style={{ width: '100%', backgroundColor: runnerRequested ? '#F0FDF4' : PRIMARY, color: runnerRequested ? '#16A34A' : 'white', border: runnerRequested ? '1px solid #BBF7D0' : 'none', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: runnerRequested ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
            >
              {runnerRequested ? <><CheckCircle2 size={14} /> Runner Alerted!</> : <><Car size={14} /> Request Runner</>}
            </button>
            <div style={{ marginTop: 10, padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={12} style={{ color: '#64748B' }} />
              <span style={{ fontSize: 12, color: '#64748B' }}>Runner: James Morrison · +1 869 555 0200</span>
            </div>
          </div>
        </div>

        {/* Col 2: Voter tick-off list */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Voter Tick-Off</h3>
              <div className="flex gap-3">
                <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>{votedCount} voted</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{notVotedCount} pending</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto" style={{ maxHeight: 480 }}>
            {voters.map(voter => (
              <div
                key={voter.id}
                className="flex items-center gap-3 px-5 py-3"
                style={{ opacity: !voter.contacted ? 0.5 : 1 }}
              >
                <button
                  onClick={() => toggleVoted(voter.id)}
                  style={{
                    width: 26, height: 26, borderRadius: 7, flexShrink: 0, border: `2px solid ${voter.voted ? '#16A34A' : '#CBD5E1'}`,
                    backgroundColor: voter.voted ? '#16A34A' : 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {voter.voted && <CheckCircle2 size={14} style={{ color: 'white' }} />}
                </button>
                <div className="flex-1">
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', textDecoration: voter.voted ? 'line-through' : 'none', opacity: voter.voted ? 0.6 : 1 }}>{voter.name}</p>
                  {!voter.contacted && <p style={{ fontSize: 11, color: '#94A3B8' }}>Not yet contacted</p>}
                </div>
                {voter.voted && <span style={{ fontSize: 11, fontWeight: 600, color: '#16A34A', backgroundColor: '#F0FDF4', padding: '2px 7px', borderRadius: 5 }}>Voted</span>}
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9', backgroundColor: '#FAFAFA' }}>
            <div style={{ height: 8, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(votedCount / voters.length) * 100}%`, backgroundColor: '#16A34A', borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 5 }}>{votedCount} of {voters.length} supporters confirmed voted</p>
          </div>
        </div>

        {/* Col 3: Incident reporting */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Report Incident</h3>
            <div className="space-y-3">
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Incident Type</label>
                <select
                  value={incidentType}
                  onChange={e => setIncidentType(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}
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
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Description</label>
                <textarea
                  value={incident}
                  onChange={e => setIncident(e.target.value)}
                  placeholder="Describe what you observed..."
                  rows={4}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0F172A', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <button
                onClick={handleSubmitReport}
                disabled={!incident.trim() || submitted}
                style={{ width: '100%', backgroundColor: submitted ? '#16A34A' : !incident.trim() ? '#E2E8F0' : PRIMARY, color: !incident.trim() ? '#94A3B8' : 'white', border: 'none', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: !incident.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
              >
                {submitted ? <><CheckCircle2 size={14} /> Report Filed!</> : <><AlertTriangle size={14} /> Submit Incident Report</>}
              </button>
            </div>
          </div>

          {/* Hourly check-in */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Hourly Check-In</h3>
            <div className="space-y-2">
              {[
                { time: '7:00 AM', status: 'sent', count: 82 },
                { time: '8:00 AM', status: 'sent', count: 134 },
                { time: '9:00 AM', status: 'sent', count: 198 },
                { time: '10:00 AM', status: 'sent', count: 241 },
                { time: '11:00 AM', status: 'sent', count: 287 },
                { time: '12:00 PM', status: 'pending', count: null },
              ].map(checkin => (
                <div key={checkin.time} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    {checkin.status === 'sent'
                      ? <CheckCircle2 size={13} style={{ color: '#16A34A' }} />
                      : <Clock size={13} style={{ color: '#F59E0B' }} />}
                    <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{checkin.time}</span>
                  </div>
                  <span style={{ fontSize: 12, color: checkin.status === 'sent' ? '#16A34A' : '#94A3B8', fontWeight: checkin.status === 'sent' ? 600 : 400 }}>
                    {checkin.count ? `${checkin.count} votes` : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
            <button
              style={{ width: '100%', marginTop: 10, backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
            >
              <Send size={13} /> Send 12PM Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
