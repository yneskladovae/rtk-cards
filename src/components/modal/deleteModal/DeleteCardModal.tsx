import React, { FC } from "react";
import { BasicModal } from "components/modal/BasicModal";
import { useAppSelector } from "common/hooks/useAppSelector";

type DeleteCardModalPropsType = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCardHandler?: () => void;
};

export const DeleteCardModal: FC<DeleteCardModalPropsType> = ({
  title,
  isOpen,
  setIsOpen,
  deleteCardHandler,
}) => {
  const questionNameForDelete = useAppSelector(
    (state) => state.cards.questionNameForDelete
  );
  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1>{title}</h1>
        <p>
          Do you really want to remove <strong>{questionNameForDelete} </strong>
          ? Card will be deleted.
        </p>
        <button>cancel</button>
        <button onClick={deleteCardHandler}>delete</button>
      </div>
    </BasicModal>
  );
};
