import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { CATEGORIES } from "../data/transactions";

const empty = { description: "", amount: "", category: CATEGORIES[0], type: "expense", date: new Date().toISOString().slice(0, 10) };

export default function TransactionModal({ existing, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(existing || empty);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.description.trim()) return setError("Description required");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) return setError("Enter a valid amount");
    if (!form.date) return setError("Date required");
    const tx = { ...form, amount: Number(form.amount) };
    if (existing) dispatch({ type: "EDIT_TRANSACTION", payload: tx });
    else dispatch({ type: "ADD_TRANSACTION", payload: tx });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{existing ? "Edit Transaction" : "Add Transaction"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {error && <div className="modal-error">{error}</div>}
        <div className="modal-body">
          <label>Description
            <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="e.g. Grocery Store" />
          </label>
          <div className="modal-row">
            <label>Amount
              <input type="number" min="0" value={form.amount} onChange={(e) => set("amount", e.target.value)} placeholder="0.00" />
            </label>
            <label>Date
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </label>
          </div>
          <div className="modal-row">
            <label>Type
              <select value={form.type} onChange={(e) => set("type", e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <label>Category
              <select value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>{existing ? "Save Changes" : "Add Transaction"}</button>
        </div>
      </div>
    </div>
  );
}
