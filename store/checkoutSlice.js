import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryAddress: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  },
  card: {
    number: "",
    expiry: "",
    cvv: "",
  },
};

export const checkoutSlice = createSlice({
  name: "checkoutState",
  initialState: initialState,
  reducers: {
    createCheckout: (checkoutState, action) => {
      checkoutState.deliveryAddress.firstName = action.payload.firstName;
      checkoutState.deliveryAddress.lastName = action.payload.lastName;
      checkoutState.deliveryAddress.email = action.payload.email;
      checkoutState.deliveryAddress.country = action.payload.country;
      checkoutState.deliveryAddress.address = action.payload.address;
      checkoutState.deliveryAddress.city = action.payload.city;
      checkoutState.deliveryAddress.state = action.payload.state;
      checkoutState.deliveryAddress.zipcode = action.payload.zipcode;
      checkoutState.card.number = action.payload.cardNumber;
      checkoutState.card.expiry = action.payload.cardExpiry;
      checkoutState.card.cvv = action.payload.cardCvv;
    },
  },
});
export const { createCheckout, initializeCheckoutData } = checkoutSlice.actions;
