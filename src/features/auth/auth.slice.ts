import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgForgotPasswordType,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNewPasswordType,
  authApi,
  ForgotPasswordResponseType,
  ProfileType,
  RegisterResponseType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const setNewPassword = createAppAsyncThunk<
  ForgotPasswordResponseType,
  ArgSetNewPasswordType
>("auth/set-new-password", async (arg: ArgSetNewPasswordType, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.setNewPassword(arg);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

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

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/authMe",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.authMe();
      return { profile: res.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isForgotPassword: false,
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isForgotPassword = true;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.isLogin = true;
      state.profile = action.payload.profile;
    });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {
  register,
  login,
  forgotPassword,
  setNewPassword,
  authMe,
};
