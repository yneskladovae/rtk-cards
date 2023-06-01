import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    dispatch(authThunks.register({ email: "yneskladovae27@gmail.com", password: "yneskladovae27" }));
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
