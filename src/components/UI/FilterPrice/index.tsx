"use client";

import {
  filterByPrice,
  setSelectedPrice,
} from "@/redux/features/productsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import type { PriceInput } from "@/types";
import { useId } from "react";

const FilterPrice = ({ label, breakPoint }: PriceInput) => {
  const priceId = useId();
  const selectedPrice = useAppSelector((state) => state.products.selectedPrice);
  const dispatch = useAppDispatch();

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedPrice(+e.target.value));
    dispatch(filterByPrice());
  };

  return (
    <>
      <input
        type="radio"
        id={priceId}
        name="price"
        value={breakPoint}
        checked={selectedPrice === breakPoint}
        onChange={handleSelect}
        className="focus:ring-0 cursor-pointer"
      />
      <label htmlFor={priceId} className="ml-2">
        {label}
      </label>
    </>
  );
};

export default FilterPrice;
