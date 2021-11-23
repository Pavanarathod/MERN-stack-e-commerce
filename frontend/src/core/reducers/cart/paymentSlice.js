import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentDetail: localStorage.getItem("paymentDetails")
      ? JSON.parse(localStorage.getItem("paymentDetails"))
      : {},
  },
  reducers: {
    setPaymentDetails(state, action) {
      state.paymentDetail = action.payload;
    },
  },
});

export const paymentDetailAcions = paymentSlice.actions;

export default paymentSlice.reducer;
