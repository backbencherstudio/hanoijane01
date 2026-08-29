import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";

const isHttps =
  typeof window !== "undefined" && window.location.protocol === "https:";

const cookieOptions: Cookies.CookieAttributes = {
  expires: 7,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production" && isHttps,
};

export const setAccessTokenInCookie = (token: string) => {
  Cookies.set(TOKEN_KEY, token, cookieOptions);
};

export const setRoleInCookie = (role: string) => {
  Cookies.set("userRole", role, cookieOptions);
};

export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAccessToken = () => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove("userRole", { path: "/" });
};
