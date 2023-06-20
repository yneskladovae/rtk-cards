import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  ArgAddNewCardType,
  ArgDeleteCardType,
  cardsAPI,
  CardsParamsType,
  CardsType,
  GetCardsResponseType,
} from "features/cards/cards.api";

const getCards = createAppAsyncThunk<
  { cardsData: GetCardsResponseType },
  CardsParamsType
>("cards/getCards", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsAPI.getCards(arg);
    return {
      cardsData: res.data,
    };
  });
});

const addNewCard = createAppAsyncThunk<void, ArgAddNewCardType>(
  "cards/addNewCard",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.addNewCard(arg);
      dispatch(cardsThunks.getCards(arg));
    });
  }
);

const deleteCard = createAppAsyncThunk<void, ArgDeleteCardType>(
  "cards/deleteCard",
  async (arg, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const cardsPackId = getState().cards.cardsPackId;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.deleteCard(arg);
      dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }));
    });
  }
);

const updateCard = createAppAsyncThunk<any, any>(
  "cards/updateCard",
  async (arg, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const cardsPackId = getState().cards.cardsPackId;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.updateCard(arg);
      dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }));
    });
  }
);

const updateGradeCard = createAppAsyncThunk<any, any>(
  "cards/updateGradeCard",
  async (arg, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const cardsPackId = getState().cards.cardsPackId;
    const pageCount = getState().cards.pageCount;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsAPI.updateGradeCard(arg);
      dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId, pageCount }));
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
    cardsPackId: "",
  },
  reducers: {
    setCardsPackId: (state, action: PayloadAction<{ cardsPackId: string }>) => {
      state.cardsPackId = action.payload.cardsPackId;
    },
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
      state.cards = action.payload.cardsData.cards;
      state.cardsTotalCount = action.payload.cardsData.cardsTotalCount;
      state.maxGrade = action.payload.cardsData.maxGrade;
      state.minGrade = action.payload.cardsData.minGrade;
      state.page = action.payload.cardsData.page;
      state.pageCount = action.payload.cardsData.pageCount;
      state.packUserId = action.payload.cardsData.packUserId;
      state.packUpdated = action.payload.cardsData.packUpdated;
      state.packName = action.payload.cardsData.packName;
    });
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
