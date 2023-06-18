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
import { Search } from "features/packs/Search/Search";

export const SearchBar = () => {
  const authUserId = useAppSelector((state) => state.auth?.profile?._id);
  const min = useAppSelector((state) => state.packsParams.min);
  const max = useAppSelector((state) => state.packsParams.max);
  const [rangeValues, setRangeValues] = React.useState<number[]>([min, max]);
  const debounceRange = useDebounce<number[]>(rangeValues, 500);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(packsParamsActions.setRangeValues({ rangeValues: rangeValues }));
  }, [debounceRange]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      min: rangeValues[0].toString(),
      max: rangeValues[1].toString(),
    });
    setRangeValues(newValue as number[]);
  };

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
      <div className={s.numberOfCards}>
        <h3>Number of cards</h3>
        <div className={s.numberOfCardsContainer}>
          <button className={s.minCount}>{rangeValues[0]}</button>
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={rangeValues}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </Box>
          <button className={s.minCount}>{rangeValues[1]}</button>
        </div>
      </div>
      <div className={s.reset}>
        <img onClick={resetAllFiltersHandler} src={reset} alt="Reset button" />
      </div>
    </div>
  );
};
