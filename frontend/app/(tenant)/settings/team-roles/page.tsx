'use client';
import { useState } from 'react';

type Status = 'Active' | 'Pending';

const USERS: Array<{ name: string; role: string; status: Status; initials: string; color: string }> = [
  { name: 'John Doe',   role: 'Campaign Manager', status: 'Active',  initials: 'JD', color: '#DC143C' },
  { name: 'Jane Smith', role: 'Canvasser',         status: 'Active',  initials: 'JS', color: '#1E40AF' },
  { name: 'Jane Smith', role: 'Campaign Manager',  status: 'Pending', initials: 'JS', color: '#374151' },
  { name: 'Jane Smith', role: 'Canvasser',         status: 'Pending', initials: 'JS', color: '#374151' },
  { name: 'John Doe',   role: 'Campaign Manager',  status: 'Pending', initials: 'JD', color: '#374151' },
  { name: 'Jane Smith', role: 'Canvasser',         status: 'Pending', initials: 'JS', color: '#374151' },
];

const RBAC_ROWS = [
  { role: 'Administrator', perms: 'Full Access', level: 'Campaign Manager', extra: 'Edit Users' },
  { role: 'Administrator', perms: 'Full Access', level: 'Viewer',           extra: 'Edit Users' },
  { role: 'Administrator', perms: 'Full Access', level: 'Viewer',           extra: 'Edit Users' },
];

const TABS = ['All Users', 'Invite New', 'Role Permissions'];

function UserCard({ user }: { user: typeof USERS[0] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10, padding: '12px 14px',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, ${user.color}cc, ${user.color}66)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 13, fontWeight: 800, flexShrink: 0,
        border: '2px solid rgba(255,255,255,0.15)',
      }}>{user.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{user.name}</p>
        <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{user.role}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{
          background: user.status === 'Active' ? 'rgba(34,197,94,0.15)' : 'rgba(212,160,23,0.15)',
          color: user.status === 'Active' ? '#22C55E' : '#D4A017',
          border: `1px solid ${user.status === 'Active' ? '#22C55E44' : '#D4A01744'}`,
          borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700,
        }}>{user.status}</span>
        <button style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#E2E8F0', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}>Edit</button>
      </div>
    </div>
  );
}

export default function TeamRolesPage() {
  const [activeTab, setActiveTab] = useState('All Users');

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter',sans-serif", background: '#080E1C', padding: '20px 24px' }}>

      {/* Page heading */}
      <h2 style={{ color: '#DC143C', fontSize: 24, fontWeight: 900, margin: '0 0 20px' }}>Team &amp; Roles</h2>

      {/* Card */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 20px' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === tab ? 'white' : '#64748B',
              fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
              padding: '12px 20px',
              borderBottom: activeTab === tab ? '2px solid #DC143C' : '2px solid transparent',
              fontFamily: 'inherit', transition: 'all 0.15s',
            }}>{tab}</button>
          ))}
        </div>

        {/* User grid */}
        <div style={{ padding: '16px 20px' }}>
          <div className="rg-2" style={{ gap: 10, marginBottom: 20 }}>
            {USERS.map((user, i) => (
              <UserCard key={i} user={user} />
            ))}
          </div>

          {/* RBAC */}
          <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Role-Based Access Control (RBAC)</h3>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '9px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>Role</span><span>Permissions</span><span>Access Level</span><span></span>
            </div>
            {RBAC_ROWS.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '10px 16px', alignItems: 'center',
                borderBottom: i < RBAC_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <span style={{ color: '#E2E8F0', fontSize: 13 }}>{row.role}</span>
                <span style={{ color: '#E2E8F0', fontSize: 13 }}>{row.perms}</span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{row.level}</span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{row.extra}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
