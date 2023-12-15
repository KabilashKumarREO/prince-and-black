import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const addToCartSlice = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    addItemToCart: (cartState, action) => {
      cartState.items.push(action.payload);
    },
    initializeCart: (cartState, action) => {
      cartState.items = action.payload;
    },
  },
});
export const { addItemToCart, initializeCart } = addToCartSlice.actions;
