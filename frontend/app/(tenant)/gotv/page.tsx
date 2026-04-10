'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Target, Users, Car, MapPin, Send, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const CONSTITUENCIES = [
  { name: 'Kingston Central', voted: 8420, expected: 12000, pct: 70 },
  { name: 'Kingston East', voted: 4100, expected: 9000, pct: 46 },
  { name: 'St. Catherine North', voted: 6200, expected: 10500, pct: 59 },
  { name: 'Clarendon Central', voted: 1900, expected: 7800, pct: 24 },
  { name: 'St. James Central', voted: 5400, expected: 8200, pct: 66 },
];

export default function GOTVPage() {
  const [overallPct, setOverallPct] = useState(62);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    api.get('/gotv/turnout')
      .then(r => { if (r.data.data?.totals?.overall_percentage) setOverallPct(r.data.data.totals.overall_percentage); })
      .catch(() => {});
  }, []);

  const totalVoted = CONSTITUENCIES.reduce((a, c) => a + c.voted, 0);
  const totalExpected = CONSTITUENCIES.reduce((a, c) => a + c.expected, 0);

  return (
    <div className="space-y-5">
      {/* RED Header Banner */}
      <div style={{ backgroundColor: '#E30613', borderRadius: 12, padding: '16px 24px' }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="animate-pulse shrink-0"
            style={{ fontSize: 11, padding: '4px 10px', borderRadius: 99, fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', letterSpacing: '0.05em' }}
          >
            ● LIVE UPDATES
          </span>
          <div>
            <h1 style={{ color: 'white', fontWeight: 700, fontSize: 17, margin: 0, lineHeight: 1.2 }}>GOTV Command Center — Election Day Live</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: '3px 0 0' }}>All Constituencies · {time}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <Send size={14} />
            Final Push Alert
          </button>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, backgroundColor: '#0F172A', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <FileText size={14} />
            End Day Report
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Turnout meter */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Turnout Projection</p>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold" style={{ color: primaryColor }}>{overallPct}%</span>
            <span className="text-xs font-semibold mb-1" style={{ color: '#E30613' }}>↑ trending up</span>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full transition-all" style={{ width: `${overallPct}%`, backgroundColor: primaryColor }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{formatNumber(totalVoted)} of {formatNumber(totalExpected)} voters</p>
        </div>

        {/* Votes still needed */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} style={{ color: '#F59E0B' }} />
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Still Needed</p>
          </div>
          <p className="text-4xl font-bold text-white">{formatNumber(totalExpected - totalVoted)}</p>
          <p className="text-xs mt-1" style={{ color: '#F59E0B' }}>voters needed to hit target</p>
        </div>

        {/* Runners */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Field Operations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-800">28</p>
              <p className="text-xs text-slate-400 mt-0.5">Runners deployed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">14</p>
              <p className="text-xs text-slate-400 mt-0.5">Canvassers active</p>
            </div>
          </div>
          <p className="text-xs mt-3 font-medium" style={{ color: '#E30613' }}>● All teams reporting</p>
        </div>
      </div>

      {/* Constituency breakdown + actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Polling station status */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm">Polling Station Status</h3>
          </div>
          <div className="p-5 space-y-4">
            {CONSTITUENCIES.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{formatNumber(c.voted)} / {formatNumber(c.expected)}</span>
                    <span
                      className="font-bold text-sm w-10 text-right"
                      style={{ color: c.pct >= 65 ? '#E30613' : c.pct >= 45 ? primaryColor : '#EF4444' }}
                    >
                      {c.pct}%
                    </span>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${c.pct}%`,
                      backgroundColor: c.pct >= 65 ? '#E30613' : c.pct >= 45 ? primaryColor : '#EF4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions + live metrics */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Send Final Push SMS', icon: Send, color: primaryColor },
                { label: 'Assign Runners', icon: Car, color: '#3B82F6' },
                { label: 'Emergency Push Alert', icon: AlertTriangle, color: '#EF4444' },
                { label: 'View Field Reports', icon: FileText, color: '#94A3B8' },
              ].map(({ label, icon: Icon, color }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: '#94A3B8' }}>Live Metrics</h3>
            <div className="space-y-3">
              {[
                { label: 'Voters Contacted Today', value: formatNumber(18420), color: '#E30613' },
                { label: 'Turnout Goal', value: '72%', color: '#3B82F6' },
                { label: 'SMS Sent', value: '24,100', color: '#F59E0B' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: '#64748B' }}>{label}</span>
                  <span className="text-sm font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
