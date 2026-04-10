'use client';
import { useState } from 'react';
import { Search, Plus, Edit2, Copy, Bell, ChevronDown, Check, X, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const ROLES = [
  { id: 1, name: 'Campaign Director', slug: 'campaign_director', users: 24, color: '#2563EB' },
  { id: 2, name: 'Campaign Manager', slug: 'campaign_manager', users: 48, color: '#7C3AED' },
  { id: 3, name: 'Data Manager', slug: 'data_manager', users: 16, color: '#0891B2' },
  { id: 4, name: 'Canvasser', slug: 'canvasser', users: 312, color: '#059669' },
  { id: 5, name: 'Outdoor Agent', slug: 'outdoor_agent', users: 87, color: '#D97706' },
  { id: 6, name: 'Field Organizer', slug: 'field_organizer', users: 54, color: '#DC2626' },
  { id: 7, name: 'Volunteer Coordinator', slug: 'volunteer_coordinator', users: 33, color: '#DB2777' },
  { id: 8, name: 'Community Liaison', slug: 'community_liaison', users: 41, color: '#7C3AED' },
  { id: 9, name: 'Runner', slug: 'runner', users: 128, color: '#0369A1' },
  { id: 10, name: 'Phone Bank', slug: 'phone_bank', users: 67, color: '#6D28D9' },
  { id: 11, name: 'General Secretary', slug: 'general_secretary', users: 12, color: '#1D4ED8' },
];

type PermVal = 'view' | 'edit' | 'none';

const PERMISSION_COLS = ['Party', 'Canvassing', 'Enterprise', 'AI Features', 'Reporting', 'Settings'];

const DEFAULT_PERMS: Record<string, Record<string, PermVal>> = {
  campaign_director:      { Party: 'edit', Canvassing: 'edit', Enterprise: 'edit', 'AI Features': 'edit', Reporting: 'edit', Settings: 'edit' },
  campaign_manager:       { Party: 'view', Canvassing: 'edit', Enterprise: 'edit', 'AI Features': 'view', Reporting: 'edit', Settings: 'view' },
  data_manager:           { Party: 'view', Canvassing: 'view', Enterprise: 'view', 'AI Features': 'none', Reporting: 'edit', Settings: 'none' },
  canvasser:              { Party: 'none', Canvassing: 'edit', Enterprise: 'none', 'AI Features': 'none', Reporting: 'none', Settings: 'none' },
  outdoor_agent:          { Party: 'none', Canvassing: 'view', Enterprise: 'none', 'AI Features': 'none', Reporting: 'view', Settings: 'none' },
  field_organizer:        { Party: 'view', Canvassing: 'edit', Enterprise: 'none', 'AI Features': 'none', Reporting: 'view', Settings: 'none' },
  volunteer_coordinator:  { Party: 'view', Canvassing: 'view', Enterprise: 'none', 'AI Features': 'none', Reporting: 'none', Settings: 'none' },
  community_liaison:      { Party: 'view', Canvassing: 'view', Enterprise: 'none', 'AI Features': 'none', Reporting: 'none', Settings: 'none' },
  runner:                 { Party: 'none', Canvassing: 'none', Enterprise: 'none', 'AI Features': 'none', Reporting: 'none', Settings: 'none' },
  phone_bank:             { Party: 'none', Canvassing: 'view', Enterprise: 'none', 'AI Features': 'none', Reporting: 'view', Settings: 'none' },
  general_secretary:      { Party: 'edit', Canvassing: 'edit', Enterprise: 'edit', 'AI Features': 'edit', Reporting: 'edit', Settings: 'edit' },
};

function PermBadge({ val, onChange }: { val: PermVal; onChange: (v: PermVal) => void }) {
  const cycles: PermVal[] = ['none', 'view', 'edit'];
  const next = () => onChange(cycles[(cycles.indexOf(val) + 1) % 3]);
  const config = {
    edit: { label: 'Edit', bg: '#DBEAFE', color: '#1D4ED8', border: '#93C5FD' },
    view: { label: 'View', bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
    none: { label: '—', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
  }[val];
  return (
    <button
      onClick={next}
      style={{ 
        background: config.bg, 
        color: config.color, 
        border: `1px solid ${config.border}`, 
        borderRadius: 6, 
        padding: 'clamp(3px, 1.5vw, 5px) clamp(8px, 2vw, 10px)', 
        fontSize: 'clamp(10px, 2vw, 12px)', 
        fontWeight: 600, 
        cursor: 'pointer', 
        minWidth: 'clamp(45px, 10vw, 50px)',
        transition: 'all 0.2s ease'
      }}
    >
      {config.label}
    </button>
  );
}

export default function RolesPermissionsPage() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<'global' | 'overrides'>('global');
  const [search, setSearch] = useState('');
  const [perms, setPerms] = useState<Record<string, Record<string, PermVal>>>(DEFAULT_PERMS);
  const [saved, setSaved] = useState(false);
  const [selectedClient, setSelectedClient] = useState('All Clients');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('#2563EB');
  const [roles, setRoles] = useState(ROLES);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredRoles = roles.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    
    const newId = Math.max(...roles.map(r => r.id)) + 1;
    const newSlug = newRoleName.toLowerCase().replace(/\s+/g, '_');
    
    const newRole = {
      id: newId,
      name: newRoleName,
      slug: newSlug,
      users: 0,
      color: newRoleColor,
    };
    
    setRoles([...roles, newRole]);
    setPerms({
      ...perms,
      [newSlug]: {
        Party: 'none',
        Canvassing: 'none',
        Enterprise: 'none',
        'AI Features': 'none',
        Reporting: 'none',
        Settings: 'none',
      }
    });
    
    setNewRoleName('');
    setNewRoleColor('#2563EB');
    setIsModalOpen(false);
  };

  const handleDeleteRole = (id: number) => {
    const roleToDelete = roles.find(r => r.id === id);
    if (roleToDelete) {
      const newPerms = { ...perms };
      delete newPerms[roleToDelete.slug];
      setPerms(newPerms);
      setRoles(roles.filter(r => r.id !== id));
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top bar */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p style={{ 
              fontSize: 'clamp(10px, 2vw, 11px)', 
              fontWeight: 600, 
              color: '#94A3B8', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              marginBottom: 4 
            }}>
              Dashboard › Roles &amp; Permissions
            </p>
            <h2 style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif", 
              fontWeight: 800, 
              fontSize: 'clamp(18px, 4vw, 24px)', 
              color: '#0F172A', 
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              User Roles &amp; Permissions
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSave}
              style={{ 
                backgroundColor: saved ? '#16A34A' : '#2563EB', 
                color: 'white', 
                border: 'none', 
                borderRadius: 'clamp(8px, 2vw, 10px)', 
                padding: 'clamp(7px, 2vw, 9px) clamp(16px, 3vw, 20px)', 
                fontSize: 'clamp(12px, 2.5vw, 13px)', 
                fontWeight: 600, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
            </button>
            <button style={{ 
              backgroundColor: '#F1F5F9', 
              color: '#475569', 
              border: 'none', 
              borderRadius: 'clamp(8px, 2vw, 10px)', 
              padding: 'clamp(7px, 2vw, 9px) clamp(12px, 2.5vw, 16px)', 
              fontSize: 'clamp(12px, 2.5vw, 13px)', 
              fontWeight: 600, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              whiteSpace: 'nowrap'
            }}>
              <Copy size={14} /> <span className="hidden sm:inline">Copy to Custom Role</span><span className="sm:inline hidden xs:inline">Copy</span>
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
              {user?.name?.charAt(0) || 'S'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 w-full">
        
        {/* Tabs */}
        <div className="flex gap-1 mb-4 sm:mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {(['global', 'overrides'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: 'clamp(6px, 1.5vw, 7px) clamp(16px, 3vw, 20px)',
                borderRadius: 8,
                border: 'none',
                fontSize: 'clamp(12px, 2.5vw, 13px)',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: tab === t ? '#2563EB' : 'transparent',
                color: tab === t ? 'white' : '#64748B',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {t === 'global' ? 'Global Roles' : 'Per-Client Overrides'}
            </button>
          ))}
        </div>

        {/* Client Selector */}
        {tab === 'overrides' && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <label style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 500, color: '#475569' }}>Client:</label>
            <div className="relative">
              <select
                value={selectedClient}
                onChange={e => setSelectedClient(e.target.value)}
                style={{ 
                  appearance: 'none', 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: 8, 
                  padding: 'clamp(6px, 1.5vw, 7px) clamp(28px, 6vw, 32px) clamp(6px, 1.5vw, 7px) clamp(10px, 2vw, 12px)', 
                  fontSize: 'clamp(12px, 2.5vw, 13px)', 
                  color: '#0F172A', 
                  cursor: 'pointer',
                  width: '100%',
                  minWidth: 'clamp(130px, 30vw, 160px)'
                }}
              >
                <option>All Clients</option>
                <option>SKNLP</option>
                <option>JLP</option>
                <option>BLP</option>
              </select>
              <ChevronDown size={13} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Search + Add - FIXED: Search icon now properly visible */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 sm:mb-5">
          <div className="relative flex-1 min-w-[0] sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={14} className="text-slate-400" />
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Search roles..."
              style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              backgroundColor: '#2563EB', 
              color: 'white', 
              border: 'none', 
              borderRadius: 'clamp(8px, 2vw, 10px)', 
              padding: 'clamp(8px, 2vw, 9px) clamp(14px, 3vw, 16px)', 
              fontSize: 'clamp(12px, 2.5vw, 13px)', 
              fontWeight: 600, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 6,
              whiteSpace: 'nowrap'
            }}
          >
            <Plus size={14} /> New Role
          </button>
        </div>

        {/* Permissions Matrix Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 'clamp(700px, 100%, 900px)' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 20px)', textAlign: 'left', fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: 700, color: '#475569', width: 'clamp(180px, 25vw, 220px)' }}>
                    Role
                  </th>
                  {PERMISSION_COLS.map(col => (
                    <th key={col} style={{ padding: 'clamp(10px, 2vw, 12px) clamp(8px, 1.5vw, 16px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
                      {col}
                    </th>
                  ))}
                  <th style={{ padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)', textAlign: 'center', fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, idx) => (
                  <tr key={role.id} style={{ borderBottom: idx < filteredRoles.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 20px)' }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div style={{ width: 'clamp(6px, 1.5vw, 8px)', height: 'clamp(6px, 1.5vw, 8px)', borderRadius: '50%', backgroundColor: role.color, flexShrink: 0 }} />
                        <div className="min-w-0">
                          <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 600, color: '#0F172A', margin: 0 }}>{role.name}</p>
                          <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: '#94A3B8', marginTop: 2 }}>{role.users} users</p>
                        </div>
                      </div>
                    </td>
                    {PERMISSION_COLS.map(col => (
                      <td key={col} style={{ padding: 'clamp(10px, 2vw, 14px) clamp(6px, 1.5vw, 16px)', textAlign: 'center' }}>
                        <div className="flex justify-center">
                          <PermBadge
                            val={perms[role.slug]?.[col] ?? 'none'}
                            onChange={v => setPerms(p => ({ ...p, [role.slug]: { ...p[role.slug], [col]: v } }))}
                          />
                        </div>
                      </td>
                    ))}
                    <td style={{ padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 16px)', textAlign: 'center' }}>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <button style={{ 
                          background: '#EFF6FF', 
                          border: 'none', 
                          borderRadius: 6, 
                          padding: 'clamp(4px, 1.5vw, 5px) clamp(6px, 1.5vw, 8px)', 
                          cursor: 'pointer', 
                          color: '#2563EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          <Edit2 size={13} />
                        </button>
                        <button style={{ 
                          background: '#F8FAFC', 
                          border: 'none', 
                          borderRadius: 6, 
                          padding: 'clamp(4px, 1.5vw, 5px) clamp(6px, 1.5vw, 8px)', 
                          cursor: 'pointer', 
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          <Copy size={13} />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(role.id)}
                          style={{ 
                            background: '#FEF2F2', 
                            border: 'none', 
                            borderRadius: 6, 
                            padding: 'clamp(4px, 1.5vw, 5px) clamp(6px, 1.5vw, 8px)', 
                            cursor: 'pointer', 
                            color: '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-5">
          {[
            { val: 'edit', label: 'Full Edit Access', bg: '#DBEAFE', color: '#1D4ED8', border: '#93C5FD' },
            { val: 'view', label: 'View Only', bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
            { val: 'none', label: 'No Access', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
          ].map(l => (
            <div key={l.val} className="flex items-center gap-1.5 sm:gap-2">
              <span style={{ 
                background: l.bg, 
                color: l.color, 
                border: `1px solid ${l.border}`, 
                borderRadius: 6, 
                padding: 'clamp(2px, 1vw, 3px) clamp(6px, 1.5vw, 10px)', 
                fontSize: 'clamp(10px, 2vw, 11px)', 
                fontWeight: 600 
              }}>
                {l.val === 'none' ? '—' : l.val === 'view' ? 'View' : 'Edit'}
              </span>
              <span style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: '#64748B' }}>{l.label}</span>
            </div>
          ))}
          <span style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: '#94A3B8' }} className="hidden sm:inline">
            Click any badge to cycle permissions
          </span>
        </div>
      </div>

      {/* Add Role Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Create New Role</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  placeholder="e.g., Regional Manager"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Role Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newRoleColor}
                    onChange={e => setNewRoleColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={newRoleColor}
                    onChange={e => setNewRoleColor(e.target.value)}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRole}
                  disabled={!newRoleName.trim()}
                  className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setDeleteConfirm(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Role</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete this role? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteRole(deleteConfirm)}
                  className="flex-1 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}