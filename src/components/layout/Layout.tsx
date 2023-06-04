import React, { useEffect } from "react";
import globalRouter from "globalRouter";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header/Header";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import LinearProgress from "@mui/material/LinearProgress";
import { Preloader } from "components/preloader/Preloader";

const Layout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [dispatch]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
