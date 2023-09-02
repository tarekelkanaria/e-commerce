import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import Materials from "@/../data.json";
import type {
  InitialProductsState,
  Product,
  RenderedProduct,
  SortProductsAction,
  ToggleSortAction,
} from "@/types";

export const productsWithoutFeatured: Product[] = Materials.products.filter(
  (product) => product.featured !== true
);

const initialProducts: RenderedProduct[] = productsWithoutFeatured.map(
  (product) => ({
    ...product,
    id: nanoid(),
  })
);

const featuredProduct: Product = Materials.products.find(
  (product) => product.featured === true
)!;

const initialState: InitialProductsState = {
  allProducts: initialProducts,
  featuredProduct,
  selectedCategories: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action: SortProductsAction) => {
      if (action.payload === "price") {
        state.allProducts.sort((a, b) => a.price - b.price);
      } else {
        state.allProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    toggleSort: (state, action: ToggleSortAction) => {
      if (action.payload.sortType === "price") {
        if (action.payload.hasSorted) {
          state.allProducts.sort((a, b) => b.price - a.price);
        } else {
          state.allProducts.sort((a, b) => a.price - b.price);
        }
      } else {
        if (action.payload.hasSorted) {
          state.allProducts.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          state.allProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
      }
    },
    filterByCategory: (state, action) => {
      if (action.payload.selected) {
        state.selectedCategories = [
          ...state.selectedCategories,
          action.payload.label,
        ];
      } else {
        state.selectedCategories = state.selectedCategories.filter(
          (category) => category !== action.payload.label
        );
      }
      if (!state.selectedCategories.length) {
        state.allProducts = initialProducts;
      } else {
        state.allProducts = initialProducts.filter((product) =>
          state.selectedCategories.includes(product.category)
        );
      }
    },
    filterByPrice: (state, action) => {
      if (action.payload === 19) {
        state.allProducts = initialProducts.filter(
          (product) => product.price <= action.payload
        );
      } else if (action.payload === 99) {
        state.allProducts = initialProducts.filter(
          (product) => product.price <= action.payload && product.price >= 20
        );
      } else if (action.payload === 199) {
        state.allProducts = initialProducts.filter(
          (product) => product.price <= action.payload && product.price >= 100
        );
      } else if (action.payload === 200) {
        state.allProducts = initialProducts.filter(
          (product) => product.price >= action.payload
        );
      } else {
        state.allProducts = initialProducts;
      }
    },
    clearFilters: (state) => {
      state.allProducts = initialProducts;
      state.selectedCategories = [];
    },
  },
});

export const {
  sortProducts,
  toggleSort,
  filterByCategory,
  filterByPrice,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
