import React, { ChangeEvent, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "common/hooks/useAppSelector";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { packsParamsActions } from "features/packs/packsParams.slice";
import queryString from "query-string";

export const PaginationBar = () => {
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );

  const page = useAppSelector((state) => state.packs.page);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  console.log("PaginationBar", searchParams);

  // const location = useLocation();
  // const queryParams = queryString.parse(location.search);
  // console.log(queryParams);

  // const [currentPage, setCurrentPage] = useState(() => {
  //   const storedPage = localStorage.getItem("currentPage");
  //   return storedPage ? Number(storedPage) : 1;
  // });
  //
  // useEffect(() => {
  //   localStorage.setItem("currentPage", currentPage.toString());
  // }, [currentPage]);

  // const location = useLocation();
  // const history = useNavigate();
  //
  // const queryParams = queryString.parse(location.search);
  // const currentPage = Number(queryParams.page) || 1;
  //
  // const pageChangeHandler = (page: number) => {
  //   const updatedParams = queryString.stringify({ ...queryParams, page });
  //   history(`?${updatedParams}`);
  //   dispatch(packsParamsActions.setPage({ page }));
  // };

  // useEffect(() => {
  //   setSearchParams({
  //     page: currentPage.toString(),
  //   });
  // });

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
    // setSearchParams({
    //   ...Object.fromEntries(searchParams),
    //   page: page.toString(),
    // });
    dispatch(packsParamsActions.setPage({ page: page }));
  };

  const pageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let pageCount = Number(event.target.value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      pageCount: pageCount.toString(),
    });
    dispatch(packsParamsActions.setPageCount({ pageCount: pageCount }));
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
