import React from "react";
import s from "./BackToPackListLink.module.css";
import { NavLink } from "react-router-dom";
import arrow from "assets/svg/arrowIcon.svg";

export const BackToPackListLink = () => {
  return (
    <div className={s.backPacksList}>
      <NavLink to={"/packs"}>
        <img src={arrow} alt="Arrow icon" />
        Back to Packs List
      </NavLink>
    </div>
  );
};
