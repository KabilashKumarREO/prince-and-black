import { configureStore } from "@reduxjs/toolkit";
import { addToCartSlice } from "./addToCartSlice";
import { checkoutSlice } from "./checkoutSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    cartState: addToCartSlice.reducer,
    checkoutState: checkoutSlice.reducer,
    userState: userSlice.reducer,
  },
});
