import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/useAppSelector";
import { packsActions } from "features/packs/packs.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

type AddPackModalType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  addNewPackHandler: (packName: string, isPrivate: boolean) => void;
};

export const AddPackModal: FC<AddPackModalType> = ({
  setIsOpen,
  isOpen,
  title,
  addNewPackHandler,
}) => {
  const currPackName = useAppSelector((state) => state.packs.currPackName);
  const [isPrivate, setIsPrivate] = useState(false);
  const dispatch = useAppDispatch();

  const packNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      packsActions.setCurrPackName({ currPackName: e.currentTarget.value })
    );
  };

  const isPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked);
  };

  return (
    <BasicModal setIsOpen={setIsOpen} isOpen={isOpen}>
      <div>
        <h1>{title}</h1>
        <TextField
          value={currPackName}
          onChange={(e) => packNameChangeHandler(e)}
          variant={"standard"}
          label={"Name pack"}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={isPrivate}
              onChange={(e) => isPrivateChangeHandler(e)}
            />
          }
          label="Private pack"
        />
        <Button onClick={() => {}} variant={"outlined"}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            addNewPackHandler(currPackName, isPrivate);
          }}
          variant="contained"
        >
          Save
        </Button>
      </div>
    </BasicModal>
  );
};
