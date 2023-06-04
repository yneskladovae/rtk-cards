import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { toast } from "react-toastify";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    return await promise();
  } catch (e: any) {
    const error = e.response ? e.response.data.error : e.message;
    toast.error(error);
    return rejectWithValue(null);
  }
};
