import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgForgotPasswordType,
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ForgotPasswordResponseType,
  ProfileType,
  RegisterResponseType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const forgotPassword = createAppAsyncThunk<
  ForgotPasswordResponseType,
  ArgForgotPasswordType
>("auth/forgot", async (arg: ArgForgotPasswordType, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.forgotPassword(arg);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const register = createAppAsyncThunk<RegisterResponseType, ArgRegisterType>(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.register(arg);
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await authApi.login(arg).then((res) => {
        return { profile: res.data };
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isForgotPassword: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isForgotPassword = true;
    });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, forgotPassword };
