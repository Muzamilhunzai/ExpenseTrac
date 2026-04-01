import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'Nothing to display here yet.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center mb-4 text-on-surface-variant">
        {icon ?? <Inbox size={28} />}
      </div>
      <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant font-body max-w-xs mb-6">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
