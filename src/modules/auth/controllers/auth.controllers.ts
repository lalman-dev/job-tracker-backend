import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { User } from "../models/user.models.js";
import { generateToken } from "../../../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password is required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  const token = generateToken(user._id.toString());

  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id.toString());

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
};
