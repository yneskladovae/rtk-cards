import React, { FC } from "react";
import { BasicModal } from "components/modal/BasicModal";
import { useAppSelector } from "common/hooks/useAppSelector";

type DeletePackModalPropsType = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletePackHandler?: () => void;
};

export const DeletePackModal: FC<DeletePackModalPropsType> = ({
  title,
  isOpen,
  setIsOpen,
  deletePackHandler,
}) => {
  const currPackName = useAppSelector((state) => state.packs.currPackName);
  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1>{title}</h1>
        <p>
          Do you really want to remove <strong>{currPackName}</strong>? All
          cards will be deleted.
        </p>
        <button>cancel</button>
        <button onClick={deletePackHandler}>delete</button>
      </div>
    </BasicModal>
  );
};
