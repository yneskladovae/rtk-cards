import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/useAppSelector";

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
  const [packName, setPackName] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState(false);

  const packNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPackName(e.currentTarget.value);
  };

  const isPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked);
  };

  const handleSave = () => {
    addNewPackHandler(packName, isPrivate);
    setPackName("");
  };

  return (
    <BasicModal setIsOpen={setIsOpen} isOpen={isOpen}>
      <div>
        <h1>{title}</h1>
        <TextField
          value={packName}
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
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </div>
    </BasicModal>
  );
};
