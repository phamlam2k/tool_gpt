import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN } from "../config/const";

export const isLogin = () => {
  return !!localStorage.getItem(AUTH_TOKEN);
};

export const getInfo = () => {
  const userInfo = localStorage.getItem(AUTH_TOKEN);

  if (!userInfo) return null;

  return jwtDecode(userInfo);
};

export const checkLoginSSO = () => {
  const token =
    window.location.href.split("access_token=")[1] ||
    localStorage.getItem(AUTH_TOKEN);

  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
    window.location.href = "/";
  }
};
