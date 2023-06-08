import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  ArgAddNewPackType,
  ArgDeletePackType,
  ArgUpdatePackNameType,
  CardPacksType,
  GetCardPacksResponseType,
  packsApi,
} from "features/packs/packs.api";
import {
  cardsAPI,
  CardsType,
  GetCardsResponseType,
} from "features/cards/cards.api";

const getCards = createAppAsyncThunk<GetCardsResponseType, string | undefined>(
  "cards/getCards",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsAPI.getCards(arg);
      return {
        cards: res.data.cards,
        cardsTotalCount: res.data.cardsTotalCount,
        maxGrade: res.data.maxGrade,
        minGrade: res.data.minGrade,
        page: res.data.page,
        pageCount: res.data.pageCount,
        packUserId: res.data.packUserId,
        packUpdated: res.data.packUpdated,
        packName: res.data.packName,
      };
    });
  }
);

export const slice = createSlice({
  name: "cards",
  initialState: {
    cards: null as CardsType[] | null,
    cardsTotalCount: 1,
    maxGrade: 1,
    minGrade: 1,
    page: 1,
    pageCount: 1,
    packUserId: "",
    packUpdated: "",
    packName: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards = action.payload.cards;
      state.cardsTotalCount = action.payload.cardsTotalCount;
      state.maxGrade = action.payload.maxGrade;
      state.minGrade = action.payload.minGrade;
      state.page = action.payload.page;
      state.pageCount = action.payload.pageCount;
      state.packUserId = action.payload.packUserId;
      state.packUpdated = action.payload.packUpdated;
      state.packName = action.payload.packName;
    });
  },
});

export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = {
  getCards,
};
