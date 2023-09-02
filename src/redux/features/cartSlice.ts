import { createSlice } from "@reduxjs/toolkit";
import type { InitialCartState } from "@/types";

const initialState: InitialCartState = {
  isVisible: false,
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isVisible = true;
    },
    closeCart: (state) => {
      state.isVisible = false;
    },
    addToCart: (state, action) => {
      const existedProduct = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      if (existedProduct) return;

      state.cartProducts = [...state.cartProducts, action.payload];
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { openCart, closeCart, addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
