import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: null };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(users, action) {
      users.currentUser = action.payload;
    },
    updateUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = usersSlice.actions;

export const selectUser = (state) => state.users;

export default usersSlice.reducer;
