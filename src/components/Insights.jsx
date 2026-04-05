import React from "react";
import { useApp } from "../context/AppContext";
import { getInsights, fmtShort, fmt } from "../utils/finance";
import { CATEGORY_COLORS } from "../data/transactions";

export default function Insights() {
  const { state } = useApp();
  const { topCategory, monthComparison, savingsRate, byCategory } = getInsights(state.transactions);

  const lastRate = savingsRate[savingsRate.length - 1];
  const avgRate = savingsRate.length
    ? (savingsRate.reduce((s, r) => s + Number(r.rate), 0) / savingsRate.length).toFixed(1)
    : 0;

  return (
    <div className="section">
      <div className="section-header"><h2>Insights</h2></div>
      <div className="insights-grid">

        {/* Top Category */}
        {topCategory && (
          <div className="insight-card">
            <div className="insight-icon">🏆</div>
            <div className="insight-label">Highest Spending</div>
            <div className="insight-value" style={{ color: CATEGORY_COLORS[topCategory.category] }}>
              {topCategory.category}
            </div>
            <div className="insight-sub">{fmtShort(topCategory.amount)} total spent</div>
          </div>
        )}

        {/* Month Comparison */}
        {monthComparison && (
          <div className="insight-card">
            <div className="insight-icon">{monthComparison.diff > 0 ? "📈" : "📉"}</div>
            <div className="insight-label">Month-over-Month Expenses</div>
            <div className={`insight-value ${monthComparison.diff > 0 ? "neg" : "pos"}`}>
              {monthComparison.diff > 0 ? "+" : ""}{monthComparison.pct}%
            </div>
            <div className="insight-sub">
              {fmtShort(monthComparison.prevMonth.expenses)} → {fmtShort(monthComparison.lastMonth.expenses)}
            </div>
          </div>
        )}

        {/* Savings Rate */}
        {lastRate && (
          <div className="insight-card">
            <div className="insight-icon">💰</div>
            <div className="insight-label">Latest Savings Rate</div>
            <div className={`insight-value ${Number(lastRate.rate) >= 20 ? "pos" : "neg"}`}>
              {lastRate.rate}%
            </div>
            <div className="insight-sub">Avg across months: {avgRate}%</div>
          </div>
        )}

        {/* Spending bar chart */}
        <div className="insight-card wide">
          <div className="insight-label" style={{ marginBottom: 12 }}>Category Breakdown</div>
          {byCategory.slice(0, 5).map((d) => {
            const pct = byCategory[0] ? (d.amount / byCategory[0].amount) * 100 : 0;
            return (
              <div key={d.category} className="bar-row">
                <span className="bar-label">{d.category}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%`, background: CATEGORY_COLORS[d.category] || "#888" }}></div>
                </div>
                <span className="bar-val">{fmtShort(d.amount)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
