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
};

export type ArgDeletePackType = {
  packId: any;
};

export type ArgUpdatePackNameType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: false;
  };
};

export type ArgAddNewPackType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: false;
  };
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
