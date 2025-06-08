import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_INCOME_URL,
  ALL_INCOME_URL,
  UPDATE_INCOME_URL,
  DELETE_INCOME_URL,
} from "../../utils/apiRoutes";

// Initial State
const initialState = {
  incomes: [],
  loading: false,
  error: null,
};


export const fetchIncomes = createAsyncThunk(
  "income/fetchIncomes",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.get(ALL_INCOME_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Add income
export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.post(ADD_INCOME_URL, data, {
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

// Update income
export const updateIncome = createAsyncThunk(
  "income/updateIncome",
  async ({ id, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const res = await axios.patch(UPDATE_INCOME_URL(id), data, {
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

// Delete income
export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      await axios.delete(DELETE_INCOME_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


// Slice
const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        console.log("Fetched incomes payload:", action.payload);
        state.loading = false;
        state.incomes = Array.isArray(action.payload?.income)
          ? action.payload.income
          : [];
        state.error = null;
      })

      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && !action.payload.error) {
          if (!Array.isArray(state.incomes)) {
            state.incomes = [];
          }
          state.incomes.push(action.payload);
          state.error = null;
        } else {
          state.error = action.payload.error || "Unknown error";
        }
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateIncome.fulfilled, (state, action) => {
        if (!action.payload || !action.payload._id) return;
        const index = state.incomes.findIndex(
          (inc) => inc._id === action.payload._id
        );
        if (index !== -1) state.incomes[index] = action.payload;
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || state.error.message;
      })

      .addCase(deleteIncome.fulfilled, (state, action) => {
        if (!Array.isArray(state.incomes)) {
          state.incomes = [];
        }
        state.incomes = state.incomes.filter(
          (inc) => inc._id !== action.payload
        );
      })

      .addCase(deleteIncome.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default incomeSlice.reducer;
