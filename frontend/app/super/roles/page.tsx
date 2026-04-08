'use client';
import { useState } from 'react';
import { Search, Plus, Edit2, Copy, Bell, ChevronDown, Check, X } from 'lucide-react';
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
      style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}`, borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', minWidth: 50 }}
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

  const filteredRoles = ROLES.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Dashboard › Roles &amp; Permissions</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>User Roles &amp; Permissions</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
          </button>
          <button style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Copy size={14} /> Copy to Custom Role
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#2563EB' }}>
            {user?.name?.charAt(0) || 'S'}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {(['global', 'overrides'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '7px 20px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                backgroundColor: tab === t ? '#2563EB' : 'transparent',
                color: tab === t ? 'white' : '#64748B',
              }}
            >
              {t === 'global' ? 'Global Roles' : 'Per-Client Overrides'}
            </button>
          ))}
        </div>

        {tab === 'overrides' && (
          <div className="flex items-center gap-3 mb-5">
            <label style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>Client:</label>
            <div className="relative">
              <select
                value={selectedClient}
                onChange={e => setSelectedClient(e.target.value)}
                style={{ appearance: 'none', backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 32px 7px 12px', fontSize: 13, color: '#0F172A', cursor: 'pointer' }}
              >
                <option>All Clients</option>
                <option>SKNLP</option>
                <option>JLP</option>
                <option>BLP</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Search + Add */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400"
              placeholder="Search roles..."
              style={{ width: 220 }}
            />
          </div>
          <button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={14} /> New Role
          </button>
        </div>

        {/* Permissions Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569', width: 220 }}>Role</th>
                  {PERMISSION_COLS.map(col => (
                    <th key={col} style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#475569' }}>{col}</th>
                  ))}
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#475569' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, idx) => (
                  <tr key={role.id} style={{ borderBottom: idx < filteredRoles.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: role.color, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{role.name}</p>
                          <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{role.users} users</p>
                        </div>
                      </div>
                    </td>
                    {PERMISSION_COLS.map(col => (
                      <td key={col} style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <PermBadge
                          val={perms[role.slug]?.[col] ?? 'none'}
                          onChange={v => setPerms(p => ({ ...p, [role.slug]: { ...p[role.slug], [col]: v } }))}
                        />
                      </td>
                    ))}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <div className="flex items-center justify-center gap-2">
                        <button style={{ background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#2563EB' }}>
                          <Edit2 size={13} />
                        </button>
                        <button style={{ background: '#F8FAFC', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#64748B' }}>
                          <Copy size={13} />
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
        <div className="flex items-center gap-6 mt-4">
          {[
            { val: 'edit', label: 'Full Edit Access', bg: '#DBEAFE', color: '#1D4ED8', border: '#93C5FD' },
            { val: 'view', label: 'View Only', bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
            { val: 'none', label: 'No Access', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
          ].map(l => (
            <div key={l.val} className="flex items-center gap-2">
              <span style={{ background: l.bg, color: l.color, border: `1px solid ${l.border}`, borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                {l.val === 'none' ? '—' : l.val === 'view' ? 'View' : 'Edit'}
              </span>
              <span style={{ fontSize: 12, color: '#64748B' }}>{l.label}</span>
            </div>
          ))}
          <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 8 }}>Click any badge to cycle permissions</span>
        </div>
      </div>
    </div>
  );
}
