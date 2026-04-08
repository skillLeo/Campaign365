'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Download, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const CHECKLIST = [
  { key: 'gps', label: 'GPS enabled', done: true },
  { key: 'offline', label: 'List downloaded (offline ready)', done: true },
  { key: 'tiles', label: 'Map tiles cached', done: true },
  { key: 'voice', label: 'Voice notes ready', done: true },
];

export default function ActivateList() {
  const router = useRouter();
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    setActivating(true);
    setTimeout(() => { setActivating(false); setActivated(true); }, 1800);
  };

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/canvasser/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Activate Walk List</h2>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
          {/* Party logo */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#fff', fontSize: 18, fontWeight: 900 }}>SK</div>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>SKNLP</p>
            <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0' }}>St. Kitts &amp; Nevis Labour Party</p>
          </div>

          {/* List details */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '16px', marginBottom: 16, border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>Basseterre Urban Walk List</p>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 12px' }}>127 voters · St. Christopher 1</p>
            {/* Map preview */}
            <div style={{ backgroundColor: '#EFF6FF', borderRadius: 10, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <svg viewBox="0 0 200 80" style={{ width: '100%', height: 80 }}>
                <rect width="200" height="80" fill="#BFDBFE" />
                <ellipse cx="100" cy="40" rx="70" ry="28" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                <polyline points="50,40 80,30 120,35 160,28" stroke="#E30613" strokeWidth="2" fill="none" strokeDasharray="5,3" />
                {[50,80,120,160].map((x,i) => <circle key={i} cx={x} cy={[40,30,35,28][i]} r="5" fill={i===1?'#E30613':'#16A34A'} />)}
              </svg>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['127', 'Stops'], ['4.2km', 'Distance'], ['2h15', 'Est. Time']].map(([v, l]) => (
                <div key={l} style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>{v}</p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: '1px 0 0' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '16px', marginBottom: 16, border: '1px solid #F1F5F9' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Pre-Activation Checklist</p>
            {CHECKLIST.map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: item.done ? '#DCFCE7' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.done ? <Check size={13} color="#16A34A" /> : <AlertCircle size={13} color="#D97706" />}
                </div>
                <span style={{ fontSize: 13, color: item.done ? '#0F172A' : '#D97706', fontWeight: item.done ? 500 : 600 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{ backgroundColor: '#FEF9C3', borderRadius: 10, padding: '10px 12px', marginBottom: 16, display: 'flex', gap: 8 }}>
            <AlertCircle size={14} color="#CA8A04" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: '#92400E', margin: 0 }}>Once activated, HQ will see you as active on the live map.</p>
          </div>

          {activated && (
            <div style={{ backgroundColor: '#DCFCE7', borderRadius: 12, padding: '14px', marginBottom: 16, textAlign: 'center', border: '1px solid #BBF7D0' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#16A34A', margin: '0 0 4px' }}>✅ List Activated!</p>
              <p style={{ fontSize: 12, color: '#166534', margin: 0 }}>HQ can now see you on the live map. Good luck!</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ padding: '12px 16px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <button onClick={activated ? () => router.push('/mobile/canvasser/route-map') : handleActivate} disabled={activating}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: activating ? 'not-allowed' : 'pointer', backgroundColor: activated ? '#16A34A' : '#16A34A', color: '#fff', fontSize: 14, fontWeight: 800 }}>
            {activating ? 'Activating...' : activated ? '▶ Start Canvassing' : '▶ Activate List'}
          </button>
          <button style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Download size={14} /> Download for Offline
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
