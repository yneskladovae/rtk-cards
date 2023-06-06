import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks() {
    return instance.get<GetCardPacksResponseType>("cards/pack");
  },
};

export type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

export type GetCardPacksResponseType = {
  cardPacks: CardPacksType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};
