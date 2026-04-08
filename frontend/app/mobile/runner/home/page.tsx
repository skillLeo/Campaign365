'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Navigation, Package, Home, LayoutList, Map, User, Truck, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const STATUS_OPTIONS = ['Available', 'On Assignment', 'Break'];

export default function RunnerHome() {
  const router = useRouter();
  const [status, setStatus] = useState('On Assignment');
  const statusColor = { Available: '#16A34A', 'On Assignment': '#E30613', Break: '#F59E0B' }[status]!;

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)', padding: '20px 16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>Election Day</p>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '2px 0 0' }}>Runner Dashboard</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '1px 0 0' }}>Anthony Brown</p>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800 }}>AB</div>
          </div>
          {/* Status toggle */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '6px', display: 'flex', gap: 4 }}>
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{ flex: 1, padding: '7px 4px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, backgroundColor: status === s ? '#fff' : 'transparent', color: status === s ? '#1E40AF' : 'rgba(255,255,255,0.6)' }}>
                {s}
              </button>
            ))}
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
            {[['12', 'Assigned'], ['7', 'Done'], ['5', 'Pending'], ['3', 'Packages']].map(([v, l]) => (
              <div key={l} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 4px', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0, lineHeight: 1 }}>{v}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, margin: '2px 0 0' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* GPS */}
          <div style={{ backgroundColor: '#DCFCE7', borderRadius: 12, padding: '10px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #BBF7D0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#166534', margin: 0 }}>Live tracking ON</p>
              <p style={{ fontSize: 10, color: '#16A34A', margin: '1px 0 0' }}>HQ can see your location · Sharing since 7:30 AM</p>
            </div>
          </div>

          {/* Next Pickup */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 12, border: '2px solid #E30613', boxShadow: '0 2px 8px rgba(227,6,19,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#E30613', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🚨 Next Pickup — URGENT</p>
              <span style={{ fontSize: 10, backgroundColor: '#FEE2E2', color: '#E30613', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>2:00 PM</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>Mary Johnson</p>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 10px' }}>24 Central Street, Basseterre · 15 min away</p>
            <button onClick={() => router.push('/mobile/runner/navigation')} style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', backgroundColor: '#E30613', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Navigation size={14} /> Navigate Now
            </button>
          </div>

          {/* Today's summary */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Today's Pickups</p>
          {[
            { name: 'Michael Clarke', address: '12 Bay Rd', time: '9:00 AM', status: 'Completed', people: 2 },
            { name: 'Sandra James', address: '7 Fort St', time: '10:30 AM', status: 'Completed', people: 1 },
            { name: 'Robert Baptiste', address: '33 Church St', time: '12:00 PM', status: 'En Route', people: 3 },
            { name: 'Mary Johnson', address: '24 Central St', time: '2:00 PM', status: 'Pending', people: 1 },
          ].map((p, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #F1F5F9' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: p.status === 'Completed' ? '#DCFCE7' : p.status === 'En Route' ? '#DBEAFE' : '#FEF9C3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {p.status === 'Completed' ? <CheckCircle size={14} color="#16A34A" /> : p.status === 'En Route' ? <Truck size={14} color="#2563EB" /> : <Package size={14} color="#CA8A04" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', margin: 0 }}>{p.name} · {p.people} person{p.people > 1 ? 's' : ''}</p>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: '1px 0 0' }}>{p.address} · {p.time}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, backgroundColor: p.status === 'Completed' ? '#DCFCE7' : p.status === 'En Route' ? '#DBEAFE' : '#FEF9C3', color: p.status === 'Completed' ? '#16A34A' : p.status === 'En Route' ? '#2563EB' : '#CA8A04' }}>{p.status}</span>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', active: true, href: '/mobile/runner/home' },
            { icon: LayoutList, label: 'Assignments', href: '/mobile/runner/assignments' },
            { icon: Package, label: 'Deliveries', href: '#' },
            { icon: Map, label: 'Map', href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={n.active ? '#1E40AF' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? '#1E40AF' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
