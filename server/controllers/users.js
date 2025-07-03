import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesnt exists." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, nickname } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords dont match." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      nickname,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const googleSignIn = async (req, res) => {
  const { credential } = req.body;

  try {
    const decoded = jwtDecode(credential);
    const { email, name, sub: googleId } = decoded;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      existingUser = await User.create({  nickname: name, email, googleId });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Google sign-in failed." });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user ID" });

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { nickname, profilePicture } = req.body;

  try {
    const updateFields = {};
    if (nickname) updateFields.nickname = nickname;
    if (profilePicture) updateFields.profilePicture = profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });

    if (nickname) {
      await PostMessage.updateMany(
        { creator: id },
        { $set: { nickname ,profilePicture} }
      );
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Profile update failed:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await User.findByIdAndDelete(req.params.id);
    await PostMessage.deleteMany({ creator: req.params.id });

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Delete Account Error:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
};

