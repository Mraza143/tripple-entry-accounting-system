import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getAllUsers,
  removeUser,
  updateUserRole
} from "../controllers/userController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUsers").get(getAllUsers);
router.route("/deleteUser/:id").delete(removeUser);
router.route("/updateRole/:id").put(updateUserRole);

export default router;
