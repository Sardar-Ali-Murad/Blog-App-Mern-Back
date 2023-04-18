import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changeUserImage
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/changeUserImage").post(auth,changeUserImage);
router.route("/getCurrentUser").get(auth, getCurrentUser);
router.route("/forgetPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);

export default router;
