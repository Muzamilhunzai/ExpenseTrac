'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  getUserSettings,
  updateUser,
  updateUserSettings,
} from '@/services/userService';
import type { User, UserSettings, UpdateUserPayload, UpdateSettingsPayload } from '@/types/user';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [userData, settingsData] = await Promise.all([
        getCurrentUser(),
        getUserSettings(),
      ]);
      setUser(userData);
      setSettings(settingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const saveUser = useCallback(async (payload: UpdateUserPayload) => {
    setIsSaving(true);
    try {
      const updated = await updateUser(payload);
      setUser(updated);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const saveSettings = useCallback(async (payload: UpdateSettingsPayload) => {
    setIsSaving(true);
    try {
      const updated = await updateUserSettings(payload);
      setSettings(updated);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { user, settings, isLoading, isSaving, error, saveUser, saveSettings };
}
