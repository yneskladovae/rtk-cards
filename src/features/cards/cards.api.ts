import { instance } from "common/api/common.api";

export const cardsAPI = {
  getCards(cardsId: string | undefined) {
    return instance.get<GetCardsResponseType>(
      `cards/card?cardsPack_id=${cardsId}`
    );
  },
  addNewCard(arg: ArgAddNewCardType) {
    return instance.post<CardsType>(`cards/card`, { card: arg });
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
