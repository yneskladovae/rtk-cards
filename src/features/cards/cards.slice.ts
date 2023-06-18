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
  ArgAddNewCardType,
  cardsAPI,
  CardsType,
  GetCardsResponseType,
} from "features/cards/cards.api";
import { packsThunks } from "features/packs/packs.slice";

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

const addNewCard = createAppAsyncThunk<void, ArgAddNewCardType>(
  "cards/addNewCard",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.addNewCard(arg);
      dispatch(cardsThunks.getCards(arg.cardsPack_id));
    });
  }
);

const deleteCard = createAppAsyncThunk<any, any>(
  "cards/deleteCard",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.deleteCard(arg);
      // dispatch(cardsThunks.getCards(arg.cardsPack_id));
    });
  }
);

const updateCard = createAppAsyncThunk<any, any>(
  "cards/updateCard",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.updateCard(arg);
      dispatch(cardsThunks.getCards(arg.cardsPack_id));
    });
  }
);

const updateGradeCard = createAppAsyncThunk<any, any>(
  "cards/updateGradeCard",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.updateGradeCard(arg);
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
    cardId: "",
    currCardQuestion: "",
    currCardAnswer: "",
    questionNameForDelete: "",
  },
  reducers: {
    setCardId: (state, action: PayloadAction<{ cardId: string }>) => {
      state.cardId = action.payload.cardId;
    },
    setQuestionNameForDelete: (
      state,
      action: PayloadAction<{ questionNameForDelete: string }>
    ) => {
      state.questionNameForDelete = action.payload.questionNameForDelete;
    },
    setCurrCardQuestion: (
      state,
      action: PayloadAction<{ currCardQuestion: string }>
    ) => {
      state.currCardQuestion = action.payload.currCardQuestion;
    },
    setCurrCardAnswer: (
      state,
      action: PayloadAction<{ currCardAnswer: string }>
    ) => {
      state.currCardAnswer = action.payload.currCardAnswer;
    },
  },
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
    // .addCase(updateCard.fulfilled, (state, action) => {
    //
    // });
  },
});

export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = {
  getCards,
  addNewCard,
  deleteCard,
  updateCard,
  updateGradeCard,
};
