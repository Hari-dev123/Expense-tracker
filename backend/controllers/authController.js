const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

const registeruser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
        password: hashedPassword,
    });
    await user.save();
    const token = generateToken(user._id);
    return res.status(200).json({ id : user._id,user, token });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error"  , error : e.message});
  }
};




const loginUser = async(req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message : "All fields are required"});
    }
   try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "password incorrect" });
        }
        const token = generateToken(user._id);
        return res.status(200).json({ id : user._id,user,token });
   } catch (error) {
        return res.status(500).json({ message: "Internal server error" ,error : error.message});
   }

};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = { registeruser, loginUser, getUserInfo };
