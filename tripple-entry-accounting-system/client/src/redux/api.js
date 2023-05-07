import axios from "axios";
import Cookies from "js-cookie";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

export const loginUser = (formData) => API.post("/api/user/login", formData);
export const registerUser = (formData) =>
  API.post("/api/user/register", formData);
