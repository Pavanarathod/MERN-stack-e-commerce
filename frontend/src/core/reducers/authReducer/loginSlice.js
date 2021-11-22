import { createSlice } from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
  name: "user",
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
    setLogout(state) {
      state.userInfo = null;
    },
  },
});

export const loginAciton = userLoginSlice.actions;

export default userLoginSlice.reducer;
