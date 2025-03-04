import express from "express";
import {
  signup,
  resetPasswd,
  signin,
  signout,
  verifyEmail,
  forgotPasswd,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/verify-email", verifyEmail);
router.post("/auth/signout", signout);
//Authenticated middleware
router.post("/auth/forgot-password", forgotPasswd);
router.post("/auth/rest-password", resetPasswd);

export default router;
