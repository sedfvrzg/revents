import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";

export const login = creds => ({ type: LOGIN_USER, payload: { creds } });

export const logout = () => ({ type: SIGN_OUT_USER })
