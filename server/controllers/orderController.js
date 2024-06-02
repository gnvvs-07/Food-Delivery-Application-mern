import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    // payment link
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    // delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while payment",
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while verifying order",
    });
  }
};

const userOrders = async (req, res) => {
  // user orders
  try {
    // fetch all orders of the user
    const orders = await orderModel.find({
      userId: req.body.userId,
    });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
// list orders in admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while fetching orders",
    });
  }
};

// order status update api
const updateStatus = async (req, res) => {
  try {
    // find order and update status
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
