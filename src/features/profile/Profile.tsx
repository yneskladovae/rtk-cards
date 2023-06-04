import React from "react";
import formStyle from "common/style/form.module.css";
import TextField from "@mui/material/TextField";
import s from "./Profile.module.css";
import avatar from "../../assets/img/avatar.jpg";
import changePhoto from "../../assets/svg/changePhoto.svg";
import pencil from "../../assets/svg/pencil.svg";
import logout from "../../assets/svg/logout.svg";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { NavLink } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import globalRouter from "globalRouter";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        globalRouter.navigate && globalRouter.navigate("/login");
      });
  };

  return (
    <div className={formStyle.formBlock}>
      <div className={formStyle.formContainer}>
        <h2>Personal Information</h2>
        <div className={s.userPhotoBlock}>
          <img className={s.avatar} src={avatar} alt="Avatar image" />
          <span className={s.changePhoto}>
            <img src={changePhoto} alt="Change photo icon" />
          </span>
        </div>
        <div className={s.userNameBlock}>
          <div className={s.userName}>{profile?.name}</div>
          <div className={s.editPencil}>
            <img src={pencil} alt="Pencil" />
          </div>
        </div>
        <div className={s.userEmailBlock}>
          <div className={s.userEmail}>{profile?.email}</div>
        </div>
        <div className={s.buttonBlock}>
          <button onClick={logoutHandler} className={s.button}>
            <img className={s.logout} src={logout} alt="Logout" />
            Log out
          </button>
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
