"use client";

import { addToCart, openCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import { useState, useEffect } from "react";
import { RenderedProduct } from "@/types";
import Image from "next/image";

const ProductItem = ({
  id,
  name,
  category,
  bestseller,
  featured,
  price,
  image,
}: RenderedProduct) => {
  const [isItemInCart, setIsItemInCart] = useState<boolean>(false);
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const existedProduct = cartProducts.find((product) => product.id === id);
  const dispatch = useAppDispatch();

  const stringCopyOfExistedProduct = JSON.stringify(existedProduct);

  useEffect(() => {
    if (existedProduct) setIsItemInCart(true);
    else setIsItemInCart(false);
  }, [stringCopyOfExistedProduct]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, category, image, price }));
    setIsItemInCart(true);
    dispatch(openCart());
  };

  return (
    <article>
      <div className="relative h-96 group mb-2">
        {bestseller && (
          <div className="absolute top-0 left-0 bg-white text-black text-xl font-normal leading-normal pl-5 py-2 pr-2 w-fit">
            Best Seller
          </div>
        )}
        {featured && (
          <div className="absolute top-0 left-0 z-10 bg-white text-black text-xl font-normal leading-normal pl-5 py-2 pr-2 w-fit">
            Featured
          </div>
        )}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          blurDataURL={image.src}
          sizes="(max-width: 1023px) 98%, (min-width: 1024px) 100%"
          className="object-cover object-center mx-auto -z-10"
        />
        <button
          onClick={handleAddToCart}
          disabled={isItemInCart}
          className="absolute bottom-0 left-0 w-full py-2.5 px-8  bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-60 disabled:group-hover:opacity-60 disabled:cursor-not-allowed"
        >
          ADD TO CART
        </button>
      </div>
      <h4 className="text-[22px] font-bold text-[#656565] capitalize mb-2">
        {category}
      </h4>
      <h3 className="text-3xl leading-normal text-black font-bold mb-2">
        {name}
      </h3>
      <p className="text-3xl leading-normal text-[#656565] font-normal">
        ${price.toFixed(2)}
      </p>
    </article>
  );
};

export default ProductItem;
