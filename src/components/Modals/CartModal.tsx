"use client";

import { useAppDispatch, useAppSelector } from "@/redux/typed-hooks";
import { useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";
import CloseIcon from "@/../public/icons/close.svg";
import { clearCart, closeCart } from "@/redux/features/cartSlice";

const FilterModal = () => {
  const modalHasOpened = useAppSelector((state) => state.cart.isVisible);
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Modal.setAppElement("#modals");
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeCart());
  };

  return (
    <Modal
      isOpen={modalHasOpened}
      onRequestClose={() => dispatch(closeCart())}
      contentLabel="Filter modal"
      className="modal z-20"
    >
      <Image
        src={CloseIcon}
        alt="Close icon"
        width={18}
        height={18}
        onClick={() => dispatch(closeCart())}
        className="w-[18px] h-[18px] ml-auto cursor-pointer mb-2 "
      />
      {cartProducts.map((product) => (
        <article key={product.id || product.name} className="mx-auto px-2">
          <div className="flex justify-between items-center space-x-2 border-b border-b-[#c2c2c2] pb-6 mb-6">
            <div>
              <p className="text-xl leading-normal font-bold text-black">
                {product.name}
              </p>
              <p className="text-3xl leading-normal font-normal text-[#656565]">
                ${product.price}
              </p>
            </div>
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={168}
              height={92}
              placeholder="blur"
              blurDataURL={product.image.src}
              className="max-w-[168px] w-[168px] h-[92px]"
            />
          </div>
        </article>
      ))}
      <button
        onClick={handleClearCart}
        className="w-full bg-white border-4 border-black text-black text-center uppercase text-xl font-medium leading-normal tracking-wide"
      >
        Clear
      </button>
    </Modal>
  );
};

export default FilterModal;
