import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-[56px] bg-dark w-[100%] text-light flex flex-row items-center justify-between px-[30px]">
      <Link href={"/"}>
        <img src="/assets/logo.svg" alt="logo" />
      </Link>
      <div className="flex flex-row items-center gap-[24px]">
        <p>0 items</p>
        <Link href={"/products"}>Shop</Link>
      </div>
    </nav>
  );
};

export default Navbar;
