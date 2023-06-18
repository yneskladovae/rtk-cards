import { instance } from "common/api/common.api";

export const cardsAPI = {
  getCards(params: CardsParamsType) {
    return instance.get<GetCardsResponseType>(`cards/card`, { params });
  },
  addNewCard(arg: ArgAddNewCardType) {
    return instance.post<CardsType>(`cards/card`, { card: arg });
  },
  deleteCard(arg: ArgDeleteCardType) {
    return instance.delete<CardsType>(`cards/card?id=${arg.id}`);
  },
  updateCard(arg: ArgUpdateCardType) {
    return instance.put<CardsType>(`cards/card`, { card: arg });
  },
  updateGradeCard(arg: ArgUpdateGradeCardType) {
    return instance.put<any>(`cards/grade`, arg);
  },
};

export type CardsParamsType = {
  cardsPack_id: string;
  cardQuestion?: string;
  cardAnswer?: string;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type ArgDeleteCardType = {
  id: string;
};

export type ArgUpdateGradeCardType = {
  grade: number;
  card_id: string;
};

export type ArgUpdateCardType = {
  _id: string | undefined;
  question: string;
  cardsPack_id: string;
};

export type ArgAddNewCardType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};

export type CardsType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};

export type GetCardsResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packUpdated: string;
  packName: string;
};
