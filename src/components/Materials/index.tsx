import Filter from "./Filter";
import PaginationActions from "./PaginationActions";
import ProductsList from "./ProductsList";
import Sort from "./Sort";

export default function Materials() {
  return (
    <section className="container max-w-7xl">
      <header className="flex justify-between items-center mb-16">
        <h2 className="text-3xl text-[#9B9B9B] font-normal leading-normal">
          <strong className="text-3xl text-black leading-normal font-bold">
            Materials /{" "}
          </strong>
          Premium Photos
        </h2>
        <Sort />
      </header>
      <div className="flex justify-between gap-x-5 mb-10">
        <Filter />
        <ProductsList />
      </div>
      <PaginationActions />
    </section>
  );
}
