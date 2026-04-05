import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import BalanceTrend from "./components/BalanceTrend";
import SpendingBreakdown from "./components/SpendingBreakdown";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./styles.css";

function Dashboard() {
  const { state } = useApp();
  const [page, setPage] = useState("overview");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  }, [state.darkMode]);

  return (
    <div className="app">
      <Navbar activePage={page} setActivePage={setPage} />
      <main className="main">
        {state.role === "viewer" && (
          <div className="role-banner">👁 Viewer mode — read only. Switch to Admin to add or edit transactions.</div>
        )}
        {page === "overview" && (
          <>
            <SummaryCards />
            <div className="charts-grid">
              <BalanceTrend />
              <SpendingBreakdown />
            </div>
          </>
        )}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
