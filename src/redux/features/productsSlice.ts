import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import Materials from "@/../data.json";
import type {
  CategoryInput,
  InitialProductsState,
  PriceInput,
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

const uniqueCategories = new Set<string>();

for (let i = 0; i < initialProducts.length; i++) {
  uniqueCategories.add(initialProducts[i].category);
}

const categories: CategoryInput[] = [...uniqueCategories].map((category) => ({
  label: category,
  hasChecked: false,
}));

const prices: PriceInput[] = [
  { label: "Lower than $20", breakPoint: 19 },
  { label: "$20 - $100", breakPoint: 99 },
  { label: "$100 - $200", breakPoint: 199 },
  { label: "More than $200", breakPoint: 200 },
];

const initialState: InitialProductsState = {
  renderedProducts: initialProducts,
  featuredProduct,
  categories,
  prices,
  selectedPrice: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action: SortProductsAction) => {
      if (action.payload === "price") {
        state.renderedProducts.sort((a, b) => a.price - b.price);
      } else {
        state.renderedProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    toggleSort: (state, action: ToggleSortAction) => {
      if (action.payload.sortType === "price") {
        if (action.payload.hasSorted) {
          state.renderedProducts.sort((a, b) => b.price - a.price);
        } else {
          state.renderedProducts.sort((a, b) => a.price - b.price);
        }
      } else {
        if (action.payload.hasSorted) {
          state.renderedProducts.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          state.renderedProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
      }
    },
    selectCategory: (state, action) => {
      state.categories.forEach((category) => {
        if (category.label === action.payload) {
          category.hasChecked = !category.hasChecked;
        }
      });
    },
    filterByCategory: (state) => {
      const selectedCategories = state.categories
        .filter((category) => category.hasChecked)
        .map((selectedCategory) => selectedCategory.label);
      state.renderedProducts =
        selectedCategories.length > 0
          ? initialProducts.filter((product) =>
              selectedCategories.includes(product.category)
            )
          : initialProducts;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    filterByPrice: (state) => {
      if (state.selectedPrice === 19) {
        state.renderedProducts = initialProducts.filter(
          (product) => product.price <= 19
        );
      } else if (state.selectedPrice === 99) {
        state.renderedProducts = initialProducts.filter(
          (product) => product.price <= 99 && product.price >= 20
        );
      } else if (state.selectedPrice === 199) {
        state.renderedProducts = initialProducts.filter(
          (product) => product.price <= 199 && product.price >= 100
        );
      } else if (state.selectedPrice === 200) {
        state.renderedProducts = initialProducts.filter(
          (product) => product.price >= 200
        );
      } else {
        state.renderedProducts = initialProducts;
      }
    },
    clearFilters: (state) => {
      state.renderedProducts = initialProducts;
      state.categories = categories;
      state.selectedPrice = null;
    },
  },
});

export const {
  sortProducts,
  toggleSort,
  selectCategory,
  filterByCategory,
  setSelectedPrice,
  filterByPrice,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
