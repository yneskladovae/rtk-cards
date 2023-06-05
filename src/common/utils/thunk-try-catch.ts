import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { appActions } from "features/app/app.slice";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setIsLoading({ isLoading: true }));
  try {
    return await promise();
  } catch (e) {
    return rejectWithValue(e);
    //   let errorMessage = "";
    //   if (isAxiosError(e)) {
    //     errorMessage = e?.response?.data?.error;
    //   } else if (e instanceof Error) {
    //     errorMessage = `Native error ${e.message}`;
    //   } else {
    //     errorMessage = JSON.stringify(e);
    //   }
    //   toast.error(errorMessage);
    //   return rejectWithValue(null);
    // } finally {
    //   dispatch(appActions.setIsLoading({ isLoading: false }));
  }
};
