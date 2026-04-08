'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Map, Mic, RefreshCw, LayoutList, ChevronRight, Shield, Home, User, Target } from 'lucide-react';

export default function CanvasserHome() {
  const router = useRouter();
  const stats = [
    { label: 'Doors Knocked', value: 47, color: '#16A34A' },
    { label: 'Contacts Made', value: 31, color: '#2563EB' },
    { label: 'Voice Notes', value: 12, color: '#7C3AED' },
    { label: 'Zone Progress', value: '68%', color: '#E30613' },
  ];
  const quickActions = [
    { icon: Target, label: 'Start Canvassing', color: '#16A34A', href: '/mobile/canvasser/my-list' },
    { icon: Map, label: 'View Route', color: '#2563EB', href: '/mobile/canvasser/route-map' },
    { icon: Mic, label: 'Voice Notes', color: '#7C3AED', href: '/mobile/canvasser/voice-note' },
    { icon: RefreshCw, label: 'Sync Data', color: '#F59E0B', href: '#' },
  ];
  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #E30613 0%, #B30000 100%)', padding: '20px 20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0 }}>Good Morning</p>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '2px 0 0' }}>Marcus James</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '2px 0 0' }}>Senior Canvasser · SKNLP</p>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800 }}>MJ</div>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
            {stats.map(s => (
              <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 12px' }}>
                <p style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, margin: '3px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px', flex: 1 }}>
          {/* Active List */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Basseterre Urban — 127 stops</p>
                <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0' }}>St. Christopher 1 · Active list</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, backgroundColor: '#DCFCE7', color: '#16A34A' }}>ACTIVE</span>
            </div>
            <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '68%', backgroundColor: '#E30613', borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>47/127 completed · 68%</p>
              <button onClick={() => router.push('/mobile/canvasser/activate-list')} style={{ fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: '#E30613', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>
                Activate List
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Quick Actions</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {quickActions.map(a => (
              <button key={a.label} onClick={() => router.push(a.href)} style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a.icon size={16} color={a.color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Recent activity */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 14 }}>Recent Activity</p>
          {[
            { name: 'Patricia Henry', address: '14 Church St', result: 'Supporter', color: '#16A34A' },
            { name: 'Calvin Thomas', address: '18 Church St', result: 'Not Home', color: '#94A3B8' },
            { name: 'Desmond Clarke', address: '22 Bay Rd', result: 'Undecided', color: '#F59E0B' },
          ].map((a, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #F1F5F9' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', margin: 0 }}>{a.name}</p>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: '1px 0 0' }}>{a.address}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, backgroundColor: a.color + '18', color: a.color }}>{a.result}</span>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', active: true, href: '/mobile/canvasser/home' },
            { icon: LayoutList, label: 'My List', active: false, href: '/mobile/canvasser/my-list' },
            { icon: Map, label: 'Map', active: false, href: '/mobile/canvasser/route-map' },
            { icon: User, label: 'Profile', active: false, href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={n.active ? '#E30613' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? '#E30613' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Panic Button */}
      <button onClick={() => router.push('/mobile/canvasser/panic')} style={{ position: 'fixed', bottom: 90, right: 20, width: 52, height: 52, borderRadius: '50%', backgroundColor: '#E30613', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(227,6,19,0.5)', zIndex: 100 }}>
        <Shield size={22} color="#fff" />
      </button>
    </MobilePageWrapper>
  );
}
