import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUsers").get(getAllUsers);

export default router;
