import React, { useEffect } from "react";
import globalRouter from "globalRouter";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header/Header";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { toast, ToastContainer } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const dispatch = useAppDispatch();

  useEffect(() => {
    toast("loaded secsses");
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
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
