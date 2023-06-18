import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import s from "features/packs/Packs.module.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatDate } from "common/utils";
import learn from "assets/svg/learn.svg";
import edit from "assets/svg/edit.svg";
import trash from "assets/svg/trash.svg";
import { EditPackModal } from "components/modal/packModal/EditPackModal";
import { DeletePackModal } from "components/modal/deleteModal/DeletePackModal";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import queryString from "query-string";
import { packsActions, packsThunks } from "features/packs/packs.slice";

export const MappedPacks = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const packId = useAppSelector((state) => state.packs.packId);
  const params = useAppSelector((state) => state.packsParams);
  const profile = useAppSelector((state) => state.auth.profile);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [isEditPackModalOpen, setIsEditPackModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    dispatch(packsThunks.getCardPacks(queryParams));
  }, [dispatch, params]);

  const deletePackHandler = () => {
    dispatch(packsThunks.deletePack(packId));
    setDeleteModalOpen(false);
  };

  const deletePackModalHandler = (packId: string, currPackName: string) => {
    dispatch(packsActions.setPackId({ packId }));
    dispatch(packsActions.setCurrPackName({ currPackName }));
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
    <>
      {packs?.map((row) => (
        <TableRow key={row._id}>
          <TableCell className={s.packsNameLink} component="th" scope="row">
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
                  onClick={() => deletePackModalHandler(row._id, row.name)}
                  src={trash}
                  alt="Trash icon"
                />
              </>
            )}
          </TableCell>
        </TableRow>
      ))}
      <EditPackModal
        editPackHandler={editPackHandler}
        title={"Edit pack"}
        isOpen={isEditPackModalOpen}
        setIsOpen={setIsEditPackModalOpen}
      />
      <DeletePackModal
        deletePackHandler={deletePackHandler}
        title={"Delete pack"}
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
      />
    </>
  );
};
