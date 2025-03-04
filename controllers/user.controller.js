import { User } from "../models/user.model.js";
import { genVCode } from "../utils/genVC.js";
import { comparePasswd, hashPasswd } from "../utils/hashing.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

// signup
export const signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all required details." });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User with the same email already exist.",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password mismatch.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least six characters.",
      });
    }
    const hashedPasswd = await hashPasswd(password, 12);
    const verificationCode = genVCode();
    const verificationCodeExpTime = Date.now() + 1000 * 60 * 30;

    const newUser = new User({
      username,
      email,
      password: hashedPasswd,
      verificationCode,
      verificationCodeExpTime,
    });
    const user = await newUser.save();
    sendVerificationCode(verificationCode, email, username);
    res.status(201).json({
      success: true,
      message: "User registration success.",
      data: { ...user._doc, password: undefined, verificationCode: undefined },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error -> ${error.message}`,
    });
  }
};

// signin
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all the required details." });
    }

    const userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User with the provided email not found.",
      });
    }
    const passwordMatched = await comparePasswd(password, userExist.password);
    if (!passwordMatched) {
      res
        .status(400)
        .json({ success: false, message: "Invalid password. Try Again." });
    }
    res.status(200).json({
      success: true,
      message: "Sign in success.",
      data: { ...userExist._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error -> ${error.message}`,
    });
  }
};

// signout
export const signout = async (req, res, next) => {
  try {
    //todo
  } catch (error) {
    //todo
  }
};

// Verify email
export const verifyEmail = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error -> ${error.message}`,
    });
  }
};

// Reset password
export const resetPasswd = async (req, res, next) => {
  try {
    //todo
  } catch (error) {
    //todo
  }
};

// Reset password
export const forgotPasswd = async (req, res, next) => {
  try {
    //todo
  } catch (error) {
    //todo
  }
};
