import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center mb-4 text-error">
        <AlertTriangle size={28} />
      </div>
      <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant font-body max-w-xs mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" onClick={onRetry} size="sm">
          Try Again
        </Button>
      )}
    </div>
  );
}
