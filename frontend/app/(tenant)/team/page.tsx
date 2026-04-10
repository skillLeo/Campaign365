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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Add Member Modal - Responsive */}
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
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Full Name *</label>
                <input value={newMember.name} onChange={e => setNewMember(m => ({ ...m, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                  placeholder="Jane Smith" />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Role</label>
                  <select value={newMember.role} onChange={e => setNewMember(m => ({ ...m, role: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none">
                    <option>Campaign Manager</option>
                    <option>Canvasser</option>
                    <option>Runner</option>
                    <option>Phone Bank</option>
                    <option>Outdoor Agent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Constituency</label>
                  <select value={newMember.constituency} onChange={e => setNewMember(m => ({ ...m, constituency: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none">
                    <option>St. Christopher 1</option>
                    <option>St. Christopher 2</option>
                    <option>St. Christopher 3</option>
                    <option>Nevis 1</option>
                    <option>Nevis 2</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Phone</label>
                <input value={newMember.phone} onChange={e => setNewMember(m => ({ ...m, phone: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                  placeholder="+1-869-555-0100" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => { setShowAdd(false); setNewMember(EMPTY_MEMBER); }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={handleAddMember}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#E30613' }}>Add Member</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 5vw, 24px)', color: '#0F172A', letterSpacing: '-0.02em' }} className="truncate">Team Management</h1>
          <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#64748B', marginTop: 3 }}>St. Kitts and Nevis Labour Party</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative w-full sm:w-48">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
              placeholder="Search team..."
            />
          </div>
          <button onClick={() => setShowAdd(true)} style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <Plus size={13} className="sm:w-[14px] sm:h-[14px]" /> Add New Member
          </button>
        </div>
      </div>

      {/* Stats - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setTab(['all', 'canvassers', 'runners', 'phone_bank'][i] as TabType)}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
              <s.icon size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: s.color }} />
            </div>
            <div className="min-w-0">
              <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8', fontWeight: 500, marginBottom: 2 }} className="truncate">{s.label}</p>
              <p style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, color: '#0F172A' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full overflow-x-auto">
        {([
          { id: 'all', label: 'All Members' },
          { id: 'canvassers', label: 'Canvassers' },
          { id: 'runners', label: 'Runners' },
          { id: 'phone_bank', label: 'Phone Bank' },
        ] as { id: TabType; label: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="whitespace-nowrap"
            style={{
              padding: 'clamp(5px, 1.5vw, 7px) clamp(12px, 3vw, 18px)',
              borderRadius: 8,
              border: 'none',
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Team Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((member, idx) => {
          const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
          const roleStyle = ROLE_COLORS[member.role] || { bg: '#F8FAFC', color: '#64748B' };
          return (
            <div key={member.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: avatarColor }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 700, color: '#0F172A' }} className="truncate">{member.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, padding: '2px 8px', borderRadius: 6, backgroundColor: roleStyle.bg, color: roleStyle.color }} className="whitespace-nowrap">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: member.status === 'Active' ? '#16A34A' : '#94A3B8' }} />
                  <span style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: member.status === 'Active' ? '#16A34A' : '#94A3B8', fontWeight: 500 }}>{member.status}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}>
                    <MoreVertical size={12} className="sm:w-[14px] sm:h-[14px]" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3 sm:mb-4" style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8' }}>
                <span className="truncate">📍 {member.constituency}</span>
                <span className="truncate">📞 {member.phone}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button style={{ flex: 1, backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <UserCog size={11} className="sm:w-[12px] sm:h-[12px]" /> Assign
                </button>
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <MessageSquare size={11} className="sm:w-[12px] sm:h-[12px]" /> Message
                </button>
                <button style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <BarChart2 size={11} className="sm:w-[12px] sm:h-[12px]" /> Performance
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Team Member Button at Bottom - Responsive */}
      <div className="flex justify-center pt-2">
        <button onClick={() => setShowAdd(true)} style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 12, padding: 'clamp(10px, 2.5vw, 12px) clamp(24px, 6vw, 32px)', fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={14} className="sm:w-[16px] sm:h-[16px]" /> Add New Team Member
        </button>
      </div>
    </div>
  );
}