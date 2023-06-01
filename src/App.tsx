import React from "react";
import logo from "./logo.svg";
import { Counter } from "features/counter/Counter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login } from "features/auth/login/Login";
import { Register } from "features/auth/register/Register";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import { SetNewPassword } from "features/auth/setNewPassword/SetNewPassword";
import { Profile } from "features/profile/Profile";
import { Packs } from "features/packs/Packs";
import { Cards } from "features/cards/Cards";
import { Learn } from "features/learn/Learn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Counter />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "packs",
    element: <Packs />,
  },
  {
    path: "cards",
    element: <Cards />,
  },
  {
    path: "learn",
    element: <Learn />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
