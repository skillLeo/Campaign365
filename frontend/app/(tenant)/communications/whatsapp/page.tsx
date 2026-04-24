'use client';
import { useState } from 'react';

const CONVERSATIONS = [
  { id: 1, name: 'John Doe',         time: '0:34 Am',  online: true,  group: false },
  { id: 2, name: 'John Doe',         time: '0:49 Am',  online: true,  group: false },
  { id: 3, name: 'Jane Smith',       time: '10:39 Am', online: false, group: false },
  { id: 4, name: 'SKNLP Supporters', time: '0:49 Am',  online: true,  group: true  },
  { id: 5, name: 'SKNLP Supporters', time: '0:37 Am',  online: true,  group: true  },
  { id: 6, name: 'SKNLP Supporters', time: '0:45 Am',  online: true,  group: true  },
  { id: 7, name: 'SKNLP Supporters', time: '0:45 Am',  online: false, group: true  },
];

const TEMPLATES = [
  'VoteYes2023', 'EventReminder', 'EventReminder',
  'Policy Rempindes', 'Policy Camplates', 'PolicyUpdate', 'PolicyUpdate', 'PolicyUpdate',
];

const CHAT = [
  { from: 'a', text: 'Wor tedilisher chtre✅',          time: '3:44' },
  { from: 'b', text: 'How?? 👍',                         time: '3:46' },
  { from: 'a', text: 'SKNLP Official\nNow cwpun!😊',     time: '3:44' },
  { from: 'a', text: 'SKNLP Official\nFlom Stop Yonu',   time: '3:4'  },
  { from: 'b', text: 'St. Kitnevis Centre',               time: '3:32' },
  { from: 'b', text: 'Hon teryou😊',                      time: '3:4'  },
  { from: 'a', text: 'SKNLP Supporters for\nLabour Party 🎉', time: '22:30' },
];

function PhoneMockup() {
  return (
    <div style={{
      width: 196, borderRadius: 28,
      border: '2.5px solid #2a2a2a',
      overflow: 'hidden', flexShrink: 0,
      boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
      background: '#111',
    }}>
      {/* Status + chat header */}
      <div style={{ background: '#DC143C' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 12px 2px' }}>
          <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>3:21</span>
          <span style={{ color: 'white', fontSize: 8 }}>▲▲ 📶</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>←</span>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>S</div>
          <div>
            <p style={{ color: 'white', fontSize: 9, fontWeight: 700, margin: 0 }}>SKNLP Official</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 7.5, margin: 0 }}>On AILD</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
            <span style={{ color: 'white', fontSize: 9 }}>📹</span>
            <span style={{ color: 'white', fontSize: 9 }}>📞</span>
            <span style={{ color: 'white', fontSize: 9 }}>⋮</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        background: '#E5DDD5',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        padding: '8px 6px', minHeight: 268,
        display: 'flex', flexDirection: 'column', gap: 4,
        overflowY: 'hidden',
      }}>
        {CHAT.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'a' ? 'flex-start' : 'flex-end' }}>
            <div style={{
              maxWidth: '78%',
              background: m.from === 'a' ? 'white' : '#DCF8C6',
              borderRadius: m.from === 'a' ? '0 7px 7px 7px' : '7px 0 7px 7px',
              padding: '3px 6px 2px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}>
              {m.from === 'a' && <p style={{ color: '#DC143C', fontSize: 7, fontWeight: 700, margin: '0 0 1px' }}>SKNLP Official</p>}
              <p style={{ color: '#222', fontSize: 7.5, margin: 0, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{m.text}</p>
              <p style={{ color: '#9BA3AA', fontSize: 6, margin: '1px 0 0', textAlign: 'right' }}>{m.time} ✓✓</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ background: '#F0F0F0', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ flex: 1, background: 'white', borderRadius: 16, padding: '4px 8px', fontSize: 7.5, color: '#9BA3AA' }}>@ Message</div>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>🎤</div>
      </div>
    </div>
  );
}

export default function WhatsAppPage() {
  const [selected, setSelected] = useState(1);

  return (
    <div style={{ backgroundColor: '#0A0F1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'linear-gradient(90deg,rgba(220,20,60,0.15) 0%,transparent 55%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>WhatsApp Messaging</h1>
        <button style={{
          background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
          padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
        }}>Start New WhatsApp Campaign</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 14, padding: '14px 20px 10px' }}>
        {[
          { label: 'Messages Sent Today:', value: '892', icon: '💬' },
          { label: 'Response Rate:', value: '42%', extra: 'Arp' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 4px' }}>{s.label}</p>
              <p style={{ color: 'white', fontSize: 32, fontWeight: 900, margin: 0, lineHeight: 1 }}>{s.value}</p>
            </div>
            {s.icon && <span style={{ fontSize: 36 }}>{s.icon}</span>}
            {s.extra && (
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94A3B8', fontSize: 11, fontWeight: 600,
              }}>{s.extra}</div>
            )}
          </div>
        ))}
      </div>

      {/* 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr 210px', minWidth: 'max-content', margin: '0 20px 20px', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Conversation list */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {CONVERSATIONS.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '10px 12px', cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                backgroundColor: selected === c.id ? 'rgba(220,20,60,0.13)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: c.group ? 'linear-gradient(135deg,#7C1010,#DC143C)' : 'linear-gradient(135deg,#1E3A5F,#0a1628)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 15, fontWeight: 700,
                }}>{c.group ? '👥' : c.name.charAt(0)}</div>
                <div style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 9, height: 9, borderRadius: '50%',
                  backgroundColor: c.online ? '#4ADE80' : '#DC143C',
                  border: '1.5px solid #0A0F1C',
                }} />
              </div>
              <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
              <span style={{ color: '#475569', fontSize: 10, flexShrink: 0 }}>{c.time}</span>
            </div>
          ))}
          <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%',
              background: 'linear-gradient(135deg,#25D366,#128C7E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
            }}>💬</div>
          </div>
        </div>

        {/* Center phone preview */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px 0',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}>
          <PhoneMockup />
        </div>

        {/* Templates */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px' }}>
          <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 10px' }}>WhatsApp Templates</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {TEMPLATES.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(255,255,255,0.05)', borderRadius: 7,
                padding: '7px 9px', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#1E3A5F,#0a1628)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0,
                }}>🟢</div>
                <span style={{ color: '#C9D1DA', fontSize: 11.5 }}>{t}</span>
              </div>
            ))}
            <button style={{
              marginTop: 6, width: '100%', background: '#DC143C', color: 'white',
              border: 'none', borderRadius: 7, padding: '10px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
            }}>Compose Broadcast</button>
          </div>
        </div>
      </div>
    </div>
  );
}
