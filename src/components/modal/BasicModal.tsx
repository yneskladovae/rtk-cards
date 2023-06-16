import React, { FC, ReactNode, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BasicModalType = {
  children?: ReactNode;
  childrenButton?: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BasicModal: FC<BasicModalType> = ({
  children,
  isOpen,
  setIsOpen,
  title,
  childrenButton,
}) => {
  // const [open, setOpen] = useState(isOpen);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen((state) => !state)}>
      <Box sx={style}>
        <div>
          {children}
          {/*<div onClick={handleClose}>{childrenButton}</div>*/}
        </div>
      </Box>
    </Modal>
  );
};
