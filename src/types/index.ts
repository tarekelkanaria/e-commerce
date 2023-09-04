import store from "@/redux/store";

export type RootState = ReturnType<typeof store.getState>;

export type DispatchAction = typeof store.dispatch;

type ProductImage = {
  src: string;
  alt: string;
};

type ProductDetails = {
  weight: number;
  thickness: number;
  description: string;
  recommendations: ProductImage[];
};

export interface Product {
  name: string;
  category: string;
  price: number;
  currency: string;
  image: ProductImage;
  bestseller: boolean;
  featured: boolean;
  details: ProductDetails | null;
}
export interface RenderedProduct extends Product {
  id: string;
}

export type PriceInput = {
  label: string;
  breakPoint: number;
};

export type CategoryInput = {
  label: string;
  hasChecked: boolean;
};

export type InitialProductsState = {
  renderedProducts: RenderedProduct[];
  featuredProduct: Product;
  categories: CategoryInput[];
  prices: PriceInput[];
  selectedPrice: number | null;
};

export type InitialPaginateState = {
  currentPage: number;
};

export type InitialCartState = {
  isVisible: boolean;
  cartProducts: RenderedProduct[];
};

export type SortProductsAction = {
  type: string;
  payload: string;
};

export type ToggleSortAction = {
  type: string;
  payload: {
    sortType: string;
    hasSorted: boolean;
  };
};

export type ChangePageAction = {
  type: string;
  payload: number;
};

export type ProvidersProps = {
  children: React.ReactNode;
};

export type FilterProps = {
  smallScreen?: boolean;
  close?: () => void;
};
