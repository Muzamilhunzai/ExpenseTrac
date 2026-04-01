'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  BarChart2,
  Settings,
  Plus,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME, APP_TAGLINE } from '@/constants';
import { useUIStore } from '@/store/uiStore';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Analytics', href: '/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  user?: { name: string; email: string; avatarUrl?: string } | null;
}

export const Sidebar = memo(function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const { openTransactionModal } = useUIStore();

  return (
    <aside className="fixed left-0 top-0 h-full z-40 w-64 flex flex-col border-r border-primary/30 bg-background/80 backdrop-blur-xl shadow-glass">
      {/* Logo */}
      <div className="p-6 border-b border-outline-variant/20">
        <h1 className="text-primary font-headline font-black text-xl neon-text-primary tracking-tight">
          {APP_NAME}
        </h1>
        <p className="text-xs text-on-surface-variant font-label tracking-widest mt-0.5 uppercase">
          {APP_TAGLINE}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-label text-sm transition-all duration-200',
                isActive
                  ? 'text-primary bg-primary/10 border-r-2 border-primary neon-text-primary'
                  : 'text-on-surface-variant hover:text-secondary hover:bg-secondary/5 hover:translate-x-0.5'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Saving Goal Alert */}
      <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-container border border-tertiary/20">
        <div className="flex items-start gap-3">
          <Zap size={16} className="text-tertiary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-on-surface">Saving Goal Reached</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">
              Hyper-Drive Fund at 88% capacity
            </p>
          </div>
        </div>
      </div>

      {/* Quick Transaction */}
      <div className="p-4 border-t border-outline-variant/20">
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full border border-primary/40 overflow-hidden shrink-0">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-headline font-bold text-on-surface truncate">{user.name}</p>
              <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => openTransactionModal()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/50 text-primary font-label text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-neon-primary-sm"
        >
          <Plus size={14} />
          Quick Transaction
        </button>
      </div>
    </aside>
  );
});
