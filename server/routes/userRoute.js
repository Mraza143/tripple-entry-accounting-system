import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getAllUsers,
  removeUser,
} from "../controllers/userController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUsers").get(getAllUsers);
router.route("/deleteUser/:id").delete(removeUser);

export default router;
