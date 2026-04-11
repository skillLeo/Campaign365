'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { MapPin, Plus, Clock, Package, CheckCircle, AlertCircle, Navigation, X } from 'lucide-react';

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
  in_transit: { label: 'In Transit', color: 'var(--tenant-primary)', bg: '#FEE2E2', icon: Navigation },
  delivered: { label: 'Delivered', color: '#065F46', bg: '#D1FAE5', icon: CheckCircle },
  pending: { label: 'Pending', color: 'var(--tenant-primary)', bg: '#FEE2E2', icon: Clock },
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
  const [newTask, setNewTask] = useState({
    runner: 'Devon Clarke',
    task: '',
    from: '',
    to: '',
    priority: 'normal' as const,
    items: ''
  });
  const primaryColor = 'var(--tenant-primary)';

  const counts = {
    in_transit: tasks.filter(t => t.status === 'in_transit').length,
    delivered: tasks.filter(t => t.status === 'delivered').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  const handleDispatch = () => {
    if (!newTask.task.trim() || !newTask.from.trim() || !newTask.to.trim()) return;
    console.log('Dispatching:', newTask);
    setShowModal(false);
    setNewTask({ runner: 'Devon Clarke', task: '', from: '', to: '', priority: 'normal', items: '' });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Runner Coordination</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Dispatch and track election day runners in real time</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
          Dispatch Runner
        </button>
      </div>

      {/* Status Stats - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {(Object.entries(counts) as [RunnerTask['status'], number][]).map(([status, count]) => {
          const meta = statusMeta(status);
          const Icon = meta.icon;
          return (
            <div key={status} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: meta.bg }}>
                  <Icon size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: meta.color }} />
                </div>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-slate-800">{count}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">{meta.label}</p>
            </div>
          );
        })}
      </div>

      {/* Map + Tasks - Responsive */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Live Map */}
        <div className="lg:w-2/5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Runner Live Map</h3>
          </div>
          <div className="relative h-56 sm:h-64 lg:h-72 flex items-center justify-center" style={{ backgroundColor: '#E8EEF5' }}>
            <div className="text-center text-slate-400 pointer-events-none">
              <MapPin size={24} className="sm:w-7 sm:h-7 mx-auto mb-2 opacity-20" />
              <p className="text-[10px] sm:text-xs text-slate-500">Live map requires Mapbox token</p>
            </div>
            {tasks.filter(t => t.status === 'in_transit').map((t, i) => (
              <div
                key={t.id}
                className="absolute"
                style={{ top: `${25 + i * 30}%`, left: `${20 + i * 25}%` }}
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {t.runner[0]}
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-t border-slate-100 text-center">
            <p className="text-[10px] sm:text-xs text-slate-400">{counts.in_transit} runners currently in transit</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="lg:flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Active Tasks</h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] sm:max-h-[450px] overflow-y-auto">
            {tasks.map(task => {
              const meta = statusMeta(task.status);
              const Icon = meta.icon;
              return (
                <div key={task.id} className="px-3 sm:px-5 py-3 sm:py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {task.runner[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{task.task}</p>
                        <p className="text-[10px] sm:text-xs text-slate-400 truncate">{task.runner}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold capitalize whitespace-nowrap" style={priorityStyle(task.priority)}>
                        {task.priority}
                      </span>
                      <span className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap" style={{ backgroundColor: meta.bg, color: meta.color }}>
                        <Icon size={9} className="sm:w-[10px] sm:h-[10px]" />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 mb-1">
                    <MapPin size={9} className="sm:w-[10px] sm:h-[10px] text-slate-400" />
                    <span className="truncate">{task.from} → {task.to}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1 text-slate-400 min-w-0">
                      <Package size={9} className="sm:w-[10px] sm:h-[10px] flex-shrink-0" />
                      <span className="truncate">{task.items}</span>
                    </div>
                    <span className="font-semibold whitespace-nowrap" style={{ color: meta.color }}>ETA: {task.eta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dispatch Modal - Responsive */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowModal(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Dispatch Runner</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Select Runner</label>
                <select 
                  value={newTask.runner}
                  onChange={e => setNewTask({ ...newTask, runner: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none focus:border-red-400"
                >
                  <option>Devon Clarke</option>
                  <option>Tamara Lewis</option>
                  <option>Carl Bishop</option>
                  <option>Maria Santos</option>
                  <option>Leo Prince</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Task Description *</label>
                <input 
                  value={newTask.task}
                  onChange={e => setNewTask({ ...newTask, task: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" 
                  placeholder="e.g. Deliver ballot box to Station 3" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">From Location *</label>
                  <input 
                    value={newTask.from}
                    onChange={e => setNewTask({ ...newTask, from: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" 
                    placeholder="Pickup point" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">To Location *</label>
                  <input 
                    value={newTask.to}
                    onChange={e => setNewTask({ ...newTask, to: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" 
                    placeholder="Drop-off point" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Items Description</label>
                <input 
                  value={newTask.items}
                  onChange={e => setNewTask({ ...newTask, items: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" 
                  placeholder="e.g. Ballot box, seals" 
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'High', value: 'high', style: { backgroundColor: '#FEE2E2', color: '#991B1B' } },
                    { label: 'Normal', value: 'normal', style: { backgroundColor: '#DBEAFE', color: '#1E40AF' } },
                    { label: 'Low', value: 'low', style: { backgroundColor: '#F1F5F9', color: '#475569' } },
                  ].map(({ label, value, style }) => (
                    <button 
                      key={label} 
                      onClick={() => setNewTask({ ...newTask, priority: value as any })}
                      className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${newTask.priority === value ? 'ring-2 ring-offset-1' : ''}`}
                      style={{ ...style, '--ring-color': style.color } as React.CSSProperties}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDispatch}
                  disabled={!newTask.task.trim() || !newTask.from.trim() || !newTask.to.trim()}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: primaryColor }}
                >
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}