import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import incomeReducer from "../features/income/incomeSlice";
import expenseReducer from "../features/expense/expenseSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

// Add more reducers as needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
    dashboard: dashboardReducer,
    // Add more slices here
  },
});

export default store;
