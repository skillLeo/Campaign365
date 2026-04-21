'use client';
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
} from 'recharts';

const BAR_DATA = [
  { label: 'Late1',  v: 4200 }, { label: '2op1',  v: 6800 }, { label: 'Mc.3',  v: 5100 },
  { label: '4c.1',  v: 7900 }, { label: 'Ls-10', v: 6200 }, { label: '3-1',   v: 8400 },
  { label: 'F:20',  v: 7100 }, { label: '40%s',  v: 9200 }, { label: 'Le1c',  v: 5800 },
];

// Constituency heatmap grid (St Kitts & Nevis)
const HEAT_CELLS = Array.from({ length: 88 }, (_, i) => {
  const intensity = Math.random();
  return { intensity, row: Math.floor(i / 11), col: i % 11 };
});

function HeatMap() {
  const colors = ['#3D1010', '#6B1414', '#991B1B', '#B91C1C', '#DC143C', '#EF4444', '#F87171', '#FCA5A5'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 3 }}>
      {HEAT_CELLS.map((c, i) => {
        const colorIdx = Math.floor(c.intensity * (colors.length - 1));
        return (
          <div key={i} style={{
            height: 14, borderRadius: 2,
            backgroundColor: colors[colorIdx],
            opacity: 0.7 + c.intensity * 0.3,
          }} />
        );
      })}
    </div>
  );
}

export default function FundraisingDashboardPage() {
  const [kpiFilter, setKpiFilter] = useState('KPI');

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero banner with SKNLP flags */}
      <div style={{
        position: 'relative', height: 130, overflow: 'hidden',
        background: 'linear-gradient(135deg,#0a1628 0%,#1a0a20 50%,#0a1628 100%)',
      }}>
        {/* Flag waving backdrop */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(220,20,60,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 50%, rgba(0,158,96,0.2) 0%, transparent 50%)
          `,
        }} />
        {/* SKNLP flags */}
        {[15, 35, 55, 72, 88].map((left, i) => (
          <div key={i} style={{
            position: 'absolute', top: i % 2 === 0 ? 10 : 20,
            left: `${left}%`, transform: `rotate(${i % 2 === 0 ? -8 : 6}deg)`,
          }}>
            <svg viewBox="0 0 30 20" width={i === 2 ? 56 : 42} height={i === 2 ? 38 : 28} style={{ borderRadius: 3 }}>
              <polygon points="0,20 30,20 0,0" fill="#009E60" />
              <polygon points="30,0 30,20 0,0" fill="#CE1126" />
              <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
              <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
              <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
            </svg>
          </div>
        ))}
        {/* Coin decorations */}
        {[{ top: 8, right: 120, size: 32 }, { top: 20, right: 60, size: 24 }].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', top: c.top, right: c.right,
            width: c.size, height: c.size, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #FFE566, #D4A017)',
            boxShadow: '0 2px 8px rgba(212,160,23,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: c.size * 0.5, color: '#8B6914',
          }}>$</div>
        ))}

        {/* Page title inside hero */}
        <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
          <h1 style={{ color: '#DC143C', fontSize: 26, fontWeight: 900, margin: 0 }}>Fundraising Dashboard</h1>
        </div>

        {/* Top-right user bar */}
        <div style={{
          position: 'absolute', top: 10, right: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '5px 10px' }}>
            <svg viewBox="0 0 30 20" width="20" height="14" style={{ borderRadius: 2 }}>
              <polygon points="0,20 30,20 0,0" fill="#009E60" />
              <polygon points="30,0 30,20 0,0" fill="#CE1126" />
              <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
              <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
              <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
            </svg>
            <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 600 }}>SKNLP Campaign 365</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#64748B', fontSize: 12 }}>🔍 Global Search</span>
          </div>
          <span style={{ color: '#64748B', fontSize: 16 }}>🔔</span>
          <span style={{ color: '#64748B', fontSize: 16 }}>💬</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>M</div>
            <span style={{ color: '#94A3B8', fontSize: 12 }}>Marcus Liburd - Campaign Manager</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>

        {/* KPI filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <button
            onClick={() => setKpiFilter('KPI')}
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#E2E8F0', borderRadius: 6, padding: '5px 12px',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >KPI <span style={{ fontSize: 10 }}>▼</span></button>
        </div>

        {/* 4 KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>

          {/* Total Raised */}
          <div style={{
            background: 'linear-gradient(135deg,#6B5800 0%,#4A3D00 50%,#2D2600 100%)',
            border: '1px solid rgba(212,160,23,0.3)', borderRadius: 14, padding: '18px',
          }}>
            <p style={{ color: 'rgba(255,215,0,0.7)', fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Raised</p>
            <p style={{ color: '#FFD700', fontSize: 28, fontWeight: 900, margin: '0 0 4px', lineHeight: 1 }}>$184,720</p>
            <p style={{ color: 'rgba(255,215,0,0.6)', fontSize: 11, margin: 0 }}>goal $250,000 (74%)</p>
            <div style={{ marginTop: 10, height: 3, backgroundColor: 'rgba(255,215,0,0.2)', borderRadius: 3 }}>
              <div style={{ width: '74%', height: '100%', backgroundColor: '#FFD700', borderRadius: 3 }} />
            </div>
          </div>

          {/* Recurring Donors */}
          <div style={{
            background: 'linear-gradient(135deg,#7C1010 0%,#4A0808 100%)',
            border: '1px solid rgba(220,20,60,0.3)', borderRadius: 14, padding: '18px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ color: 'rgba(255,120,120,0.8)', fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recurring Donors</p>
              <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1 }}>312</p>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>💰</div>
          </div>

          {/* Events Upcoming */}
          <div style={{
            background: 'linear-gradient(135deg,#1a2535 0%,#0f1824 100%)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Events Upcoming</p>
            <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1 }}>3</p>
          </div>

          {/* Average Donation */}
          <div style={{
            background: 'linear-gradient(135deg,#1a2535 0%,#0f1824 100%)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Average Donation</p>
              <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1 }}>$142</p>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#FFE566,#D4A017)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#8B6914', fontWeight: 900 }}>$</div>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>

          {/* Fundraising Last 30 Days bar chart */}
          <div style={{
            background: 'linear-gradient(135deg,#1a1208 0%,#0f0c04 100%)',
            border: '1px solid rgba(212,160,23,0.2)', borderRadius: 14, padding: '16px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(220,20,60,0.15) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Fundraising Last 30 Days</p>
              <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontSize: 11, padding: '3px 8px', borderRadius: 5 }}>Last 30 Days</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={BAR_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="label" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 6, fontSize: 11 }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Raised']}
                />
                {BAR_DATA.map((_, i) => null)}
                <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                  {BAR_DATA.map((entry, i) => (
                    <Cell key={i}
                      fill={entry.v > 8000
                        ? '#FFD700'
                        : entry.v > 6000
                          ? '#DC143C'
                          : 'rgba(220,20,60,0.5)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* St Kitts constituencies heatmap */}
          <div style={{
            background: 'linear-gradient(135deg,#1a0808 0%,#0f0404 100%)',
            border: '1px solid rgba(220,20,60,0.2)', borderRadius: 14, padding: '16px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Ocean wave bg */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(0deg, rgba(0,40,80,0.6) 0%, transparent 100%)',
            }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>St. Kitts &amp; Nevis Constitueties</p>
              <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontSize: 11, padding: '3px 8px', borderRadius: 5 }}>Last 30 Days</span>
            </div>
            <div style={{ position: 'relative' }}>
              <HeatMap />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { label: 'Launch Donation Drive', icon: '🚀' },
            { label: 'Send Pledge Reminder', icon: '📩' },
            { label: 'Create Merch Drop',     icon: '👕' },
          ].map((btn, i) => (
            <button key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '16px',
              color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,20,60,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <span style={{ fontSize: 18 }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
