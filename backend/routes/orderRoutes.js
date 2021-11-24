import express from "express";
import {
  addOrderItems,
  getOrdersById,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, addOrderItems);
router.route("/:id").get(authMiddleware, getOrdersById);

export default router;
