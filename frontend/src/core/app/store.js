import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cart/cartSlice";
import productDetailSlice from "../reducers/productReducer/productDetailSlice";
import productSlice from "../reducers/productReducer/productSlice";
import userLoginSlice from "../reducers/authReducer/loginSlice";
import userRegisterSlice from "../reducers/authReducer/registerSlice";
import userDetailSlice from "../reducers/authReducer/userDetailSlice";
import userUpdateSlice from "../reducers/authReducer/userUpdateSlice";
import saveShippingSlice from "../reducers/cart/saveShippingSlice";
import paymentSlice from "../reducers/cart/paymentSlice";
import orderSlice from "../reducers/orderReducer/orderSlice";
import orderDetailSlice from "../reducers/orderReducer/orderDetailSlice";
import orderPaySlice from "../reducers/orderReducer/orderPaySlice";
import userOrdersSlice from "../reducers/authReducer/userOrdersSlice";
import userListSlice from "../reducers/authReducer/userListSlice";
import deleteUserSlice from "../reducers/authReducer/userDeleteSlice";
import userDetailUpdateSlice from "../reducers/authReducer/userDetailUpdateSlice";
import productDeleteSlice from "../reducers/productReducer/productDeleteSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    product: productDetailSlice,
    productDelete: productDeleteSlice,
    cart: cartSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userDetail: userDetailSlice,
    userUpdate: userUpdateSlice,
    userOrders: userOrdersSlice,
    userLists: userListSlice,
    userDelete: deleteUserSlice,
    userDetailUpdate: userDetailUpdateSlice,
    shippingAddress: saveShippingSlice,
    paymentDetails: paymentSlice,
    orderCreate: orderSlice,
    orderDetails: orderDetailSlice,
    orderPay: orderPaySlice,
  },
});
