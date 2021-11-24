import { createSlice } from "@reduxjs/toolkit";

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    orderDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    setOrdersDetail(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const orderDetailActions = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
