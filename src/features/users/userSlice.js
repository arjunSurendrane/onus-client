import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/index";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("User")),
  role: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    createUser: (state, actions) => {
      console.log(actions.payload);
      localStorage.setItem("User", JSON.stringify({ ...actions.payload.user }));
      state.user = actions.payload.user;
    },
    registerUser: (state, data) => {
      state.user = data.payload;
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    createCookie: () => {},
    deleteCookie: () => {},
  },
});

export const {
  createUser,
  registerUser,
  createCookie,
  deleteCookie,
  changeRole,
} = userSlice.actions;

export const userRole = (state) => state.user.role;
export default userSlice.reducer;
