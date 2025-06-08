const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const REGISTER_URL = `${BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${BASE_URL}/api/auth/login`; 
export const USER_INFO_URL = `${BASE_URL}/api/auth/user`;

export const ADD_INCOME_URL = `${BASE_URL}/api/income/addIncome`;
export const ALL_INCOME_URL = `${BASE_URL}/api/income/allIncome`;
export const UPDATE_INCOME_URL = (id) =>
  `${BASE_URL}/api/income/updateIncome/${id}`;

export const DELETE_INCOME_URL = (id) =>
  `${BASE_URL}/api/income/deleteIncome/${id}`;

export const ADD_EXPENSE_URL = `${BASE_URL}/api/expense/addExpense`;
export const ALL_EXPENSE_URL = `${BASE_URL}/api/expense/allExpense`;
export const UPDATE_EXPENSE_URL = (id) =>
  `${BASE_URL}/api/expense/updateExpense/${id}`;
export const DELETE_EXPENSE_URL = (id) =>
  `${BASE_URL}/api/expense/deleteExpense/${id}`;

export const DASHBOARD_URL = `${BASE_URL}/api/dashboard`;
