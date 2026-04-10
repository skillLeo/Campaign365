'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, CheckCircle, XCircle, AlertCircle, Server, Database, Activity, Brain, RefreshCw, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

const uptimeData = [
  { v: 99.9 }, { v: 100 }, { v: 99.8 }, { v: 100 }, { v: 99.9 }, { v: 100 }, { v: 99.7 },
  { v: 100 }, { v: 99.9 }, { v: 100 }, { v: 100 }, { v: 99.8 },
];

const latencyData = [
  { v: 42 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 60 }, { v: 44 }, { v: 52 },
  { v: 39 }, { v: 47 }, { v: 53 }, { v: 41 }, { v: 46 },
];

const SERVICES = [
  { name: 'API Gateway', status: 'healthy', latency: '42ms', uptime: '99.99%' },
  { name: 'Database (MySQL)', status: 'healthy', latency: '8ms', uptime: '99.98%' },
  { name: 'Redis Cache', status: 'healthy', latency: '1ms', uptime: '100%' },
  { name: 'Storage (S3)', status: 'healthy', latency: '120ms', uptime: '99.97%' },
  { name: 'Queue Worker', status: 'healthy', latency: '—', uptime: '99.95%' },
  { name: 'AI Model API', status: 'degraded', latency: '890ms', uptime: '98.2%' },
  { name: 'SMS Gateway', status: 'healthy', latency: '210ms', uptime: '99.90%' },
  { name: 'Broadcast (Pusher)', status: 'healthy', latency: '35ms', uptime: '99.94%' },
];

const INCIDENTS = [
  { title: 'AI Model API slow response', severity: 'warning', time: '2h ago', resolved: false },
  { title: 'Scheduled maintenance completed', severity: 'info', time: 'Oct 5', resolved: true },
  { title: 'Database failover test', severity: 'info', time: 'Oct 3', resolved: true },
];

export default function PlatformHealthPage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const statusIcon = (s: string) => {
    if (s === 'healthy') return <CheckCircle size={14} style={{ color: '#2563EB' }} />;
    if (s === 'down') return <XCircle size={14} style={{ color: '#EF4444' }} />;
    return <AlertCircle size={14} style={{ color: '#F59E0B' }} />;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-4 md:px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Platform Health</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-800">System Health & Maintenance Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
            >
              <CheckCircle size={12} />
              <span className="hidden sm:inline">All Systems Operational</span>
              <span className="sm:hidden">Operational</span>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-all"
              style={{ color: '#64748B' }}
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* KPI stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Overall Uptime', value: '99.97%', sub: 'Last 30 days', icon: Activity, color: '#2563EB' },
            { label: 'Servers Online', value: '10 / 12', sub: '2 in maintenance', icon: Server, color: '#3B82F6' },
            { label: 'Avg Response Time', value: '48ms', sub: 'API gateway', icon: Zap, color: '#F59E0B' },
            { label: 'Active Incidents', value: '1', sub: 'Warning level', icon: AlertCircle, color: '#EF4444' },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1E293B' }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
              <p className="text-xs mt-1" style={{ color }}>{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Services table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-700 text-sm">Service Status</h3>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Service', 'Status', 'Latency', 'Uptime', 'Action'].map(h => (
                    <th key={h} className="text-left py-2.5 px-4 font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {SERVICES.map(svc => (
                  <tr key={svc.name} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-700">{svc.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {statusIcon(svc.status)}
                        <span
                          className="capitalize"
                          style={{ color: svc.status === 'healthy' ? '#2563EB' : svc.status === 'down' ? '#EF4444' : '#F59E0B' }}
                        >
                          {svc.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{svc.latency}</td>
                    <td className="py-3 px-4 text-slate-600">{svc.uptime}</td>
                    <td className="py-3 px-4">
                      <button className="text-xs font-medium hover:opacity-70" style={{ color: '#2563EB' }}>Ping</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Uptime chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Uptime — 12 Days</h3>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={uptimeData}>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2} fill="url(#ug)" dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Latency chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">API Latency (ms)</h3>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={latencyData}>
                  <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Maintenance actions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Maintenance</h3>
              <div className="space-y-2">
                {['Schedule Update', 'Run Backup', 'Clear Cache', 'View Incident Log'].map(action => (
                  <button
                    key={action}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-all text-slate-600"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm">Recent Incidents</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {INCIDENTS.map((inc, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: inc.resolved ? '#2563EB' : inc.severity === 'warning' ? '#F59E0B' : '#3B82F6' }}
                />
                <div className="flex-1">
                  <p className="text-sm text-slate-700 font-medium">{inc.title}</p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={inc.resolved
                    ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                    : { backgroundColor: '#FEF3C7', color: '#92400E' }}
                >
                  {inc.resolved ? 'Resolved' : 'Active'}
                </span>
                <span className="text-xs text-slate-400 shrink-0">{inc.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
