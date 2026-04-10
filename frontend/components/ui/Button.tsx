'use client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const variants = {
  primary:   'text-white hover:opacity-90',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  ghost:     'hover:bg-slate-100 text-slate-600',
  outline:   'border border-slate-200 hover:bg-slate-50 text-slate-700',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ children, variant = 'primary', size = 'md', loading, icon, className, disabled, style, ...props }: ButtonProps) {
  // For the primary variant, apply the tenant CSS variable as background so it
  // works correctly in both the Super Admin portal (#2563EB) and Tenant portal
  // (var(--tenant-primary)) without hard-coding teal.
  const primaryStyle: React.CSSProperties =
    variant === 'primary'
      ? { backgroundColor: 'var(--tenant-primary, #2563EB)', ...style }
      : (style ?? {});

  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={primaryStyle}
      className={cn(
        'inline-flex items-center gap-2 font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}
