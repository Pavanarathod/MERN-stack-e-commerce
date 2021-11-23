import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cart/cartSlice";
import productDetailSlice from "../reducers/productReducer/productDetailSlice";
import productSlice from "../reducers/productReducer/productSlice";
import userLoginSlice from "../reducers/authReducer/loginSlice";
import userRegisterSlice from "../reducers/authReducer/registerSlice";
import userDetailSlice from "../reducers/authReducer/userDetailSlice";
import userUpdateSlice from "../reducers/authReducer/userUpdateSlice";
import saveShippingSlice from "../reducers/cart/saveShippingSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    product: productDetailSlice,
    cart: cartSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userDetail: userDetailSlice,
    userUpdate: userUpdateSlice,
    shippingAddress: saveShippingSlice,
  },
});
