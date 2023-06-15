import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "packsParams",
  initialState: {
    queryParams: {
      packName: "",
      min: 0,
      max: 78,
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
    setUserId: (state, action: PayloadAction<{ user_id: string }>) => {
      state.queryParams.user_id = action.payload.user_id;
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
    setParams: (state, action: PayloadAction<{ queryParams: any }>) => {
      state.queryParams = action.payload.queryParams;
    },
  },
  extraReducers: {},
});

export const packsParamsReducer = slice.reducer;
export const packsParamsActions = slice.actions;
export const packsParamsThunks = {};
