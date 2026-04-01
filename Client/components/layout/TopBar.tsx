'use client';

import React, { memo, useState, useCallback } from 'react';
import { Search, Bell, Wallet } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface TopBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const TopBar = memo(function TopBar({ onSearch, placeholder = 'Search data nodes...' }: TopBarProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch?.(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-background/60 backdrop-blur-md border-b border-secondary/20 shadow-2xl">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-surface-container border-none text-sm py-2 pl-10 pr-4 rounded-full text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 placeholder:text-outline font-label"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6 shrink-0">
        <button
          className="text-on-surface-variant hover:text-primary transition-colors p-1"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <button
          className="text-on-surface-variant hover:text-secondary transition-colors p-1"
          aria-label="Wallet"
        >
          <Wallet size={20} />
        </button>
      </div>
    </header>
  );
});
