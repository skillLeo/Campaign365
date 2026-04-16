'use client';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const FILTER_TABS = ['All', 'Urgent', 'Canvassing', 'Runners', 'Fundraising', 'All →'] as const;
type Tab = (typeof FILTER_TABS)[number];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'urgent',      text: 'Urgent runner assignment in',  location: 'Basseterre', tag: 'Basseterre', unread: true  },
  { id: 2, type: 'canvassing',  text: 'Voter feedback from Nevis',     location: 'Nevis',      tag: 'Albt',       unread: true  },
  { id: 3, type: 'fundraising', text: 'New donation received',          location: 'Online',     tag: 'Alht',       unread: false },
  { id: 4, type: 'runners',     text: 'Runner completed door-to-door in', location: 'Kingston', tag: 'Kingston',   unread: true  },
  { id: 5, type: 'urgent',      text: 'Low turnout alert for',          location: 'Clarendon',  tag: 'Clarendon',  unread: false },
  { id: 6, type: 'canvassing',  text: 'Walk list completed at',         location: 'Nevis',      tag: 'Zone B',     unread: false },
  { id: 7, type: 'fundraising', text: 'Monthly goal reached —',         location: 'HQ',         tag: '68%',        unread: true  },
];

// St Kitts flag
function FlagBlock() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 30 20" width="27" height="18" style={{ borderRadius: 3, flexShrink: 0 }}>
        <polygon points="0,0 30,20 0,20" fill="#009E60" />
        <polygon points="0,0 30,0 30,20" fill="#CE1126" />
        <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
        <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
        <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
      </svg>
    </div>
  );
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const filtered = activeTab === 'All' || activeTab === 'All →'
    ? notifications
    : notifications.filter(n => n.type === activeTab.toLowerCase());

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const quickReply  = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column' }}>

      {/* ── Full-width RED header ── */}
      <div style={{ background: 'linear-gradient(135deg, #DC143C 0%, #9B0D23 100%)', padding: '14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FlagBlock />
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 18, color: '#fff', letterSpacing: '-0.01em' }}>SKNLP</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginLeft: 4 }}>Dashboard &gt; Notifications</span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, padding: '22px 28px' }}>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(20px,3.5vw,26px)', color: '#F1F5F9', margin: 0, letterSpacing: '-0.02em' }}>
            Notifications Center
            {unreadCount > 0 && <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#DC143C', marginLeft: 10, padding: '2px 10px', borderRadius: 12, backgroundColor: 'rgba(220,20,60,0.12)' }}>{unreadCount} New</span>}
          </h1>
          <button
            onClick={markAllRead}
            style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#DC143C', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Mark All Read
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: '7px 16px', borderRadius: 20, border: '1.5px solid', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, transition: 'all 0.15s', whiteSpace: 'nowrap',
                backgroundColor: activeTab === tab ? '#DC143C' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#fff' : '#64748B',
                borderColor: activeTab === tab ? '#DC143C' : 'rgba(255,255,255,0.1)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filtered.map((n, i) => (
            <div
              key={n.id}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', borderLeft: n.unread ? '3px solid #DC143C' : '3px solid transparent', backgroundColor: n.unread ? 'rgba(220,20,60,0.04)' : 'transparent', borderRadius: 6, marginBottom: 2 }}
            >
              {/* Red bullet */}
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: n.unread ? '#DC143C' : '#334155', flexShrink: 0 }} />

              {/* Text */}
              <p style={{ flex: 1, fontSize: 14, fontWeight: n.unread ? 600 : 400, color: n.unread ? '#F1F5F9' : '#94A3B8', margin: 0 }}>
                {n.text}
                {' '}
                <span style={{ display: 'inline-block', padding: '1px 9px', borderRadius: 20, backgroundColor: 'rgba(220,20,60,0.15)', color: '#DC143C', fontSize: 11, fontWeight: 700, marginLeft: 4 }}>
                  {n.tag}
                </span>
              </p>

              {/* Unread dot */}
              {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#DC143C', flexShrink: 0 }} />}

              {/* Quick Reply */}
              <button
                onClick={() => quickReply(n.id)}
                style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)', color: '#94A3B8', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', flexShrink: 0 }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
              >
                <MessageSquare size={12} /> Quick Reply
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#475569' }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>No notifications in this category</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          /* responsive if needed */
        }
      `}</style>
    </div>
  );
}
