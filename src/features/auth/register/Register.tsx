import React from "react";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import s from "./register.module.css";
import formStyle from "../../../common/style/form.module.css";
import { useAppDispatch } from "common/hooks/useAppDispatch";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const registerHandler = (data: Inputs) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    dispatch(authThunks.register(payload))
      .unwrap()
      .then(() => {
        return navigate("/login");
      })
      .catch((e) => {
        return e;
      });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerHandler(data);
    // reset();
  };

  return (
    <>
      <div className={formStyle.formBlock}>
        <div className={formStyle.formContainer}>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                {...register("email", {
                  required: "The field is required",
                  minLength: {
                    value: 5,
                    message: "The minimum length is 5 symbol",
                  },
                })}
                id="register-email"
                label="Email"
                variant="standard"
                className={formStyle.email}
                error={!!errors?.email}
                helperText={errors?.email && errors.email.message}
              />
            </div>
            <div>
              <TextField
                {...register("password", {
                  required: "The field is required",
                  maxLength: {
                    value: 20,
                    message: "The maximum length is 20 symbol",
                  },
                  minLength: {
                    value: 7,
                    message: "The minimum length is 20 symbol",
                  },
                  validate: (val: string) => {
                    if (watch("password") != val)
                      return "Your passwords do no match";
                  },
                })}
                id="register-password"
                label="Password"
                variant="standard"
                type={"password"}
                className={formStyle.password}
                error={!!errors?.password}
                helperText={errors?.password && errors.password.message}
              />
            </div>
            <div>
              <TextField
                {...register("confirm_password", {
                  required: "The field is required",
                  maxLength: {
                    value: 20,
                    message: "The maximum length is 20 symbol",
                  },
                  minLength: {
                    value: 7,
                    message: "The minimum length is 20 symbol",
                  },
                  validate: (val: string) => {
                    if (watch("password") != val)
                      return "Your passwords do no match";
                  },
                })}
                id="register-password"
                label="Confirm password"
                variant="standard"
                type={"password"}
                className={formStyle.password}
                error={!!errors?.password}
                helperText={errors?.password && errors.password.message}
              />
            </div>
            <Button
              className={formStyle.button}
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              Sign Up
            </Button>
            <p className={s.registerText}>Already have an account?</p>
            <NavLink className={formStyle.link} to={"/login"}>
              Sign In
            </NavLink>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </>
  );
};
