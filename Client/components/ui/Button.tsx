import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-on-primary hover:shadow-neon-primary active:scale-[0.98]',
  secondary:
    'bg-secondary/10 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary hover:shadow-neon-secondary active:scale-[0.98]',
  ghost:
    'bg-transparent border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary active:scale-[0.98]',
  danger:
    'bg-error/10 border border-error text-error hover:bg-error hover:text-white active:scale-[0.98]',
  outline:
    'bg-transparent border border-outline-variant text-on-surface hover:bg-surface-container-high active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-label font-bold uppercase tracking-wider transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
