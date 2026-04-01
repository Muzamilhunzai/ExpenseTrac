import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-label uppercase tracking-widest text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full bg-surface-dim border-b border-outline-variant py-2.5 font-body text-sm text-on-surface transition-all duration-200 cursor-pointer',
            'focus:outline-none focus:border-primary focus:shadow-[0_1px_0_0_#ff2d78]',
            error && 'border-error',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-surface">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-error font-label">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
