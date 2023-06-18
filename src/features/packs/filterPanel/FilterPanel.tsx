import React, { ChangeEvent, useEffect, useState } from "react";
import s from "features/packs/Packs.module.css";
import { Search } from "features/packs/filterPanel/search/Search";
import { NumberOfCardsSlider } from "features/packs/filterPanel/numberOfCardsSlider/NumberOfCardsSlider";
import { ShowPacksCardsFilter } from "features/packs/filterPanel/showPacksCardsFilter/ShowPacksCardsFilter";
import { ClearFilters } from "features/packs/filterPanel/clearFilters/ClearFilters";

export const FilterPanel = () => {
  return (
    <div className={s.filtersPacksBlock}>
      <Search />
      <ShowPacksCardsFilter />
      <NumberOfCardsSlider />
      <ClearFilters />
    </div>
  );
};
