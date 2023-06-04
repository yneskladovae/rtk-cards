import React from "react";
import formStyle from "common/style/form.module.css";
import TextField from "@mui/material/TextField";

export const Profile = () => {
  return (
    <div className={formStyle.formBlock}>
      <div className={formStyle.formContainer}>
        <h2>Personal Information</h2>
        <div>
          <img src="" alt="" />
          <span></span>
        </div>
        <div>
          <TextField
            id="register-email"
            label="Email"
            variant="standard"
            className={formStyle.email}
          />
        </div>
      </div>
    </div>
  );
};
