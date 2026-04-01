import React from 'react';
import { cn } from '@/lib/utils';

type CardGlow = 'primary' | 'secondary' | 'tertiary' | 'none';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: CardGlow;
  hoverable?: boolean;
}

const glowClasses: Record<CardGlow, string> = {
  primary: 'border-primary/20 hover:border-primary/40',
  secondary: 'border-secondary/20 hover:border-secondary/40',
  tertiary: 'border-tertiary/20 hover:border-tertiary/40',
  none: 'border-outline-variant/30',
};

export function Card({ children, className, glow = 'none', hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-container/60 backdrop-blur-xl border rounded-4xl relative overflow-hidden transition-all duration-300',
        glowClasses[glow],
        hoverable && 'hover:bg-surface-container/80 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn('font-headline font-bold text-xl text-on-surface', className)}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('', className)}>{children}</div>;
}
