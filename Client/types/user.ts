export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  clearanceLevel: number;
  currency: string;
  nodeVersion: string;
}

export interface UserSettings {
  currency: string;
  theme: 'dark' | 'light';
  notifications: {
    budgetThresholds: boolean;
    dailySummary: boolean;
    systemUpdates: boolean;
  };
  twoFactorEnabled: boolean;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export interface UpdateSettingsPayload {
  currency?: string;
  theme?: 'dark' | 'light';
  notifications?: Partial<UserSettings['notifications']>;
  twoFactorEnabled?: boolean;
}
