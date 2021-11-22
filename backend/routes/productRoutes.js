import express from "express";
import {
  getProdcuts,
  getProdcutDetail,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProdcuts);

router.route("/:id").get(getProdcutDetail);

export default router;
