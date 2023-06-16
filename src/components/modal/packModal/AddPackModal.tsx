import React, { ChangeEvent, FC, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { packsActions } from "features/packs/packs.slice";

type AddPackModalType = {
  title: string;
  addNewPackHandler: (packName: string, isPrivate: boolean) => void;
};

export const AddPackModal: FC<AddPackModalType> = ({
  title,
  addNewPackHandler,
}) => {
  const packName = useAppSelector((state) => state.packs.packName);
  const isPrivate = useAppSelector((state) => state.packs.isPrivate);
  const dispatch = useDispatch();
  // const [packName, setPackName] = useState<string>("");
  // const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const packNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(packsActions.setPackName({ packName: e.currentTarget.value }));
  };

  const isPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(packsActions.setIsPrivate({ isPrivate: e.currentTarget.checked }));
  };

  return (
    <BasicModal
      title={title}
      childrenButton={
        <Button
          onClick={() => addNewPackHandler(packName, isPrivate)}
          variant={"contained"}
        >
          Save
        </Button>
      }
    >
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
      </div>
    </BasicModal>
  );
};
