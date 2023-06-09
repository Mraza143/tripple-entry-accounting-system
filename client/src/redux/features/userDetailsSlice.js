import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsersDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUsers();
      return response.data.result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    usersDetails: [],
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.usersDetails = action.payload;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersDetails = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default userDetailsSlice.reducer;
