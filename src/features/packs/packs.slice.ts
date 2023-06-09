import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  ArgAddNewPackType,
  ArgDeletePackType,
  ArgGetParamsType,
  ArgUpdatePackNameType,
  CardPacksType,
  GetCardPacksResponseType,
  packsApi,
} from "features/packs/packs.api";

const updatePackName = createAppAsyncThunk<void, ArgUpdatePackNameType>(
  "packs/updatePackName",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.updatePackName(arg);
      dispatch(packsThunks.getCardPacks({}));
    });
  }
);

const deletePack = createAppAsyncThunk<void, ArgDeletePackType>(
  "packs/deletePack",
  async (packId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(packId);
      dispatch(packsThunks.getCardPacks({}));
    });
  }
);

const addNewPack = createAppAsyncThunk<void, ArgAddNewPackType>(
  "packs/addNewPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addNewPack(arg);
      dispatch(packsThunks.getCardPacks({}));
    });
  }
);

const getCardPacks = createAppAsyncThunk<
  GetCardPacksResponseType,
  ArgGetParamsType
>("packs/getCardPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg);
    return {
      cardPacks: res.data.cardPacks,
      page: res.data.page,
      cardPacksTotalCount: res.data.cardPacksTotalCount,
      maxCardsCount: res.data.maxCardsCount,
      minCardsCount: res.data.minCardsCount,
      pageCount: res.data.pageCount,
    };
  });
});

export const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: null as CardPacksType[] | null,
    page: 1,
    cardPacksTotalCount: 1,
    maxCardsCount: 1,
    minCardsCount: 1,
    pageCount: 1,
  },
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCardPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks;
      state.page = action.payload.page;
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
      state.maxCardsCount = action.payload.maxCardsCount;
      state.minCardsCount = action.payload.minCardsCount;
      state.pageCount = action.payload.pageCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = {
  getCardPacks,
  addNewPack,
  deletePack,
  updatePackName,
};
