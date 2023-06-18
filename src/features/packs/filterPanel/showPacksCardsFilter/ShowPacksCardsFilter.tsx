import React from "react";
import s from "features/packs/Packs.module.css";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { packsParamsActions } from "features/packs/packsParams.slice";

export const ShowPacksCardsFilter = () => {
  const authUserId = useAppSelector((state) => state.auth?.profile?._id);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();

  const isMyPacksFilter = (userId?: string) => {
    if (userId) {
      dispatch(packsParamsActions.setUserId({ user_id: userId }));
      setSearchParams({ ...Object.fromEntries(searchParams), user_id: userId });
    } else {
      dispatch(packsThunks.getCardPacks({}));
    }
  };

  return (
    <div className={s.showPacks}>
      <h3>Show packs cards</h3>
      <button onClick={() => isMyPacksFilter(authUserId)} className={s.btnMy}>
        My
      </button>
      <button
        onClick={() => isMyPacksFilter()}
        className={`${s.btnAll}  ${s.active}`}
      >
        All
      </button>
    </div>
  );
};
