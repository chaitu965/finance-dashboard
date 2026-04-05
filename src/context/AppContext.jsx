import React, { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_TRANSACTIONS, generateId } from "../data/transactions";

const AppContext = createContext();

const STORAGE_KEY = "finance_dashboard_state";

const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: "viewer", // "viewer" | "admin"
  darkMode: false,
  filters: {
    search: "",
    type: "all", // "all" | "income" | "expense"
    category: "all",
    month: "all",
  },
  sort: { field: "date", dir: "desc" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [{ ...action.payload, id: generateId() }, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...init, ...JSON.parse(saved) };
    } catch {}
    return init;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
