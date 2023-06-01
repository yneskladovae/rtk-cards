import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(
      authThunks.login({
        email: "yneskladovae27@gmail.com",
        password: "yneskladovae27",
        rememberMe: false,
      })
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
