'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MEMBERS = [
  { name: 'Samuel Brown',    role: 'Canvasser',        status: 'online',  time: 'Online',    skin: '#7B4F2E' },
  { name: 'Marcus James',    role: 'Campaign Manager', status: 'offline', time: 'Offline',   skin: '#5C3317' },
  { name: 'Gentily Clarke',  role: 'Phone Bank',       status: 'offline', time: '01:47 9Pm', skin: '#8B5E3C' },
  { name: 'Planbro Nevis',   role: 'Runner',           status: 'online',  time: '01:31 4Pm', skin: '#4A2C17' },
  { name: 'Sedlad Thompson', role: 'Volunteer',        status: 'online',  time: '02:33 4Pm', skin: '#6B4226' },
  { name: 'SKNLP Agent',     role: 'Field Agent',      status: 'offline', time: 'Offline',   skin: '#3D2B1F' },
  { name: 'Kitts Nevis',     role: 'Labour Organiser', status: 'offline', time: 'Offline',   skin: '#9A7050' },
  { name: 'Sktts Nevis',     role: 'Volunteer',        status: 'online',  time: '04:17 9Pm', skin: '#6D4C41' },
];

const ROLE_DATA = [
  { name: 'Canvassers', value: 38, color: '#DC143C' },
  { name: 'Runners',    value: 24, color: '#D4A017' },
  { name: 'Phone Bank', value: 22, color: '#374151' },
  { name: 'Volunteers', value: 16, color: '#1E40AF' },
];

const FILTERS = ['All Roles', 'Active', 'Offline'];

function MemberCard({ m }: { m: typeof MEMBERS[0] }) {
  const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const isOnline = m.status === 'online';
  return (
    <div style={{
      background: '#1E293B', border: `1px solid ${isOnline ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}`,
      borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: `radial-gradient(circle at 40% 35%, ${m.skin}ee, ${m.skin}66)`,
            border: '2px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 15, fontWeight: 800, letterSpacing: '0.5px',
          }}>{initials}</div>
          <div>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 3px' }}>{m.name}</p>
            <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>{m.role}</p>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: isOnline ? 'rgba(34,197,94,0.12)' : 'rgba(100,116,139,0.15)',
          borderRadius: 20, padding: '4px 10px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: isOnline ? '#22C55E' : '#64748B' }} />
          <span style={{ color: isOnline ? '#22C55E' : '#94A3B8', fontSize: 10, fontWeight: 700 }}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontSize: 11 }}>
          {isOnline ? '● Active now' : `Last seen: ${m.time}`}
        </span>
        <button style={{
          background: 'rgba(220,20,60,0.12)', border: '1px solid rgba(220,20,60,0.3)',
          color: '#DC143C', borderRadius: 8, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
        }}>View Profile</button>
      </div>
    </div>
  );
}

export default function AllMembersPage() {
  const [filter, setFilter] = useState('All Roles');

  const filtered = MEMBERS.filter(m => {
    if (filter === 'Active') return m.status === 'online';
    if (filter === 'Offline') return m.status === 'offline';
    return true;
  });

  const onlineCount = MEMBERS.filter(m => m.status === 'online').length;

  return (
    <div style={{ minHeight: '100vh', background: '#080E1C', fontFamily: "'Inter',sans-serif" }}>
      {/* Hero banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #DC143C 0%, #8B000A 50%, #1a0a0a 100%)',
        marginBottom: 24,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{
            position: 'absolute', top: '18%', right: `${6 + i * 10}%`,
            width: 56, height: 56, borderRadius: '50%',
            background: `radial-gradient(circle at 40% 35%, ${['#7B4F2E','#5C3317','#8B5E3C','#4A2C17','#6B4226','#3D2B1F'][i]}cc, ${['#7B4F2E','#5C3317','#8B5E3C','#4A2C17','#6B4226','#3D2B1F'][i]}55)`,
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 800,
          }}>{['SB','MJ','GC','PN','ST','SK'][i]}</div>
        ))}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 200, background: 'linear-gradient(90deg, transparent 0%, rgba(0,158,96,0.35) 40%, rgba(252,209,22,0.25) 70%, rgba(206,17,38,0.35) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '32px 28px' }}>
          <h1 style={{ color: 'white', fontSize: 34, fontWeight: 900, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>All Members</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '8px 0 0' }}>
            {MEMBERS.length} total members · <span style={{ color: '#22C55E' }}>{onlineCount} online</span>
          </p>
        </div>
      </div>

      <div style={{ padding: '0 28px 28px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#1E293B', borderRadius: 10, padding: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? '#DC143C' : 'transparent',
                border: 'none', color: filter === f ? 'white' : '#94A3B8',
                borderRadius: 7, padding: '7px 18px', fontSize: 12, fontWeight: filter === f ? 700 : 500, cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
          {['↑', '−', '🗑'].map((icon, i) => (
            <button key={i} style={{
              width: 36, height: 36, borderRadius: 8, background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{icon}</button>
          ))}
          <div style={{ flex: 1 }} />
          <button style={{
            background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
          }}>Add New Member</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          <div className="rg-2" style={{ gap: 12 }}>
            {filtered.map((m, i) => <MemberCard key={i} m={m} />)}
          </div>

          {/* Role Breakdown panel */}
          <div style={{
            background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px', position: 'sticky', top: 24,
          }}>
            <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>Role Breakdown</p>
            <p style={{ color: '#475569', fontSize: 12, margin: '0 0 16px' }}>{MEMBERS.length} members total</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={ROLE_DATA} cx="50%" cy="50%" innerRadius={52} outerRadius={82} dataKey="value" startAngle={90} endAngle={-270}>
                  {ROLE_DATA.map((e, i) => <Cell key={i} fill={e.color} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {ROLE_DATA.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color, flexShrink: 0 }} />
                    <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.name}</span>
                  </div>
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{r.value}%</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[{ label: 'Online', value: onlineCount, color: '#22C55E' }, { label: 'Offline', value: MEMBERS.length - onlineCount, color: '#DC143C' }].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                    <p style={{ color: s.color, fontSize: 22, fontWeight: 900, margin: '0 0 3px', lineHeight: 1 }}>{s.value}</p>
                    <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
