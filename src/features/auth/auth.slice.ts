import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";

const register = createAsyncThunk(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.register(arg);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.login(arg);
      dispatch(authActions.setProfile({ profile: res.data }));
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {
    setProfile(
      state,
      action: PayloadAction<{ profile: ProfileType }>
    ) {
      state.profile = action.payload.profile;
    },
  },
  extraReducers: {},
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };
