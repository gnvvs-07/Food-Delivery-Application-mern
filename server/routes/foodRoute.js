import express from "express";
import multer from "multer";
import { addFood } from "../controllers/foodController.js";
const foodRouter = express.Router();

// image storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`); //unique name
  },
});

const upload = multer({ storage: storage }); //upload middleware

// post req
foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
