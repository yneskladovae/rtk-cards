import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { authMe, authThunks } from "features/auth/auth.slice";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("auth/authMe"),
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          if (!action.payload.showGlobalError) return;
          const e = action.payload as Error | AxiosError<{ error: string }>;
          let errorMessage = "";
          if (isAxiosError(e)) {
            errorMessage = e?.response?.data?.error;
          } else if (e instanceof Error) {
            errorMessage = `Native error ${e.message}`;
          } else {
            errorMessage = JSON.stringify(e);
          }
          toast.error(errorMessage);
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
