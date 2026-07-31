import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";

export const setAccessTokenInCookie = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAccessToken = () => {
  Cookies.remove(TOKEN_KEY);
};