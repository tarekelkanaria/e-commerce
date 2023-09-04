"use client";

import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import {
  changePage,
  getNextPage,
  getPreviousPage,
} from "@/redux/features/paginateSlice";
import PrevArrow from "@/../public/icons/prev-arrow.svg";
import NextArrow from "@/../public/icons/next-arrow.svg";
import Image from "next/image";

const productsPerDeskPage = 6;
const productsPerMobPage = 4;

const PaginationActions = () => {
  const allProducts = useAppSelector(
    (state) => state.products.renderedProducts
  );
  const currentPage = useAppSelector((state) => state.paginate.currentPage);
  const dispatch = useAppDispatch();

  const deskPagesCount = Math.ceil(allProducts.length / productsPerDeskPage);
  const deskPagesNumbers: number[] = [];
  for (let i = 1; i <= deskPagesCount; i++) {
    deskPagesNumbers.push(i);
  }

  const mobPagesCount = Math.ceil(allProducts.length / productsPerMobPage);
  const mobPagesNumbers: number[] = [];
  for (let j = 1; j <= mobPagesCount; j++) {
    mobPagesNumbers.push(j);
  }

  return (
    <>
      <ul className="hidden lg:flex lg:justify-center lg:items-center lg:space-x-4 lg:mb-14">
        {currentPage > 1 && (
          <li
            className="cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => dispatch(getPreviousPage())}
          >
            <Image
              src={PrevArrow}
              alt="Previous arrow icon"
              width={8}
              height={16}
              style={{ height: "16px", maxWidth: "8px", width: "auto" }}
            />
          </li>
        )}
        {deskPagesNumbers.map((number) => (
          <li
            key={number.toString()}
            className={`text-3xl font-normal leading-normal text-[#b4b4b4] cursor-pointer px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 ${
              number === currentPage && "font-bold text-black"
            }`}
            onClick={() => dispatch(changePage(number))}
          >
            {number}
          </li>
        ))}
        {currentPage < deskPagesCount && (
          <li
            className="cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => dispatch(getNextPage())}
          >
            <Image
              src={NextArrow}
              alt="Previous arrow icon"
              width={8}
              height={16}
              style={{ height: "16px", maxWidth: "8px", width: "auto" }}
            />
          </li>
        )}
      </ul>
      <ul className="flex justify-center items-center space-x-1 sm:space-x-4 lg:hidden">
        {currentPage > 1 && (
          <li
            className="cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => dispatch(getPreviousPage())}
          >
            <Image
              src={PrevArrow}
              alt="Previous arrow icon"
              width={8}
              height={16}
              style={{ height: "16px", maxWidth: "8px", width: "auto" }}
            />
          </li>
        )}
        {mobPagesNumbers.map((number) => (
          <li
            key={number.toString()}
            className={`text-3xl font-normal leading-normal text-[#b4b4b4] cursor-pointer px:1 sm:px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 ${
              number === currentPage && "font-bold text-black"
            }`}
            onClick={() => dispatch(changePage(number))}
          >
            {number}
          </li>
        ))}
        {currentPage < mobPagesCount && (
          <li
            className="cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => dispatch(getNextPage())}
          >
            <Image
              src={NextArrow}
              alt="Previous arrow icon"
              width={8}
              height={16}
              style={{ height: "16px", maxWidth: "8px", width: "auto" }}
            />
          </li>
        )}
      </ul>
    </>
  );
};

export default PaginationActions;
