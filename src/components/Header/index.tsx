import Cart from "./Cart";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white container max-w-7xl py-8 border-b-4 border-b-[#e4e4e4] mb-8">
      <h1 className="font-bold text-3xl leading-normal text-black">LOGO</h1>
      <Cart />
    </header>
  );
}
