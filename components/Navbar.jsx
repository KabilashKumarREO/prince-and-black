import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart } from "../store/addToCartSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const dispatch = useDispatch();
  // console.log(cartItems);

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      let localCart;
      let localCartStr = localStorage.getItem("cart");
      if (!localCartStr) {
        localCart = [];
      } else {
        localCart = JSON.parse(localCartStr);
      }
      dispatch(initializeCart(localCart));
    }
  }, []);

  return (
    <nav className="sticky top-0 z-10 h-[56px] bg-dark w-[100%] text-light flex flex-row items-center justify-between px-[16px] md:px-[30px]">
      <Link href={"/"}>
        <img
          src="/assets/logo.svg"
          alt="logo"
          className="cursor-pointer h-[28px] md:h-[37px]"
        />
      </Link>
      <div className="flex flex-row items-center gap-[36px] mr-[16px]">
        {cartItems && (
          <div className="cursor-pointer">
            <Link href={"/cart"}>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <p className="absolute top-[-8px] right-[-12px] bg-primary text-dark font-semibold md:font-bold px-[6px] py-[0px] rounded-full">
                  {cartItems.length}
                </p>
              </div>
            </Link>
          </div>
        )}
        <div className="hidden md:block cursor-pointer">
          <Link href={"/products"}>Shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
