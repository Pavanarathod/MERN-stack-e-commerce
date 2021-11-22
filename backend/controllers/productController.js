import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProdcuts = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  res.json(product);
});

const getProdcutDetail = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProdcuts, getProdcutDetail };
