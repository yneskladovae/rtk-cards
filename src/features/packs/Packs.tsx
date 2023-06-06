import React, { useEffect } from "react";
import s from "./Packs.module.css";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { packsThunks } from "features/packs/packs.slice";
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
import TextField from "@mui/material/TextField";

function valuetext(value: number) {
  return `${value}°C`;
}

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardsPack);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  useEffect(() => {
    dispatch(packsThunks.getCardPacks());
  }, [dispatch]);

  const formatDate = (data: string) => {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className={s.packsBlock}>
      <div className={s.packsHeader}>
        <h2>Packs list</h2>
        <button>Add new pack</button>
      </div>
      <div className={s.filtersPacksBlock}>
        <div className={s.search}>
          <h3>Search</h3>
          <TextField
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
          <button className={s.btnMy}>My</button>
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
                getAriaValueText={valuetext}
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
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.cardsCount}</TableCell>
                <TableCell align="center">{formatDate(row.updated)}</TableCell>
                <TableCell align="center">{formatDate(row.created)}</TableCell>
                <TableCell align="center">
                  <button>&#8469;</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
