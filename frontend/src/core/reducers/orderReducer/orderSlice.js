import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
      state.loading = false;
      state.success = true;
    },
    setLoading(state) {
      state.loading = true;
      state.success = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
