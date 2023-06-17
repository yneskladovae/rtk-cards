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
import { packsParamsActions } from "features/packs/packsParams.slice";

export const SearchBar = () => {
  const authUserId = useAppSelector((state) => state.auth?.profile?._id);
  const min = useAppSelector((state) => state.packsParams.min);
  const max = useAppSelector((state) => state.packsParams.max);
  const [rangeValues, setRangeValues] = React.useState<number[]>([min, max]);
  const [searchPacksName, setSearchPacksName] = useState<string>("");
  const debounceName = useDebounce<string>(searchPacksName, 500);
  const debounceRange = useDebounce<number[]>(rangeValues, 500);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      packsParamsActions.setSearchPacksName({ packName: searchPacksName })
    );
  }, [debounceName]);

  useEffect(() => {
    dispatch(packsParamsActions.setRangeValues({ rangeValues: rangeValues }));
    // setSearchParams({
    //   ...Object.fromEntries(searchParams),
    //   min: rangeValues[0].toString(),
    //   max: rangeValues[1].toString(),
    // });
  }, [debounceRange]);

  const searchPacksNameHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // dispatch(
    //   packsParamsActions.setSearchPacksName({ packName: e.currentTarget.value })
    // );
    setSearchPacksName(e.currentTarget.value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      packName: e.currentTarget.value,
    });
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      min: rangeValues[0].toString(),
      max: rangeValues[1].toString(),
    });
    setRangeValues(newValue as number[]);
    // dispatch(
    //   packsThunks.getCardPacks({ min: minCardsCount, max: maxCardsCount })
    // );
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
