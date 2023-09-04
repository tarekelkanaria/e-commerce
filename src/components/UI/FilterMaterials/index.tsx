"use client";

import { useAppDispatch } from "@/redux/typed-hooks";
import {
  filterByCategory,
  selectCategory,
} from "@/redux/features/productsSlice";
import { useId } from "react";
import type { CategoryInput } from "@/types";

const FilterMaterials = ({ label, hasChecked }: CategoryInput) => {
  const filterId = useId();
  const dispatch = useAppDispatch();

  const handleSelectCategory = () => {
    dispatch(selectCategory(label));
    dispatch(filterByCategory());
  };

  return (
    <>
      <input
        type="checkbox"
        id={filterId}
        checked={hasChecked}
        onChange={handleSelectCategory}
        className="focus:ring-0 cursor-pointer"
      />
      <label htmlFor={filterId} className="ml-2 capitalize">
        {label}
      </label>
    </>
  );
};

export default FilterMaterials;
