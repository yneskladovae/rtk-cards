import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ProfileType,
  RegisterResponseType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "utils/create-app-async-thunk";

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

const login = createAppAsyncThunk<ProfileType, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.login(arg);
      dispatch(authActions.setProfile({ profile: res.data }));
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isReg: false,
    isLogin: false,
    isLoading: false,
    profile: null as ProfileType | null,
  },
  reducers: {
    setProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isReg = true;
        state.isLoading = false;
      })
      .addCase(register.pending, (state, action) => {
        state.isReg = false;
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isReg = false;
      });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };
