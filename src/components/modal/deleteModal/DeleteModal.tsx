import React, { FC } from "react";
import { BasicModal } from "components/modal/BasicModal";

type DeleteModalPropsType = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletePackHandler?: () => void;
};

export const DeleteModal: FC<DeleteModalPropsType> = ({
  title,
  isOpen,
  setIsOpen,
  deletePackHandler,
}) => {
  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1>{title}</h1>
        <p>
          Do you really want to remove Pack Name? All cards will be deleted.
        </p>
        <button>cancel</button>
        <button onClick={deletePackHandler}>delete</button>
      </div>
    </BasicModal>
  );
};
