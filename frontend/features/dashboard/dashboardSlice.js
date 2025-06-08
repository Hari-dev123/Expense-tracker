import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DASHBOARD_URL } from "../../utils/apiRoutes";


const initialState = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
  recentTransactions: [],
  loading: false,
  error: null,
};


export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.get(DASHBOARD_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalBalance = action.payload.totalBalance;
        state.totalIncome = action.payload.totalIncome;
        state.totalExpense = action.payload.totalExpense;
        state.recentTransactions = action.payload.recentTransactions;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
