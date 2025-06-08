import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_EXPENSE_URL,
  ALL_EXPENSE_URL,
  UPDATE_EXPENSE_URL,
  DELETE_EXPENSE_URL,
} from "../../utils/apiRoutes";

// Initial State
const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.get(ALL_EXPENSE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Add expense
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.post(ADD_EXPENSE_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
       console.log("Add income response:", res.data);
       if (res.data.error) {
         return thunkAPI.rejectWithValue(res.data.error);
       }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Update expense
export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ id, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.patch(UPDATE_EXPENSE_URL(id), data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
          err?.response?.data?.message || err.message || "Something went wrong"
        );
    }
  }
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      await axios.delete(DELETE_EXPENSE_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
       return thunkAPI.rejectWithValue(
         err?.response?.data?.message || err.message || "Something went wrong"
       );
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = Array.isArray(action.payload?.expenses)
          ? action.payload.expenses
          : [];
        state.error = null;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.error = null;
      })
      .addCase(addExpense.rejected, (state, action) => {
         state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index !== -1) state.expenses[index] = action.payload;
      })
      .addCase(updateExpense.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload || state.error.message;
      })

      .addCase(deleteExpense.fulfilled, (state, action) => {
        if (!Array.isArray(state.expenses)) {
          state.expenses = [];
        }
        state.expenses = state.expenses.filter(
          (inc) => inc._id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
