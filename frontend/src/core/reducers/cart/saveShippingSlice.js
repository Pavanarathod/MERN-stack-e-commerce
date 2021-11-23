import { createSlice } from "@reduxjs/toolkit";

const saveShippingSlice = createSlice({
  name: "shippingAddress",
  initialState: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
  reducers: {
    setAddress(state, action) {
      state.shippingAddress = action.payload;
    },
  },
});

export const shippingActions = saveShippingSlice.actions;

export default saveShippingSlice.reducer;
