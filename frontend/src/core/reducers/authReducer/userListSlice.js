import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userList: [],
    loading: false,
    error: false,
  },
  reducers: {
    setUserLists(state, action) {
      state.userList = action.payload;
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

export const userListActions = userListSlice.actions;

export default userListSlice.reducer;
