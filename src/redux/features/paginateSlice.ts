import { createSlice } from "@reduxjs/toolkit";
import { ChangePageAction, InitialPaginateState } from "@/types";

const initialState: InitialPaginateState = {
  currentPage: 1,
};

const paginateSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    getPreviousPage: (state) => {
      --state.currentPage;
    },
    getNextPage: (state) => {
      ++state.currentPage;
    },
    changePage: (state, action: ChangePageAction) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getPreviousPage, getNextPage, changePage } =
  paginateSlice.actions;

export default paginateSlice.reducer;
