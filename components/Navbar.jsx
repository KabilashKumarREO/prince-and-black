import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart } from "../store/addToCartSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const dispatch = useDispatch();
  console.log(cartItems);

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
    <nav className="h-[56px] bg-dark w-[100%] text-light flex flex-row items-center justify-between px-[30px]">
      <Link href={"/"}>
        <img src="/assets/logo.svg" alt="logo" className="cursor-pointer" />
      </Link>
      <div className="flex flex-row items-center gap-[24px]">
        {cartItems && (
          <div className="cursor-pointer">
            <Link href={"/cart"}>
              <p>Cart: {cartItems.length} items</p>
            </Link>
          </div>
        )}
        <div className="cursor-pointer">
          <Link href={"/products"}>Shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
