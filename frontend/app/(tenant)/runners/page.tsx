'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { MapPin, Plus, Clock, Package, CheckCircle, AlertCircle, Navigation } from 'lucide-react';

interface RunnerTask {
  id: number;
  runner: string;
  task: string;
  from: string;
  to: string;
  priority: 'high' | 'normal' | 'low';
  status: 'in_transit' | 'delivered' | 'pending' | 'failed';
  eta: string;
  items: string;
}

const TASKS: RunnerTask[] = [
  { id: 1, runner: 'Devon Clarke', task: 'Ballot Box Delivery', from: 'HQ Office', to: 'Kingston Central Station A', priority: 'high', status: 'in_transit', eta: '10 min', items: 'Ballot box, seals (x3)' },
  { id: 2, runner: 'Tamara Lewis', task: 'Campaign Materials', from: 'Print Shop', to: 'Kingston East Booth', priority: 'normal', status: 'delivered', eta: 'Delivered', items: 'Posters (50), flyers (200)' },
  { id: 3, runner: 'Carl Bishop', task: 'Emergency Documents', from: 'Legal Office', to: 'Electoral Commission', priority: 'high', status: 'pending', eta: '25 min', items: 'Form 12, Form 14 (signed)' },
  { id: 4, runner: 'Maria Santos', task: 'Equipment Run', from: 'Storage Unit', to: 'St. Catherine HQ', priority: 'low', status: 'in_transit', eta: '20 min', items: 'Megaphone, extension cords' },
  { id: 5, runner: 'Leo Prince', task: 'Voter List Copies', from: 'Data Center', to: 'Main Office', priority: 'normal', status: 'failed', eta: 'Failed', items: 'Printed voter rolls (3 copies)' },
];

const statusMeta = (s: RunnerTask['status']) => ({
  in_transit: { label: 'In Transit', color: '#E30613', bg: '#FEE2E2', icon: Navigation },
  delivered: { label: 'Delivered', color: '#065F46', bg: '#D1FAE5', icon: CheckCircle },
  pending: { label: 'Pending', color: '#E30613', bg: '#FEE2E2', icon: Clock },
  failed: { label: 'Failed', color: '#EF4444', bg: '#FEF2F2', icon: AlertCircle },
}[s]);

const priorityStyle = (p: RunnerTask['priority']) => ({
  high: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  normal: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  low: { backgroundColor: '#F1F5F9', color: '#475569' },
}[p]);

export default function RunnersPage() {
  const [tasks] = useState<RunnerTask[]>(TASKS);
  const [showModal, setShowModal] = useState(false);
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const counts = {
    in_transit: tasks.filter(t => t.status === 'in_transit').length,
    delivered: tasks.filter(t => t.status === 'delivered').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Runner Coordination</h1>
          <p className="text-sm text-slate-400 mt-0.5">Dispatch and track election day runners in real time</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={14} />
          Dispatch Runner
        </button>
      </div>

      {/* Status stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.entries(counts) as [RunnerTask['status'], number][]).map(([status, count]) => {
          const meta = statusMeta(status);
          const Icon = meta.icon;
          return (
            <div key={status} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: meta.bg }}>
                  <Icon size={16} style={{ color: meta.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{count}</p>
              <p className="text-xs text-slate-400 mt-0.5">{meta.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Live map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm">Runner Live Map</h3>
          </div>
          <div className="relative h-72 flex items-center justify-center" style={{ backgroundColor: '#E8EEF5' }}>
            <div className="text-center text-slate-400 pointer-events-none">
              <MapPin size={28} className="mx-auto mb-2 opacity-20" />
              <p className="text-xs text-slate-500">Live map requires Mapbox token</p>
            </div>
            {tasks.filter(t => t.status === 'in_transit').map((t, i) => (
              <div
                key={t.id}
                className="absolute"
                style={{ top: `${25 + i * 30}%`, left: `${20 + i * 25}%` }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {t.runner[0]}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">{counts.in_transit} runners currently in transit</p>
          </div>
        </div>

        {/* Tasks list */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm">Active Tasks</h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[380px] overflow-y-auto">
            {tasks.map(task => {
              const meta = statusMeta(task.status);
              const Icon = meta.icon;
              return (
                <div key={task.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {task.runner[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{task.task}</p>
                        <p className="text-xs text-slate-400">{task.runner}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 ml-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={priorityStyle(task.priority)}>
                        {task.priority}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: meta.bg, color: meta.color }}>
                        <Icon size={10} />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <MapPin size={10} className="text-slate-400" />
                    {task.from} → {task.to}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Package size={10} />
                      {task.items}
                    </div>
                    <span className="font-semibold" style={{ color: meta.color }}>ETA: {task.eta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Dispatch Runner</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Select Runner</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                  <option>Devon Clarke</option>
                  <option>Tamara Lewis</option>
                  <option>Carl Bishop</option>
                  <option>Maria Santos</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Task Description</label>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="e.g. Deliver ballot box to Station 3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">From Location</label>
                  <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="Pickup point" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">To Location</label>
                  <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="Drop-off point" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Priority</label>
                <div className="flex gap-2">
                  {[
                    { label: 'High', style: { backgroundColor: '#FEE2E2', color: '#991B1B' } },
                    { label: 'Normal', style: { backgroundColor: '#DBEAFE', color: '#1E40AF' } },
                    { label: 'Low', style: { backgroundColor: '#F1F5F9', color: '#475569' } },
                  ].map(({ label, style }) => (
                    <button key={label} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={style}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
