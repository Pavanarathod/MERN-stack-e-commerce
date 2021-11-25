import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPay,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, addOrderItems);
router.route("/myorders").get(authMiddleware, getMyOrders);
router.route("/:id").get(authMiddleware, getOrdersById);
router.route("/:id/pay").put(authMiddleware, updateOrderToPay);

export default router;
