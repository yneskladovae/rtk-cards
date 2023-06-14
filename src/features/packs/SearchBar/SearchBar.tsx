import React, { ChangeEvent, useEffect, useState } from "react";
import s from "features/packs/Packs.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import reset from "assets/svg/reset.svg";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { useDebounce } from "common/hooks/useDebounce";

export const SearchBar = () => {
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const authUserId = useAppSelector((state) => state.auth?.profile?._id);
  const dispatch = useAppDispatch();
  const [rangeValue, setRangeValue] = React.useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);
  const [searchPacksName, setSearchPacksName] = useState<string>("");
  const debounceName = useDebounce<string>(searchPacksName, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchPacksNameHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(packsThunks.getCardPacks({ packName: e.currentTarget.value }));
    setSearchPacksName(e.currentTarget.value);
    setSearchParams({ packName: e.currentTarget.value });
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
    });
    setRangeValue(newValue as number[]);
    dispatch(
      packsThunks.getCardPacks({ min: minCardsCount, max: maxCardsCount })
    );
  };

  const isMyPacksFilter = (userId?: string) => {
    if (userId) {
      dispatch(packsThunks.getCardPacks({ user_id: userId }));
      setSearchParams({ ...Object.fromEntries(searchParams), user_id: userId });
    } else {
      dispatch(packsThunks.getCardPacks({}));
    }
  };

  return (
    <div className={s.filtersPacksBlock}>
      <div className={s.search}>
        <h3>Search</h3>
        <TextField
          onChange={searchPacksNameHandler}
          id="outlined-start-adornment"
          className={s.searchForm}
          sx={{ m: 1, width: "100%" }}
          placeholder="Provide your text"
          InputProps={{
            startAdornment: <SearchIcon className={s.searchIcon} />,
          }}
        />
      </div>
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
          <button className={s.minCount}>{rangeValue[0]}</button>
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </Box>
          <button className={s.minCount}>{rangeValue[1]}</button>
        </div>
      </div>
      <div className={s.reset}>
        <img src={reset} alt="Reset button" />
      </div>
    </div>
  );
};
