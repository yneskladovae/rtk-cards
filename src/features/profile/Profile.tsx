import React, { ChangeEvent, useState } from "react";
import formStyle from "common/style/form.module.css";
import TextField from "@mui/material/TextField";
import s from "./Profile.module.css";
import avatar from "../../assets/img/avatar.jpg";
import changePhoto from "../../assets/svg/changePhoto.svg";
import pencil from "../../assets/svg/pencil.svg";
import logout from "../../assets/svg/logout.svg";
import { authThunks } from "features/auth/auth.slice";
import globalRouter from "globalRouter";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<boolean>(false);
  const [newName, setNewName] = useState<string | undefined>(profile?.name);
  console.log(toggle);

  const editModeHandler = () => {
    setToggle(!toggle);
  };

  const getNewNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };

  const setNewNameHandler = () => {
    dispatch(authThunks.editUser({ name: newName }));
    setToggle(!toggle);
  };

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
        {toggle ? (
          <div className={s.userNameBlockChanging}>
            <TextField
              id="change-nickname"
              label="Nickname"
              variant="standard"
              className={formStyle.email}
              value={newName}
              onChange={getNewNameHandler}
            />
            <div className={s.saveButton}>
              <button onClick={setNewNameHandler}>SAVE</button>
            </div>
          </div>
        ) : (
          <div className={s.userNameBlock}>
            <div className={s.userName}>{profile?.name}</div>
            <div className={s.editPencil}>
              <img onClick={editModeHandler} src={pencil} alt="Pencil" />
            </div>
          </div>
        )}
        <div className={s.userEmailBlock}>
          <div className={s.userEmail}>{profile?.email}</div>
        </div>
        <div className={s.buttonBlock}>
          <button onClick={logoutHandler} className={s.button}>
            <img className={s.logout} src={logout} alt="Logout" />
            Log out
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};
