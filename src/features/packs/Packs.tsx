import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Packs.module.css";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import { useAppSelector } from "common/hooks/useAppSelector";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import SearchIcon from "@mui/icons-material/Search";
import reset from "../../assets/svg/reset.svg";
import learn from "../../assets/svg/learn.svg";
import trash from "../../assets/svg/trash.svg";
import edit from "../../assets/svg/edit.svg";
import TextField from "@mui/material/TextField";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { formatDate } from "common/utils";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem } from "@mui/material";

export const Packs = (props: any) => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const page = useAppSelector((state) => state.packs.page);
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchPacksName, setSearchPacksName] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const packName = searchParams.get("packName");
  console.log(packName);
  console.log(Object.fromEntries(searchParams));

  const searchPacksNameHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(packsThunks.getCardPacks({ packName: e.currentTarget.value }));
    setSearchParams({ packName: e.currentTarget.value });
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    dispatch(packsThunks.getCardPacks({}));
  }, [dispatch]);

  const addNewPackHandler = () => {
    dispatch(packsThunks.addNewPack({ cardsPack: { name: "New test pack" } }));
  };

  const deletePackHandler = (packId: any) => {
    dispatch(packsThunks.deletePack(packId));
  };

  const myPacksFilter = () => {
    const userId = "64750d48a41893aa8682979d";
    dispatch(packsThunks.getCardPacks({ user_id: userId }));
  };

  const updatePackNameHandler = (packId: string) => {
    const payload = {
      cardsPack: {
        _id: packId,
        name: "Update test pack",
      },
    };
    dispatch(packsThunks.updatePackName(payload));
  };

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
    dispatch(packsThunks.getCardPacks({ page: page }));
  };

  return (
    <div className={s.packsBlock}>
      <div className={s.packsHeader}>
        <h2>Packs list</h2>
        <button onClick={addNewPackHandler}>Add new pack</button>
      </div>
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
          <button onClick={myPacksFilter} className={s.btnMy}>
            My
          </button>
          <button className={`${s.btnAll}  ${s.active}`}>All</button>
        </div>
        <div className={s.numberOfCards}>
          <h3>Number of cards</h3>
          <div className={s.numberOfCardsContainer}>
            <button className={s.minCount}>2</button>
            <Box sx={{ width: 200 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </Box>
            <button className={s.minCount}>10</button>
          </div>
        </div>
        <div className={s.reset}>
          <img src={reset} alt="Reset button" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "#EFEFEF" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Cards</TableCell>
              <TableCell align="center">Last Updated</TableCell>
              <TableCell align="center">Created by</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={s.packsNameLink}
                  component="th"
                  scope="row"
                >
                  <Link to={`/cards/${row._id}`}>{row.name}</Link>
                </TableCell>
                <TableCell align="center">{row.cardsCount}</TableCell>
                <TableCell align="center">{formatDate(row.updated)}</TableCell>
                <TableCell align="center">{formatDate(row.created)}</TableCell>
                <TableCell align="center">
                  <img src={learn} alt="Learn icon" />
                  {profile?._id === row.user_id && (
                    <>
                      <img
                        onClick={() => updatePackNameHandler(row._id)}
                        src={edit}
                        alt="Edit icon"
                      />
                      <img
                        onClick={() => deletePackHandler(row._id)}
                        src={trash}
                        alt="Trash icon"
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={cardPacksTotalCount}
          page={currentPage}
          onChange={(event, page) => pageChangeHandler(page)}
          shape="rounded"
          // renderItem={(item) => (
          // <PaginationItem
          //   component={NavLink}
          //   to={`?page=${item.page}`}
          //   {...item}
          // />
          // )}
        />
      </Stack>
    </div>
  );
};
