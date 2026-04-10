'use client';
import { useState } from 'react';
import { Search, Plus, UserCog, Car, Phone, Users, MoreVertical, Activity, MessageSquare, BarChart2, Filter, X } from 'lucide-react';

const EMPTY_MEMBER = { name: '', role: 'Canvasser', constituency: 'St. Christopher 1', phone: '' };

const TEAM = [
  { id: 1, name: 'John Doe', role: 'Campaign Manager', status: 'Active', avatar: 'J', lastActive: '2 min ago', constituency: 'St. Christopher 1', phone: '+1-869-555-0101' },
  { id: 2, name: 'Jane Smith', role: 'Canvasser', status: 'Active', avatar: 'J', lastActive: '5 min ago', constituency: 'St. Christopher 2', phone: '+1-869-555-0102' },
  { id: 3, name: 'Michael Johnson', role: 'Canvasser', status: 'Active', avatar: 'M', lastActive: '12 min ago', constituency: 'Nevis 1', phone: '+1-869-555-0103' },
  { id: 4, name: 'Sarah Williams', role: 'Runner', status: 'Active', avatar: 'S', lastActive: '1 hr ago', constituency: 'St. Christopher 3', phone: '+1-869-555-0104' },
  { id: 5, name: 'David Brown', role: 'Runner', status: 'Active', avatar: 'D', lastActive: '45 min ago', constituency: 'St. Christopher 4', phone: '+1-869-555-0105' },
  { id: 6, name: 'Emily Davis', role: 'Phone Bank', status: 'Active', avatar: 'E', lastActive: '30 min ago', constituency: 'Nevis 2', phone: '+1-869-555-0106' },
  { id: 7, name: 'Robert Wilson', role: 'Outdoor Agent', status: 'Active', avatar: 'R', lastActive: '3 hrs ago', constituency: 'St. Christopher 5', phone: '+1-869-555-0107' },
  { id: 8, name: 'Lisa Martinez', role: 'Canvasser', status: 'Inactive', avatar: 'L', lastActive: '2 days ago', constituency: 'Nevis 3', phone: '+1-869-555-0108' },
  { id: 9, name: 'James Taylor', role: 'Campaign Manager', status: 'Active', avatar: 'J', lastActive: '8 min ago', constituency: 'St. Christopher 6', phone: '+1-869-555-0109' },
  { id: 10, name: 'Nancy Anderson', role: 'Phone Bank', status: 'Active', avatar: 'N', lastActive: '1 day ago', constituency: 'St. Christopher 7', phone: '+1-869-555-0110' },
];

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  'Campaign Manager': { bg: '#EFF6FF', color: '#1D4ED8' },
  'Canvasser': { bg: '#F0FDF4', color: '#15803D' },
  'Runner': { bg: '#FFFBEB', color: '#B45309' },
  'Phone Bank': { bg: '#F5F3FF', color: '#6D28D9' },
  'Outdoor Agent': { bg: '#FEF2F2', color: '#B91C1C' },
};

const AVATAR_COLORS = ['#E30613', '#1D4ED8', '#7C3AED', '#0891B2', '#D97706', '#059669', '#DB2777'];

type TabType = 'all' | 'canvassers' | 'runners' | 'phone_bank';

export default function TeamPage() {
  const [tab, setTab] = useState<TabType>('all');
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<typeof TEAM[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState(EMPTY_MEMBER);
  const [team, setTeam] = useState(TEAM);

  const handleAddMember = () => {
    if (!newMember.name.trim()) return;
    setTeam(prev => [...prev, {
      id: prev.length + 1,
      name: newMember.name,
      role: newMember.role,
      status: 'Active',
      avatar: newMember.name[0].toUpperCase(),
      lastActive: 'Just now',
      constituency: newMember.constituency,
      phone: newMember.phone,
    }]);
    setNewMember(EMPTY_MEMBER);
    setShowAdd(false);
  };

  const filterMap: Record<TabType, string[]> = {
    all: [],
    canvassers: ['Canvasser', 'Outdoor Agent'],
    runners: ['Runner'],
    phone_bank: ['Phone Bank'],
  };

  const filtered = team.filter(m => {
    const matchRole = filterMap[tab].length === 0 || filterMap[tab].includes(m.role);
    const matchSearch = search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const stats = [
    { label: 'All Members', value: team.length, icon: Users, color: '#E30613', bg: '#FEF2F2' },
    { label: 'Canvassers', value: team.filter(m => m.role === 'Canvasser').length, icon: UserCog, color: '#15803D', bg: '#F0FDF4' },
    { label: 'Runners', value: team.filter(m => m.role === 'Runner').length, icon: Car, color: '#E30613', bg: '#FEE2E2' },
    { label: 'Phone Bank', value: team.filter(m => m.role === 'Phone Bank').length, icon: Phone, color: '#E30613', bg: '#FEE2E2' },
  ];

  return (
    <div>
      {/* Add Member Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 text-lg">Add Team Member</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Full Name *</label>
                <input value={newMember.name} onChange={e => setNewMember(m => ({ ...m, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="Jane Smith" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Role</label>
                  <select value={newMember.role} onChange={e => setNewMember(m => ({ ...m, role: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                    <option>Campaign Manager</option>
                    <option>Canvasser</option>
                    <option>Runner</option>
                    <option>Phone Bank</option>
                    <option>Outdoor Agent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Constituency</label>
                  <select value={newMember.constituency} onChange={e => setNewMember(m => ({ ...m, constituency: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                    <option>St. Christopher 1</option>
                    <option>St. Christopher 2</option>
                    <option>St. Christopher 3</option>
                    <option>Nevis 1</option>
                    <option>Nevis 2</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Phone</label>
                <input value={newMember.phone} onChange={e => setNewMember(m => ({ ...m, phone: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="+1-869-555-0100" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => { setShowAdd(false); setNewMember(EMPTY_MEMBER); }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Cancel</button>
                <button onClick={handleAddMember}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#E30613' }}>Add Member</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Team Management</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>St. Kitts and Nevis Labour Party</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-red-400 w-full sm:w-48"
              placeholder="Search team..."
            />
          </div>
          <button onClick={() => setShowAdd(true)} style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <Plus size={14} /> Add New Member
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => setTab(['all', 'canvassers', 'runners', 'phone_bank'][i] as TabType)}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full overflow-x-auto">
        {([
          { id: 'all', label: 'All Members' },
          { id: 'canvassers', label: 'Canvassers' },
          { id: 'runners', label: 'Runners' },
          { id: 'phone_bank', label: 'Phone Bank' },
        ] as { id: TabType; label: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((member, idx) => {
          const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
          const roleStyle = ROLE_COLORS[member.role] || { bg: '#F8FAFC', color: '#64748B' };
          return (
            <div key={member.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: avatarColor }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{member.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, backgroundColor: roleStyle.bg, color: roleStyle.color }}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: member.status === 'Active' ? '#16A34A' : '#94A3B8' }} />
                  <span style={{ fontSize: 11, color: member.status === 'Active' ? '#16A34A' : '#94A3B8', fontWeight: 500 }}>{member.status}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4" style={{ fontSize: 11, color: '#94A3B8' }}>
                <span>📍 {member.constituency}</span>
                <span>📞 {member.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <button style={{ flex: 1, backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 8, padding: '7px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <UserCog size={12} /> Assign
                </button>
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '7px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <MessageSquare size={12} /> Message
                </button>
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '7px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <BarChart2 size={12} /> Performance
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Team Member Button at Bottom */}
      <div className="mt-6 flex justify-center">
        <button onClick={() => setShowAdd(true)} style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 12, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add New Team Member
        </button>
      </div>
    </div>
  );
}
