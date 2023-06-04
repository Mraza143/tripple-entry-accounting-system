import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

import UserModal from "../models/userModel.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id, role: oldUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRESIN,
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password, role } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      name,
      email,
      password: hashedPassword,
      role,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRESIN,
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
