import React, { useEffect } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { cardsThunks } from "features/cards/cards.slice";
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

export const Cards = () => {
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const [value, setValue] = React.useState<number | null>(2);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards);
  const cardsUserId = useAppSelector((state) => state.cards.packUserId);
  const { id } = useParams();

  useEffect(() => {
    dispatch(cardsThunks.getCards(id));
  }, [dispatch]);

  const addNewCardHandler = () => {
    const card = {
      cardsPack_id: id,
      question: "Siiiiiiiiiiiiiiiiiiiiiiiu",
      answer: "Yes",
    };
    dispatch(cardsThunks.addNewCard(card));
  };

  const deleteCardHandler = (cardId: string) => {
    dispatch(cardsThunks.deleteCard(cardId));
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
                onClick={addNewCardHandler}
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
                  onClick={addNewCardHandler}
                  className={s.emptyCardsButton}
                >
                  Add new card
                </button>
              ) : (
                <button
                  onClick={addNewCardHandler}
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
                          value={5}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                        {userId === row.user_id && (
                          <div className={s.iconsBlock}>
                            <img
                              // onClick={() => updatePackNameHandler(row._id)}
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
    </div>
  );
};
