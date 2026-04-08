'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, MapPin, Calendar, Clock, Users, CheckCircle2,
  XCircle, Mail, Phone, Plus, Search, Send, Bell, Download,
  MoreHorizontal, Edit2, Trash2, ChevronDown
} from 'lucide-react';

const PRIMARY = '#E30613';

const MOCK_EVENTS: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Grand Town Hall — Central Basseterre',
    date: '2025-07-15',
    time: '6:00 PM',
    endTime: '9:00 PM',
    location: 'Independence Square, Basseterre',
    constituency: 'Central Basseterre',
    type: 'Town Hall',
    status: 'upcoming',
    description: 'Community town hall meeting to discuss the 2025 General Election platform, including economic recovery, healthcare reform, and youth employment initiatives.',
    capacity: 500,
    registered: 387,
    attended: 0,
    organizer: 'General Secretary',
    campaign: '2025 General Election Campaign',
    attendees: [
      { id: 1, name: 'Patricia Williams', email: 'p.williams@email.com', phone: '+1 869 555 0101', status: 'confirmed', rsvp: 'yes', role: 'Voter' },
      { id: 2, name: 'Derek Williams', email: 'd.williams@email.com', phone: '+1 869 555 0102', status: 'confirmed', rsvp: 'yes', role: 'Voter' },
      { id: 3, name: 'Sandra Clarke', email: 's.clarke@email.com', phone: '+1 869 555 0103', status: 'pending', rsvp: 'maybe', role: 'Volunteer' },
      { id: 4, name: 'Leon Thomas', email: 'l.thomas@email.com', phone: '+1 869 555 0104', status: 'confirmed', rsvp: 'yes', role: 'Voter' },
      { id: 5, name: 'Donna Henry', email: 'd.henry@email.com', phone: '+1 869 555 0105', status: 'cancelled', rsvp: 'no', role: 'Voter' },
      { id: 6, name: 'Arthur Francis', email: 'a.francis@email.com', phone: '+1 869 555 0106', status: 'confirmed', rsvp: 'yes', role: 'Branch Leader' },
      { id: 7, name: 'Stacy Roberts', email: 's.roberts@email.com', phone: '+1 869 555 0107', status: 'pending', rsvp: 'maybe', role: 'Voter' },
      { id: 8, name: 'Carlton Browne', email: 'c.browne@email.com', phone: '+1 869 555 0108', status: 'confirmed', rsvp: 'yes', role: 'Canvasser' },
      { id: 9, name: 'Keisha Thomas', email: 'k.thomas@email.com', phone: '+1 869 555 0109', status: 'confirmed', rsvp: 'yes', role: 'Voter' },
      { id: 10, name: 'Mable Francis', email: 'm.francis@email.com', phone: '+1 869 555 0110', status: 'confirmed', rsvp: 'yes', role: 'Voter' },
    ],
  },
  '2': {
    id: 2,
    name: 'Youth Rally — St. Paul\'s',
    date: '2025-07-22',
    time: '4:00 PM',
    endTime: '7:00 PM',
    location: 'St. Paul\'s Community Centre',
    constituency: 'St. Paul\'s Capisterre',
    type: 'Rally',
    status: 'upcoming',
    description: 'Youth-focused rally to energize first-time voters and young supporters.',
    capacity: 250,
    registered: 198,
    attended: 0,
    organizer: 'Campaign Manager',
    campaign: '2025 General Election Campaign',
    attendees: [],
  },
};

const RSVP_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  yes: { label: 'Confirmed', color: '#16A34A', bg: '#F0FDF4' },
  maybe: { label: 'Maybe', color: '#D97706', bg: '#FFFBEB' },
  no: { label: 'Declined', color: '#E30613', bg: '#FEF2F2' },
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);
  const event = MOCK_EVENTS[id] || MOCK_EVENTS['1'];

  const [search, setSearch] = useState('');
  const [filterRsvp, setFilterRsvp] = useState('all');
  const [showReminderMenu, setShowReminderMenu] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  const confirmed = event.attendees.filter((a: any) => a.rsvp === 'yes').length;
  const maybe = event.attendees.filter((a: any) => a.rsvp === 'maybe').length;
  const declined = event.attendees.filter((a: any) => a.rsvp === 'no').length;
  const capacityPct = Math.round((event.registered / event.capacity) * 100);

  const filtered = event.attendees.filter((a: any) => {
    const matchSearch = search === '' || a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterRsvp === 'all' || a.rsvp === filterRsvp;
    return matchSearch && matchFilter;
  });

  const handleSendReminder = () => {
    setReminderSent(true);
    setShowReminderMenu(false);
    setTimeout(() => setReminderSent(false), 3000);
  };

  const typeColor = event.type === 'Town Hall' ? '#2563EB' : event.type === 'Rally' ? PRIMARY : '#7C3AED';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#475569' }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>{event.name}</h1>
            <span style={{ backgroundColor: typeColor + '15', color: typeColor, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 6 }}>{event.type}</span>
          </div>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Events › {event.name}</p>
        </div>
        <div className="flex gap-2">
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowReminderMenu(!showReminderMenu)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, background: reminderSent ? '#F0FDF4' : '#F1F5F9', border: 'none', borderRadius: 9, padding: '9px 16px', fontSize: 13, fontWeight: 600, color: reminderSent ? '#16A34A' : '#475569', cursor: 'pointer' }}
            >
              {reminderSent ? <><CheckCircle2 size={14} /> Reminders Sent!</> : <><Bell size={14} /> Send Reminders <ChevronDown size={12} /></>}
            </button>
            {showReminderMenu && !reminderSent && (
              <div style={{ position: 'absolute', top: '110%', right: 0, backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', minWidth: 180, zIndex: 50 }}>
                {['Email reminder', 'SMS reminder', 'WhatsApp reminder', 'All channels'].map(opt => (
                  <button
                    key={opt}
                    onClick={handleSendReminder}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#0F172A' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 9, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <Edit2 size={14} /> Edit Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Left: Event details + RSVP stats */}
        <div className="space-y-4">
          {/* Event info card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Event Details</h3>
            <div className="space-y-3">
              {[
                { icon: Calendar, label: 'Date', value: event.date },
                { icon: Clock, label: 'Time', value: `${event.time} – ${event.endTime}` },
                { icon: MapPin, label: 'Location', value: event.location },
                { icon: Users, label: 'Constituency', value: event.constituency },
              ].map(row => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <div style={{ width: 32, height: 32, backgroundColor: '#F8FAFC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                      <Icon size={14} style={{ color: '#64748B' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{row.label.toUpperCase()}</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginTop: 1 }}>{row.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F1F5F9' }}>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{event.description}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Capacity</h3>
            <div className="flex items-end gap-2 mb-3">
              <p style={{ fontSize: 28, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{event.registered}</p>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 3 }}>/ {event.capacity} seats</p>
            </div>
            <div style={{ height: 10, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${capacityPct}%`, backgroundColor: capacityPct > 90 ? '#E30613' : capacityPct > 70 ? '#F59E0B' : '#16A34A', borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 12, color: '#64748B' }}>{capacityPct}% capacity filled · {event.capacity - event.registered} seats remaining</p>
          </div>

          {/* RSVP summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>RSVP Summary</h3>
            {[
              { label: 'Confirmed', count: confirmed, color: '#16A34A', icon: CheckCircle2 },
              { label: 'Maybe', count: maybe, color: '#D97706', icon: Clock },
              { label: 'Declined', count: declined, color: '#E30613', icon: XCircle },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color: row.color }} />
                    <span style={{ fontSize: 13, color: '#475569' }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.count}</span>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 8, paddingTop: 10 }}>
              <button
                style={{ width: '100%', backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 9, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
              >
                <Download size={13} /> Export Attendee List
              </button>
            </div>
          </div>
        </div>

        {/* Right: Attendee table */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Attendees ({event.attendees.length})</h3>
              <div className="flex items-center gap-3">
                <div style={{ position: 'relative' }}>
                  <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 10px 7px 28px', fontSize: 12, outline: 'none', width: 180 }}
                  />
                </div>
                <select
                  value={filterRsvp}
                  onChange={e => setFilterRsvp(e.target.value)}
                  style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#475569', outline: 'none', backgroundColor: 'white' }}
                >
                  <option value="all">All RSVPs</option>
                  <option value="yes">Confirmed</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">Declined</option>
                </select>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 5, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Name', 'Contact', 'Role', 'RSVP', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a: any, i: number) => {
                  const rsvp = RSVP_CONFIG[a.rsvp];
                  return (
                    <tr key={a.id} style={{ borderTop: '1px solid #F8FAFC' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex items-center gap-3">
                          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: PRIMARY + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: PRIMARY, flexShrink: 0 }}>
                            {a.name.charAt(0)}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{a.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <p style={{ fontSize: 12, color: '#475569' }}>{a.email}</p>
                        <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{a.phone}</p>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 12, color: '#64748B', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: 5 }}>{a.role}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: rsvp.color, backgroundColor: rsvp.bg, padding: '3px 8px', borderRadius: 6 }}>{rsvp.label}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex gap-1">
                          <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mail size={12} style={{ color: '#64748B' }} />
                          </button>
                          <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone size={12} style={{ color: '#64748B' }} />
                          </button>
                          <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MoreHorizontal size={12} style={{ color: '#64748B' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#94A3B8' }}>No attendees match your filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
