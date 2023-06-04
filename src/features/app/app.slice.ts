import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { authThunks } from "features/auth/auth.slice";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: true,
    isAppInitialized: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {},
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
