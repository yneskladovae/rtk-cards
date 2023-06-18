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
import { PaginationBar } from "features/packs/pagination/Pagination";
import { FilterPanel } from "features/packs/filterPanel/FilterPanel";
import queryString from "query-string";
import { DeletePackModal } from "components/modal/deleteModal/DeletePackModal";
import { AddPackModal } from "components/modal/packModal/AddPackModal";
import { EditPackModal } from "components/modal/packModal/EditPackModal";
import { PacksTable } from "features/packs/packsTable/PacksTable";

export const Packs = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useAppDispatch();
  const [isAddPackModalOpen, setIsAddPackModalOpen] = useState<boolean>(false);

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
  };

  return (
    <div className={s.packsBlock}>
      <div className={s.packsHeader}>
        <h2>Packs list</h2>
        <button onClick={addNewPackModalHandler}>Add new pack</button>
      </div>
      <FilterPanel />
      <PacksTable />
      <PaginationBar />
      <>
        <AddPackModal
          addNewPackHandler={addNewPackHandler}
          title={"Add new pack"}
          isOpen={isAddPackModalOpen}
          setIsOpen={setIsAddPackModalOpen}
        />
      </>
    </div>
  );
};
