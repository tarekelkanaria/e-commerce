"use client";

import Image from "next/image";
import BasketIcon from "@/../public/icons/shopping-cart.png";
import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import { openCart } from "@/redux/features/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);

  return (
    <div className="relative">
      <Image
        src={BasketIcon}
        onClick={() => dispatch(openCart())}
        alt="Basket icon"
        width={54}
        height={54}
        className="cursor-pointer"
      />
      {cartProducts.length > 0 && (
        <span className="absolute right-0 bottom-0 bg-black text-white text-center px-2 py-0.5">
          {cartProducts.length}
        </span>
      )}
    </div>
  );
};

export default Cart;
