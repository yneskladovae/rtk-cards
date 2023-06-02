import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { NavLink, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import email from "../../../assets/svg/email.svg";
import formStyle from "../../../common/style/form.module.css";
import s from "./ForgotPassword.module.css";
import {
  ArgForgotPasswordType,
  ForgotPasswordResponseType,
} from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";

export const ForgotPassword = () => {
  const isForgotPassword = useAppSelector(
    (state) => state.auth.isForgotPassword
  );
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgForgotPasswordType>({
    defaultValues: {
      email: "",
      from: "test-front-admin <ai73a@yandex.by>",
      message: `
        <div style="background-color: deeppink; padding: 15px">
        password recovery link: 
            <a href='http://localhost:3000/set-new-password/$token$'>
                link
            </a>
        </div>`,
    },
  });

  const loginHandler = (data: ArgForgotPasswordType) => {
    const payload = {
      email: data.email,
      from: data.from,
      message: data.message,
    };
    dispatch(authThunks.forgotPassword(payload));
  };
  const onSubmit: SubmitHandler<ArgForgotPasswordType> = (data) =>
    loginHandler(data);
  return (
    <div>
      {!isForgotPassword ? (
        <div className={formStyle.formBlock}>
          <div
            className={`${formStyle.formContainer} ${s.forgotBlockContainer}`}
          >
            <h2>Forgot your password?</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  {...register("email", { required: true })}
                  id="register-email"
                  label="Email"
                  variant="standard"
                  className={formStyle.email}
                />
              </div>
              <p className={s.subText}>
                Enter your email address and we will send you further
                instructions
              </p>
              <Button
                className={formStyle.button}
                type="submit"
                variant="contained"
              >
                Send Instructions
              </Button>
              <p className={s.subLinkText}>Did you remember your password?</p>
              <NavLink to={"/login"} className={formStyle.link}>
                Try logging in
              </NavLink>
            </form>
          </div>
        </div>
      ) : (
        <CheckEmail />
      )}
    </div>
  );
};

export const CheckEmail = () => {
  return (
    <div className={formStyle.formBlock}>
      <div className={`${formStyle.formContainer} ${s.forgotBlockContainer}`}>
        <h2>Check email</h2>
        <img src={email} alt="Email" />
        <p className={s.CheckEmailSubText}>
          We've sent an Email with instructions to example@mail.com
        </p>
        <NavLink to={"/login"}>
          <Button
            className={formStyle.button}
            type="submit"
            variant="contained"
          >
            Back to login
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
