import React from "react";
import { useApp } from "../context/AppContext";

export default function Navbar({ activePage, setActivePage }) {
  const { state, dispatch } = useApp();

  return (
    <header className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">◈</span>
        <span className="nav-title">Financial Dashboard</span>
      </div>
      <nav className="nav-links">
        {["overview", "transactions", "insights"].map((p) => (
          <button
            key={p}
            className={`nav-link${activePage === p ? " active" : ""}`}
            onClick={() => setActivePage(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>
      <div className="nav-right">
        <button className="icon-btn" onClick={() => dispatch({ type: "TOGGLE_DARK" })} title="Toggle dark mode">
          {state.darkMode ? "☀" : "☾"}
        </button>
        <div className="role-switcher">
          <span className="role-label">Role:</span>
          <select
            value={state.role}
            onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
}
