import React, { ChangeEvent, FC, useState } from "react";
import { BasicModal } from "components/modal/BasicModal";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";

type AddPackModalType = {
  title: string;
  addNewPackHandler?: (packName: string, isPrivate: boolean) => void;
  editPackHandler?: (packName: string, isPrivate: boolean) => void;
  oldPackName?: string;
};

export const PackModal: FC<AddPackModalType> = ({
  title,
  addNewPackHandler,
  editPackHandler,
  oldPackName,
}) => {
  const [packName, setPackName] = useState<string>(
    title === "Add new pack" ? "" : oldPackName || ""
  );
  const [isPrivate, setIsPrivate] = useState(false);

  const packNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPackName(e.currentTarget.value);
  };

  const isPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked);
  };

  return (
    <>
      <BasicModal
        title={title}
        childrenButton={
          <Button
            onClick={() => {
              if (title === "Add new pack") {
                if (addNewPackHandler) {
                  addNewPackHandler(packName, isPrivate);
                }
              } else {
                if (editPackHandler) {
                  debugger;
                  editPackHandler(packName, isPrivate);
                }
              }
            }}
            variant="contained"
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
    </>
  );
};
