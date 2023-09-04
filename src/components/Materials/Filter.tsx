"use client";

import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import Image from "next/image";
import { clearFilters } from "@/redux/features/productsSlice";
import type { FilterProps } from "@/types";
import FilterMaterials from "../UI/FilterMaterials";
import FilterPrice from "../UI/FilterPrice";
import CloseIcon from "@/../public/icons/close.svg";

const Filter = ({ smallScreen, close }: FilterProps) => {
  const prices = useAppSelector((state) => state.products.prices);
  const categories = useAppSelector((state) => state.products.categories);
  const dispatch = useAppDispatch();

  const handleClearInputs = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <nav
        className={`${
          smallScreen
            ? "block lg:hidden sm:px-8 max-h-[600px] overflow-y-auto scrollbar-none sm:hover:scrollbar sm:scrollbar-w-2 sm:scrollbar-track-slate-100 sm:scrollbar-thumb-gray-400 sm:scrollbar-thumb-rounded-full;"
            : "hidden"
        } lg:block lg:min-w-[268px]`}
      >
        {smallScreen && (
          <Image
            src={CloseIcon}
            alt="Close icon"
            width={18}
            height={18}
            onClick={() => close!()}
            className="w-[18px] h-[18px] ml-auto cursor-pointer"
          />
        )}
        <h3 className="text-[22px] text-black font-bold leading-normal mb-11">
          {smallScreen ? "Filter" : "Materials"}
        </h3>
        <ul className="border-b border-b-[#c2c2c2] mb-8">
          {categories.map((category) => (
            <li key={category.label} className="mb-8">
              <FilterMaterials {...category} />
            </li>
          ))}
        </ul>
        <h3 className="text-[22px] text-black font-bold leading-normal mb-11">
          Price range
        </h3>
        <ul>
          {prices.map((price) => (
            <li key={price.label} className="mb-8">
              <FilterPrice {...price} />
            </li>
          ))}
        </ul>
      </nav>
      {smallScreen && (
        <div className="w-full sm:px-4 sm:py-7 bg-white flex justify-center items-center space-x-5 lg:hidden border-t-4 border-t-[#e4e4e4]">
          <button
            type="button"
            onClick={handleClearInputs}
            className="py-3 px-10 border-[3px] border-black bg-white text-black text-2xl leading-normal font-medium tracking-wide"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => close!()}
            className="py-3 px-10 bg-black text-white text-2xl leading-normal font-medium tracking-wide"
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default Filter;
