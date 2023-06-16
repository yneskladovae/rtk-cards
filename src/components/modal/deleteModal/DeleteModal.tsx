import React from "react";
import { BasicModal } from "components/modal/BasicModal";

export const DeleteModal = () => {
  return (
    <BasicModal isOpen={false} setIsOpen={() => {}}>
      <div>
        <h1>Delete modal</h1>
        <button>Save</button>
      </div>
    </BasicModal>
  );
};
