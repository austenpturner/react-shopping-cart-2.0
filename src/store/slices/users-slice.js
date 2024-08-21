import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: null };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(users, action) {
      // console.log(action.payload);
      users.currentUser = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const selectUser = (state) => state.users;

export default usersSlice.reducer;
