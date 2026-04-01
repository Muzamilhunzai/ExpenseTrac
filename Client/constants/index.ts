import type { TransactionCategory } from '@/types/transaction';

export const APP_NAME = 'Expense Trac';
export const APP_TAGLINE = 'By Muzamil Hussain';

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Transactions', href: '/transactions', icon: 'Receipt' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart2' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
] as const;

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  'Housing',
  'Food',
  'Transport',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Earnings',
  'Cyber-Hardware',
  'Nutrition',
  'Subscriptions',
  'Other',
];

export const PAYMENT_METHODS = [
  'Direct Deposit',
  'Direct Debit',
  'Crypto-Node',
  'Credit Card',
  'Wire Transfer',
] as const;

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
] as const;

export const DATE_RANGE_OPTIONS = [
  { value: 'last30', label: 'Last 30 Cycles' },
  { value: 'last90', label: 'Last 90 Cycles' },
  { value: 'year', label: 'Full Orbit (Year)' },
] as const;

export const PAGE_SIZE = 10;

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#ff2d78',
  Food: '#00ffcc',
  Transport: '#ffe04a',
  Entertainment: '#a78bfa',
  Healthcare: '#34d399',
  Shopping: '#f97316',
  Earnings: '#00ffcc',
  'Cyber-Hardware': '#60a5fa',
  Nutrition: '#fb923c',
  Subscriptions: '#c084fc',
  Other: '#5a5068',
};
