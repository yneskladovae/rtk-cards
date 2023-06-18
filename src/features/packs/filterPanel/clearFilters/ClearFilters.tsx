import React, { ChangeEvent, useEffect, useState } from "react";
import s from "features/packs/Packs.module.css";
import reset from "assets/svg/reset.svg";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";

export const ClearFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();

  const resetAllFiltersHandler = () => {
    dispatch(packsThunks.getCardPacks({}));
    setSearchParams({});
  };

  return (
    <div className={s.reset}>
      <img onClick={resetAllFiltersHandler} src={reset} alt="Reset button" />
    </div>
  );
};
