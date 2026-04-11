'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
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
  const primaryColor = 'var(--tenant-primary)';

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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* RED Header Banner - Responsive */}
      <div style={{ backgroundColor: 'var(--tenant-primary)', borderRadius: 'clamp(10px, 3vw, 12px)', padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)' }} 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span
            className="animate-pulse shrink-0 text-center"
            style={{ fontSize: 'clamp(9px, 2vw, 11px)', padding: '3px 8px 4px 10px', borderRadius: 99, fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
          >
            ● LIVE UPDATES
          </span>
          <div>
            <h1 style={{ color: 'white', fontWeight: 700, fontSize: 'clamp(14px, 4vw, 17px)', margin: 0, lineHeight: 1.2 }}>GOTV Command Center — Election Day Live</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(10px, 2.5vw, 12px)', margin: '2px 0 0' }}>All Constituencies · {time}</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 shrink-0">
          <button
            className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ padding: '6px 12px 6px 12px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer' }}
          >
            <Send size={12} className="sm:w-[14px] sm:h-[14px]" />
            Final Push Alert
          </button>
          <button
            className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ padding: '6px 12px 6px 12px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, backgroundColor: '#0F172A', border: 'none', cursor: 'pointer' }}
          >
            <FileText size={12} className="sm:w-[14px] sm:h-[14px]" />
            End Day Report
          </button>
        </div>
      </div>

      {/* Top stats - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Turnout meter */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
          <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 sm:mb-3">Turnout Projection</p>
          <div className="flex items-end gap-2 mb-2 sm:mb-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: primaryColor }}>{overallPct}%</span>
            <span className="text-[10px] sm:text-xs font-semibold mb-1" style={{ color: 'var(--tenant-primary)' }}>↑ trending up</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2 sm:h-3 overflow-hidden">
            <div className="h-2 sm:h-3 rounded-full transition-all" style={{ width: `${overallPct}%`, backgroundColor: primaryColor }} />
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-2">{formatNumber(totalVoted)} of {formatNumber(totalExpected)} voters</p>
        </div>

        {/* Votes still needed */}
        <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4" style={{ backgroundColor: '#0F172A' }}>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <AlertTriangle size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color: '#F59E0B' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Still Needed</p>
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{formatNumber(totalExpected - totalVoted)}</p>
          <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#F59E0B' }}>voters needed to hit target</p>
        </div>

        {/* Runners */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
          <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 sm:mb-3">Field Operations</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">28</p>
              <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5">Runners deployed</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">14</p>
              <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5">Canvassers active</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs mt-2 sm:mt-3 font-medium" style={{ color: 'var(--tenant-primary)' }}>● All teams reporting</p>
        </div>
      </div>

      {/* Constituency breakdown + actions - Responsive */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Polling station status */}
        <div className="lg:flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Polling Station Status</h3>
          </div>
          <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
            {CONSTITUENCIES.map(c => (
              <div key={c.name}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-slate-700 truncate">{c.name}</span>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">{formatNumber(c.voted)} / {formatNumber(c.expected)}</span>
                    <span
                      className="font-bold text-xs sm:text-sm w-10 text-right"
                      style={{ color: c.pct >= 65 ? 'var(--tenant-primary)' : c.pct >= 45 ? primaryColor : '#EF4444' }}
                    >
                      {c.pct}%
                    </span>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className="h-1.5 sm:h-2 rounded-full transition-all"
                    style={{
                      width: `${c.pct}%`,
                      backgroundColor: c.pct >= 65 ? 'var(--tenant-primary)' : c.pct >= 45 ? primaryColor : '#EF4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions + live metrics */}
        <div className="lg:w-80 xl:w-96 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                <Send size={12} className="sm:w-[14px] sm:h-[14px]" />
                Send Final Push SMS
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#3B82F6' }}
              >
                <Car size={12} className="sm:w-[14px] sm:h-[14px]" />
                Assign Runners
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#EF4444' }}
              >
                <AlertTriangle size={12} className="sm:w-[14px] sm:h-[14px]" />
                Emergency Push Alert
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#94A3B8' }}
              >
                <FileText size={12} className="sm:w-[14px] sm:h-[14px]" />
                View Field Reports
              </button>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4" style={{ backgroundColor: '#0F172A' }}>
            <h3 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: '#94A3B8' }}>Live Metrics</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { label: 'Voters Contacted Today', value: formatNumber(18420), color: 'var(--tenant-primary)' },
                { label: 'Turnout Goal', value: '72%', color: '#3B82F6' },
                { label: 'SMS Sent', value: '24,100', color: '#F59E0B' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs" style={{ color: '#64748B' }}>{label}</span>
                  <span className="text-[11px] sm:text-sm font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}