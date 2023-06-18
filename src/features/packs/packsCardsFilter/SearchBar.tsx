import React, { ChangeEvent, useEffect, useState } from "react";
import s from "features/packs/Packs.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import reset from "assets/svg/reset.svg";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { useDebounce } from "common/hooks/useDebounce";
import { packsParamsActions } from "features/packs/packsParams.slice";
import { Search } from "features/packs/search/Search";
import { NumberOfCardsSlider } from "features/packs/numberOfCardsSlider/NumberOfCardsSlider";

export const SearchBar = () => {
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

  const resetAllFiltersHandler = () => {
    dispatch(packsThunks.getCardPacks({}));
    setSearchParams({});
  };

  return (
    <div className={s.filtersPacksBlock}>
      <Search />
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
      <NumberOfCardsSlider />
      <div className={s.reset}>
        <img onClick={resetAllFiltersHandler} src={reset} alt="Reset button" />
      </div>
    </div>
  );
};
