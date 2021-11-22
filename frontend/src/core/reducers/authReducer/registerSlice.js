import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const registerActions = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
