import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
