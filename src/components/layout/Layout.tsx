import React from "react";
import globalRouter from "globalRouter";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "components/header/Header";

const Layout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
