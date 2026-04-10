'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/lib/store';
import { Calendar, MapPin, Users, Plus, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2025);
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const eventsOnDay = (day: number) => events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === day;
  });

  const statusBadgeStyle = (s: CampaignEvent['status']) => {
    switch(s) {
      case 'upcoming': return { bg: '#DBEAFE', color: '#1E40AF', label: 'Upcoming' };
      case 'live': return { bg: '#DCFCE7', color: '#166534', label: 'Live' };
      case 'completed': return { bg: '#F1F5F9', color: '#475569', label: 'Completed' };
      case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B', label: 'Cancelled' };
      default: return { bg: '#F1F5F9', color: '#475569', label: s };
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5 fade-in">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Events</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Schedule and manage campaign events</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button 
              onClick={() => setView('list')} 
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${view === 'list' ? 'text-white' : 'text-slate-500'}`} 
              style={view === 'list' ? { backgroundColor: primaryColor } : {}}>
              List
            </button>
            <button 
              onClick={() => setView('calendar')} 
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${view === 'calendar' ? 'text-white' : 'text-slate-500'}`} 
              style={view === 'calendar' ? { backgroundColor: primaryColor } : {}}>
              Calendar
            </button>
          </div>
          <Button size="sm" icon={<Plus size={13} className="sm:w-[14px] sm:h-[14px]" />} onClick={() => setShowModal(true)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="whitespace-nowrap">
            Add Event
          </Button>
        </div>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Upcoming', value: events.filter(e => e.status === 'upcoming').length, color: '#3B82F6' },
          { label: 'Live Now', value: events.filter(e => e.status === 'live').length, color: '#E30613' },
          { label: 'Completed', value: events.filter(e => e.status === 'completed').length, color: '#94A3B8' },
          { label: 'Total Expected', value: events.reduce((s, e) => s + e.attendees_expected, 0).toLocaleString(), color: primaryColor },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-3 sm:p-4 hover:shadow-md transition-shadow">
            <p className="text-xl sm:text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-[10px] sm:text-xs mt-0.5" style={{ color }}>{label}</p>
          </Card>
        ))}
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {events.map(event => {
            const statusStyle = statusBadgeStyle(event.status);
            return (
              <Card key={event.id} className="p-4 sm:p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col gap-3">
                  {/* Header row with title and status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-1.5 sm:w-2 h-8 sm:h-10 rounded-full flex-shrink-0" style={{ backgroundColor: typeColors[event.type] }} />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{event.title}</p>
                        <span className="text-[10px] sm:text-xs capitalize px-1.5 py-0.5 rounded text-white inline-block" style={{ backgroundColor: typeColors[event.type] }}>{event.type}</span>
                      </div>
                    </div>
                    {/* Status Badge - properly contained */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                      {statusStyle.label}
                    </span>
                  </div>
                  
                  {/* Event details */}
                  <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={11} className="sm:w-[12px] sm:h-[12px] flex-shrink-0" />
                      <span className="truncate">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={11} className="sm:w-[12px] sm:h-[12px] flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={11} className="sm:w-[12px] sm:h-[12px] flex-shrink-0" />
                      <span className="truncate">{event.attendees_expected.toLocaleString()} expected · {event.constituency}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-3 sm:p-4 md:p-5 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">{MONTHS[currentMonth]} {currentYear}</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), 11) : m - 1)} className="p-1 hover:bg-slate-100 rounded transition-colors">
                <ChevronLeft size={14} className="sm:w-[16px] sm:h-[16px]" />
              </button>
              <button onClick={() => setCurrentMonth(m => m === 11 ? (setCurrentYear(y => y + 1), 0) : m + 1)} className="p-1 hover:bg-slate-100 rounded transition-colors">
                <ChevronRight size={14} className="sm:w-[16px] sm:h-[16px]" />
              </button>
            </div>
          </div>
          <div className="min-w-[600px]">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map(d => <div key={d} className="text-center text-[10px] sm:text-xs font-medium text-slate-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="min-h-[60px] sm:min-h-[80px] p-0.5 sm:p-1" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = eventsOnDay(day);
                return (
                  <div key={day} className="min-h-[60px] sm:min-h-[80px] p-0.5 sm:p-1 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors overflow-hidden">
                    <p className="text-[10px] sm:text-xs font-medium text-slate-600 mb-0.5 sm:mb-1">{day}</p>
                    {dayEvents.slice(0, 2).map(e => (
                      <div key={e.id} className="text-[9px] sm:text-[10px] px-0.5 sm:px-1 py-0.5 rounded truncate text-white mb-0.5" style={{ backgroundColor: typeColors[e.type] }} title={e.title}>
                        {e.title.length > 12 ? e.title.slice(0, 12) + '…' : e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && <p className="text-[8px] sm:text-[9px] text-slate-400">+{dayEvents.length - 2} more</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Add Event Modal - Responsive */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowModal(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Add Event</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Event Title</label>
                <input className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-red-400" placeholder="Grand Rally — St. Kitts" />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Event Type</label>
                  <select className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none">
                    <option>rally</option><option>townhall</option><option>fundraiser</option>
                    <option>canvass</option><option>debate</option><option>meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Constituency</label>
                  <select className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none">
                    <option>All</option><option>St. Chris 1</option><option>St. Chris 2</option>
                    <option>Nevis 1</option><option>Nevis 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Time</label>
                  <input type="time" className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Location</label>
                <input className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none" placeholder="Venue name and address" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Expected Attendees</label>
                <input type="number" className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none" placeholder="500" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShowModal(false)} className="text-xs sm:text-sm">Cancel</Button>
                <Button style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="text-xs sm:text-sm">Create Event</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}