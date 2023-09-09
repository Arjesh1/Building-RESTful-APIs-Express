import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModal";

const User = mongoose.model("User", UserSchema);

export const loginRequired = async (req, res, next) => {
  try {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: "Unathhorized User!" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    const savedUser = await newUser.save();
    savedUser.hashPassword = undefined;
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. No user found" });
    }

    if (!user.comparePassword(req.body.password, user.hashPassword)) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong Password" });
    }

    const token = jwt.sign(
      { email: user.email, userName: user.userName, _id: user.id },
      "RESTfulApis"
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
