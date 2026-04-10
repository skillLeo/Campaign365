'use client';
import { useState } from 'react';
import { Smartphone, Download, Users, UserCog, Car, MapPin, Activity, CheckCircle, Clock, Plus, QrCode, X } from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: 'John Doe', role: 'Campaign Manager', status: 'Active', lastActivity: '2 min ago', canvasApp: 'Installed · 2 days ago', candidateApp: 'Installed · 2 days ago', runnerApp: '—', outdoorApp: '—', avatar: 'J', avatarColor: '#E30613' },
  { id: 2, name: 'Jane Smith', role: 'Canvasser', status: 'Active', lastActivity: '5 min ago', canvasApp: 'Installed · 3 days ago', candidateApp: '—', runnerApp: '—', outdoorApp: '—', avatar: 'J', avatarColor: '#1D4ED8' },
  { id: 3, name: 'Michael Johnson', role: 'Runner', status: 'Active', lastActivity: '1 min ago', canvasApp: '—', candidateApp: '—', runnerApp: 'Installed · 1 day ago', outdoorApp: '—', avatar: 'M', avatarColor: '#7C3AED' },
  { id: 4, name: 'Sarah Williams', role: 'Runner', status: 'Active', lastActivity: '8 min ago', canvasApp: '—', candidateApp: '—', runnerApp: 'Installed · 5 days ago', outdoorApp: '—', avatar: 'S', avatarColor: '#0891B2' },
  { id: 5, name: 'David Brown', role: 'Outdoor Agent', status: 'Active', lastActivity: '3 min ago', canvasApp: '—', candidateApp: '—', runnerApp: '—', outdoorApp: 'Installed · 2 days ago', avatar: 'D', avatarColor: '#D97706' },
  { id: 6, name: 'Emily Davis', role: 'Canvasser', status: 'Active', lastActivity: '15 min ago', canvasApp: 'Installed · 7 days ago', candidateApp: '—', runnerApp: '—', outdoorApp: '—', avatar: 'E', avatarColor: '#059669' },
];

const APPS = [
  {
    id: 'canvass',
    name: 'Canvass App',
    icon: MapPin,
    color: '#E30613',
    bg: '#FEF2F2',
    description: 'For canvassers doing door-to-door voter outreach',
    features: ['Offline door knock recording', 'Voice note transcription', 'GPS tracking', 'Walk list navigation'],
    installs: 156,
    activeToday: 34,
    version: '2.4.1',
  },
  {
    id: 'candidate',
    name: 'Candidate App',
    icon: UserCog,
    color: '#1D4ED8',
    bg: '#FEE2E2',
    description: 'For candidates and senior party leadership',
    features: ['Live team tracking', 'Schedule & walk lists', 'Panic button', 'Campaign overview'],
    installs: 12,
    activeToday: 5,
    version: '2.4.1',
  },
  {
    id: 'runner',
    name: 'Runner App',
    icon: Car,
    color: '#7C3AED',
    bg: '#FEE2E2',
    description: 'For drivers picking up voters on election day',
    features: ['Pickup assignments', 'Navigation to addresses', 'GPS tracking', 'Delivery confirmation'],
    installs: 28,
    activeToday: 18,
    version: '2.4.1',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Agent App',
    icon: Activity,
    color: '#D97706',
    bg: '#FEE2E2',
    description: 'For agents stationed at polling stations',
    features: ['Live turnout reporting', 'Voter tick-off', 'Runner requests', 'Instant HQ updates'],
    installs: 45,
    activeToday: 22,
    version: '2.4.1',
  },
];

type Tab = 'all' | 'canvassers' | 'runners' | 'outdoor' | 'stats';

export default function MobileAppsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: 'Canvasser', email: '' });

  const filterMap: Record<Tab, string[]> = {
    all: [],
    canvassers: ['Canvasser', 'Campaign Manager'],
    runners: ['Runner'],
    outdoor: ['Outdoor Agent'],
    stats: [],
  };

  const filtered = TEAM_MEMBERS.filter(m =>
    filterMap[tab].length === 0 || filterMap[tab].includes(m.role)
  );

  return (
    <div>
      {/* Add Team Member Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 text-lg">Add Team Member</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Full Name</label>
                <input value={newMember.name} onChange={e => setNewMember(m => ({ ...m, name: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Email</label>
                <input type="email" value={newMember.email} onChange={e => setNewMember(m => ({ ...m, email: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Role</label>
                <select value={newMember.role} onChange={e => setNewMember(m => ({ ...m, role: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                  <option>Campaign Manager</option>
                  <option>Canvasser</option>
                  <option>Runner</option>
                  <option>Outdoor Agent</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Cancel</button>
                <button
                  onClick={() => { setShowAdd(false); setNewMember({ name: '', role: 'Canvasser', email: '' }); }}
                  style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Team &amp; Mobile App Management</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Manage app access and monitor mobile app usage by role</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={14} /> Add New Team Member
        </button>
      </div>

      {/* App Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {APPS.map(app => (
          <div key={app.id} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.bg }}>
                <app.icon size={18} style={{ color: app.color }} />
              </div>
              <span style={{ fontSize: 10, color: '#94A3B8', background: '#F8FAFC', padding: '2px 8px', borderRadius: 6 }}>v{app.version}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{app.name}</p>
            <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10, lineHeight: 1.5 }}>{app.description}</p>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>Installs</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{app.installs}</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 11, color: '#94A3B8' }}>Active Today</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: app.color }}>{app.activeToday}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button style={{ flex: 1, backgroundColor: app.color, color: 'white', border: 'none', borderRadius: 7, padding: '7px 0', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Download size={11} /> Invite
              </button>
              <button style={{ background: '#F1F5F9', border: 'none', borderRadius: 7, padding: '7px 8px', cursor: 'pointer', color: '#475569' }}>
                <QrCode size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {([
          { id: 'all', label: 'All Users' },
          { id: 'canvassers', label: 'Canvassers' },
          { id: 'runners', label: 'Runners' },
          { id: 'outdoor', label: 'Outdoor Agents' },
          { id: 'stats', label: 'Mobile App Stats' },
        ] as { id: Tab; label: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== 'stats' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>Role</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>Last Activity</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569', backgroundColor: '#FEF2F2' }}>Canvas App</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569', backgroundColor: '#EFF6FF' }}>Candidate App</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569', backgroundColor: '#F5F3FF' }}>Runner App</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569', backgroundColor: '#FFFBEB' }}>Outdoor App</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '13px 20px' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: m.avatarColor }}>
                        {m.avatar}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#64748B' }}>{m.role}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: m.status === 'Active' ? '#16A34A' : '#94A3B8' }} />
                      <span style={{ fontSize: 12, color: m.status === 'Active' ? '#15803D' : '#94A3B8', fontWeight: 500 }}>{m.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#64748B' }}>{m.lastActivity}</td>
                  {[m.canvasApp, m.candidateApp, m.runnerApp, m.outdoorApp].map((app, j) => (
                    <td key={j} style={{ padding: '13px 16px' }}>
                      {app === '—' ? (
                        <span style={{ fontSize: 11, color: '#CBD5E1' }}>—</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle size={12} style={{ color: '#16A34A', flexShrink: 0 }} />
                          <span style={{ fontSize: 11, color: '#475569' }}>{app}</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {APPS.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.bg }}>
                  <app.icon size={16} style={{ color: app.color }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{app.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 14px' }}>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>Total Installs</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>{app.installs}</p>
                </div>
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 14px' }}>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>Active Today</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: app.color }}>{app.activeToday}</p>
                </div>
              </div>
              <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.round(app.activeToday / app.installs * 100)}%`, backgroundColor: app.color, borderRadius: 3 }} />
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{Math.round(app.activeToday / app.installs * 100)}% daily active rate</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
