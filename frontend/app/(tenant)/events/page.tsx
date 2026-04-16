'use client';
import { useState } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const EVENTS = [
  { day: 7,  title: 'National Rally -\nBasseterre',    color: '#C8102E', col: 0, span: 1 },
  { day: 10, title: 'Canvass Training -\nNevis',       color: '#C8102E', col: 3, span: 1 },
  { day: 14, title: 'Party -\nBasseterre',             color: '#C8102E', col: 0, span: 1 },
  { day: 17, title: 'Door-to-Door\nCayon',             color: '#C8102E', col: 3, span: 1 },
  { day: 20, title: 'Phone Bank -\nOld Road',          color: '#C8102E', col: 5, span: 1 },
  { day: 21, title: 'Nationality\nCayon',              color: '#C8102E', col: 0, span: 1 },
  { day: 27, title: 'Election Day\nNation-wide',       color: '#C8102E', col: 5, span: 1 },
];

const UPCOMING_EVENTS = [
  { title: 'National Rally - Basseterre',    detail: 'National Rally - Caless Training', time: '9 nm' },
  { title: 'Community Meetup - Sandy Point', detail: 'Door-to-Door - 0/laforr',           time: '3 nm' },
  { title: 'Election Day - Nation-wint',     detail: 'Phone Bar/y - Old Road',            time: '3 nm' },
];

// St Kitts flag
function FlagSVG({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={size * 1.5} height={size} style={{ borderRadius: 3, flexShrink: 0 }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60" />
      <polygon points="0,0 30,0 30,20" fill="#CE1126" />
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
      <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
    </svg>
  );
}

export default function EventsPage() {
  const [showModal, setShowModal] = useState(false);

  // Calendar for current month (April 2026 example)
  const year = 2026;
  const month = 3; // April (0-indexed)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsOnDay = (day: number) => EVENTS.filter(e => e.day === day);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column' }}>

      {/* ── Three-column layout ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px minmax(0,1fr) 200px', gap: 0, backgroundColor: '#0F172A' }}>

        {/* LEFT sidebar */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 0, borderRight: '1px solid #2A2A2A' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <FlagSVG size={18} />
            <div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 14, color: '#fff', margin: 0 }}>SKNLP</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Client Dashboard</p>
            </div>
          </div>

          {/* Nav links */}
          {['Dashboard', 'Calendar', 'Voters', 'Analytics', 'Settings', 'Help'].map((item, i) => (
            <div key={item}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 8, marginBottom: 2, backgroundColor: item === 'Calendar' ? '#C8102E' : 'transparent', cursor: 'pointer' }}
              onMouseEnter={e => { if (item !== 'Calendar') (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (item !== 'Calendar') (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
            >
              <span style={{ fontSize: 12, fontWeight: item === 'Calendar' ? 700 : 500, color: item === 'Calendar' ? '#fff' : 'rgba(255,255,255,0.55)' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* CENTRE — Calendar */}
        <div style={{ padding: '20px 20px', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', backgroundColor: '#0F172A' }}>
          {/* Header */}
          <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 2px' }}>SKNLP Client Dashboard</p>
          <h1 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 24, color: '#F1F5F9', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Party Calendar &amp; Events
          </h1>
          <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 16px' }}>Dashboard &gt; Calendar</p>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 0 }}>
            {DAYS_SHORT.map(d => (
              <div key={d} style={{ padding: '6px 0', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#64748B' }}>{d}</div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 0 }} />

          {/* Calendar cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', flex: 1 }}>
            {/* Empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e${i}`} style={{ minHeight: 64, borderRight: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = eventsOnDay(day);
              const col = (firstDay + day - 1) % 7;
              return (
                <div key={day} style={{ minHeight: 64, padding: '4px', borderRight: col < 6 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', display: 'block', marginBottom: 2 }}>{day}</span>
                  {dayEvents.map((ev, ei) => (
                    <div key={ei} style={{ backgroundColor: ev.color, borderRadius: 3, padding: '2px 4px', marginBottom: 2 }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{ev.title}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Upcoming events list below */}
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
            {UPCOMING_EVENTS.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < UPCOMING_EVENTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#DC143C', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#CBD5E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</span>
                <span style={{ fontSize: 11, color: '#64748B', whiteSpace: 'nowrap' }}>{ev.detail}</span>
                <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, whiteSpace: 'nowrap' }}>{ev.time}</span>
                <Calendar size={12} color="#475569" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT panel */}
        <div style={{ padding: '20px 16px', backgroundColor: '#1E293B', display: 'flex', flexDirection: 'column', gap: 10, borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          {/* SKNLP > Campaign label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>SKNLP &gt;</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', margin: 0 }}>Campaign</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: 16 }}>∧</button>
          </div>

          {/* Add New Event button */}
          <button
            onClick={() => setShowModal(true)}
            style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#DC143C', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Add New Event
          </button>

          {/* Quick nav */}
          {['Dashboard', 'Calendar', 'Analytics', 'Settings'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 7, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)')}
            >
              <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#94A3B8' }}>{item}</span>
              <ChevronRight size={11} color="#475569" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Red sync footer ── */}
      <div style={{ backgroundColor: '#1E293B', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, color: '#DC143C', margin: 0 }}>
          Sync with Candidate &amp; Runner Apps
        </p>
      </div>

      {/* Add event modal */}
      {showModal && (
        <>
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50 }} onClick={() => setShowModal(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51, width: 'min(420px,92vw)', backgroundColor: '#1E293B', borderRadius: 14, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ padding: '18px 22px', background: 'linear-gradient(135deg, #DC143C 0%, #9B0D23 100%)' }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', margin: 0 }}>Add New Event</h3>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 13 }}>
              {['Event Name', 'Location', 'Date', 'Expected Attendees'].map(label => (
                <div key={label}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                  <input type="text" placeholder={label}
                    style={{ width: '100%', boxSizing: 'border-box', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#F1F5F9', outline: 'none', fontFamily: 'inherit', backgroundColor: '#0F172A' }}
                    onFocus={e => (e.target.style.borderColor = '#DC143C')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
              ))}
              <button onClick={() => setShowModal(false)}
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', backgroundColor: '#DC143C', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 4 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Create Event
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media(max-width:840px){
          div[style*="gridTemplateColumns: 200px"]{grid-template-columns:1fr!important}
          div[style*="gridTemplateColumns: 200px"] > *:first-child,
          div[style*="gridTemplateColumns: 200px"] > *:last-child{display:none!important}
        }
      `}</style>
    </div>
  );
}
