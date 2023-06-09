import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const getAllEntries = createAsyncThunk(
  "entries/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllEntries();
      return response.data.entries;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const entrySlice = createSlice({
  name: "entries",
  initialState: {
    error: "",
    loading: false,
    entries: [],
  },
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
  extraReducers: {
    [getAllEntries.pending]: (state) => {
      state.loading = true;
    },
    [getAllEntries.fulfilled]: (state, action) => {
      state.loading = false;
      state.entries = action.payload;
    },
    [getAllEntries.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default entrySlice.reducer;
