'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/lib/store';
import { Calendar, MapPin, Users, Plus, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface CampaignEvent {
  id: number;
  title: string;
  type: 'rally' | 'townhall' | 'fundraiser' | 'canvass' | 'debate' | 'meeting';
  date: string;
  time: string;
  location: string;
  constituency: string;
  attendees_expected: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
}

const mockEvents: CampaignEvent[] = [
  { id: 1, title: 'Grand Rally — Basseterre', type: 'rally', date: '2025-10-15', time: '6:00 PM', location: 'Independence Square', constituency: 'St. Chris 1', attendees_expected: 5000, status: 'upcoming' },
  { id: 2, title: 'Town Hall — Nevis Community', type: 'townhall', date: '2025-10-12', time: '3:00 PM', location: 'Charlestown Community Centre', constituency: 'Nevis 1', attendees_expected: 400, status: 'upcoming' },
  { id: 3, title: 'Annual Fundraising Gala', type: 'fundraiser', date: '2025-10-20', time: '7:00 PM', location: 'Marriott Resort', constituency: 'All', attendees_expected: 200, status: 'upcoming' },
  { id: 4, title: 'Doorstep Canvassing Drive', type: 'canvass', date: '2025-10-08', time: '9:00 AM', location: 'St. Paul\'s District', constituency: 'St. Chris 3', attendees_expected: 80, status: 'completed' },
  { id: 5, title: 'Leadership Debate', type: 'debate', date: '2025-10-18', time: '8:00 PM', location: 'National Broadcasting Corp.', constituency: 'All', attendees_expected: 1200, status: 'upcoming' },
  { id: 6, title: 'Branch Committee Meeting', type: 'meeting', date: '2025-10-10', time: '5:00 PM', location: 'Party HQ', constituency: 'St. Chris 2', attendees_expected: 45, status: 'completed' },
];

const typeColors: Record<string, string> = {
  rally: '#EF4444',
  townhall: '#3B82F6',
  fundraiser: '#F59E0B',
  canvass: '#E30613',
  debate: '#8B5CF6',
  meeting: '#6B7280',
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function EventsPage() {
  const [events, setEvents] = useState<CampaignEvent[]>(mockEvents);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const eventsOnDay = (day: number) => events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === day;
  });

  const statusBadge = (s: CampaignEvent['status']) => ({
    upcoming: 'info', live: 'success', completed: 'default', cancelled: 'danger',
  }[s] as any);

  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Events</h1>
          <p className="text-sm text-slate-500">Schedule and manage campaign events</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === 'list' ? 'text-white' : 'text-slate-500'}`} style={view === 'list' ? { backgroundColor: primaryColor } : {}}>List</button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === 'calendar' ? 'text-white' : 'text-slate-500'}`} style={view === 'calendar' ? { backgroundColor: primaryColor } : {}}>Calendar</button>
          </div>
          <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowModal(true)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
            Add Event
          </Button>
        </div>
      </div>

      {/* Upcoming stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming', value: events.filter(e => e.status === 'upcoming').length, color: '#3B82F6' },
          { label: 'Live Now', value: events.filter(e => e.status === 'live').length, color: '#E30613' },
          { label: 'Completed', value: events.filter(e => e.status === 'completed').length, color: '#94A3B8' },
          { label: 'Total Expected', value: events.reduce((s, e) => s + e.attendees_expected, 0).toLocaleString(), color: primaryColor },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-4">
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs mt-0.5" style={{ color }}>{label}</p>
          </Card>
        ))}
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <Card key={event.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: typeColors[event.type] }} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                    <span className="text-xs capitalize px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: typeColors[event.type] }}>{event.type}</span>
                  </div>
                </div>
                <Badge variant={statusBadge(event.status)}>{event.status}</Badge>
              </div>
              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={12} />
                  <span>{event.attendees_expected.toLocaleString()} expected · {event.constituency}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700">{MONTHS[currentMonth]} {currentYear}</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), 11) : m - 1)} className="p-1 hover:bg-slate-100 rounded">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrentMonth(m => m === 11 ? (setCurrentYear(y => y + 1), 0) : m + 1)} className="p-1 hover:bg-slate-100 rounded">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsOnDay(day);
              return (
                <div key={day} className="min-h-16 p-1 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-medium text-slate-600 mb-1">{day}</p>
                  {dayEvents.slice(0, 2).map(e => (
                    <div key={e.id} className="text-xs px-1 py-0.5 rounded truncate text-white mb-0.5" style={{ backgroundColor: typeColors[e.type] }}>{e.title}</div>
                  ))}
                  {dayEvents.length > 2 && <p className="text-xs text-slate-400">+{dayEvents.length - 2} more</p>}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Event" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Event Title</label>
            <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Grand Rally — St. Kitts" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Event Type</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option>rally</option><option>townhall</option><option>fundraiser</option>
                <option>canvass</option><option>debate</option><option>meeting</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Constituency</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option>All</option><option>St. Chris 1</option><option>St. Chris 2</option>
                <option>Nevis 1</option><option>Nevis 2</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
              <input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Time</label>
              <input type="time" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
            <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Venue name and address" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Expected Attendees</label>
            <input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="500" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Create Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
