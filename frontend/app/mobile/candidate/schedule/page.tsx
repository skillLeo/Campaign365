'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CalendarDays, MapPin, Users, ChevronDown, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const DAYS = ['Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10', 'Sat 11'];
const EVENTS = [
  { id: 1, time: '9:00 AM', end: '10:00 AM', type: 'Rally', title: 'Morning Rally — Basseterre Market', location: 'Basseterre Market Square', team: '12 staff', color: '#E30613', icon: '🎙️' },
  { id: 2, time: '11:00 AM', end: '12:00 PM', type: 'Walk-through', title: 'Community Walk-through — Frigate Bay', location: 'Frigate Bay Rd', team: '6 staff', color: '#16A34A', icon: '🚶' },
  { id: 3, time: '1:00 PM', end: '2:00 PM', type: 'Meeting', title: 'Campaign Strategy Meeting', location: 'SKNLP HQ, Basseterre', team: 'Core team (8)', color: '#7C3AED', icon: '📋' },
  { id: 4, time: '3:30 PM', end: '5:00 PM', type: 'Walk-through', title: 'Community Walk-through — Market Area', location: 'Basseterre Market Area', team: '8 staff', color: '#16A34A', icon: '🚶' },
  { id: 5, time: '6:00 PM', end: '8:00 PM', type: 'Rally', title: 'Evening Rally — Newtown', location: 'Newtown Pasture', team: '15 staff', color: '#E30613', icon: '🎙️' },
];

export default function CandidateSchedule() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState('Wed 8');
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px 0', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <button onClick={() => router.push('/mobile/candidate/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>My Schedule</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>April 2026 · Campaign Period</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <RefreshCw size={16} color="#64748B" />
            </button>
          </div>
          {/* Day picker */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, scrollbarWidth: 'none' }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setActiveDay(d)}
                style={{ flexShrink: 0, width: 52, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer', backgroundColor: activeDay === d ? '#E30613' : '#F8FAFC', color: activeDay === d ? '#fff' : '#64748B', fontSize: 11, fontWeight: activeDay === d ? 800 : 500, textAlign: 'center' }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            {EVENTS.length} events — Wednesday, April 8
          </p>
          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2, backgroundColor: '#E2E8F0' }} />
            {EVENTS.map(e => (
              <div key={e.id} style={{ position: 'relative', marginBottom: 12 }}>
                <div style={{ position: 'absolute', left: -22, top: 12, width: 12, height: 12, borderRadius: '50%', backgroundColor: e.color, border: '2px solid #fff', boxShadow: '0 0 0 2px ' + e.color }} />
                <button onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                  style={{ width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: '12px', border: '1px solid #F1F5F9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 13 }}>{e.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, backgroundColor: e.color + '18', color: e.color }}>{e.type}</span>
                        <span style={{ fontSize: 10, color: '#94A3B8' }}>{e.time}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>{e.title}</p>
                    </div>
                    <ChevronDown size={14} color="#94A3B8" style={{ transform: expanded === e.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </div>
                  {expanded === e.id && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                        <MapPin size={11} color="#94A3B8" />
                        <span style={{ fontSize: 11, color: '#64748B' }}>{e.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                        <Users size={11} color="#94A3B8" />
                        <span style={{ fontSize: 11, color: '#64748B' }}>{e.team}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                        <CalendarDays size={11} color="#94A3B8" />
                        <span style={{ fontSize: 11, color: '#64748B' }}>{e.time} – {e.end}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', backgroundColor: e.color, color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Navigate</button>
                        <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#374151', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Add to Calendar</button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '10px 12px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <button style={{ width: '100%', padding: '11px', borderRadius: 10, border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#374151', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <RefreshCw size={13} /> Sync with Campaign Manager
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
