import React, { ChangeEvent, FC, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type AddPackModalType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  addNewCardHandler: (question: string, answer: string) => void;
};

export const AddCardModal: FC<AddPackModalType> = ({
  setIsOpen,
  isOpen,
  title,
  addNewCardHandler,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

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

  const handleSave = () => {
    addNewCardHandler(question, answer);
    setAnswer("");
    setQuestion("");
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
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </div>
    </BasicModal>
  );
};
