'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, subtitle, children, size = 'md' }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={cn(
          'relative w-full bg-surface-container border border-primary/30 shadow-[inset_0_0_20px_rgba(255,45,120,0.1)] rounded-2xl p-8 animate-fade-in',
          sizeClasses[size]
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-1 rounded"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        {(title ?? subtitle) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-2xl font-headline font-bold text-on-surface flex items-center gap-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-on-surface-variant font-label mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
