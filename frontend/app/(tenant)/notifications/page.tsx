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
  campaign:    { icon: CheckCircle, color: 'var(--tenant-primary)', bg: '#ECFDF5' },
  gps:         { icon: MapPin, color: '#F59E0B', bg: '#FFFBEB' },
  fundraising: { icon: DollarSign, color: '#8B5CF6', bg: '#F5F3FF' },
  survey:      { icon: MessageSquare, color: 'var(--tenant-primary)', bg: '#F0FDFA' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || 'var(--tenant-primary)';

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg sm:rounded-xl overflow-hidden border border-slate-200">
            {(['all', 'unread'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium capitalize transition-all whitespace-nowrap"
                style={filter === f ? { backgroundColor: primaryColor, color: 'white' } : { color: '#64748B', backgroundColor: 'white' }}
              >
                {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium text-white transition-all hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: 'var(--tenant-primary)' }}
            >
              <Check size={11} className="sm:w-[12px] sm:h-[12px]" />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notification list - Responsive */}
      <div className="space-y-2.5 sm:space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-8 sm:p-12 text-center">
            <Bell size={28} className="sm:w-8 sm:h-8 mx-auto text-slate-300 mb-3" />
            <p className="text-xs sm:text-sm text-slate-500 font-medium">No {filter === 'unread' ? 'unread' : ''} notifications</p>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">You're all caught up!</p>
          </div>
        ) : filtered.map(notification => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;
          return (
            <div
              key={notification.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-all"
              style={!notification.read ? { borderLeft: `3px solid ${primaryColor}` } : {}}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.bg }}
                  >
                    <Icon size={15} className="sm:w-[17px] sm:h-[17px]" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <p className={`text-xs sm:text-sm font-semibold ${notification.read ? 'text-slate-600' : 'text-slate-900'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--tenant-primary)' }} />
                        )}
                      </div>
                      <span className="text-[10px] sm:text-xs text-slate-400 flex-shrink-0">{notification.time}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">{notification.message}</p>
                    
                    {/* Badges and Quick Reply - Responsive */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {/* Location badges */}
                      {notification.type === 'panic' && (
                        <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: 'var(--tenant-primary)', color: 'white' }}>Basseterre</span>
                      )}
                      {notification.type === 'gps' && (
                        <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: 'var(--tenant-primary)', color: 'white' }}>Nevis</span>
                      )}
                      {notification.type === 'fundraising' && (
                        <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: 'var(--tenant-primary)', color: 'white' }}>Online</span>
                      )}
                      
                      {/* Quick Reply button */}
                      <button
                        className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-lg transition-all hover:bg-red-50"
                        style={{ border: `1px solid var(--tenant-primary)`, color: 'var(--tenant-primary)', background: 'white', cursor: 'pointer' }}
                      >
                        Quick Reply
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center gap-1 self-end sm:self-start mt-2 sm:mt-0">
                  {!notification.read && (
                    <button
                      onClick={() => markRead(notification.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={12} className="sm:w-[13px] sm:h-[13px]" />
                    </button>
                  )}
                  <button
                    onClick={() => dismiss(notification.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Dismiss"
                  >
                    <Trash2 size={12} className="sm:w-[13px] sm:h-[13px]" />
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