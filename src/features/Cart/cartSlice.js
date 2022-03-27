import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem("listProductCart")) || [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },

    hiddenMiniCart(state) {
      state.showMiniCart = false;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex((cart) => cart.id === newItem.id);

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem("listProductCart", JSON.stringify(state.cartItems));
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((cart) => cart.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
        localStorage.removeItem("listProductCart");
        localStorage.setItem(
          "listProductCart",
          JSON.stringify(state.cartItems)
        );
      }
    },

    removeFromCart(state, action) {
      const idNeedRemove = action.payload;
      console.log('payload', idNeedRemove.id);
      state.cartItems = state.cartItems.filter(
        (cart) => cart.id !== idNeedRemove.id
      );
      console.log('removeCart', state.cartItems)
      localStorage.removeItem("listProductCart");
      localStorage.setItem("listProductCart", JSON.stringify(state.cartItems));
    },
  },
});

const { reducer, actions } = cartSlice;
export const {
  showMiniCart,
  hiddenMiniCart,
  addToCart,
  removeFromCart,
  setQuantity,
} = actions;
export default reducer;
