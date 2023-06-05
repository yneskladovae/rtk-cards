import { createSlice } from "@reduxjs/toolkit";
import {
  ArgEditUserType,
  ArgForgotPasswordType,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNewPasswordType,
  authApi,
  EditUserResponseType,
  ForgotPasswordResponseType,
  LogoutResponseType,
  ProfileType,
} from "features/auth/auth.api";
import { toast } from "react-toastify";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

export const setNewPassword = createAppAsyncThunk<
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

export const forgotPassword = createAppAsyncThunk<
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

export const register = createAppAsyncThunk<void, ArgRegisterType>(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authApi.register(arg);
        return res.data;
      },
      false
    );
  }
);

export const login = createAppAsyncThunk<
  { profile: ProfileType },
  ArgLoginType
>("auth/login", async (arg: ArgLoginType, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await authApi.login(arg);
      return { profile: res.data };
    },
    false
  );
});

export const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>(
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

export const logout = createAppAsyncThunk<LogoutResponseType, void>(
  "auth/logout",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.logout();
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const editUser = createAppAsyncThunk<
  EditUserResponseType,
  ArgEditUserType
>("auth/editUser", async (arg, thunkAPI) => {
  try {
    const res = await authApi.editUser(arg);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isForgotPassword: false,
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.profile = action.payload.profile;
      toast.success("You have successfully logged in.");
    });
    builder.addCase(register.fulfilled, (state, action) => {
      toast.success("You have successfully registered!");
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isForgotPassword = true;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.isLogin = true;
      state.profile = action.payload.profile;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.profile = null;
      toast.success("You have successfully logged out!");
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.profile = action.payload.updatedUser;
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
  logout,
  editUser,
};
