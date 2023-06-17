import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/useAppSelector";

type EditPackModalType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  editPackHandler: (packName: string, isPrivate: boolean) => void;
};

export const EditPackModal: FC<EditPackModalType> = ({
  setIsOpen,
  isOpen,
  title,
  editPackHandler,
}) => {
  const currPackName = useAppSelector((state) => state.packs.currPackName);
  const [packName, setPackName] = useState<string>(currPackName);
  const [isPrivate, setIsPrivate] = useState(false);
  console.log(currPackName);

  useEffect(() => {
    setPackName(currPackName);
  }, [currPackName]);

  const packNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPackName(e.currentTarget.value);
  };

  const isPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked);
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
        <Button
          onClick={() => {
            editPackHandler(packName, isPrivate);
          }}
          variant="contained"
        >
          Save
        </Button>
      </div>
    </BasicModal>
  );
};
