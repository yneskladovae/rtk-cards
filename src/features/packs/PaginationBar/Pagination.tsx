import React, { ChangeEvent, useState } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "common/hooks/useAppSelector";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

export const PaginationBar = () => {
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );
  const page = useAppSelector((state) => state.packs.page);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
    dispatch(packsThunks.getCardPacks({ page: page }));
  };

  const pageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let pageCount = Number(event.target.value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      pageCount: pageCount.toString(),
    });

    // dispatch(packsThunks.getCardPacks({ pageCount: pageCount }));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={cardPacksTotalCount}
        page={currentPage}
        onChange={(event, page) => pageChangeHandler(page)}
        shape="rounded"
      />
      <FormControl sx={{ m: 1, maxWidth: 50 }}>
        <select
          name="select"
          // value={page}
          onChange={(event) => pageCountChangeHandler(event)}
        >
          <option value={4}>4</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </FormControl>
    </Stack>
  );
};
