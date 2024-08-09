import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/user.controller.js";
import authenticate from "../MiddleWares/auth.middleware.js";
const router = express.Router();

router.post("/", registerUser);

router.post("/login", loginUser);

router.post("/logout", logout);

router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

export default router;
