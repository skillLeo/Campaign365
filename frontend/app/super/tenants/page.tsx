'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, RefreshCw, UserPlus, ChevronDown,
  ArrowUpDown, Eye, Edit2, Trash2,
} from 'lucide-react';
import { mockTenants } from '@/lib/mockData';

const MOCK_TENANTS = mockTenants.map(t => ({
  id: t.id,
  name: t.name,
  country: t.country,
  flag: t.flag,
  plan: t.plan,
  users_count: t.activeUsers,
  status: t.status,
  updated_at: t.lastActivity,
}));

function tierColor(plan: string) {
  const map: Record<string, string> = {
    'Enterprise+': '#8B5CF6',
    Enterprise: '#2563EB',
    Professional: '#3B82F6',
    Starter: '#F59E0B',
  };
  return map[plan] || '#94A3B8';
}

const ACTION_ITEMS = [
  { label: 'Export CSV',        icon: '⬇', danger: false },
  { label: 'Bulk Import',       icon: '⬆', danger: false },
  { label: 'Send Announcement', icon: '📢', danger: false },
  { label: 'Suspend All',       icon: '⛔', danger: true  },
];

function SummaryContent({ selected, onNav }: { selected: any; onNav: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 4 }}>Organization</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0 }}>{selected.name}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 6 }}>Subscription</p>
        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#fff', background: tierColor(selected.plan) }}>{selected.plan}</span>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 6 }}>Active Users</p>
        <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '8px 12px', textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#2563EB' }}>
          {(selected.users_count ?? 0).toLocaleString()}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 2 }}>
        {[
          { label: 'View Details', bg: '#2563EB', fn: () => onNav(selected.id) },
          { label: 'Edit Client',  bg: '#3B82F6', fn: () => onNav(selected.id) },
          { label: 'Suspend',      bg: '#EF4444', fn: () => {} },
        ].map((btn, i) => (
          <button key={i} onClick={btn.fn}
            style={{ width: '100%', padding: 9, borderRadius: 10, border: 'none', background: btn.bg, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TenantsPage() {
  const [tenants, setTenants]             = useState<any[]>([]);
  const [search, setSearch]               = useState('');
  const [loading, setLoading]             = useState(true);
  const [selected, setSelected]           = useState<any>(null);
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterTier, setFilterTier]       = useState('All Tiers');
  const [filterStatus, setFilterStatus]   = useState('Status');
  const [actionsOpen, setActionsOpen]     = useState(false);
  const [summaryOpen, setSummaryOpen]     = useState(false);
  const actionsRef                        = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchTenants = () => {
    setLoading(true);
    const list = search
      ? MOCK_TENANTS.filter(t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.country.toLowerCase().includes(search.toLowerCase()))
      : MOCK_TENANTS;
    setTenants(list);
    setLoading(false);
  };

  useEffect(() => { fetchTenants(); }, [search]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node))
        setActionsOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const filtered = tenants.filter(t => {
    if (filterCountry !== 'All Countries' && t.country !== filterCountry) return false;
    if (filterTier    !== 'All Tiers'     && t.plan    !== filterTier)    return false;
    if (filterStatus  !== 'Status'        && t.status  !== filterStatus.toLowerCase()) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ position: 'relative', flex: '1 1 0', minWidth: 0 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            style={{ width: '100%', boxSizing: 'border-box', background: '#F1F5F9', border: 'none', borderRadius: 10, padding: '8px 12px 8px 34px', fontSize: 13, color: '#475569', outline: 'none', fontFamily: 'inherit' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search clients..."
          />
        </div>
        <button
          onClick={() => router.push('/super/tenants/new')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: 'none', background: '#2563EB', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', flexShrink: 0 }}
        >
          <UserPlus size={14} /> Add New Client
        </button>
      </div>

      {/* Body - FIXED: proper flex layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* Main content area */}
        <div style={{ flex: 1, padding: 16, overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}>

          {/* Heading + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(15px, 2.5vw, 22px)', color: '#0F172A', letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: 1 }}>
              Clients &amp; Tenants
            </h1>
            <div style={{ position: 'relative', flexShrink: 0 }} ref={actionsRef}>
              <button
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 10, border: '1px solid #E2E8F0', background: '#fff', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                onClick={() => setActionsOpen(o => !o)}
              >
                Actions
                <ChevronDown size={13} style={{ transition: 'transform .2s', transform: actionsOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {actionsOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#fff', borderRadius: 12, border: '1px solid #F1F5F9', boxShadow: '0 8px 30px rgba(0,0,0,.10)', zIndex: 100, minWidth: 190, padding: '5px 0' }}>
                  {ACTION_ITEMS.map(item => (
                    <button
                      key={item.label}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', border: 'none', background: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', boxSizing: 'border-box', color: item.danger ? '#EF4444' : '#374151' }}
                      onClick={() => setActionsOpen(false)}
                    >
                      <span>{item.icon}</span> {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
            {[
              { v: filterCountry, set: setFilterCountry, opts: ['All Countries','Jamaica','UK','USA','Canada','St. Kitts','Barbados'] },
              { v: filterTier,    set: setFilterTier,    opts: ['All Tiers','Starter','Professional','Enterprise','Enterprise+'] },
              { v: filterStatus,  set: setFilterStatus,  opts: ['Status','Active','Inactive'] },
            ].map(f => (
              <div key={f.v} style={{ position: 'relative' }}>
                <select
                  style={{ appearance: 'none', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '7px 28px 7px 11px', fontSize: 13, color: '#475569', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
                  value={f.v}
                  onChange={e => f.set(e.target.value)}
                >
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }} />
              </div>
            ))}
            <button
              onClick={fetchTenants}
              style={{ padding: 7, borderRadius: 10, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}
            >
              <RefreshCw size={14} style={{ animation: loading ? 'tspin 1s linear infinite' : 'none' }} />
            </button>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F1F5F9', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Client</th>
                    <th className="col-country" style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Country</th>
                    <th className="col-tier" style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Tier</th>
                    <th className="col-users" style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Users</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Status</th>
                    <th className="col-activity" style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Last Activity</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.07em', whiteSpace: 'nowrap', background: '#F8FAFC' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #F8FAFC' }}>
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={j} style={{ padding: '12px 16px' }}><div style={{ height: 13, background: '#F1F5F9', borderRadius: 6 }} /></td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    filtered.map(t => (
                      <tr
                        key={t.id}
                        style={{ borderTop: '1px solid #F8FAFC', cursor: 'pointer', background: selected?.id === t.id ? '#EFF6FF' : 'transparent' }}
                        onClick={() => { setSelected(t); setSummaryOpen(true); }}
                      >
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: tierColor(t.plan), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                              {t.name.charAt(0)}
                            </div>
                            <span style={{ fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{t.name}</span>
                          </div>
                        </td>
                        <td className="col-country" style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: '#64748B' }}>{t.flag} {t.country || '—'}</td>
                        <td className="col-tier" style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#fff', background: tierColor(t.plan), display: 'inline-block' }}>{t.plan}</span>
                        </td>
                        <td className="col-users" style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: '#64748B' }}>{(t.users_count ?? 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: t.status === 'active' ? '#DCFCE7' : '#F1F5F9', color: t.status === 'active' ? '#16A34A' : '#64748B', display: 'inline-block' }}>
                            {t.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="col-activity" style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: '#94A3B8', fontSize: 12 }}>{t.updated_at || '—'}</td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <button style={{ padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, minHeight: 32, color: '#2563EB', background: '#EFF6FF' }} onClick={() => router.push(`/super/tenants/${t.id}`)} title="View Details">
                              <Eye size={16} />
                            </button>
                            <button style={{ padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, minHeight: 32, color: '#64748B', background: '#F8FAFC' }} onClick={() => router.push(`/super/tenants/${t.id}/edit`)} title="Edit Client">
                              <Edit2 size={16} />
                            </button>
                            <button style={{ padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, minHeight: 32, color: '#EF4444', background: '#FEF2F2' }} onClick={() => alert('Delete confirmation would go here')} title="Delete Client">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel - DESKTOP ONLY - FIXED: no overlap */}
        <div style={{ 
          display: window.innerWidth >= 1024 ? 'flex' : 'none',
          flexDirection: 'column', 
          width: 280, 
          flexShrink: 0, 
          borderLeft: '1px solid #F1F5F9', 
          background: '#fff',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ padding: '16px 18px', background: '#2563EB' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#fff', margin: 0 }}>Client Summary</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', margin: '2px 0 0' }}>
              {selected ? selected.name : 'Select a client'}
            </p>
          </div>
          <div style={{ flex: 1, padding: 18, overflowY: 'auto' }}>
            {selected ? (
              <SummaryContent selected={selected} onNav={id => router.push(`/super/tenants/${id}`)} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#CBD5E1', fontSize: 13, textAlign: 'center' }}>
                Click a row<br />to view details
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {summaryOpen && selected && window.innerWidth < 1024 && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 200 }} onClick={() => setSummaryOpen(false)} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '20px 20px 0 0', zIndex: 201, maxHeight: '72vh', overflowY: 'auto', animation: 'tslide .25s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E2E8F0' }} />
            </div>
            <div style={{ padding: '10px 20px 14px', borderBottom: '1px solid #F1F5F9' }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', margin: 0 }}>{selected.name}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>Client Summary</p>
            </div>
            <div style={{ padding: 20 }}>
              <SummaryContent selected={selected} onNav={id => { setSummaryOpen(false); router.push(`/super/tenants/${id}`); }} />
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes tspin { to { transform: rotate(360deg); } }
        @keyframes tslide { from { transform: translateY(100%); } to { transform: translateY(0); } }
        
        @media (max-width: 599px) {
          .col-country, .col-tier, .col-users, .col-activity { display: none; }
        }
        @media (min-width: 600px) and (max-width: 767px) {
          .col-users, .col-activity { display: none; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .col-activity { display: none; }
        }
      `}</style>
    </div>
  );
}