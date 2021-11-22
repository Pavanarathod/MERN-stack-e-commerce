import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/mongoose.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import colors from "colors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
connectDB();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
