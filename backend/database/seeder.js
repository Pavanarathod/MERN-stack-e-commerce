import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Orders from "../models/orderModel.js";
import user from "../data/users.js";
import products from "../data/products.js";
import connectDB from "./mongoose.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Orders.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(user);

    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Orders.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
