import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import paginateReducer from "./features/paginateSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    paginate: paginateReducer,
    cart: cartReducer,
  },
});

export default store;
