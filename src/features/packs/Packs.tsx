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
import learn from "../../assets/svg/learn.svg";
import trash from "../../assets/svg/trash.svg";
import edit from "../../assets/svg/edit.svg";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";
import { formatDate } from "common/utils";

function valuetext(value: number) {
  return `${value}°C`;
}

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([0, 100]);

  console.log(packs);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  useEffect(() => {
    dispatch(packsThunks.getCardPacks());
  }, [dispatch]);

  const addNewPackHandler = () => {
    dispatch(packsThunks.addNewPack({ cardsPack: { name: "New test pack" } }));
  };

  const deletePackHandler = (packId: any) => {
    dispatch(packsThunks.deletePack(packId));
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
    </div>
  );
};
