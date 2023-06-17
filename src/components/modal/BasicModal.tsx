import React, { FC, ReactNode, useEffect, useState } from "react";
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
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BasicModal: FC<BasicModalType> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen((state) => !state)}>
      <Box
        // className={s.style}
        sx={style}
      >
        <div>{children}</div>
      </Box>
    </Modal>
  );
};
