import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-label uppercase tracking-widest text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-surface-dim border-b border-outline-variant py-2.5 font-body text-sm text-on-surface placeholder:text-outline transition-all duration-200',
              'focus:outline-none focus:border-primary focus:shadow-[0_1px_0_0_#ff2d78]',
              error && 'border-error focus:border-error focus:shadow-[0_1px_0_0_#ff4444]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-error font-label">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
