import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { groupByCategory, fmtShort } from "../utils/finance";
import { CATEGORY_COLORS } from "../data/transactions";

function polarToXY(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(cx, cy, outerR, innerR, startAngle, endAngle) {
  const s = polarToXY(cx, cy, outerR, startAngle);
  const e = polarToXY(cx, cy, outerR, endAngle);
  const si = polarToXY(cx, cy, innerR, startAngle);
  const ei = polarToXY(cx, cy, innerR, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M${s.x},${s.y} A${outerR},${outerR} 0 ${large} 1 ${e.x},${e.y} L${ei.x},${ei.y} A${innerR},${innerR} 0 ${large} 0 ${si.x},${si.y} Z`;
}

export default function SpendingBreakdown() {
  const { state } = useApp();
  const [hovered, setHovered] = useState(null);
  const data = groupByCategory(state.transactions);
  const total = data.reduce((s, d) => s + d.amount, 0);

  const CX = 110, CY = 110, OR = 90, IR = 54;
  let angle = 0;

  if (data.length === 0) {
    return <div className="chart-card"><div className="empty-state">No expense data</div></div>;
  }

  const slices = data.map((d) => {
    const pct = d.amount / total;
    const sweep = pct * 360;
    const start = angle;
    angle += sweep;
    return { ...d, pct, start, end: angle };
  });

  const activeItem = hovered !== null ? slices[hovered] : null;

  return (
    <div className="chart-card">
      <div className="chart-title">Spending Breakdown</div>
      <div className="donut-layout">
        <svg width="220" height="220" style={{ flexShrink: 0 }}>
          {slices.map((s, i) => {
            const color = CATEGORY_COLORS[s.category] || "#888";
            const isHov = hovered === i;
            const oR = isHov ? OR + 6 : OR;
            return (
              <path
                key={s.category}
                d={donutSlice(CX, CY, oR, IR, s.start, s.end)}
                fill={color}
                opacity={hovered !== null && !isHov ? 0.45 : 1}
                style={{ cursor: "pointer", transition: "all 0.18s ease" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
          {activeItem ? (
            <>
              <text x={CX} y={CY - 10} textAnchor="middle" fontSize="11" fill="var(--text-muted)">{activeItem.category.split(" ")[0]}</text>
              <text x={CX} y={CY + 8} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text)">{fmtShort(activeItem.amount)}</text>
              <text x={CX} y={CY + 24} textAnchor="middle" fontSize="11" fill="var(--text-muted)">{(activeItem.pct * 100).toFixed(1)}%</text>
            </>
          ) : (
            <>
              <text x={CX} y={CY - 4} textAnchor="middle" fontSize="11" fill="var(--text-muted)">Total</text>
              <text x={CX} y={CY + 14} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text)">{fmtShort(total)}</text>
            </>
          )}
        </svg>
        <div className="donut-legend">
          {slices.slice(0, 6).map((s, i) => (
            <div
              key={s.category}
              className={`legend-row${hovered === i ? " active" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="legend-color" style={{ background: CATEGORY_COLORS[s.category] }}></span>
              <span className="legend-name">{s.category}</span>
              <span className="legend-val">{(s.pct * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
