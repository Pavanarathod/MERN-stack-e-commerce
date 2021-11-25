import { createSlice } from "@reduxjs/toolkit";

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    userOrders: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserOrders(state, action) {
      state.userOrders = action.payload;
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

export const userOrderActions = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
