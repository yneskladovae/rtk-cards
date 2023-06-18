import React, { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { cardsActions, cardsThunks } from "features/cards/cards.slice";
import { Link, useParams } from "react-router-dom";
import { BackToPackListLink } from "components/backToPackListLink/BackToPackListLink";
import s from "./cards.module.css";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import edit from "assets/svg/edit.svg";
import trash from "assets/svg/trash.svg";
import Rating from "@mui/material/Rating";
import { formatDate } from "common/utils";
import { AddCardModal } from "components/modal/cardModal/AddCardModal";
import { EditCardModal } from "components/modal/cardModal/EditCardModal";
import { packsActions } from "features/packs/packs.slice";

export const Cards = () => {
  const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);
  const [isEditCardModal, setIsEditCardModal] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const cardId = useAppSelector((state) => state.cards.cardId);
  const [value, setValue] = React.useState<number | null>(0);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards);
  const cardsUserId = useAppSelector((state) => state.cards.packUserId);
  const { id } = useParams();

  useEffect(() => {
    dispatch(cardsThunks.getCards(id));
  }, [dispatch]);

  const addNewCardHandler = (question: string, answer: string) => {
    setIsAddCardModal(false);
    const newCard = {
      cardsPack_id: id,
      question: question,
      answer: answer,
    };
    dispatch(cardsThunks.addNewCard(newCard));
  };

  const deleteCardHandler = (cardId: string) => {
    dispatch(cardsThunks.deleteCard(cardId));
  };

  const updateCardHandler = (answer: string, question: string) => {
    setIsEditCardModal(false);
    const payload = {
      cardsPack_id: id,
      _id: cardId,
      question: answer,
      answer: question,
    };
    dispatch(cardsThunks.updateCard(payload));
  };

  const updateGradeCardHandler = (value: number | null, cardId: string) => {
    setValue(value);
    const payload = {
      card_id: cardId,
      grade: value,
    };
    dispatch(cardsThunks.updateGradeCard(payload));
  };

  const addNewCardModalHandler = () => {
    setIsAddCardModal(true);
  };

  const editCardModalHandler = (
    cardId: string,
    answer: string,
    question: string
  ) => {
    setIsEditCardModal(true);
    dispatch(cardsActions.setCardId({ cardId }));
    dispatch(cardsActions.setCurrCardQuestion({ currCardQuestion: question }));
    dispatch(cardsActions.setCurrCardAnswer({ currCardAnswer: answer }));
  };

  return (
    <div className={s.cardsBlock}>
      <BackToPackListLink />
      <div className={s.cardsData}>
        {cards?.cards?.length === 0 ? (
          <div>
            <div>
              <h1 className={s.maimHeader}>{cards.packName}</h1>
            </div>
            <div className={s.emptyCardsContainer}>
              <p className={s.emptyCardsText}>
                This pack is empty. Click add new card to fill this pack
              </p>
              <button
                onClick={addNewCardModalHandler}
                className={s.emptyCardsButton}
              >
                Add new card
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className={s.titleAndButton}>
              <h1 className={s.maimHeader}>{cards.packName}</h1>
              {userId === cardsUserId ? (
                <button
                  onClick={addNewCardModalHandler}
                  className={s.emptyCardsButton}
                >
                  Add new card
                </button>
              ) : (
                <button
                  // onClick={addNewCardHandler}
                  className={s.emptyCardsButton}
                >
                  Learn to pack
                </button>
              )}
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: "#EFEFEF" }}>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell align="center">Answer</TableCell>
                    <TableCell align="center">Last Updated</TableCell>
                    <TableCell align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards?.cards?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        className={s.packsNameLink}
                        component="th"
                        scope="row"
                      >
                        <Link to={`/cards/${row._id}`}>{row.question}</Link>
                      </TableCell>
                      <TableCell align="center">{row.answer}</TableCell>
                      <TableCell align="center">
                        {formatDate(row.updated)}
                      </TableCell>
                      <TableCell className={s.gradeBlock} align="center">
                        <Rating
                          name="simple-controlled"
                          value={row.grade}
                          onChange={(event, value) =>
                            updateGradeCardHandler(value, row._id)
                          }
                        />
                        {userId === row.user_id && (
                          <div className={s.iconsBlock}>
                            <img
                              onClick={() =>
                                editCardModalHandler(
                                  row._id,
                                  row.answer,
                                  row.question
                                )
                              }
                              src={edit}
                              alt="Edit icon"
                            />
                            <img
                              onClick={() => deleteCardHandler(row._id)}
                              src={trash}
                              alt="Trash icon"
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
      <>
        <AddCardModal
          setIsOpen={setIsAddCardModal}
          isOpen={isAddCardModal}
          title={"Add new card"}
          addNewCardHandler={addNewCardHandler}
        />
        <EditCardModal
          setIsOpen={setIsEditCardModal}
          isOpen={isEditCardModal}
          title={"Edit card"}
          updateCardHandler={updateCardHandler}
        />
      </>
    </div>
  );
};
