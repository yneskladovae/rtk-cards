import React, {
  ChangeEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatDate } from "common/utils";
import { PaginationBar } from "features/packs/PaginationBar/Pagination";
import { SearchBar } from "features/packs/SearchBar/SearchBar";
import { PackModal } from "components/modal/packModal/PackModal";
import queryString from "query-string";
import { DeleteModal } from "components/modal/deleteModal/DeleteModal";
import { packsParamsActions } from "features/packs/packsParams.slice";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const params = useAppSelector((state) => state.packsParams);
  const profile = useAppSelector((state) => state.auth.profile);
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();
  console.log("Packs", searchParams);

  const [isAddPackModalOpen, setIsAddPackModalOpen] = useState<boolean>(false);
  const [isEditPackModalOpen, setIsEditPackModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   dispatch(setParams(searchParams));
  // }, []);
  // useEffect(() => {
  //   const packName = searchParams.get("packName");
  //   const max = searchParams.get("max");
  //   const min = searchParams.get("min");
  //   const page = searchParams.get("page");
  //   const pageCount = searchParams.get("pageCount");
  //   const user_id = searchParams.get("user_id");
  //
  //   console.log(searchParams.get("packName"));
  //   dispatch(
  //     packsParamsActions.setParams({
  //       queryParams: { packName, max, min, page, pageCount, user_id },
  //     })
  //   );
  // }, [dispatch, searchParams]);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  // useLayoutEffect(() => {
  //   console.log(location.search);
  //   const queryParams = queryString.parse(location.search);
  //   console.log(queryParams);
  //   // dispatch(
  //   //   packsParamsActions.setParams({
  //   //     queryParams: queryParams,
  //   //   })
  //   // );
  //   dispatch(packsThunks.getCardPacks(queryParams));
  // }, []);

  useEffect(() => {
    dispatch(packsThunks.getCardPacks(queryParams));
  }, [dispatch, params]);

  const addNewPackHandler = (packName: string, isPrivate: boolean) => {
    setIsAddPackModalOpen(false);
    const payload = {
      cardsPack: { name: packName, private: isPrivate },
    };
    dispatch(packsThunks.addNewPack(payload));
  };

  const deletePackHandler = (packId: any) => {
    dispatch(packsThunks.deletePack(packId));
    setDeleteModalOpen(false);
  };

  const deletePackModalHandler = () => {
    setDeleteModalOpen(true);
  };

  const editPackHandler = (
    packId: string,
    packName: string,
    isPrivate: boolean
  ) => {
    setIsEditPackModalOpen(false);
    const payload = {
      cardsPack: { _id: packId, name: packName, private: isPrivate },
    };
    dispatch(packsThunks.updatePackName(payload));
  };

  const addNewPackModalHandler = () => {
    setIsAddPackModalOpen(true);
  };

  const editPackModalHandler = () => {
    setIsEditPackModalOpen(true);
  };

  return (
    <div className={s.packsBlock}>
      <div className={s.packsHeader}>
        <h2>Packs list</h2>
        <button onClick={addNewPackModalHandler}>Add new pack</button>
        <PackModal
          isOpen={isAddPackModalOpen}
          setIsOpen={setIsAddPackModalOpen}
          title={"Add new pack"}
          addNewPackHandler={addNewPackHandler}
        />
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
                        onClick={() => editPackModalHandler()}
                        src={edit}
                        alt="Edit icon"
                      />
                      {isEditPackModalOpen && (
                        <PackModal
                          isOpen={isEditPackModalOpen}
                          setIsOpen={setIsEditPackModalOpen}
                          editPackHandler={(
                            packName: string,
                            isPrivate: boolean
                          ) => editPackHandler(row._id, packName, isPrivate)}
                          title={"Edit pack"}
                          oldPackName={row.name}
                        />
                      )}
                      <img
                        onClick={deletePackModalHandler}
                        src={trash}
                        alt="Trash icon"
                      />
                      {deleteModalOpen && (
                        <DeleteModal
                          isOpen={deleteModalOpen}
                          setIsOpen={setDeleteModalOpen}
                          deletePackHandler={() => deletePackHandler(row._id)}
                          title={"Delete pack"}
                        />
                      )}
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
