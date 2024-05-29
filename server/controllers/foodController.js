// import model
import foodModel from "../models/FoodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  // access the input of the new food item
  const image_filename = `${req.file.filename}`; //image accessing
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "food doesnot add successfully" });
  }
};

// add food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    // sending the response
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "food doesnot fetch successfully",
    });
  }
};

export { addFood, listFood };
