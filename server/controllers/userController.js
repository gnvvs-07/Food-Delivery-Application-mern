// import user models
import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import dotenv from "dotenv";
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// user login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // matching the credentials of user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// register

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email }); //if user already exists
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Password is not strong enough",
      });
    }
    // after validations
    // save hashed passwords
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassowrd,
    });
    // save the new user
    const user = await newUser.save();
    // tokenization
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error while sign up" });
  }
};

export { loginUser, registerUser };
