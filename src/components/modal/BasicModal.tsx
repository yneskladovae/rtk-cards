import React, { FC, ReactNode, useState } from "react";
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
};

export const BasicModal: FC<BasicModalType> = ({
  children,
  title,
  childrenButton,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal open={open} onClose={handleClose}>
        <>
          <Box sx={style}>
            {children}
            <div onClick={handleClose}>{childrenButton}</div>
          </Box>
        </>
      </Modal>
    </div>
  );
};
