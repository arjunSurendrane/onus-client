import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  notification: [],
};

export const userSlice = createSlice({
  name: "notification",
  initialState: INITIAL_STATE,
  reducers: {
    storeNotificaton: (state, actions) => {
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
