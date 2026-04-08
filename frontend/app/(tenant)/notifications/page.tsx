'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { Bell, AlertTriangle, CheckCircle, Info, Users, MapPin, MessageSquare, DollarSign, Trash2, Check } from 'lucide-react';

interface Notification {
  id: number;
  type: 'panic' | 'import' | 'system' | 'campaign' | 'gps' | 'fundraising' | 'survey';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'panic', title: 'Panic Alert Triggered', message: 'Devon Clarke triggered a panic alert in Kingston Central at 2:34 PM. Emergency contacts notified.', time: '2 min ago', read: false },
  { id: 2, type: 'import', title: 'Voter Import Complete', message: '4,821 voters successfully imported from "October_Voters.csv". 12 duplicates were skipped.', time: '15 min ago', read: false },
  { id: 3, type: 'campaign', title: 'Canvassing Target Reached', message: 'Team Alpha has knocked 100% of doors in Kingston Central — Zone B.', time: '1h ago', read: false },
  { id: 4, type: 'fundraising', title: 'Donation Goal Reached!', message: 'Fundraising goal reached: $150,000 raised. Your campaign exceeded its target.', time: '3h ago', read: true },
  { id: 5, type: 'survey', title: 'New Survey Responses', message: '284 new responses received for "Voter Priority Issues — Oct 2025"', time: '5h ago', read: true },
  { id: 6, type: 'gps', title: 'Agent Offline', message: 'Patrick Grant (Branch Manager) has been offline for 45+ minutes. Last seen near Clarendon Central.', time: '6h ago', read: true },
  { id: 7, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance on Oct 15 from 2:00–4:00 AM. Brief downtime expected.', time: 'Oct 7', read: true },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  panic:       { icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2' },
  import:      { icon: Users, color: '#3B82F6', bg: '#EFF6FF' },
  system:      { icon: Info, color: '#6B7280', bg: '#F9FAFB' },
  campaign:    { icon: CheckCircle, color: '#E30613', bg: '#ECFDF5' },
  gps:         { icon: MapPin, color: '#F59E0B', bg: '#FFFBEB' },
  fundraising: { icon: DollarSign, color: '#8B5CF6', bg: '#F5F3FF' },
  survey:      { icon: MessageSquare, color: '#E30613', bg: '#F0FDFA' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-400 mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-slate-200">
            {(['all', 'unread'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 text-xs font-medium capitalize transition-all"
                style={filter === f ? { backgroundColor: primaryColor, color: 'white' } : { color: '#64748B', backgroundColor: 'white' }}
              >
                {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#E30613' }}
            >
              <Check size={12} />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <Bell size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No {filter === 'unread' ? 'unread' : ''} notifications</p>
            <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
          </div>
        ) : filtered.map(notification => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;
          return (
            <div
              key={notification.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition-all"
              style={!notification.read ? { borderLeft: `3px solid ${primaryColor}` } : {}}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: config.bg }}
                >
                  <Icon size={17} style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${notification.read ? 'text-slate-600' : 'text-slate-900'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#E30613' }} />
                      )}
                      {/* Location badge */}
                      {notification.type === 'panic' && (
                        <span style={{ backgroundColor: '#E30613', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Basseterre</span>
                      )}
                      {notification.type === 'gps' && (
                        <span style={{ backgroundColor: '#E30613', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Nevis</span>
                      )}
                      {notification.type === 'fundraising' && (
                        <span style={{ backgroundColor: '#E30613', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Online</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">{notification.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notification.message}</p>
                  {/* Quick Reply */}
                  <button
                    style={{ marginTop: 8, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, border: '1px solid #E30613', color: '#E30613', background: 'white', cursor: 'pointer' }}
                  >
                    Quick Reply
                  </button>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markRead(notification.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => dismiss(notification.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Dismiss"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
