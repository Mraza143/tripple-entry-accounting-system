import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  // baseURL: "https://nice-erin-clam.cyclic.app",
});

// Users
export const loginUser = (formData) => API.post("/api/user/login", formData);
export const registerUser = (formData) =>
  API.post("/api/user/register", formData);
export const getAllUsers = () => API.get("/api/user/allUsers");

// Entries
export const getAllEntries = () => API.get("/api/allEntries");
export const getSingleEntry = (id) => API.get(`/api/entry/${id}`);
export const updateSingleEntry = (id, formData) =>
  API.put(`/api/updateSingleEntry/${id}`, formData);
