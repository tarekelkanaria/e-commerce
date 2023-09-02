"use client";

import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import { useState, useEffect } from "react";
import Image from "next/image";
import FilterIcon from "@/../public/icons/filter-icon.svg";
import Filter from "../Materials/Filter";
import { addToCart, openCart } from "@/redux/features/cartSlice";

export default function Featured() {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [featuredInCart, setFeaturedInCart] = useState(false);
  const featuredItem = useAppSelector(
    (state) => state.products.featuredProduct
  );
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const existedFeatured = cartProducts.find(
    (product) => product.featured === true
  );
  const stringCopyOfExistedFeatured = JSON.stringify(existedFeatured);

  const dispatch = useAppDispatch();

  const closeFilter = () => {
    setIsFilterOpened(false);
  };

  useEffect(() => {
    if (existedFeatured) setFeaturedInCart(true);
    else setFeaturedInCart(false);
  }, [stringCopyOfExistedFeatured]);

  const handleCartAction = () => {
    dispatch(addToCart(featuredItem));
    setFeaturedInCart(true);
    dispatch(openCart());
  };

  return (
    <section className="container max-w-7xl border-b-4 border-b-[#e4e4e4] pb-2 mb-8">
      <header className="flex justify-between items-center mb-7">
        <h3 className="text-3xl leading-normal text-black font-bold">
          {featuredItem?.name}
        </h3>
        <button
          className="hidden lg:inline-flex add-btn disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleCartAction}
          disabled={featuredInCart}
        >
          ADD TO CART
        </button>
      </header>
      <article className="relative h-[233px] lg:h-[550px] mb-6 lg:mb-14">
        <p className="absolute top-0 left-0 bg-white z-0 py-5 px-16 lg:py-6 lg:px-24 text-black text-xl leading-normal font-bold">
          Featured
        </p>
        <Image
          src={featuredItem?.image.src!}
          alt={featuredItem?.image.alt!}
          fill
          placeholder="blur"
          blurDataURL={featuredItem?.image.src}
          sizes="(max-width: 1023px) 98%, (min-width: 1024px) 100%"
          priority={true}
          className="object-cover object-center -z-10"
        />
      </article>
      <button
        onClick={handleCartAction}
        disabled={featuredInCart}
        className="add-btn w-full lg:hidden mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        ADD TO CART
      </button>
      <div className="flex flex-col-reverse gap-y-1 lg:flex-row lg:justify-between lg:items-center lg:gap-y-0 lg:gap-x-1">
        <div>
          <div className="mb-6">
            <h4 className="info-title mb-6">Materials people also use</h4>
            <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-0 gap-y-3 sm:gap-y-0 sm:flex-nowrap sm:space-x-5 lg:space-x-8 ">
              {featuredItem?.details?.recommendations.map((recommendation) => (
                <Image
                  key={recommendation.src}
                  src={recommendation.src}
                  alt={recommendation.alt}
                  width={117}
                  height={147}
                  className="w-[103px] h-[131px] lg:h-[147px] lg:w-[117px]"
                />
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="info-title mb-1">Details</h4>
            <p className="details-item">
              Weight:{featuredItem?.details?.weight}g/m2
            </p>
            <p className="details-item">
              Thickness:{featuredItem?.details?.thickness}cm
            </p>
          </div>
        </div>
        <article>
          <h4 className="info-title mb-2">About the Recycled Plastic</h4>
          <h5 className="text-[22px] text-[#656565] font-bold leading-normal mb-3 capitalize">
            {featuredItem?.category}
          </h5>
          <p className="text-[18px] lg:max-w-[690px] text-[#656565] font-normal leading-7">
            {featuredItem?.details?.description}
          </p>
        </article>
      </div>
      <Image
        src={FilterIcon}
        alt="Filter icon"
        width={29}
        height={26}
        onClick={() => setIsFilterOpened((prevState) => !prevState)}
        className="w-[29px] h-[26.179px] cursor-pointer ml-auto lg:hidden mb-5"
      />
      {isFilterOpened && <Filter smallScreen={true} close={closeFilter} />}
    </section>
  );
}
