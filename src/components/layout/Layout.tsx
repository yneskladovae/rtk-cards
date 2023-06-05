import React, { useEffect } from "react";
import globalRouter from "globalRouter";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header/Header";
import { authThunks } from "features/auth/auth.slice";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";

const Layout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);

  // useEffect(() => {
  //   dispatch(authThunks.authMe())
  //     .unwrap()
  //     .then(() => {
  //       navigate("/packs");
  //     })
  //     .catch(() => {
  //       navigate("/login");
  //     });
  // }, [dispatch]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
