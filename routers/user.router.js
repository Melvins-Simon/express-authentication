import express from "express";
import {
  signup,
  resetPasswd,
  signin,
  signout,
  verifyEmail,
  forgotPasswd,
  delUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/verify-email", verifyEmail);
router.post("/auth/signout", signout);
//Authenticated middleware
router.post("/auth/forgot-password", forgotPasswd);
router.post("/auth/reset-password/:id", resetPasswd);
//delete
router.delete("/auth/delete/user/:id", delUser);

export default router;
