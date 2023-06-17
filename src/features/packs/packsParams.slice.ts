import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgGetParamsType } from "features/packs/packs.api";

export const slice = createSlice({
  name: "packsParams",
  initialState: {
    packName: "",
    min: 0,
    max: 78,
    sortPacks: "",
    page: 1,
    pageCount: 4,
    user_id: "",
  },
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
    setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.pageCount = action.payload.pageCount;
    },
    setUserId: (state, action: PayloadAction<{ user_id: string }>) => {
      state.user_id = action.payload.user_id;
    },
    setSearchPacksName: (
      state,
      action: PayloadAction<{ packName: string }>
    ) => {
      state.packName = action.payload.packName;
    },
    setRangeValues: (
      state,
      action: PayloadAction<{ rangeValues: number[] }>
    ) => {
      state.min = action.payload.rangeValues[0];
      state.max = action.payload.rangeValues[1];
    },
  },
  extraReducers: {},
});

export const packsParamsReducer = slice.reducer;
export const packsParamsActions = slice.actions;
export const packsParamsThunks = {};
