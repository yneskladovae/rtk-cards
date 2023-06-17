import React, { useEffect, useState } from "react";
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
import learn from "../../assets/svg/learn.svg";
import trash from "../../assets/svg/trash.svg";
import edit from "../../assets/svg/edit.svg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatDate } from "common/utils";
import { PaginationBar } from "features/packs/PaginationBar/Pagination";
import { SearchBar } from "features/packs/SearchBar/SearchBar";
import queryString from "query-string";
import { DeleteModal } from "components/modal/deleteModal/DeleteModal";
import { packsParamsActions } from "features/packs/packsParams.slice";
import { AddPackModal } from "components/modal/packModal/AddPackModal";
import { EditPackModal } from "components/modal/packModal/EditPackModal";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const packId = useAppSelector((state) => state.packs.packId);
  const currPackName = useAppSelector((state) => state.packs.currPackName);
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const params = useAppSelector((state) => state.packsParams);
  const profile = useAppSelector((state) => state.auth.profile);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();

  const [isAddPackModalOpen, setIsAddPackModalOpen] = useState<boolean>(false);
  const [isEditPackModalOpen, setIsEditPackModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    dispatch(packsThunks.getCardPacks(queryParams));
  }, [dispatch, params]);

  const addNewPackModalHandler = () => {
    setIsAddPackModalOpen(true);
  };

  const addNewPackHandler = (packName: string, isPrivate: boolean) => {
    setSearchParams({});
    setIsAddPackModalOpen(false);
    const payload = {
      cardsPack: { name: packName, private: isPrivate },
    };
    dispatch(packsThunks.addNewPack(payload));
    dispatch(packsActions.setCurrPackName({ currPackName: "" }));
  };

  const deletePackHandler = (packId: any) => {
    dispatch(packsThunks.deletePack(packId));
    setDeleteModalOpen(false);
  };

  const deletePackModalHandler = () => {
    setDeleteModalOpen(true);
  };

  const editPackHandler = (packName: string, isPrivate: boolean) => {
    setSearchParams({});
    setIsEditPackModalOpen(false);
    const payload = {
      cardsPack: { _id: packId, name: packName, private: isPrivate },
    };
    dispatch(packsThunks.updatePackName(payload));
  };

  const editPackModalHandler = (packId: string, currPackName: string) => {
    dispatch(packsActions.setPackId({ packId }));
    dispatch(packsActions.setCurrPackName({ currPackName }));
    setIsEditPackModalOpen(true);
  };

  return (
    <div className={s.packsBlock}>
      <div className={s.packsHeader}>
        <h2>Packs list</h2>
        <button onClick={addNewPackModalHandler}>Add new pack</button>
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
                        onClick={() => editPackModalHandler(row._id, row.name)}
                        src={edit}
                        alt="Edit icon"
                      />
                      <img
                        onClick={deletePackModalHandler}
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
      <>
        <AddPackModal
          addNewPackHandler={addNewPackHandler}
          title={"Add new pack"}
          isOpen={isAddPackModalOpen}
          setIsOpen={setIsAddPackModalOpen}
        />
        <EditPackModal
          editPackHandler={editPackHandler}
          title={"Edit pack"}
          isOpen={isEditPackModalOpen}
          setIsOpen={setIsEditPackModalOpen}
        />
      </>
    </div>
  );
};
