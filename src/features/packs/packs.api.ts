import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks(params: ArgGetParamsType) {
    return instance.get<GetCardPacksResponseType>("cards/pack", {
      params: {
        ...params,
      },
    });
  },
  addNewPack(arg: ArgAddNewPackType) {
    return instance.post<GetCardPacksResponseType>("/cards/pack", arg);
  },
  deletePack(packId: ArgDeletePackType) {
    return instance.delete<GetCardPacksResponseType>(
      `/cards/pack/?id=${packId}`
    );
  },
  updatePackName(arg: ArgUpdatePackNameType) {
    return instance.put<GetCardPacksResponseType>(`/cards/pack`, arg);
  },
};

export type ArgGetParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type ArgDeletePackType = string;

export type ArgUpdatePackNameType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: boolean;
  };
};

export type ArgAddNewPackType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: boolean;
  };
};

export type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
  private: boolean;
};

export type GetCardPacksResponseType = {
  cardPacks: CardPacksType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};
