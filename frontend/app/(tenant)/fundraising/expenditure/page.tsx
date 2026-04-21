'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from 'recharts';

const BAR_DATA = [
  { month: 'Od', canvassing: 255000, events: 0,      travel: 0      },
  { month: 'Ab', canvassing: 0,      events: 72000,  travel: 72000  },
  { month: 'Ma', canvassing: 0,      events: 80000,  travel: 80000  },
  { month: 'Ju', canvassing: 0,      events: 55000,  travel: 55000  },
  { month: 'Jul', canvassing: 0,     events: 0,      travel: 230000 },
];

const PIE_DATA = [
  { name: 'Canvassing Materials', value: 55, color: '#DC143C' },
  { name: 'Events',               value: 25, color: '#60A5FA' },
  { name: 'Travel',               value: 20, color: '#D4A017' },
];

const EXPENSES = [
  { date: '#0F172A', item: 'Omoum', amount: '$152,500', cat: 'Categoiph', approver: 'Approver', status: 'Status' },
  { date: '#0F172A', item: 'Omoum', amount: '$152,000', cat: 'Dspegoiph', approver: 'Approver', status: 'Status' },
  { date: '#0F172A', item: 'Omoum', amount: '$152,400', cat: 'Dspegoiph', approver: 'Approver', status: 'Status' },
  { date: '#0F172A', item: 'Omoum', amount: '$167,800', cat: 'Approver',  approver: 'Approver', status: 'Status' },
];

export default function ExpenditurePage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* SKNLP seal-style logo */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🏛️</div>
          <span style={{ color: 'white', fontSize: 15, fontWeight: 800 }}>SKNLP</span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>Compliancad</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ background: 'none', border: 'none', color: '#64748B', fontSize: 18, cursor: 'pointer' }}>🔍</button>
          <div style={{ position: 'relative' }}>
            <span style={{ color: '#64748B', fontSize: 18 }}>🔔</span>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 8, fontWeight: 800 }}>1</div>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ color: '#64748B', fontSize: 18 }}>🔔</span>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
          <span style={{ color: '#64748B', fontSize: 12 }}>▼</span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>Expenditure &amp; Budget Tracking</h1>
            <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
              Total Spent <strong style={{ color: '#E2E8F0' }}>$92,450</strong> &nbsp;•&nbsp; Remaining Budget <strong style={{ color: '#4ADE80' }}>$157,550</strong> (within EC limits)
            </p>
          </div>
          {/* SKNLP document decoration */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.7 }}>
            <div style={{
              width: 70, height: 85, background: 'white', borderRadius: 6, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}>
              <p style={{ color: '#DC143C', fontSize: 9, fontWeight: 800, margin: '0 0 4px' }}>SKNLP</p>
              {[...Array(5)].map((_, i) => <div key={i} style={{ width: 48, height: 3, background: '#E2E8F0', borderRadius: 2, marginBottom: 2 }} />)}
              <div style={{ position: 'absolute', bottom: -10, right: -10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔒</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16, margin: '20px 0' }}>

          {/* Pie chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '16px', position: 'relative',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 4px 0', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expense</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <div style={{ position: 'relative' }}>
                <PieChart width={180} height={180}>
                  <Pie data={PIE_DATA} cx={85} cy={85} innerRadius={0} outerRadius={75} dataKey="value" startAngle={90} endAngle={-270}>
                    {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} stroke="rgba(0,0,0,0.2)" strokeWidth={1} />)}
                  </Pie>
                </PieChart>
                {/* SKNLP shield glow in center */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(220,20,60,0.4) 0%, transparent 70%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                }}>🛡️</div>
              </div>
              <div style={{ flex: 1, paddingLeft: 8 }}>
                {PIE_DATA.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '16px',
          }}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginBottom: 8 }}>
              {[{ color: '#DC143C', label: 'Canvassing' }, { color: '#60A5FA', label: 'Events' }, { color: '#D4A017', label: 'Travel' }].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                  <span style={{ color: '#94A3B8', fontSize: 11 }}>{l.label}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={BAR_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -15 }}>
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 6, fontSize: 11 }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                <Bar dataKey="canvassing" fill="#DC143C" radius={[3, 3, 0, 0]} />
                <Bar dataKey="events"     fill="#60A5FA" radius={[3, 3, 0, 0]} />
                <Bar dataKey="travel"     fill="#D4A017" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense table */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
            color: '#94A3B8', fontSize: 12, fontWeight: 700,
          }}>
            {['Date', 'Item', 'Amount', 'Category', 'Approver', 'Status'].map(h => <span key={h}>{h}</span>)}
          </div>
          {EXPENSES.map((e, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              padding: '12px 20px', alignItems: 'center',
              borderBottom: i < EXPENSES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
            }}>
              <span style={{ color: '#64748B', fontSize: 13 }}>{e.date}</span>
              <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{e.item}</span>
              <span style={{ color: '#4ADE80', fontSize: 13, fontWeight: 700 }}>{e.amount}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{e.cat}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{e.approver}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(74,222,128,0.12)', color: '#4ADE80',
                border: '1px solid rgba(74,222,128,0.25)', borderRadius: 5,
                padding: '2px 10px', fontSize: 11, fontWeight: 700,
              }}>{e.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
