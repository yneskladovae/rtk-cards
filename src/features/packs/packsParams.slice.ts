import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "packsParams",
  initialState: {
    queryParams: {
      packName: "",
      min: 1,
      max: 100,
      sortPacks: "",
      page: 1,
      pageCount: 4,
      user_id: "",
    },
  },
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.queryParams.page = action.payload.page;
    },
    setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.queryParams.pageCount = action.payload.pageCount;
    },
    setIsMyPacksFilter: (state, action: PayloadAction<{ user_id: string }>) => {
      state.queryParams.user_id = action.payload.user_id;
    },
    setSearchPacksName: (
      state,
      action: PayloadAction<{ packName: string }>
    ) => {
      state.queryParams.packName = action.payload.packName;
    },
    setRangeValues: (
      state,
      action: PayloadAction<{ rangeValues: number[] }>
    ) => {
      state.queryParams.min = action.payload.rangeValues[0];
      state.queryParams.max = action.payload.rangeValues[1];
    },
  },
  extraReducers: {},
});

export const packsParamsReducer = slice.reducer;
export const packsParamsActions = slice.actions;
export const packsParamsThunks = {};
