import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import { User } from "../types/types";
import { RootState } from "./store";

interface State {
  user: User;
  navigate: NavigateFunction;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ user, navigate }: State, { rejectWithValue }) => {
    const response = await axios.post("auth/register", {
      user,
    });

    if (!(response.data.message === "Registered Successfully")) {
      return rejectWithValue(response.data);
    }

    toast.success("Registered Successfully");

    navigate("/");

    return user;
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ user, navigate }: State, { rejectWithValue }) => {
    const response = await axios.post("auth/login", {
      user,
    });
    console.log(response.data);

    if (!(response.data.message === "Logged In Successfully")) {
      return rejectWithValue(response.data);
    }

    toast.success("Logged In Successfully");

    navigate("/");

    return user;
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({ navigate }: any, { rejectWithValue }) => {
    const response = await axios.get("auth/logout");

    if (!(response.data.message === "Logged Out Successfully")) {
      return rejectWithValue(response.data);
    }

    toast.success("Logged Out Successfully");

    navigate("/");
  }
);

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const selectU = (state: RootState) => state.user;

export default userSlice.reducer;
