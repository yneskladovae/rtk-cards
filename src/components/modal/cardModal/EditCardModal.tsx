import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/useAppSelector";

type EditCardModalType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  updateCardHandler: (question: string, answer: string) => void;
};

export const EditCardModal: FC<EditCardModalType> = ({
  setIsOpen,
  isOpen,
  title,
  updateCardHandler,
}) => {
  const currCardQuestion = useAppSelector(
    (state) => state.cards.currCardQuestion
  );
  const currCardAnswer = useAppSelector((state) => state.cards.currCardAnswer);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    setQuestion(currCardQuestion);
    setAnswer(currCardAnswer);
  }, [currCardQuestion, currCardAnswer]);

  const questionChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion(e.currentTarget.value);
  };

  const answerChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswer(e.currentTarget.value);
  };

  return (
    <BasicModal setIsOpen={setIsOpen} isOpen={isOpen}>
      <div>
        <h1>{title}</h1>
        <TextField
          value={question}
          onChange={(e) => questionChangeHandler(e)}
          variant={"standard"}
          label={"Question"}
        />
        <TextField
          value={answer}
          onChange={(e) => answerChangeHandler(e)}
          variant={"standard"}
          label={"Answer"}
        />
        <Button onClick={() => setIsOpen(false)} variant={"outlined"}>
          Cancel
        </Button>
        <Button
          onClick={() => updateCardHandler(question, answer)}
          variant="contained"
        >
          Save
        </Button>
      </div>
    </BasicModal>
  );
};
