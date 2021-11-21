import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cart/cartSlice";
import productDetailSlice from "../reducers/productReducer/productDetailSlice";
import productSlice from "../reducers/productReducer/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    product: productDetailSlice,
    cart: cartSlice,
  },
});
