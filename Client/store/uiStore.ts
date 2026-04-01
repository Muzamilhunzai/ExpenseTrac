'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isSidebarOpen: boolean;
  isTransactionModalOpen: boolean;
  editingTransactionId: string | null;
  notifications: Notification[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openTransactionModal: (id?: string) => void;
  closeTransactionModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isSidebarOpen: true,
      isTransactionModalOpen: false,
      editingTransactionId: null,
      notifications: [],

      toggleSidebar: () =>
        set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      openTransactionModal: (id) =>
        set({ isTransactionModalOpen: true, editingTransactionId: id ?? null }),

      closeTransactionModal: () =>
        set({ isTransactionModalOpen: false, editingTransactionId: null }),

      addNotification: (notification) =>
        set((s) => ({
          notifications: [
            ...s.notifications,
            { ...notification, id: `notif_${Date.now()}` },
          ],
        })),

      removeNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),
    }),
    { name: 'ui-store' }
  )
);
