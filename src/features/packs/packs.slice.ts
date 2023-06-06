import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  CardPacksType,
  GetCardPacksResponseType,
  packsApi,
} from "features/packs/packs.api";

const getCardPacks = createAppAsyncThunk<GetCardPacksResponseType, void>(
  "packs/getCardPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks();
      return { cardPacks: res.data.cardPacks };
    });
  }
);

export const slice = createSlice({
  name: "packs",
  initialState: {
    cardsPack: null as CardPacksType[] | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardPacks.fulfilled, (state, action) => {
      state.cardsPack = action.payload.cardPacks;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { getCardPacks };
