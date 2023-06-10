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

export const getSingleEntry = createAsyncThunk(
  "entries/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleEntry(id);
      return response.data.entry;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSingleEntry = createAsyncThunk(
  "entries/updateSingleEntry",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.updateSingleEntry(id, formData);
      return response.data.updatedEntry;
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
    singleEntry: [],
  },
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
  extraReducers: {
    // Get All Entries
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

    // Get Single Entry
    [getSingleEntry.pending]: (state) => {
      state.loading = true;
    },
    [getSingleEntry.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleEntry = action.payload;
    },
    [getSingleEntry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // Update Entry
    [updateSingleEntry.pending]: (state) => {
      state.loading = true;
    },
    [updateSingleEntry.fulfilled]: (state, action) => {
      state.loading = false;
      state.entries = action.payload;
    },
    [updateSingleEntry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default entrySlice.reducer;
