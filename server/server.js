import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";

// app config
const app = express();
// port number
const port = 4000;
// middleware
app.use(express.json());
app.use(cors());
// db connection
connectDB();
// routing
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.listen(port, () => {
  console.log("Server is running");
});
