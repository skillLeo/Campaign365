'use client';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

export function TopBar({ title }: { title?: string }) {
  const { user, branding } = useAuthStore();
  const primaryColor = branding?.primary_color || 'var(--tenant-primary)';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-7 gap-4 sticky top-0 z-40">

      {/* Page title */}
      <div className="flex-1">
        {title && (
          <h1 className="text-[15px] font-semibold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {title}
          </h1>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
        <input
          placeholder="Quick search..."
          className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 w-56 focus:outline-none focus:ring-2 focus:border-teal-500 transition-all placeholder:text-slate-400 text-slate-700"
          style={{ '--tw-ring-color': `${primaryColor}20` } as React.CSSProperties}
        />
      </div>

      {/* Bell */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
        <Bell size={16} className="text-slate-500" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ backgroundColor: 'var(--tenant-primary)' }} />
      </button>

      {/* User avatar + name */}
      <button className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          {user?.name?.charAt(0) || 'U'}
        </div>
        <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[120px] truncate">
          {user?.name}
        </span>
        <ChevronDown size={13} className="text-slate-400" />
      </button>
    </header>
  );
}