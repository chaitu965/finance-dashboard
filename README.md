<<<<<<< HEAD
# FinFlow — Finance Dashboard

A clean, interactive personal finance dashboard built with React + Vite.

## Features

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Transaction count), SVG balance trend chart, interactive donut spending breakdown
- **Transactions** — Full table with search, filter by type/category/month, sort by any column, CSV export
- **Insights** — Top spending category, month-over-month comparison, savings rate, horizontal bar chart breakdown
- **Role-Based UI** — Switch between Viewer (read-only) and Admin (add/edit/delete transactions) via dropdown
- **Dark Mode** — Toggle with persistence via localStorage
- **Data Persistence** — All state saved to localStorage automatically

## Tech Stack

- React 18 (hooks + Context API for state management)
- Vite (build tool)
- Pure CSS (no UI library — custom design system with CSS variables)
- Zero external chart libraries (pure SVG charts)

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.jsx          # Top nav with role switcher + dark mode
    SummaryCards.jsx    # 4 KPI cards
    BalanceTrend.jsx    # SVG line/area chart
    SpendingBreakdown.jsx  # Interactive donut chart
    Transactions.jsx    # Table with filters + CRUD
    TransactionModal.jsx   # Add/edit form modal
    Insights.jsx        # Key observations section
  context/
    AppContext.jsx      # Global state (transactions, role, filters, dark mode)
  data/
    transactions.js     # Mock seed data + category config
  utils/
    finance.js          # Pure helper functions (formatting, aggregations)
  styles.css            # Complete design system
  App.jsx               # Root component + page routing
```

## Design Decisions

- **No external chart library** — Charts are hand-crafted SVG for full control and zero bundle weight
- **Context + useReducer** — Straightforward state management without Redux overhead for this scale
- **CSS custom properties** — Enables instant dark mode without class juggling
- **Data persistence** — localStorage used for role, dark mode, and all transactions so state survives refreshes
- **Role-based UI** — Viewer sees the dashboard read-only; Admin sees edit/delete buttons and the Add Transaction CTA

## Assumptions

- Data is month-bounded to Jan–Apr 2025 (mock data)
- Roles are simulated on the frontend only (no auth backend)
- Currency is USD
=======
# finance-dashboard
>>>>>>> b0f9ba7a455e9da35bcc9e19943b796f4a94fa35
