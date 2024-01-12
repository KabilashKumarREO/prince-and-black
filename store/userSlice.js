import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setUser: (userState, action) => {
      userState.name = action.payload.name;
      userState.email = action.payload.email;
      userState.isAdmin = action.payload.isAdmin;
    },
  },
});
export const { setUser } = userSlice.actions;
