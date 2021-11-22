import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    userInfo: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
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

export const userUpdateActions = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
