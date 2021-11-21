import { configureStore } from "@reduxjs/toolkit";
import productDetailSlice from "../reducers/productReducer/productDetailSlice";
import productSlice from "../reducers/productReducer/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    product: productDetailSlice,
  },
});
