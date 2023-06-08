import { instance } from "common/api/common.api";

export const cardsAPI = {
  getCards(cardId: string | undefined) {
    return instance.get<GetCardsResponseType>(
      `cards/card?cardsPack_id=${cardId}`
    );
  },
  addNewCard(arg: ArgAddNewCardType) {
    return instance.post<CardsType>(`cards/card`, { card: arg });
  },
  deleteCard(cardId: string | undefined) {
    return instance.delete<CardsType>(`cards/card?id=${cardId}`);
  },
};

export type ArgAddNewCardType = {
  cardsPack_id: string | undefined;
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
