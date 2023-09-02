"use client";

import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import { filterByCategory } from "@/redux/features/productsSlice";
import { useId, useState, useEffect } from "react";
import type { CategoryInput } from "@/types";

const FilterMaterials = ({ label, hasChecked }: CategoryInput) => {
  const [selectedFilter, setSelectedFilter] = useState(hasChecked);
  const filterId = useId();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.products.selectedCategories
  );

  const stringCopyOfSelectedCategories = JSON.stringify(selectedCategories);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedFilter(false);
    }
  }, [stringCopyOfSelectedCategories]);

  const handleSelectCategory = () => {
    setSelectedFilter((prevSelect) => !prevSelect);
    dispatch(filterByCategory({ label, selected: !selectedFilter }));
  };

  return (
    <>
      <input
        type="checkbox"
        id={filterId}
        checked={selectedFilter}
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
