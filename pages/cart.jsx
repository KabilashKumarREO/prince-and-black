import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart } from "../store/addToCartSlice";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total;
  };

  const removeItem = (e, slug) => {
    const updatedCart = cartItems.filter((item) => item.slug !== slug);

    dispatch(initializeCart(updatedCart));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return toast.success("Product removed from cart");
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[100vh] px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center ">
        <h2 className="text-2xl font-bold text-center">Cart is empty</h2>
        <button
          onClick={() => router.push("/products")}
          className="mt-[24px] bg-primary px-[24px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Shop now
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-[100vh] px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center ">
      <h2 className="text-2xl font-bold text-center">Cart</h2>
      <table id="cart-table" className="w-[100%] max-w-[1050px] mt-[24px]">
        <thead>
          <tr>
            <td>Product</td>
            <td>Title</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.slug}>
              <td>
                <img src={item.image} alt={item.slug} />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>£{item.price * item.quantity}.00</td>
              <td className="w-[24px]">
                <button
                  onClick={(e) => removeItem(e, item.slug)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    dataSlot="icon"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-[100%] max-w-[1050px] mt-[24px] flex items-center justify-end">
        <h2 className="text-xl font-bold">Total: £{calculateCartTotal()}.00</h2>
      </div>
      <div className="w-[100%] max-w-[1050px] mt-[24px] flex items-center justify-end">
        <Link href={"/checkout"}>
          <button className="bg-primary px-[24px] py-[8px] rounded-full text-lg font-semibold cursor-pointer">
            Checkout
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CartPage;
