export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investment",
  "Rent",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Transport: "#3b82f6",
  Shopping: "#a855f7",
  Utilities: "#14b8a6",
  Entertainment: "#ec4899",
  Healthcare: "#ef4444",
  Salary: "#22c55e",
  Freelance: "#84cc16",
  Investment: "#eab308",
  Rent: "#6366f1",
};

let idCounter = 1;
const mkId = () => String(idCounter++);

export const INITIAL_TRANSACTIONS = [
  // January
  { id: mkId(), date: "2025-01-03", description: "Monthly Salary", amount: 5500, category: "Salary", type: "income" },
  { id: mkId(), date: "2025-01-05", description: "Rent Payment", amount: 1200, category: "Rent", type: "expense" },
  { id: mkId(), date: "2025-01-07", description: "Grocery Store", amount: 142, category: "Food & Dining", type: "expense" },
  { id: mkId(), date: "2025-01-10", description: "Uber Ride", amount: 24, category: "Transport", type: "expense" },
  { id: mkId(), date: "2025-01-12", description: "Netflix", amount: 15, category: "Entertainment", type: "expense" },
  { id: mkId(), date: "2025-01-15", description: "Freelance Project A", amount: 800, category: "Freelance", type: "income" },
  { id: mkId(), date: "2025-01-18", description: "Electricity Bill", amount: 88, category: "Utilities", type: "expense" },
  { id: mkId(), date: "2025-01-20", description: "Amazon Shopping", amount: 210, category: "Shopping", type: "expense" },
  { id: mkId(), date: "2025-01-22", description: "Doctor Visit", amount: 60, category: "Healthcare", type: "expense" },
  { id: mkId(), date: "2025-01-25", description: "Stock Dividend", amount: 320, category: "Investment", type: "income" },
  { id: mkId(), date: "2025-01-28", description: "Restaurant Dinner", amount: 78, category: "Food & Dining", type: "expense" },

  // February
  { id: mkId(), date: "2025-02-03", description: "Monthly Salary", amount: 5500, category: "Salary", type: "income" },
  { id: mkId(), date: "2025-02-05", description: "Rent Payment", amount: 1200, category: "Rent", type: "expense" },
  { id: mkId(), date: "2025-02-08", description: "Coffee Shop", amount: 32, category: "Food & Dining", type: "expense" },
  { id: mkId(), date: "2025-02-10", description: "Metro Card", amount: 45, category: "Transport", type: "expense" },
  { id: mkId(), date: "2025-02-12", description: "Gym Membership", amount: 40, category: "Healthcare", type: "expense" },
  { id: mkId(), date: "2025-02-14", description: "Valentines Dinner", amount: 95, category: "Food & Dining", type: "expense" },
  { id: mkId(), date: "2025-02-18", description: "Freelance Project B", amount: 1200, category: "Freelance", type: "income" },
  { id: mkId(), date: "2025-02-20", description: "Internet Bill", amount: 60, category: "Utilities", type: "expense" },
  { id: mkId(), date: "2025-02-22", description: "Clothing Store", amount: 185, category: "Shopping", type: "expense" },
  { id: mkId(), date: "2025-02-25", description: "Spotify", amount: 10, category: "Entertainment", type: "expense" },

  // March
  { id: mkId(), date: "2025-03-03", description: "Monthly Salary", amount: 5500, category: "Salary", type: "income" },
  { id: mkId(), date: "2025-03-05", description: "Rent Payment", amount: 1200, category: "Rent", type: "expense" },
  { id: mkId(), date: "2025-03-07", description: "Grocery Store", amount: 165, category: "Food & Dining", type: "expense" },
  { id: mkId(), date: "2025-03-09", description: "Taxi Ride", amount: 38, category: "Transport", type: "expense" },
  { id: mkId(), date: "2025-03-12", description: "Amazon Shopping", amount: 340, category: "Shopping", type: "expense" },
  { id: mkId(), date: "2025-03-15", description: "Investment Return", amount: 450, category: "Investment", type: "income" },
  { id: mkId(), date: "2025-03-17", description: "Water Bill", amount: 35, category: "Utilities", type: "expense" },
  { id: mkId(), date: "2025-03-20", description: "Movie Tickets", amount: 30, category: "Entertainment", type: "expense" },
  { id: mkId(), date: "2025-03-22", description: "Pharmacy", amount: 55, category: "Healthcare", type: "expense" },
  { id: mkId(), date: "2025-03-26", description: "Freelance Project C", amount: 950, category: "Freelance", type: "income" },
  { id: mkId(), date: "2025-03-28", description: "Sushi Restaurant", amount: 88, category: "Food & Dining", type: "expense" },

  // April
  { id: mkId(), date: "2025-04-03", description: "Monthly Salary", amount: 5500, category: "Salary", type: "income" },
  { id: mkId(), date: "2025-04-05", description: "Rent Payment", amount: 1200, category: "Rent", type: "expense" },
  { id: mkId(), date: "2025-04-07", description: "Grocery Store", amount: 130, category: "Food & Dining", type: "expense" },
  { id: mkId(), date: "2025-04-10", description: "Bus Pass", amount: 30, category: "Transport", type: "expense" },
  { id: mkId(), date: "2025-04-12", description: "Concert Tickets", amount: 120, category: "Entertainment", type: "expense" },
  { id: mkId(), date: "2025-04-15", description: "Bonus Payment", amount: 2000, category: "Salary", type: "income" },
  { id: mkId(), date: "2025-04-18", description: "Gas Bill", amount: 72, category: "Utilities", type: "expense" },
  { id: mkId(), date: "2025-04-20", description: "Sports Gear", amount: 290, category: "Shopping", type: "expense" },
  { id: mkId(), date: "2025-04-22", description: "Dentist", amount: 150, category: "Healthcare", type: "expense" },
  { id: mkId(), date: "2025-04-25", description: "Stock Dividend", amount: 380, category: "Investment", type: "income" },
];

export const generateId = () => String(Date.now() + Math.random());
