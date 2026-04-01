import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'success' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  muted: 'bg-surface-container-highest text-on-surface-variant border-outline-variant',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  error: 'bg-error/10 text-error border-error/20',
};

const pulseColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary shadow-[0_0_4px_#ff2d78]',
  secondary: 'bg-secondary shadow-[0_0_4px_#00ffcc]',
  tertiary: 'bg-tertiary shadow-[0_0_4px_#ffe04a]',
  muted: 'bg-outline',
  success: 'bg-emerald-400',
  error: 'bg-error shadow-[0_0_4px_#ff4444]',
};

export function Badge({ children, variant = 'muted', pulse = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider border rounded',
        variantClasses[variant],
        className
      )}
    >
      {pulse && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            pulseColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
