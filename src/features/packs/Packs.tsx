import React, { ChangeEvent, useEffect, useState } from "react";
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
import learn from "../../assets/svg/learn.svg";
import trash from "../../assets/svg/trash.svg";
import edit from "../../assets/svg/edit.svg";
import { Link, useSearchParams } from "react-router-dom";
import { formatDate } from "common/utils";
import { PaginationBar } from "features/packs/PaginationBar/Pagination";
import { SearchBar } from "features/packs/SearchBar/SearchBar";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  // const params = useAppSelector((state) => state.packsParams);
  const profile = useAppSelector((state) => state.auth.profile);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setParams(searchParams));
  // }, []);

  // useEffect(() => {
  //   dispatch(packsThunks.getCardPacks(params));
  // }, [dispatch, params]);

  useEffect(() => {
    dispatch(packsThunks.getCardPacks({}));
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
      <SearchBar />
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
              <TableRow key={row._id}>
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
      <PaginationBar />
    </div>
  );
};
