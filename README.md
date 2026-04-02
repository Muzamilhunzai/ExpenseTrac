# Expense Trac — Next.js Finance Dashboard

A production-grade personal finance management application built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy env example
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/dashboard`.

---

## 📁 Project Structure

```
neon-ledger/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Route group (shared layout)
│   │   ├── layout.tsx            # Dashboard shell layout
│   │   ├── dashboard/            # Dashboard page
│   │   ├── transactions/         # Transactions page
│   │   ├── analytics/            # Analytics page
│   │   └── settings/             # Settings page
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Root redirect → /dashboard
│   ├── not-found.tsx             # 404 page
│   └── global-error.tsx          # Global error boundary
│
├── components/                   # Shared reusable components
│   ├── ui/                       # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorDisplay.tsx
│   └── layout/                   # Layout shell components
│       ├── Sidebar.tsx
│       ├── TopBar.tsx
│       └── DashboardLayout.tsx
│
├── features/                     # Feature-based modules
│   ├── dashboard/components/     # Dashboard-specific components
│   ├── transactions/components/  # Transaction table, filters, modal
│   ├── analytics/components/     # Charts and anomaly panel
│   └── settings/components/      # Profile form, settings panels
│
├── hooks/                        # Custom React hooks
│   ├── useDashboard.ts
│   ├── useTransactions.ts
│   ├── useAnalytics.ts
│   ├── useUser.ts
│   └── useDebounce.ts
│
├── services/                     # API / data layer
│   ├── api.ts                    # Base API client (swap mock → real)
│   ├── mockData.ts               # Mock data (replace with real API)
│   ├── dashboardService.ts
│   ├── transactionService.ts
│   ├── analyticsService.ts
│   └── userService.ts
│
├── store/                        # Zustand global state
│   ├── uiStore.ts                # UI state (modals, sidebar)
│   └── transactionStore.ts       # Transaction list + filters
│
├── types/                        # TypeScript interfaces
│   ├── transaction.ts
│   ├── analytics.ts
│   ├── user.ts
│   └── api.ts
│
├── lib/                          # Utilities and helpers
│   ├── utils.ts                  # cn(), clamp(), etc.
│   └── formatters.ts             # Currency, date, number formatters
│
├── constants/                    # App-wide constants
│   └── index.ts
│
└── styles/
    └── globals.css               # Global styles + Tailwind
```

---

## 🔌 Connecting to a Backend

All data fetching is centralized in `/services/`. To connect a real backend:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. In each service file, replace the mock body:

```ts
// Before (mock)
export async function getDashboardSummary() {
  await simulateDelay();
  return MOCK_DASHBOARD_SUMMARY;
}

// After (real backend)
export async function getDashboardSummary() {
  return apiClient.get<DashboardSummary>('/dashboard/summary');
}
```

3. The `apiClient` in `services/api.ts` handles headers, error handling, and auth tokens automatically.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Global state management |
| Recharts | Data visualization |
| Lucide React | Icons |
| date-fns | Date utilities |

---

## 🏗 Architecture Decisions

- **Feature-based modules** — each feature owns its components, keeping things cohesive and independently scalable
- **Custom hooks** — all data-fetching logic lives in hooks, keeping pages/views clean
- **Service layer** — single source of truth for all API calls; zero UI code touches fetch directly
- **Zustand stores** — minimal global state for UI (modals, sidebar) and transaction list (filters, pagination)
- **Type-first design** — all API responses, payloads, and props are strongly typed
  BY MUZAMIL HUSSAIN
