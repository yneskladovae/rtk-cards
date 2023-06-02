import { instance } from "common/api/common.api";

export const authApi = {
  register(arg: ArgRegisterType) {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login(arg: ArgLoginType) {
    return instance.post<ProfileType>("auth/login", arg);
  },
  forgotPassword(arg: ArgForgotPasswordType) {
    return instance.post<ForgotPasswordResponseType>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      arg
    );
  },
};

export type ArgForgotPasswordType = {
  email: string;
  from?: string;
  message: string;
};

export type ForgotPasswordResponseType = {
  info: string;
  error: string;
};

export type ArgRegisterType = {
  email: string;
  password: string;
};

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
  token: string;
  tokenDeathTime: number;
};

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime" | "avatar">;
};
