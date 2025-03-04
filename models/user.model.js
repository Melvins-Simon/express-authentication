import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide username."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide username."],
      unique: [true, "Email should be unique."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Provide password."],
      select: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeExpTime: {
      type: Date,
      default: Date.now(),
    },
    forgotPasswdToken: {
      type: String,
      select: false,
    },
    forgotPasswdTokenExpTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
