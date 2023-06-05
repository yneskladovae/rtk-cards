import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { appReducer } from "features/app/app.slice";
import { authReducer } from "features/auth/auth.slice";
import { packsReducer } from "features/packs/packs.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
