import { configureStore } from "@reduxjs/toolkit";
import { addToCartSlice } from "./addToCartSlice";
import { checkoutSlice } from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    cartState: addToCartSlice.reducer,
    checkoutState: checkoutSlice.reducer,
  },
});
