'use client';

import React, { memo } from 'react';
import { Settings, Shield, Database, ChevronRight, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { CURRENCIES } from '@/constants';
import type { UserSettings } from '@/types/user';

const currencyOptions = CURRENCIES.map((c) => ({ value: c.code, label: `${c.code} — ${c.label}` }));

/* ─── Interface Panel ─── */
interface InterfacePanelProps {
  settings: UserSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  onChange: (data: Partial<UserSettings>) => void;
}

export const InterfacePanel = memo(function InterfacePanel({
  settings,
  isLoading,
  isSaving,
  onChange,
}: InterfacePanelProps) {
  return (
    <section className="md:col-span-4 bg-surface-container p-8 neon-border-secondary rounded-lg">
      <h2 className="font-headline font-bold text-lg mb-8 flex items-center gap-2 uppercase tracking-wider">
        <Settings size={18} className="text-secondary" />
        Interface
      </h2>

      <div className="space-y-8">
        {isLoading ? (
          <Skeleton className="h-24 rounded" />
        ) : (
          <>
            <Select
              label="Base Currency"
              options={currencyOptions}
              value={settings?.currency ?? 'USD'}
              onChange={(e) => onChange({ currency: e.target.value })}
            />

            <div>
              <p className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-1">
                Visual Mode
              </p>
              <div className="flex items-center p-1 bg-surface-dim border border-outline-variant rounded-full mt-2 w-fit">
                <button
                  onClick={() => onChange({ theme: 'light' })}
                  className={`px-4 py-1.5 text-[10px] font-label font-bold rounded-full transition-all ${
                    settings?.theme === 'light'
                      ? 'bg-primary text-on-primary shadow-neon-primary-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => onChange({ theme: 'dark' })}
                  className={`px-4 py-1.5 text-[10px] font-label font-bold rounded-full transition-all ${
                    settings?.theme === 'dark'
                      ? 'bg-primary text-on-primary shadow-neon-primary-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              isLoading={isSaving}
              onClick={() => {}}
              className="w-full"
            >
              Save Local Settings
            </Button>
          </>
        )}
      </div>
    </section>
  );
});

/* ─── Security Panel ─── */
interface SecurityPanelProps {
  settings: UserSettings | null;
  isLoading: boolean;
  onChange: (data: Partial<UserSettings>) => void;
}

export const SecurityPanel = memo(function SecurityPanel({
  settings,
  isLoading,
  onChange,
}: SecurityPanelProps) {
  return (
    <section className="md:col-span-5 bg-surface-container p-8 neon-border-primary rounded-lg">
      <h2 className="font-headline font-bold text-lg mb-8 flex items-center gap-2 uppercase tracking-wider">
        <Shield size={18} className="text-tertiary" />
        Security Protocols
      </h2>

      <div className="space-y-4">
        {isLoading ? (
          <Skeleton className="h-24 rounded" />
        ) : (
          <>
            <div className="group cursor-pointer p-4 bg-surface-dim border border-outline-variant hover:border-tertiary/50 transition-all rounded-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-on-surface-variant group-hover:text-tertiary transition-colors" />
                  <span className="font-label text-xs uppercase tracking-wider text-on-surface">
                    Authentication Key
                  </span>
                </div>
                <ChevronRight size={14} className="text-outline group-hover:text-tertiary transition-colors" />
              </div>
              <p className="mt-2 text-[10px] text-on-surface-variant">
                Rotate your password frequently to ensure node integrity.
              </p>
            </div>

            <div className="p-4 bg-surface-dim border border-outline-variant hover:border-tertiary/50 transition-all rounded-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={16} className="text-on-surface-variant" />
                  <span className="font-label text-xs uppercase tracking-wider text-on-surface">
                    Bio-Sync (2FA)
                  </span>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => onChange({ twoFactorEnabled: !settings?.twoFactorEnabled })}
                  className={`w-10 h-5 rounded-full flex items-center px-0.5 border transition-all duration-300 ${
                    settings?.twoFactorEnabled
                      ? 'bg-tertiary/20 border-tertiary/50'
                      : 'bg-surface-container-high border-outline-variant'
                  }`}
                  aria-label="Toggle 2FA"
                >
                  <span
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      settings?.twoFactorEnabled
                        ? 'translate-x-5 bg-tertiary shadow-neon-tertiary'
                        : 'translate-x-0 bg-outline'
                    }`}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

/* ─── Telemetry Panel ─── */
interface TelemetryPanelProps {
  settings: UserSettings | null;
  isLoading: boolean;
  onChange: (data: Partial<UserSettings>) => void;
}

export const TelemetryPanel = memo(function TelemetryPanel({
  settings,
  isLoading,
  onChange,
}: TelemetryPanelProps) {
  const notifs = settings?.notifications;

  const toggleNotif = (key: keyof NonNullable<typeof notifs>) => {
    if (!notifs) return;
    onChange({ notifications: { ...notifs, [key]: !notifs[key] } });
  };

  return (
    <section className="md:col-span-7 bg-surface-container p-8 neon-border-primary rounded-lg">
      <h2 className="font-headline font-bold text-lg mb-8 flex items-center gap-2 uppercase tracking-wider">
        <Database size={18} className="text-primary" />
        System Telemetry
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Notifications */}
        <div>
          <h3 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2 mb-4">
            Active Alerts
          </h3>
          {isLoading ? (
            <Skeleton className="h-20 rounded" />
          ) : (
            <div className="space-y-3">
              {(
                [
                  { key: 'budgetThresholds', label: 'Critical Budget Thresholds' },
                  { key: 'dailySummary', label: 'Daily Financial Summary' },
                  { key: 'systemUpdates', label: 'System Updates' },
                ] as const
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={notifs?.[key] ?? false}
                    onChange={() => toggleNotif(key)}
                    className="rounded-sm bg-surface-dim border-outline accent-primary focus:ring-primary/20"
                  />
                  <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors font-body">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Data Operations */}
        <div>
          <h3 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2 mb-4">
            Data Operations
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-surface-dim hover:bg-surface-variant border border-outline-variant rounded-sm transition-all group">
              <span className="text-xs font-label uppercase tracking-tight text-on-surface">
                Export Ledger (.json)
              </span>
              <Download size={14} className="text-secondary group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-surface-dim hover:bg-surface-variant border border-outline-variant rounded-sm transition-all group">
              <span className="text-xs font-label uppercase tracking-tight text-on-surface">
                Purge Cached History
              </span>
              <Trash2 size={14} className="text-error group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
