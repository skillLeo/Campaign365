'use client';
import { useState } from 'react';

const APRIL_2026 = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, null, null],
];
const EVENT_DAYS = [2, 3, 9, 19, 24, 25];

const EVENTS = [
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$28,450', tickets: '184 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$28,450', tickets: '111 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$25,950', tickets: '185 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: null,       tickets: '111 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$28,450', tickets: '184 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$28,450', tickets: '119 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$28,450', tickets: '175 Tickets Sold' },
  { title: 'Gala Dinner - Basseterre', date: 'April 25', raised: '$23,950', tickets: '184 Tickets Sold' },
];

// Simple donut chart
function DonutChart() {
  const slices = [
    { pct: 55, color: '#DC143C' },
    { pct: 30, color: '#1E3A5F' },
    { pct: 15, color: '#374151' },
  ];
  let cumulative = 0;
  const r = 40, cx = 50, cy = 50, stroke = 18;
  const circumference = 2 * Math.PI * r;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {slices.map((s, i) => {
        const offset = circumference - (s.pct / 100) * circumference;
        const rotation = (cumulative / 100) * 360 - 90;
        cumulative += s.pct;
        return (
          <circle key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${(s.pct / 100) * circumference} ${circumference}`}
            strokeDashoffset={0}
            transform={`rotate(${rotation} ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r - stroke / 2 - 2} fill="#0A0F1C" />
    </svg>
  );
}

// Event card with SKNLP branded image
function EventCard({ event }: { event: typeof EVENTS[0] }) {
  return (
    <div style={{
      borderRadius: 10, overflow: 'hidden',
      background: '#0f1824',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Image area */}
      <div style={{
        height: 120, position: 'relative',
        background: 'linear-gradient(135deg,#1a0808 0%,#3d1010 40%,#1a0a1a 100%)',
        overflow: 'hidden',
      }}>
        {/* Concert lighting effect */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(220,20,60,0.6) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 60%, rgba(180,20,20,0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, rgba(120,10,10,0.3) 0%, transparent 45%)
          `,
        }} />
        {/* Crowd silhouette */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
          background: 'linear-gradient(0deg,rgba(0,0,0,0.8) 0%,transparent 100%)',
        }} />
        {/* SKNLP logo overlay */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <div style={{
            background: 'rgba(220,20,60,0.85)', borderRadius: 4,
            padding: '2px 8px', marginBottom: 2,
          }}>
            <p style={{ color: 'white', fontSize: 8, fontWeight: 700, margin: 0, letterSpacing: '0.1em' }}>ST. KITTS NEVIS LABOUR</p>
          </div>
          <p style={{ color: 'white', fontSize: 16, fontWeight: 900, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>SKNLP</p>
        </div>
        {/* Ticket decoration */}
        <div style={{ position: 'absolute', top: 6, right: 6, fontSize: 18 }}>🎟️</div>
      </div>
      {/* Info */}
      <div style={{ padding: '8px 10px' }}>
        <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{event.title}</p>
        <p style={{ color: '#64748B', fontSize: 11, margin: '0 0 4px' }}>— {event.date}</p>
        {event.raised && <p style={{ color: '#4ADE80', fontSize: 11, fontWeight: 700, margin: '0 0 1px' }}>{event.raised} Raised</p>}
        <p style={{ color: '#94A3B8', fontSize: 11, margin: 0 }}>{event.tickets}</p>
      </div>
    </div>
  );
}

export default function FundraisingEventsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past' | 'calendar'>('upcoming');
  const today = 25;

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Header with spotlight bg */}
      <div style={{
        position: 'relative', padding: '0 20px',
        background: 'linear-gradient(135deg,#0a1020 0%,#1a0808 60%,#0a0818 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        {/* Stage lights */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[15, 40, 65, 85].map((left, i) => (
            <div key={i} style={{
              position: 'absolute', top: 0, left: `${left}%`,
              width: 2, height: '100%',
              background: `linear-gradient(180deg, rgba(220,20,60,${0.3 + i * 0.05}) 0%, transparent 100%)`,
              transform: `rotate(${i % 2 === 0 ? 8 : -8}deg)`,
              transformOrigin: 'top center',
            }} />
          ))}
        </div>
        {/* Ticket decorations */}
        <div style={{ position: 'absolute', top: 8, right: 60, fontSize: 28, opacity: 0.7 }}>🎟️</div>
        <div style={{ position: 'absolute', top: 12, right: 120, fontSize: 22, opacity: 0.5 }}>🎟️</div>

        {/* Top bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 0' }}>
          <span style={{ color: '#94A3B8', fontSize: 13 }}>Campaign Client</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#64748B', fontSize: 12 }}>🔍 Cardraising Erelp</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>A</div>
              <span style={{ color: '#94A3B8', fontSize: 12 }}>Anesth A</span>
              <span style={{ color: '#475569' }}>›</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', padding: '14px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0 }}>Fundraising Events</h1>
          <button style={{
            background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
          }}>Create New Event</button>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16 }}>
          {(['upcoming', 'past', 'calendar'] as const).map((t, i) => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span style={{ color: '#475569', fontSize: 12 }}>›</span>}
              <button
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? 'rgba(220,20,60,0.15)' : 'transparent',
                  border: tab === t ? '1px solid rgba(220,20,60,0.3)' : '1px solid transparent',
                  color: tab === t ? '#E2E8F0' : '#64748B',
                  borderRadius: 6, padding: '5px 12px',
                  fontSize: 13, fontWeight: tab === t ? 700 : 500, cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >{t === 'calendar' ? 'Calendar View' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
            </span>
          ))}
        </div>

        {/* Main layout: sidebar + calendar + donut */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 160px', gap: 14, marginBottom: 16 }}>

          {/* Left sidebar */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '14px',
          }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 10px' }}>Hero</p>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 10px', marginBottom: 12 }}>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: 0 }}>Events</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#DC143C' }} />
              <span style={{ color: '#94A3B8', fontSize: 11 }}>Fvend1</span>
            </div>
            <div style={{ marginLeft: 14 }}>
              <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Fundraising</p>
            </div>
          </div>

          {/* Calendar */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#64748B', fontSize: 16, cursor: 'pointer' }}>‹</span>
              <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>April 2026</span>
              <span style={{ color: '#64748B', fontSize: 16, cursor: 'pointer' }}>›</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
              {['Sun', 'Mon', 'Tue', 'Wee', 'Wid', 'Rb', 'Fri', 'Fri', 'Sat'].slice(0, 7).map(d => (
                <div key={d} style={{ color: '#475569', fontSize: 10, fontWeight: 600, padding: '4px 0' }}>{d}</div>
              ))}
              {APRIL_2026.flat().map((day, i) => (
                <div key={i} style={{
                  padding: '5px 2px', borderRadius: 6, fontSize: 11,
                  color: day === today ? 'white' : day && EVENT_DAYS.includes(day) ? '#DC143C' : '#94A3B8',
                  backgroundColor: day === today ? '#DC143C' : 'transparent',
                  fontWeight: day === today || (day && EVENT_DAYS.includes(day)) ? 700 : 400,
                  cursor: day ? 'pointer' : 'default',
                }}>
                  {day || ''}
                </div>
              ))}
            </div>
          </div>

          {/* Revenue donut */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 12px', alignSelf: 'flex-start' }}>Revenue by Event</p>
            <DonutChart />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8, width: '100%' }}>
              {[
                { color: '#DC143C', label: 'Gala Dinner', pct: '55%' },
                { color: '#1E3A5F', label: 'Rally',       pct: '30%' },
                { color: '#374151', label: 'Other',       pct: '15%' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: l.color, flexShrink: 0 }} />
                  <span style={{ color: '#94A3B8', fontSize: 10, flex: 1 }}>{l.label}</span>
                  <span style={{ color: '#64748B', fontSize: 10 }}>{l.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event cards grid */}
        <div className="rg-4" style={{ gap: 12 }}>
          {EVENTS.map((e, i) => <EventCard key={i} event={e} />)}
        </div>
      </div>
    </div>
  );
}
