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

  const cartLength = () => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return total;
  };

  return (
    <nav className="sticky top-0 z-10 h-[56px] bg-dark w-[100%] text-light flex flex-row items-center justify-between px-[16px] md:px-[30px]">
      <Link href={"/"}>
        <picture
          id="nav-logo"
          className="cursor-pointer h-[28px] md:h-[32px] w-auto flex flex-row items-center gap-[8px]"
        >
          <img
            src="/assets/pw_logo.png"
            alt="logo"
            className="h-[28px] md:h-[32px]"
          />
          <h2 className="font-bold tracking-[0.4em] text-sm md:text-base">
            PRINCE&nbsp;<span className="text-primary">&</span>&nbsp;WHITE
          </h2>
        </picture>
      </Link>
      <div
        id="nav-cart"
        className="flex flex-row items-center gap-[36px] mr-[16px]"
      >
        <Link href={"/auth/login"}>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </Link>
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
                  {cartLength()}
                </p>
              </div>
            </Link>
          </div>
        )}
        <div
          id="nav-products"
          className="hidden md:block cursor-pointer font-medium"
        >
          <Link href={"/products"}>Shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
