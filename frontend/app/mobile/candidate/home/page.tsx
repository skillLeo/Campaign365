'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { CalendarDays, MapPin, Users, Shield, Home, Calendar, LayoutList } from 'lucide-react';
import { useState } from 'react';

export default function CandidateHome() {
  const router = useRouter();
  const [gpsOn, setGpsOn] = useState(true);

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1B69 100%)', padding: '20px 16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Candidate Portal</p>
              <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 900, margin: '2px 0 0', lineHeight: 1.2 }}>Hon. Dr. Terrence Drew</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: '3px 0 0' }}>Prime Minister Candidate · SKNLP</p>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 900 }}>TD</div>
          </div>
          {/* Date + next event */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, margin: 0 }}>Tuesday, April 8, 2026</p>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, margin: '2px 0 0' }}>Next event in 1h 30m</p>
              </div>
              <div style={{ backgroundColor: '#E30613', borderRadius: 8, padding: '4px 10px' }}>
                <p style={{ color: '#fff', fontSize: 11, fontWeight: 700, margin: 0 }}>3 today</p>
              </div>
            </div>
          </div>
          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
            {[['3', 'Events Today'], ['7', 'Communities'], ['124', 'Voters Met']].map(([v, l]) => (
              <div key={l} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>{v}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, margin: '2px 0 0' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* Next Event */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 12, border: '2px solid #E30613', boxShadow: '0 2px 8px rgba(227,6,19,0.08)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#E30613', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Next Event · 3:30 PM</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>Community Walk-through</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
              <MapPin size={12} color="#94A3B8" />
              <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Basseterre Market Area · Attending: Campaign team (8)</p>
            </div>
            <button onClick={() => router.push('/mobile/candidate/schedule')} style={{ width: '100%', padding: '9px', borderRadius: 10, border: 'none', backgroundColor: '#E30613', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              View Full Schedule →
            </button>
          </div>

          {/* GPS toggle */}
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 12, border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Location visible to party leadership</p>
              <p style={{ fontSize: 11, color: gpsOn ? '#16A34A' : '#94A3B8', margin: '1px 0 0' }}>{gpsOn ? '● Sharing live · 17.2948° N' : 'Location sharing off'}</p>
            </div>
            <button onClick={() => setGpsOn(g => !g)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: gpsOn ? '#16A34A' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: gpsOn ? 23 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>

          {/* Security */}
          <div style={{ backgroundColor: '#DCFCE7', borderRadius: 12, padding: '12px 14px', marginBottom: 12, border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={16} color="#16A34A" style={{ flexShrink: 0 }} />
            <div style={{ marginLeft: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#166534', margin: 0 }}>Security Status: All Clear</p>
              <p style={{ fontSize: 11, color: '#16A34A', margin: '1px 0 0' }}>Security team assigned · 2 officers nearby</p>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { icon: CalendarDays, label: 'My Schedule', href: '/mobile/candidate/schedule', color: '#7C3AED' },
              { icon: LayoutList, label: 'Walk List', href: '/mobile/candidate/walk-list', color: '#16A34A' },
              { icon: Users, label: 'My Team', href: '#', color: '#2563EB' },
              { icon: Shield, label: 'Panic Alert', href: '/mobile/candidate/panic', color: '#E30613' },
            ].map(a => (
              <button key={a.label} onClick={() => router.push(a.href)} style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9', borderRadius: 12, padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a.icon size={18} color={a.color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', active: true, href: '/mobile/candidate/home' },
            { icon: Calendar, label: 'Schedule', href: '/mobile/candidate/schedule' },
            { icon: LayoutList, label: 'Walk List', href: '/mobile/candidate/walk-list' },
            { icon: Shield, label: 'Security', href: '/mobile/candidate/panic' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={n.active ? '#E30613' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? '#E30613' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
