import { simulateDelay } from './api';
import { MOCK_USER, MOCK_USER_SETTINGS } from './mockData';
import type { User, UserSettings, UpdateUserPayload, UpdateSettingsPayload } from '@/types/user';

/**
 * Fetch current user profile.
 * Replace with: return apiClient.get<User>('/users/me');
 */
export async function getCurrentUser(): Promise<User> {
  await simulateDelay(300);
  return MOCK_USER;
}

/**
 * Update user profile.
 * Replace with: return apiClient.put<User>('/users/me', payload);
 */
export async function updateUser(payload: UpdateUserPayload): Promise<User> {
  await simulateDelay(600);
  return { ...MOCK_USER, ...payload };
}

/**
 * Fetch user settings.
 * Replace with: return apiClient.get<UserSettings>('/users/me/settings');
 */
export async function getUserSettings(): Promise<UserSettings> {
  await simulateDelay(300);
  return MOCK_USER_SETTINGS;
}

/**
 * Update user settings.
 * Replace with: return apiClient.put<UserSettings>('/users/me/settings', payload);
 */
export async function updateUserSettings(
  payload: UpdateSettingsPayload
): Promise<UserSettings> {
  await simulateDelay(500);
  const merged = { ...MOCK_USER_SETTINGS, ...payload };
  return {
    ...merged,
    notifications: {
      budgetThresholds: merged.notifications?.budgetThresholds ?? true,
      dailySummary: merged.notifications?.dailySummary ?? true,
      systemUpdates: merged.notifications?.systemUpdates ?? false,
    },
  } as UserSettings;
}
