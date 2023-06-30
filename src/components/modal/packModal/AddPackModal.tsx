import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import closeIcon from "../../../assets/svg/closeIcon.svg";
import s from "./AddPackModal.module.css";

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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <BasicModal setIsOpen={setIsOpen} isOpen={isOpen}>
      <div>
        <div className={s.modalHeader}>
          <div className={s.modalTitle}>{title}</div>
          <div>
            <img onClick={handleClose} src={closeIcon} alt="Close button" />
          </div>
        </div>
        <div>
          <TextField
            value={packName}
            onChange={(e) => packNameChangeHandler(e)}
            variant={"standard"}
            label={"Name pack"}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                value={isPrivate}
                onChange={(e) => isPrivateChangeHandler(e)}
                style={{ paddingTop: "15px" }}
              />
            }
            label="Private pack"
          />
        </div>
        <div className={s.modalBtns}>
          <Button onClick={handleClose} variant={"outlined"}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};
