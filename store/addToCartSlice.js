import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const addToCartSlice = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    addItemToCart: (cartState, action) => {
      if (cartState.items.length === 0) {
        let newItem = action.payload;
        newItem.quantity = 1;
        cartState.items.push(newItem);
      } else {
        const existingItem = cartState.items.some(
          (item) => item.slug === action.payload.slug
        );
        if (!existingItem) {
          let newItem = action.payload;
          newItem.quantity = 1;
          cartState.items.push(newItem);
        } else {
          let objIndex = cartState.items.findIndex(
            (obj) => obj.slug === action.payload.slug
          );
          cartState.items[objIndex].quantity += 1;
        }
      }
    },
    initializeCart: (cartState, action) => {
      cartState.items = action.payload;
    },
  },
});
export const { addItemToCart, initializeCart } = addToCartSlice.actions;
