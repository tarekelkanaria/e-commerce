"use client";

import Image from "next/image";
import { useId, useState } from "react";
import SortIcon from "@/../public/icons/sort.svg";
import { useAppDispatch } from "@/redux/typed-hooks";
import { sortProducts, toggleSort } from "@/redux/features/productsSlice";

const Sort = () => {
  const sortSelectId = useId();
  const [selectedSortType, setSelectedSortType] = useState<string>("price");
  const [hasSorted, setHasSorted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSortType(e.target.value);
    dispatch(sortProducts(e.target.value));
    setHasSorted(true);
  };

  const handleToggleSort = () => {
    dispatch(toggleSort({ sortType: selectedSortType, hasSorted }));
    setHasSorted((prevSorted) => !prevSorted);
  };

  return (
    <div className="hidden lg:flex lg:items-center">
      <Image
        src={SortIcon}
        alt="Sort icon"
        width="15"
        height="15"
        onClick={handleToggleSort}
        className="cursor-pointer mr-1"
      />
      <label
        htmlFor={sortSelectId}
        className="text-[22px] font-normal text-[#9B9B9B] leading-normal mr-4"
      >
        Sort By
      </label>
      <select
        id={sortSelectId}
        value={selectedSortType}
        onChange={handleSelectSort}
        className="border-none focus:ring-0 cursor-pointer text-[22px] text-black font-normal leading-normal"
      >
        <option value="price">Price</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};

export default Sort;
