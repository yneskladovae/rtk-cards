import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "features/auth/auth.api";

const register = createAsyncThunk(
    "auth/register",
    (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        authApi.register({email: 'yneskladovae27@gmail.com', password: 'yneskladovae27'})
            .then((res) => {

            })
            .catch((e) => {

            })
    }
);

const slice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: {}
})

export const authReducer = slice.reducer;
export const authThunks = {register}