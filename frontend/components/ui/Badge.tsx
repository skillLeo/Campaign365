'use client';
import { cn } from '@/lib/utils';

type Variant = 'green' | 'red' | 'yellow' | 'blue' | 'gray' | 'teal' | 'orange' |
  'success' | 'danger' | 'warning' | 'info' | 'default';

const variants: Record<Variant, string> = {
  green:   'bg-emerald-100 text-emerald-700',
  red:     'bg-red-100 text-red-700',
  yellow:  'bg-amber-100 text-amber-700',
  blue:    'bg-blue-100 text-blue-700',
  gray:    'bg-slate-100 text-slate-600',
  teal:    'bg-teal-100 text-teal-700',
  orange:  'bg-orange-100 text-orange-700',
  success: 'bg-emerald-100 text-emerald-700',
  danger:  'bg-red-100 text-red-700',
  warning: 'bg-amber-100 text-amber-700',
  info:    'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-600',
};

export function Badge({ children, variant = 'gray', size, className }: {
  children: React.ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, Variant> = {
    active: 'green', inactive: 'gray', suspended: 'red', live: 'green',
    draft: 'gray', sending: 'blue', sent: 'green', failed: 'red',
    pending: 'yellow', completed: 'green', paused: 'orange',
    upcoming: 'blue', cancelled: 'red', supporter: 'green',
    undecided: 'yellow', opposition: 'red', unknown: 'gray',
    available: 'green', on_route: 'blue', offline: 'gray',
  };
  return <Badge variant={map[status] || 'gray'}>{status.replace('_', ' ')}</Badge>;
}
