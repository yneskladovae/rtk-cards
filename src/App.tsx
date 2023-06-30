import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "features/auth/login/Login";
import { Register } from "features/auth/register/Register";
import { Profile } from "features/profile/Profile";
import { Packs } from "features/packs/Packs";
import { Cards } from "features/cards/Cards";
import { Learn } from "features/learn/Learn";
import Layout from "components/layout/Layout";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import SetNewPassword from "features/auth/setNewPassword/SetNewPassword";
import "react-toastify/dist/ReactToastify.css";
import { GlobalError } from "common/globalError/GlobalError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/register"} />,
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
        path: "set-new-password/:token",
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
        path: "cards/:id",
        element: <Cards />,
      },
      {
        path: "learn/:id",
        element: <Learn />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <GlobalError />
    </div>
  );
}

export default App;
