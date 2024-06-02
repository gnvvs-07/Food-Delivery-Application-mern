import express from "express";

import authMiddleware from "../middleware/auth.js";

import { placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// place order
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
export default orderRouter;
