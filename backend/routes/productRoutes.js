import express from "express";
import {
  getProdcuts,
  getProdcutDetail,
  deleteProduct,
  createNewReview,
  getTopProducts,
} from "../controllers/productController.js";
import authMiddleware, { adminUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProdcuts);
router.get("/top", getTopProducts);
router.route("/:id/reviews").post(authMiddleware, createNewReview);

router
  .route("/:id")
  .get(getProdcutDetail)
  .delete(authMiddleware, adminUser, deleteProduct);

export default router;
