import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";
// add to cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId }); //userId decoded from the middleware
    let cartData = await userData.cartData;
    // logic to add to cart functions
    if (!cartData[req.body.itemId]) {
      //no cart item exists till now
      cartData[req.body.itemId] = 1;
    }
    // adding items to cart
    else {
      cartData[req.body.itemId] += 1;
    }
    // update cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
};

// remove from cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    // logic to remove from cart functions
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};
// get cart

const getCart = async (req, res) => {
  // fetch users cart
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
