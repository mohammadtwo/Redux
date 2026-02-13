import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../api/http";

type User = {
  username: string | undefined;
  id: number | null;
};

type AuthState = {
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
  user: User;
  token: string | undefined;
};

type Response = {
  user: {
    username: string;
    id: number;
  };
  token: string;
};

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  loading: false,
  error: "",
  user: {
    username: undefined,
    id: null,
  },
  token: localStorage.getItem("token") || undefined,
};

// 🚀 Login
export const loginUser = createAsyncThunk<
  Response,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (params, thunkAPI) => {
  try {
    const data = (await http.post<Response>("/auth/login", params)).data;

    localStorage.setItem("token", data.token);

    return data;
  } catch (error :any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Invalid credentials",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.isLoggedIn = false;
      state.loading = false;
      state.error = "";
      state.user = { username: undefined, id: null };
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
