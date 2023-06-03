import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";
import Cookies from "js-cookie";

var globalVar;
const initialUser = Cookies.get("token")
  ? Cookies.get("token")
  : null;

export const login = createAsyncThunk(
  "user/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(formValue);
      toast.success("Login Successfully");
      console.log("login function")
      console.log(response)
      navigate("/");
      globalVar = response.data.token
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.registerUser(formValue);
      toast.success("Register Successfully");
      navigate("/");
      globalVar = response.data.token
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: initialUser,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      Cookies.remove("token");
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;

      console.log(globalVar)
      Cookies.set("token", globalVar, {
        // set the 'profile' cookie
        // expires: 1, // cookie will expire in 30 days
        path: "/", // cookie will be available in all paths
        // sameSite: 'strict', // cookie will only be sent in a first-party context
      });
      state.user = action.payload.result;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      Cookies.set("token", globalVar, {
        // set the 'profile' cookie
        // expires: 1, // cookie will expire in 30 days
        path: "/", // cookie will be available in all paths
        // sameSite: 'strict', // cookie will only be sent in a first-party context
      });
      state.user = action.payload.result;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
