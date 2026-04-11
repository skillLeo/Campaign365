'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, MapPin, Calendar, Clock, Users, CheckCircle2,
  XCircle, Mail, Phone, Plus, Search, Send, Bell, Download,
  MoreHorizontal, Edit2, Trash2, ChevronDown
} from 'lucide-react';

const PRIMARY = 'var(--tenant-primary)';

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
  no: { label: 'Declined', color: 'var(--tenant-primary)', bg: '#FEF2F2' },
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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-1.5 rounded-lg transition-all hover:bg-slate-100 whitespace-nowrap"
          style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 500, color: '#475569', cursor: 'pointer' }}
        >
          <ArrowLeft size={13} className="sm:w-[14px] sm:h-[14px]" /> Back
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>{event.name}</h1>
            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: typeColor + '15', color: typeColor }}>{event.type}</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Events › {event.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowReminderMenu(!showReminderMenu)}
              className="flex items-center justify-center gap-1.5 rounded-lg transition-all whitespace-nowrap"
              style={{ background: reminderSent ? '#F0FDF4' : '#F1F5F9', border: 'none', padding: '7px 14px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, color: reminderSent ? '#16A34A' : '#475569', cursor: 'pointer' }}
            >
              {reminderSent ? <><CheckCircle2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Reminders Sent!</> : <><Bell size={13} className="sm:w-[14px] sm:h-[14px]" /> Send Reminders <ChevronDown size={11} /></>}
            </button>
            {showReminderMenu && !reminderSent && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 min-w-[160px] overflow-hidden">
                {['Email reminder', 'SMS reminder', 'WhatsApp reminder', 'All channels'].map(opt => (
                  <button
                    key={opt}
                    onClick={handleSendReminder}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    style={{ color: '#0F172A' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center justify-center gap-1.5 rounded-lg text-white transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: PRIMARY, border: 'none', padding: '7px 14px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>
            <Edit2 size={13} className="sm:w-[14px] sm:h-[14px]" /> Edit Event
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Left: Event details + RSVP stats - Responsive */}
        <div className="lg:w-2/5 space-y-3 sm:space-y-4">
          {/* Event info card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3 sm:mb-4">Event Details</h3>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { icon: Calendar, label: 'Date', value: event.date },
                { icon: Clock, label: 'Time', value: `${event.time} – ${event.endTime}` },
                { icon: MapPin, label: 'Location', value: event.location },
                { icon: Users, label: 'Constituency', value: event.constituency },
              ].map(row => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                      <Icon size={13} className="sm:w-[14px] sm:h-[14px]" style={{ color: '#64748B' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{row.label.toUpperCase()}</p>
                      <p className="text-[11px] sm:text-sm font-semibold text-slate-800 mt-0.5 break-words">{row.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{event.description}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-2 sm:mb-3">Capacity</h3>
            <div className="flex items-end gap-2 mb-2 sm:mb-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">{event.registered}</p>
              <p className="text-xs sm:text-sm text-slate-400 mb-1">/ {event.capacity} seats</p>
            </div>
            <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all" style={{ width: `${capacityPct}%`, backgroundColor: capacityPct > 90 ? 'var(--tenant-primary)' : capacityPct > 70 ? '#F59E0B' : '#16A34A' }} />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500">{capacityPct}% capacity filled · {event.capacity - event.registered} seats remaining</p>
          </div>

          {/* RSVP summary */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-2 sm:mb-3">RSVP Summary</h3>
            {[
              { label: 'Confirmed', count: confirmed, color: '#16A34A', icon: CheckCircle2 },
              { label: 'Maybe', count: maybe, color: '#D97706', icon: Clock },
              { label: 'Declined', count: declined, color: 'var(--tenant-primary)', icon: XCircle },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex items-center justify-between py-1.5 sm:py-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color: row.color }} />
                    <span className="text-[11px] sm:text-xs text-slate-600">{row.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: row.color }}>{row.count}</span>
                </div>
              );
            })}
            <div className="border-t border-slate-100 mt-2 pt-3">
              <button className="w-full flex items-center justify-center gap-1.5 rounded-lg text-white transition-all hover:opacity-90" style={{ backgroundColor: PRIMARY, border: 'none', padding: '9px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>
                <Download size={12} className="sm:w-[13px] sm:h-[13px]" /> Export Attendee List
              </button>
            </div>
          </div>
        </div>

        {/* Right: Attendee table - Responsive */}
        <div className="lg:flex-1">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">Attendees ({event.attendees.length})</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-[11px] sm:text-xs outline-none w-full sm:w-40"
                  />
                </div>
                <select
                  value={filterRsvp}
                  onChange={e => setFilterRsvp(e.target.value)}
                  className="border border-slate-200 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs text-slate-600 outline-none bg-white"
                >
                  <option value="all">All RSVPs</option>
                  <option value="yes">Confirmed</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">Declined</option>
                </select>
                <button className="flex items-center justify-center gap-1 rounded-lg text-white transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: PRIMARY, border: 'none', padding: '6px 12px', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, cursor: 'pointer' }}>
                  <Plus size={12} className="sm:w-[13px] sm:h-[13px]" /> Add
                </button>
              </div>
            </div>

            <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-xs" style={{ minWidth: '700px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['Name', 'Contact', 'Role', 'RSVP', 'Actions'].map(h => (
                      <th key={h} className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-400 text-left uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a: any, i: number) => {
                    const rsvp = RSVP_CONFIG[a.rsvp];
                    return (
                      <tr key={a.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-[11px] sm:text-xs font-bold flex-shrink-0" style={{ backgroundColor: PRIMARY + '20', color: PRIMARY }}>
                              {a.name.charAt(0)}
                            </div>
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate max-w-[100px] sm:max-w-none">{a.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                          <p className="text-[10px] sm:text-xs text-slate-600 truncate max-w-[120px] sm:max-w-none">{a.email}</p>
                          <p className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5">{a.phone}</p>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                          <span className="text-[10px] sm:text-xs text-slate-500 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">{a.role}</span>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                          <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded" style={{ color: rsvp.color, backgroundColor: rsvp.bg }}>{rsvp.label}</span>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                          <div className="flex gap-1">
                            <button className="w-7 h-7 rounded-md border border-slate-200 bg-white cursor-pointer flex items-center justify-center hover:bg-slate-50 transition-colors">
                              <Mail size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
                            </button>
                            <button className="w-7 h-7 rounded-md border border-slate-200 bg-white cursor-pointer flex items-center justify-center hover:bg-slate-50 transition-colors">
                              <Phone size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
                            </button>
                            <button className="w-7 h-7 rounded-md border border-slate-200 bg-white cursor-pointer flex items-center justify-center hover:bg-slate-50 transition-colors">
                              <MoreHorizontal size={11} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#64748B' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="py-8 sm:py-10 text-center">
                <p className="text-xs sm:text-sm text-slate-400">No attendees match your filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}