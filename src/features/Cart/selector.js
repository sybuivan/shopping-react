import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = state => state.cart.cartItems;

// count cart item of product
export const cartItemCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.reduce((count, cart) => count + cart.quantity, 0)
);

export const cartItemsTotalsSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce((total, cart) => total + cart.quantity * cart.salePrice, 0)
);
