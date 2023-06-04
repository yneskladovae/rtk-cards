import React from "react";
import s from "./Login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "../auth.api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import formStyle from "../../../common/style/form.module.css";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import globalRouter from "globalRouter";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgLoginType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginHandler = (data: ArgLoginType) => {
    const payload = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    };
    dispatch(authThunks.login(payload))
      .unwrap()
      .then(() => {
        globalRouter.navigate && globalRouter.navigate("/profile");
      });
  };
  const onSubmit: SubmitHandler<ArgLoginType> = (data) => loginHandler(data);

  return (
    <div className={formStyle.formBlock}>
      <div className={formStyle.formContainer}>
        <h2>Sign in</h2>
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
          <div className={s.password}>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              className={s.formControl}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                {...register("password", {
                  required: true,
                  maxLength: 20,
                })}
                id="standard-adornment-password"
                className={formStyle.password}
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <label className={s.checkbox}>
            <input
              className={formStyle.checkbox}
              type={"checkbox"}
              {...register("rememberMe", { required: false })}
            />
            Remember me
          </label>
          <NavLink className={s.forgot} to={"/forgot-password"}>
            Forgot Password?
          </NavLink>
          <Button
            className={formStyle.button}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
          <p>Don't have an account?</p>
          <NavLink className={formStyle.link} to={"/register"}>
            Sign Up
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
