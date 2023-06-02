import React, { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import s from "./SetNewPassword.module.css";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import formStyle from "../../../common/style/form.module.css";
import { ArgSetNewPasswordType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";

const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgSetNewPasswordType>({
    defaultValues: {
      password: "",
      resetPasswordToken: "",
    },
  });

  const setNewPasswordHandler = (data: ArgSetNewPasswordType) => {
    const payload = {
      password: data.password,
      resetPasswordToken: token,
    };
    dispatch(authThunks.setNewPassword(payload))
      .unwrap()
      .then(() => navigate("/profile"));
  };
  const onSubmit: SubmitHandler<ArgSetNewPasswordType> = (data) =>
    setNewPasswordHandler(data);

  return (
    <div className={formStyle.formBlock}>
      <div className={formStyle.formContainer}>
        <h2>Set new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              className={s.formControl}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
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
              <p className={s.subText}>
                Create new password and we will send you further instructions to
                email
              </p>
              <Button
                className={formStyle.button}
                type="submit"
                variant="contained"
              >
                Create new password
              </Button>
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
