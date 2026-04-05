import React from "react";
import { useApp } from "../context/AppContext";
import { computeSummary, fmtShort } from "../utils/finance";

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, balance } = computeSummary(state.transactions);
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const cards = [
    {
      label: "Total Balance",
      value: fmtShort(balance),
      sub: `Savings rate: ${savingsRate}%`,
      color: "var(--accent-green)",
      icon: "⬡",
      glow: "#22c55e33",
    },
    {
      label: "Total Income",
      value: fmtShort(income),
      sub: "All time",
      color: "var(--accent-blue)",
      icon: "↑",
      glow: "#3b82f633",
    },
    {
      label: "Total Expenses",
      value: fmtShort(expenses),
      sub: "All time",
      color: "var(--accent-red)",
      icon: "↓",
      glow: "#ef444433",
    },
    {
      label: "Transactions",
      value: state.transactions.length,
      sub: "Recorded entries",
      color: "var(--accent-yellow)",
      icon: "⋮",
      glow: "#eab30833",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((c) => (
        <div key={c.label} className="summary-card" style={{ "--glow": c.glow }}>
          <div className="card-header">
            <span className="card-label">{c.label}</span>
            <span className="card-icon" style={{ color: c.color }}>{c.icon}</span>
          </div>
          <div className="card-value" style={{ color: c.color }}>{c.value}</div>
          <div className="card-sub">{c.sub}</div>
          <div className="card-bar" style={{ background: c.color }}></div>
        </div>
      ))}
    </div>
  );
}
