"use client";

import ProductItem from "./ProductItem";
import { useAppSelector } from "@/redux/typed-hooks";

const productsPerDesktop = 6;
const productsPerMobile = 4;

export default function ProductsList() {
  const allProducts = useAppSelector(
    (state) => state.products.renderedProducts
  );
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
      {renderedProductsForDesktop.length > 0 && (
        <section className="hidden lg:flex-grow lg:grid lg:grid-cols-3 lg:gap-10">
          {renderedProductsForDesktop.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </section>
      )}
      {renderedProductsForDesktop.length === 0 && (
        <p className="hidden lg:block flex-grow text-2xl text-blue-900 font-bold text-center py-8">
          No Products Found
        </p>
      )}
      {renderedProductsForMobile.length > 0 && (
        <section className="flex-grow grid gap-y-10 lg:hidden">
          {renderedProductsForMobile.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </section>
      )}
      {renderedProductsForMobile.length === 0 && (
        <p className="lg:hidden flex-grow text-2xl text-blue-900 font-bold text-center py-8">
          No Products Found
        </p>
      )}
    </>
  );
}
