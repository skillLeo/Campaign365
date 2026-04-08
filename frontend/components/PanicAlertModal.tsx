'use client';
import { usePanicStore } from '@/lib/store';
import { AlertTriangle, X, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/Button';

export function PanicAlertModal() {
  const { activeAlerts, resolveAlert } = usePanicStore();

  if (activeAlerts.length === 0) return null;

  const alert = activeAlerts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-red-900/70 backdrop-blur-sm animate-pulse" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md panic-pulse fade-in">
        <div className="bg-red-500 rounded-t-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">PANIC ALERT</h2>
              <p className="text-red-100 text-sm">Immediate assistance required</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-700 mb-1">{alert.name || 'Team Member'}</p>
            <p className="text-xs text-red-500 capitalize">{alert.role || 'Field Worker'}</p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-700">GPS Location</p>
              <a
                href={`https://maps.google.com/?q=${alert.latitude},${alert.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-teal-600 hover:underline"
              >
                {alert.latitude?.toFixed(6)}, {alert.longitude?.toFixed(6)}
              </a>
            </div>
          </div>

          {alert.phone && (
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-slate-400" />
              <span className="text-sm text-slate-600">{alert.phone}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button className="flex-1" onClick={() => window.open(`https://maps.google.com/?q=${alert.latitude},${alert.longitude}`)}>
              Open in Maps
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => resolveAlert(alert.id)}>
              Mark Resolved
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
