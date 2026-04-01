'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { TransactionModal } from '@/features/transactions/components/TransactionModal';
import { useUIStore } from '@/store/uiStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: { name: string; email: string; avatarUrl?: string } | null;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export function DashboardLayout({
  children,
  user,
  onSearch,
  searchPlaceholder,
}: DashboardLayoutProps) {
  const { isTransactionModalOpen, closeTransactionModal } = useUIStore();

  return (
    <div className="min-h-screen bg-background bg-grid-secondary">
      <Sidebar user={user} />

      <div className="ml-64 flex flex-col min-h-screen">
        <TopBar onSearch={onSearch} placeholder={searchPlaceholder} />
        <main className="flex-1 p-8 animate-fade-in">
          {children}
        </main>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />
    </div>
  );
}
