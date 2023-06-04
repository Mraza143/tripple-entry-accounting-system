import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

import userRouter from "./routes/userRoute.js";
import entryRouter from "./routes/entryRoute.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Api Routes
app.use("/api/user", userRouter);
app.use("/api", entryRouter);

// Connecting to DB
const connectDataBase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDataBase();

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(5000, () =>
  console.log(`Server started on port 5000`)
);
