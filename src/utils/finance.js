export const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

export const fmtShort = (n) => {
  if (Math.abs(n) >= 1000) return "$" + (n / 1000).toFixed(1) + "k";
  return fmt(n);
};

export const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function getMonthLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}

export function computeSummary(transactions) {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}

export function groupByMonth(transactions) {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}

export function groupByCategory(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += t.amount;
    });
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function applyFilters(transactions, filters, sort) {
  let result = [...transactions];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
    );
  }
  if (filters.type !== "all") result = result.filter((t) => t.type === filters.type);
  if (filters.category !== "all") result = result.filter((t) => t.category === filters.category);
  if (filters.month !== "all") result = result.filter((t) => t.date.startsWith(filters.month));

  result.sort((a, b) => {
    let va = a[sort.field];
    let vb = b[sort.field];
    if (sort.field === "amount") { va = Number(va); vb = Number(vb); }
    if (va < vb) return sort.dir === "asc" ? -1 : 1;
    if (va > vb) return sort.dir === "asc" ? 1 : -1;
    return 0;
  });
  return result;
}

export function getInsights(transactions) {
  const byCategory = groupByCategory(transactions);
  const byMonth = groupByMonth(transactions);
  const topCategory = byCategory[0];
  const months = byMonth.slice(-2);
  const lastMonth = months[1];
  const prevMonth = months[0];
  let monthComparison = null;
  if (lastMonth && prevMonth) {
    const diff = lastMonth.expenses - prevMonth.expenses;
    monthComparison = { diff, pct: prevMonth.expenses ? ((diff / prevMonth.expenses) * 100).toFixed(1) : 0, lastMonth, prevMonth };
  }
  const savingsRate = byMonth.map((m) => ({
    month: m.month,
    rate: m.income > 0 ? (((m.income - m.expenses) / m.income) * 100).toFixed(1) : 0,
  }));
  return { topCategory, monthComparison, savingsRate, byCategory };
}
