import axios from "axios";
import { cartActions } from "../../reducers/cart/cartSlice";
import { paymentDetailAcions } from "../../reducers/cart/paymentSlice";
import { shippingActions } from "../../reducers/cart/saveShippingSlice";

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch(
    cartActions.addItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const remooveFromCart = (id) => (dispatch, getState) => {
  dispatch(cartActions.remooItem(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (shippingData) => async (dispatch) => {
  dispatch(shippingActions.setAddress(shippingData));
  localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
};

const savePaymentDetail = (paymentData) => (dispatch) => {
  dispatch(paymentDetailAcions.setPaymentDetails(paymentData));
  localStorage.setItem("paymentDetails", JSON.stringify(paymentData));
};

export { addToCart, remooveFromCart, saveShippingAddress, savePaymentDetail };
