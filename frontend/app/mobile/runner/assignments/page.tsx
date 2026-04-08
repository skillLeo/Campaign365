'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Navigation, CheckCircle, Truck, Package, Clock, List } from 'lucide-react';
import { useState } from 'react';

const TABS = ['Pickups', 'Deliveries', 'Completed'];

const PICKUPS = [
  { id: 1, name: 'Mary Johnson', address: '24 Central St, Basseterre', time: '2:00 PM', people: 1, status: 'Pending', urgent: true },
  { id: 2, name: 'George & Rita Clarke', address: '8 Fort Street, Basseterre', time: '3:00 PM', people: 2, status: 'Pending', urgent: false },
  { id: 3, name: 'Veronica Phipps', address: '15 Cayon Street, Basseterre', time: '3:30 PM', people: 1, status: 'En Route', urgent: false },
  { id: 4, name: 'Oscar Thomas', address: '22 West Independence', time: '4:00 PM', people: 1, status: 'Pending', urgent: false },
  { id: 5, name: 'Eleanor & Charles James', address: '6 Church Street, Basseterre', time: '4:30 PM', people: 3, status: 'Pending', urgent: false },
];

const COMPLETED = [
  { id: 6, name: 'Michael Clarke', address: '12 Bay Rd', time: '9:00 AM', people: 2, status: 'Completed' },
  { id: 7, name: 'Sandra James', address: '7 Fort St', time: '10:30 AM', people: 1, status: 'Completed' },
  { id: 8, name: 'Robert Baptiste', address: '33 Church St', time: '12:00 PM', people: 3, status: 'Completed' },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Pending: { bg: '#FEF9C3', color: '#CA8A04' },
  'En Route': { bg: '#DBEAFE', color: '#2563EB' },
  Completed: { bg: '#DCFCE7', color: '#16A34A' },
  Missed: { bg: '#FEE2E2', color: '#DC2626' },
};

export default function Assignments() {
  const router = useRouter();
  const [tab, setTab] = useState('Pickups');

  const data = tab === 'Pickups' ? PICKUPS : tab === 'Completed' ? COMPLETED : [];

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px 0', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <button onClick={() => router.push('/mobile/runner/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>My Assignments</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Election Day · 7 pending</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ flex: 1, padding: '9px 0', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: 12, fontWeight: tab === t ? 700 : 500, color: tab === t ? '#1E40AF' : '#94A3B8', borderBottom: `2px solid ${tab === t ? '#1E40AF' : 'transparent'}`, transition: 'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {tab === 'Deliveries' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Package size={36} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>No deliveries assigned</p>
              <p style={{ fontSize: 12, color: '#CBD5E1' }}>Deliveries will appear here when assigned by HQ</p>
            </div>
          )}
          {data.map(item => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', marginBottom: 8, border: (item as any).urgent ? '2px solid #E30613' : '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {(item as any).urgent && <span style={{ fontSize: 9, fontWeight: 700, color: '#E30613', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 2 }}>🚨 URGENT</span>}
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: '#64748B', margin: '1px 0 0' }}>{item.address}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, backgroundColor: statusStyle[item.status].bg, color: statusStyle[item.status].color, display: 'block', marginBottom: 3 }}>{item.status}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                    <Clock size={10} color="#94A3B8" />
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{item.time}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 10px' }}>👥 {item.people} person{item.people > 1 ? 's' : ''} to transport</p>
              {item.status !== 'Completed' && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => router.push('/mobile/runner/navigation')} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', backgroundColor: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Navigation size={12} /> Navigate
                  </button>
                  <button onClick={() => router.push('/mobile/runner/pickup-complete')} style={{ flex: 1, padding: '9px', borderRadius: 9, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#374151', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <CheckCircle size={12} /> Complete
                  </button>
                </div>
              )}
              {item.status === 'Completed' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} color="#16A34A" />
                  <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>Delivered to polling station</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Truck, label: 'Home', href: '/mobile/runner/home' },
            { icon: List, label: 'Assignments', href: '/mobile/runner/assignments', active: true },
            { icon: Package, label: 'Deliveries', href: '#' },
            { icon: Navigation, label: 'Map', href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={(n as any).active ? '#1E40AF' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: (n as any).active ? 700 : 500, color: (n as any).active ? '#1E40AF' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
