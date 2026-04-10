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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Add Team Member Modal - Responsive */}
      {showAdd && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAdd(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Add Team Member</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Full Name</label>
                <input value={newMember.name} onChange={e => setNewMember(m => ({ ...m, name: e.target.value }))} className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Email</label>
                <input type="email" value={newMember.email} onChange={e => setNewMember(m => ({ ...m, email: e.target.value }))} className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Role</label>
                <select value={newMember.role} onChange={e => setNewMember(m => ({ ...m, role: e.target.value }))} className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none">
                  <option>Campaign Manager</option>
                  <option>Canvasser</option>
                  <option>Runner</option>
                  <option>Outdoor Agent</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAdd(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">Cancel</button>
                <button
                  onClick={() => { setShowAdd(false); setNewMember({ name: '', role: 'Canvasser', email: '' }); }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#E30613' }}
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Team &amp; Mobile App Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage app access and monitor mobile app usage by role</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: '#E30613' }}
        >
          <Plus size={13} className="sm:w-[14px] sm:h-[14px]" /> Add New Team Member
        </button>
      </div>

      {/* App Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {APPS.map(app => (
          <div key={app.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.bg }}>
                <app.icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: app.color }} />
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded whitespace-nowrap">v{app.version}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1">{app.name}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mb-2 leading-relaxed">{app.description}</p>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Installs</p>
                <p className="text-base sm:text-lg font-bold text-slate-800">{app.installs}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] sm:text-[10px] text-slate-400">Active Today</p>
                <p className="text-base sm:text-lg font-bold" style={{ color: app.color }}>{app.activeToday}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 rounded-lg text-white font-semibold transition-all hover:opacity-90" style={{ backgroundColor: app.color, border: 'none', padding: '6px 0', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>
                <Download size={10} className="sm:w-[11px] sm:h-[11px]" /> Invite
              </button>
              <button className="rounded-lg transition-all hover:bg-slate-100" style={{ background: '#F1F5F9', border: 'none', padding: '6px 8px', cursor: 'pointer', color: '#475569' }}>
                <QrCode size={12} className="sm:w-[13px] sm:h-[13px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
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
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap"
            style={{
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== 'stats' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '900px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Name</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Role</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Status</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Last Activity</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap" style={{ backgroundColor: '#FEF2F2' }}>Canvas App</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap" style={{ backgroundColor: '#EFF6FF' }}>Candidate App</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap" style={{ backgroundColor: '#F5F3FF' }}>Runner App</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap" style={{ backgroundColor: '#FFFBEB' }}>Outdoor App</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0" style={{ backgroundColor: m.avatarColor }}>
                          {m.avatar}
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate max-w-[100px] sm:max-w-none">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">{m.role}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.status === 'Active' ? '#16A34A' : '#94A3B8' }} />
                        <span className="text-[11px] sm:text-xs" style={{ color: m.status === 'Active' ? '#15803D' : '#94A3B8', fontWeight: 500 }}>{m.status}</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">{m.lastActivity}</td>
                    {[m.canvasApp, m.candidateApp, m.runnerApp, m.outdoorApp].map((app, j) => (
                      <td key={j} className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                        {app === '—' ? (
                          <span className="text-[10px] sm:text-xs text-slate-300">—</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <CheckCircle size={10} className="sm:w-[12px] sm:h-[12px]" style={{ color: '#16A34A', flexShrink: 0 }} />
                            <span className="text-[10px] sm:text-xs text-slate-600 truncate max-w-[100px]">{app}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {APPS.map(app => (
            <div key={app.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.bg }}>
                  <app.icon size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: app.color }} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">{app.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="rounded-lg p-2 sm:p-3" style={{ background: '#F8FAFC' }}>
                  <p className="text-[10px] sm:text-xs text-slate-400">Total Installs</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800">{app.installs}</p>
                </div>
                <div className="rounded-lg p-2 sm:p-3" style={{ background: '#F8FAFC' }}>
                  <p className="text-[10px] sm:text-xs text-slate-400">Active Today</p>
                  <p className="text-base sm:text-lg font-bold" style={{ color: app.color }}>{app.activeToday}</p>
                </div>
              </div>
              <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(app.activeToday / app.installs * 100)}%`, backgroundColor: app.color }} />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5">{Math.round(app.activeToday / app.installs * 100)}% daily active rate</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}