import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { groupByMonth, fmtShort } from "../utils/finance";

export default function BalanceTrend() {
  const { state } = useApp();
  const months = useMemo(() => groupByMonth(state.transactions), [state.transactions]);

  const W = 600, H = 220, PAD = { t: 20, r: 20, b: 40, l: 55 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const dataIncome = months.map((m) => m.income);
  const dataExpense = months.map((m) => m.expenses);
  const allVals = [...dataIncome, ...dataExpense];
  const maxV = Math.max(...allVals, 1);
  const minV = 0;
  const range = maxV - minV;

  const xPos = (i) => PAD.l + (i / Math.max(months.length - 1, 1)) * iW;
  const yPos = (v) => PAD.t + iH - ((v - minV) / range) * iH;

  const mkPath = (data) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`).join(" ");

  const mkArea = (data) => {
    const top = mkPath(data);
    const base = `L${xPos(data.length - 1).toFixed(1)},${(PAD.t + iH).toFixed(1)} L${PAD.l},${(PAD.t + iH).toFixed(1)} Z`;
    return top + " " + base;
  };

  const monthLabels = months.map((m) => {
    const [y, mo] = m.month.split("-");
    return new Date(Number(y), Number(mo) - 1).toLocaleDateString("en-US", { month: "short" });
  });

  const gridLines = 4;

  if (months.length === 0) {
    return <div className="chart-card"><div className="empty-state">No data yet</div></div>;
  }

  return (
    <div className="chart-card">
      <div className="chart-title">Balance Trend</div>
      <div className="chart-legend">
        <span className="legend-dot" style={{ background: "var(--accent-blue)" }}></span> Income
        <span className="legend-dot" style={{ background: "var(--accent-red)", marginLeft: 12 }}></span> Expenses
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const v = minV + (range / gridLines) * (gridLines - i);
          const y = yPos(v);
          return (
            <g key={i}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="var(--border)" strokeDasharray="3 4" strokeWidth="0.7" />
              <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">{fmtShort(v)}</text>
            </g>
          );
        })}

        {/* Areas */}
        <path d={mkArea(dataIncome)} fill="url(#incomeGrad)" />
        <path d={mkArea(dataExpense)} fill="url(#expenseGrad)" />

        {/* Lines */}
        <path d={mkPath(dataIncome)} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d={mkPath(dataExpense)} fill="none" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots */}
        {months.map((_, i) => (
          <g key={i}>
            <circle cx={xPos(i)} cy={yPos(dataIncome[i])} r="4" fill="var(--accent-blue)" />
            <circle cx={xPos(i)} cy={yPos(dataExpense[i])} r="4" fill="var(--accent-red)" />
          </g>
        ))}

        {/* X Labels */}
        {monthLabels.map((label, i) => (
          <text key={i} x={xPos(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--text-muted)">{label}</text>
        ))}
      </svg>
    </div>
  );
}
