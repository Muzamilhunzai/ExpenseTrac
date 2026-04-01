'use client';

import React, { useCallback } from 'react';
import { useUser } from '@/hooks/useUser';
import { ProfileForm } from '@/features/settings/components/ProfileForm';
import { InterfacePanel, SecurityPanel, TelemetryPanel } from '@/features/settings/components/SettingsPanels';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import type { UserSettings } from '@/types/user';

export function SettingsView() {
  const { user, settings, isLoading, isSaving, error, saveUser, saveSettings } = useUser();

  const handleSettingsChange = useCallback(
    async (data: Partial<UserSettings>) => {
      await saveSettings(data);
    },
    [saveSettings]
  );

  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-on-surface uppercase">
          Configuration{' '}
          <span className="text-primary neon-text-primary">Panel</span>
        </h1>
        <p className="text-on-surface-variant font-label text-sm tracking-wide mt-2">
          Adjust your node&apos;s financial logic and interface parameters.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProfileForm
          user={user}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={saveUser}
        />

        <InterfacePanel
          settings={settings}
          isLoading={isLoading}
          isSaving={isSaving}
          onChange={handleSettingsChange}
        />

        <SecurityPanel
          settings={settings}
          isLoading={isLoading}
          onChange={handleSettingsChange}
        />

        <TelemetryPanel
          settings={settings}
          isLoading={isLoading}
          onChange={handleSettingsChange}
        />

        {/* Status Footer */}
        <section className="md:col-span-12 flex items-center justify-between py-6 px-4 border-t border-outline-variant/30">
          <div className="flex items-center gap-6 text-[10px] font-label text-on-surface-variant uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-neon-secondary" />
              Node Version: {user?.nodeVersion ?? '—'}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-neon-primary" />
              Encryption: AES-256-GCM
            </div>
          </div>
          <div className="text-xs font-headline font-bold text-primary neon-text-primary opacity-50 tracking-widest">
            SECURE NEURAL LINK ACTIVE
          </div>
        </section>
      </div>
    </div>
  );
}
