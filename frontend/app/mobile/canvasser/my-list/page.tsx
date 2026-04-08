'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, SlidersHorizontal, Home, LayoutList, Map, User } from 'lucide-react';
import { useState } from 'react';

const VOTERS = [
  { id: 1, house: '14', street: 'Church Street', name: 'Patricia Henry', result: 'Supporter', distance: '0.1 km', color: '#16A34A' },
  { id: 2, house: '18', street: 'Church Street', name: 'Calvin Thomas', result: 'Not Home', distance: '0.1 km', color: '#94A3B8' },
  { id: 3, house: '22', street: 'Church Street', name: 'Desmond Clarke', result: 'Undecided', distance: '0.2 km', color: '#F59E0B' },
  { id: 4, house: '27', street: 'Bay Road', name: 'Josephine Williams', result: null, distance: '0.3 km', color: '#64748B' },
  { id: 5, house: '31', street: 'Bay Road', name: 'Ronald Baptiste', result: null, distance: '0.4 km', color: '#64748B' },
  { id: 6, house: '35', street: 'Bay Road', name: 'Sandra Morton', result: 'Refused', distance: '0.4 km', color: '#DC2626' },
  { id: 7, house: '12', street: 'Fort Street', name: 'Yvonne Francis', result: null, distance: '0.5 km', color: '#64748B' },
  { id: 8, house: '16', street: 'Fort Street', name: 'George Daniel', result: 'Opposition', distance: '0.6 km', color: '#DC2626' },
  { id: 9, house: '19', street: 'Fort Street', name: 'Michelle Phipps', result: 'Supporter', distance: '0.6 km', color: '#16A34A' },
  { id: 10, house: '3', street: 'Independence Sq', name: 'Marcus Williams', result: null, distance: '0.8 km', color: '#64748B' },
  { id: 11, house: '7', street: 'Independence Sq', name: 'Eleanor James', result: null, distance: '0.9 km', color: '#64748B' },
  { id: 12, house: '15', street: 'Cayon Street', name: 'Terence Brown', result: null, distance: '1.0 km', color: '#64748B' },
  { id: 13, house: '21', street: 'Cayon Street', name: 'Sylvia Moore', result: null, distance: '1.1 km', color: '#64748B' },
  { id: 14, house: '28', street: 'Central Street', name: 'Oscar Joseph', result: null, distance: '1.2 km', color: '#64748B' },
  { id: 15, house: '33', street: 'Central Street', name: 'Veronica Lake', result: null, distance: '1.3 km', color: '#64748B' },
];

const FILTERS = ['All', 'Not Visited', 'Not Home', 'Refused', 'Supporter'];

export default function MyList() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = VOTERS.filter(v => {
    const matchSearch = search === '' || v.name.toLowerCase().includes(search.toLowerCase()) || v.street.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ||
      (filter === 'Not Visited' && v.result === null) ||
      (filter === 'Not Home' && v.result === 'Not Home') ||
      (filter === 'Refused' && v.result === 'Refused') ||
      (filter === 'Supporter' && v.result === 'Supporter');
    return matchSearch && matchFilter;
  });

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px 0', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <button onClick={() => router.push('/mobile/canvasser/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>My Voter List</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Basseterre Urban · 127 stops</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <SlidersHorizontal size={18} color="#64748B" />
            </button>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search voters..."
              style={{ width: '100%', padding: '9px 12px 9px 34px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#0F172A', backgroundColor: '#F8FAFC' }} />
          </div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, scrollbarWidth: 'none' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: filter === f ? '#E30613' : '#F1F5F9', color: filter === f ? '#fff' : '#64748B' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
          {filtered.map(v => (
            <button key={v.id} onClick={() => router.push('/mobile/canvasser/door-knock')}
              style={{ width: '100%', backgroundColor: '#fff', border: '1px solid #F1F5F9', borderRadius: 12, padding: '12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: v.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: v.color }}>{v.house}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>{v.house} {v.street} · {v.distance}</p>
              </div>
              {v.result
                ? <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, backgroundColor: v.color + '18', color: v.color, flexShrink: 0 }}>{v.result}</span>
                : <span style={{ fontSize: 10, color: '#CBD5E1', flexShrink: 0 }}>Not visited</span>
              }
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>No voters found</p>
              <p style={{ fontSize: 12 }}>Try a different search or filter</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ backgroundColor: '#fff', padding: '10px 16px 6px', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#64748B' }}>47 of 127 completed</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E30613' }}>68%</span>
          </div>
          <div style={{ height: 5, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', backgroundColor: '#E30613', borderRadius: 3 }} />
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', href: '/mobile/canvasser/home' },
            { icon: LayoutList, label: 'My List', href: '/mobile/canvasser/my-list', active: true },
            { icon: Map, label: 'Map', href: '/mobile/canvasser/route-map' },
            { icon: User, label: 'Profile', href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={(n as any).active ? '#E30613' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: (n as any).active ? 700 : 500, color: (n as any).active ? '#E30613' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
