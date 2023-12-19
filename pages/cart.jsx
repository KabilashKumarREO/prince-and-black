import Link from "next/link";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);

  const calculateCartTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    return total;
  };

  return (
    <section className="px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center justify-center">
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
              <td>{"1"}</td>
              <td>£{item.price}.00</td>
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
