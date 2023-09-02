"use client";

import ProductItem from "./ProductItem";
import { useAppSelector } from "@/redux/typed-hooks";

const productsPerDesktop = 6;
const productsPerMobile = 4;

export default function ProductsList() {
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const currentPage = useAppSelector((state) => state.paginate.currentPage);

  const lastProductDesktopIdx = currentPage * productsPerDesktop;
  const firstProductDesktopIdx = lastProductDesktopIdx - productsPerDesktop;
  const renderedProductsForDesktop = allProducts.slice(
    firstProductDesktopIdx,
    lastProductDesktopIdx
  );

  const lastProductMobIdx = currentPage * productsPerMobile;
  const firstProductMobIdx = lastProductMobIdx - productsPerMobile;
  const renderedProductsForMobile = allProducts.slice(
    firstProductMobIdx,
    lastProductMobIdx
  );

  return (
    <>
      <section className="hidden lg:flex-grow lg:grid lg:grid-cols-3 lg:gap-10">
        {renderedProductsForDesktop.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </section>
      <section className="flex-grow grid gap-y-10 lg:hidden">
        {renderedProductsForMobile.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </section>
    </>
  );
}
