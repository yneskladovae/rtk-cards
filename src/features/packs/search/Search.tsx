import React, { ChangeEvent, useEffect, useState } from "react";
import s from "features/packs/Packs.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "common/hooks/useDebounce";
import { packsParamsActions } from "features/packs/packsParams.slice";

export const Search = () => {
  const [searchPacksName, setSearchPacksName] = useState<string>("");
  const debounceName = useDebounce<string>(searchPacksName, 500);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      packsParamsActions.setSearchPacksName({ packName: searchPacksName })
    );
  }, [debounceName]);

  const searchPacksNameHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchPacksName(e.currentTarget.value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      packName: e.currentTarget.value,
    });
  };

  return (
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
  );
};
