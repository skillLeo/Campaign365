'use client';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const TREND_DATA = [
  { date: 'Srmonet', sknlp: 5000,  opp: 0 },
  { date: 'Jarean',  sknlp: 6000,  opp: 0 },
  { date: 'Jeapao',  sknlp: 18000, opp: 0 },
  { date: 'Sarpot',  sknlp: 10000, opp: 0 },
  { date: 'Hepont',  sknlp: 22000, opp: 0 },
  { date: 'Leopn',   sknlp: 9000,  opp: 0 },
  { date: 'Aoprs',   sknlp: 24000, opp: 0 },
  { date: 'Hepnt',   sknlp: 22000, opp: 0 },
];

const HISTORY_ROWS = [
  { date: '20021', party: 'SKNLP', const: 'St. Kitts Nevis', flipor: 'Labour Party', support: '1,9.69%', sample: '30,957', size: '#0F172A' },
  { date: '20022', party: 'SKNLP', const: 'St. Kitts Nevis', flipor: 'Labour Party', support: '2,080%',  sample: '20,991', size: '#0F172A' },
  { date: '20024', party: 'SKNLP', const: 'St. Kitts Nevis', flipor: 'Labour Party', support: '3,225%',  sample: '41,591', size: '#0F172A' },
];

const PAST_CARDS = [
  { label: 'Highest Support: Constituency X (88%)\nConstituency X (87%)\nConstituency (92%)' },
  { label: 'Highest Support: Constituency X (62%)\nConstituency X (80%)\nConstituency (15%)' },
  { label: 'Lowest Support: Constituency Y (42%)\nConstituency X (80%)\nConstituency (13%)' },
  { label: 'Lowest Support: Constituency Y (42%)\nConstituency X (80%)\nConstituency (183%)' },
];

function PastDonut({ pct, color }: { pct: number; color: string }) {
  const r = 36, cx = 48, cy = 48;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round" />
    </svg>
  );
}

export default function HistoricalPollingPage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Crowd photo header */}
      <div style={{
        position: 'relative', height: 80, overflow: 'hidden',
        background: 'linear-gradient(135deg,#0a1020 0%,#1a0a10 60%,#0a0818 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(220,20,60,0.2) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Back arrow */}
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 20 20" width="14" height="14"><path d="M12 4L6 10L12 16" stroke="#DC143C" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
            </div>
            <span style={{ color: '#DC143C', fontSize: 18, fontWeight: 900 }}>Campaign</span>
            <span style={{ color: '#F97316', fontSize: 18, fontWeight: 900 }}>365</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#64748B', fontSize: 12 }}>Vley | lier</span>
              <span style={{ color: '#475569', fontSize: 11 }}>▼</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>
        <h1 style={{ color: '#DC143C', fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>Historical Polling Data</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          {['Date Range: April 2026', 'All Constituencies', 'Export Report'].map((s, i) => (
            <span key={i} style={{ color: i === 2 ? '#DC143C' : '#94A3B8', fontSize: 13, cursor: i === 2 ? 'pointer' : 'default', fontWeight: i === 2 ? 700 : 400 }}>{i > 0 && <span style={{ color: '#475569', marginRight: 8 }}>•</span>}{s}</span>
          ))}
        </div>

        {/* Main 2-col */}
        <div className="rg-sidebar-r-300" style={{ gap: 16, marginBottom: 16 }}>

          {/* Left — Trend chart + table */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden',
          }}>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>Support Trend Over Time</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 10, height: 3, background: '#DC143C', borderRadius: 2 }} />
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>SKNLP</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 10, height: 3, background: '#F97316', borderRadius: 2 }} />
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>#0F12P</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={TREND_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -15 }}>
                  <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 6, fontSize: 11 }} />
                  <Line type="monotone" dataKey="sknlp" stroke="#DC143C" strokeWidth={2.5} dot={{ fill: '#DC143C', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '80px 80px 1fr 1fr 80px 80px 80px', minWidth: 'max-content',
                padding: '8px 16px', color: '#475569', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {['Date', 'Detalty', 'Constituenccy', 'Flipor', 'Support%', 'Sample', 'Sample Size'].map(h => <span key={h}>{h}</span>)}
              </div>
              {HISTORY_ROWS.map((r, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '80px 80px 1fr 1fr 80px 80px 80px', minWidth: 'max-content',
                  padding: '9px 16px', alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: i === 2 ? 'rgba(220,20,60,0.06)' : 'transparent',
                }}>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.date}</span>
                  <span style={{ color: '#DC143C', fontSize: 12, fontWeight: 700 }}>{r.party}</span>
                  <span style={{ color: '#C9D1DA', fontSize: 12 }}>{r.const}</span>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.flipor}</span>
                  <span style={{ color: '#4ADE80', fontSize: 12, fontWeight: 700 }}>{r.support}</span>
                  <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.sample}</span>
                  <span style={{ color: '#64748B', fontSize: 12 }}>{r.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — AI Insights (Grok) */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px',
          }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>AI Insights on Trends</p>
            <p style={{ color: '#64748B', fontSize: 11, margin: '0 0 12px' }}>Powered by</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
              <span style={{ color: '#DC143C', fontSize: 22, fontWeight: 900 }}>Gr</span>
              <span style={{ color: 'white', fontSize: 22, fontWeight: 900 }}>ok</span>
            </div>
            {/* AI trend mini chart */}
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={[
                { x: 'Srmonet', v: 120000 }, { x: 'Jarean', v: 10000 }, { x: 'Jeapao', v: 18000 },
                { x: 'Sarpot', v: 15000 },   { x: 'Hepont', v: 12000 }, { x: 'Leopn',  v: 8000  },
              ]} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="x" tick={{ fill: '#475569', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 8 }} axisLine={false} tickLine={false} />
                <Line type="monotone" dataKey="v" stroke="#DC143C" strokeWidth={2} dot={{ fill: '#DC143C', r: 3, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
            {/* Map pins with flags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[
                { flag: '🇬🇾', label: 'Basseterre', val: '120k' },
                { flag: '🔴', label: 'Sandy Point', val: '18k'  },
                { flag: '🇫🇷', label: 'Cayon',      val: '13k'  },
                { flag: '🇬🇾', label: 'Nevis',      val: '5k'   },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{p.flag}</span>
                  <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                    <div style={{ width: `${parseInt(p.val) / 120 * 100}%`, height: '100%', background: '#DC143C', borderRadius: 2 }} />
                  </div>
                  <span style={{ color: '#64748B', fontSize: 10, width: 28, textAlign: 'right' }}>{p.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Past Poll Cards */}
        <div className="rg-4" style={{ gap: 14 }}>
          {PAST_CARDS.map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
              <p style={{ color: 'white', fontSize: 12, fontWeight: 700, margin: 0 }}>Past Poll Card</p>
              <PastDonut pct={i < 2 ? 72 : 42} color={i < 2 ? '#DC143C' : '#D4A017'} />
              <div style={{ width: '100%' }}>
                {card.label.split('\n').map((line, li) => (
                  <p key={li} style={{ color: '#64748B', fontSize: 10, margin: '0 0 2px' }}>{line}</p>
                ))}
              </div>
              <button style={{
                background: '#DC143C', color: 'white', border: 'none', borderRadius: 6,
                padding: '6px 16px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(220,20,60,0.4)', width: '100%',
              }}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
