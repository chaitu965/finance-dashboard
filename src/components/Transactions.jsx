import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { applyFilters, fmt, fmtDate } from "../utils/finance";
import { CATEGORIES, CATEGORY_COLORS } from "../data/transactions";
import TransactionModal from "./TransactionModal";

function exportCSV(transactions) {
  const header = "Date,Description,Category,Type,Amount";
  const rows = transactions.map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`);
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "transactions.csv"; a.click();
}

const MONTHS = ["2025-01", "2025-02", "2025-03", "2025-04"];

export default function Transactions() {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === "admin";
  const [modal, setModal] = useState(null); // null | "add" | transaction obj
  const [confirmDel, setConfirmDel] = useState(null);

  const { filters, sort } = state;
  const setFilter = (obj) => dispatch({ type: "SET_FILTER", payload: obj });
  const setSort = (field) => {
    if (sort.field === field) dispatch({ type: "SET_SORT", payload: { field, dir: sort.dir === "asc" ? "desc" : "asc" } });
    else dispatch({ type: "SET_SORT", payload: { field, dir: "desc" } });
  };

  const filtered = useMemo(() => applyFilters(state.transactions, filters, sort), [state.transactions, filters, sort]);

  const SortIcon = ({ field }) => sort.field === field ? (sort.dir === "asc" ? " ↑" : " ↓") : " ·";

  return (
    <div className="section">
      <div className="section-header">
        <h2>Transactions</h2>
        <div className="header-actions">
          <button className="btn-ghost" onClick={() => exportCSV(filtered)}>↓ Export CSV</button>
          {isAdmin && <button className="btn-primary" onClick={() => setModal("add")}>+ Add</button>}
        </div>
      </div>

      <div className="filters-bar">
        <input
          className="search-input"
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
        <select value={filters.type} onChange={(e) => setFilter({ type: e.target.value })}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filters.category} onChange={(e) => setFilter({ category: e.target.value })}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filters.month} onChange={(e) => setFilter({ month: e.target.value })}>
          <option value="all">All Months</option>
          {MONTHS.map((m) => <option key={m} value={m}>{new Date(m + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">No transactions match your filters.</div>
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th onClick={() => setSort("date")} className="sortable">Date<SortIcon field="date" /></th>
                <th onClick={() => setSort("description")} className="sortable">Description<SortIcon field="description" /></th>
                <th onClick={() => setSort("category")} className="sortable">Category<SortIcon field="category" /></th>
                <th onClick={() => setSort("type")} className="sortable">Type<SortIcon field="type" /></th>
                <th onClick={() => setSort("amount")} className="sortable right">Amount<SortIcon field="amount" /></th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="date-cell">{fmtDate(t.date)}</td>
                  <td>{t.description}</td>
                  <td>
                    <span className="cat-badge" style={{ "--cc": CATEGORY_COLORS[t.category] || "#888" }}>
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`amount-cell ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                  </td>
                  {isAdmin && (
                    <td className="action-cell">
                      <button className="icon-btn" onClick={() => setModal(t)} title="Edit">✎</button>
                      <button className="icon-btn danger" onClick={() => setConfirmDel(t.id)} title="Delete">✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="tx-count">{filtered.length} of {state.transactions.length} transactions</div>

      {modal && (
        <TransactionModal
          existing={modal !== "add" ? modal : null}
          onClose={() => setModal(null)}
        />
      )}

      {confirmDel && (
        <div className="modal-overlay" onClick={() => setConfirmDel(null)}>
          <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Transaction?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => { dispatch({ type: "DELETE_TRANSACTION", payload: confirmDel }); setConfirmDel(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
