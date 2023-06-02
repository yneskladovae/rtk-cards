import React from "react";
import s from "./Header.module.css";
import logo from "../../assets/svg/logo.svg";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const isLogin = false;
  return (
    <header className={s.headerBlock}>
      <div className={s.headerContainer}>
        <div className={s.logo}>
          <img src={logo} alt="Logo" />
        </div>
        {!isLogin ? (
          <div className={s.login}>
            <Button className={s.button} type="submit" variant="contained">
              <NavLink className={"login"} to={"login"}>
                Sign In
              </NavLink>
            </Button>
          </div>
        ) : (
          <div>Profile</div>
        )}
      </div>
    </header>
  );
};
