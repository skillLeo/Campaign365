'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Home, CheckSquare, FileText, MessageSquare, AlertTriangle, Truck, Users } from 'lucide-react';
import { useState } from 'react';

export default function OutdoorAgentHome() {
  const router = useRouter();
  const [pollsOpen, setPollsOpen] = useState(true);

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', padding: '18px 16px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Outdoor Agent</p>
              <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 900, margin: '2px 0 0' }}>Central Station</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: '1px 0 0' }}>Central Polling Station, Basseterre · B-001</p>
            </div>
            <div>
              <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800, marginBottom: 4 }}>JD</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ADE80' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>LIVE</span>
              </div>
            </div>
          </div>
          {/* Polls status */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ color: '#fff', fontSize: 12, fontWeight: 700, margin: 0 }}>Polls Status</p>
              <p style={{ color: pollsOpen ? '#4ADE80' : '#FCA5A5', fontSize: 11, margin: '1px 0 0' }}>{pollsOpen ? '● Open since 7:00 AM' : '● Closed'}</p>
            </div>
            <button onClick={() => setPollsOpen(v => !v)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', backgroundColor: pollsOpen ? '#16A34A' : '#E30613', color: '#fff', fontSize: 11, fontWeight: 700 }}>
              {pollsOpen ? 'Polls Open' : 'Polls Closed'}
            </button>
          </div>
          {/* Live stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            {[['847', 'Expected'], ['312', 'Voted'], ['36.8%', 'Rate'], ['47', 'Last Hr']].map(([v, l]) => (
              <div key={l} style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 4px', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: 14, fontWeight: 900, margin: 0, lineHeight: 1 }}>{v}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, margin: '2px 0 0' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <button onClick={() => router.push('/mobile/outdoor-agent/turnout-report')}
              style={{ backgroundColor: '#D97706', borderRadius: 14, padding: '16px 12px', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(217,119,6,0.3)' }}>
              <FileText size={24} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Quick Report</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Send to HQ now</span>
            </button>
            <button onClick={() => router.push('/mobile/outdoor-agent/voter-tickoff')}
              style={{ backgroundColor: '#1E40AF', borderRadius: 14, padding: '16px 12px', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(30,64,175,0.3)' }}>
              <CheckSquare size={24} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Voter Tick-Off</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Mark as voted</span>
            </button>
          </div>

          {/* Turnout gauge */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 12, border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Station Turnout</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#D97706' }}>36.8%</span>
            </div>
            <div style={{ height: 10, backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ height: '100%', width: '36.8%', background: 'linear-gradient(90deg, #D97706, #F59E0B)', borderRadius: 5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>312 voted</span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Target: 70%</span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>847 registered</span>
            </div>
          </div>

          {/* Runner request */}
          <button style={{ width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: '12px', border: '2px dashed #D97706', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={16} color="#D97706" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Request Runner</p>
              <p style={{ fontSize: 11, color: '#64748B', margin: '1px 0 0' }}>2 runners available nearby · 8 min ETA</p>
            </div>
          </button>

          {/* HQ connection */}
          <div style={{ backgroundColor: '#DCFCE7', borderRadius: 12, padding: '12px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A', flexShrink: 0, marginTop: 3 }} />
            <div style={{ marginLeft: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#166534', margin: 0 }}>HQ Connection: Live</p>
              <p style={{ fontSize: 11, color: '#16A34A', margin: '1px 0 0' }}>Real-time sync active · Last report: 14 min ago</p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', active: true, href: '/mobile/outdoor-agent/home' },
            { icon: CheckSquare, label: 'Tick-Off', href: '/mobile/outdoor-agent/voter-tickoff' },
            { icon: FileText, label: 'Report', href: '/mobile/outdoor-agent/turnout-report' },
            { icon: MessageSquare, label: 'Messages', href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={n.active ? '#D97706' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? '#D97706' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
