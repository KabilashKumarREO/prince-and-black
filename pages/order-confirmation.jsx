import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { initializeCart } from "../store/addToCartSlice";

const OrderConfirmationPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const [checkoutData, setCheckoutData] = useState({});
  const [toasted, setToasted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toasted) {
      toast.success("Order placed successfully!");
      setToasted(true);
    }
    let localCheckoutData;
    let localCheckoutDataStr = localStorage.getItem("checkoutData");
    if (localCheckoutDataStr) {
      localCheckoutData = JSON.parse(localCheckoutDataStr);
      setCheckoutData(localCheckoutData);
      // dispatch(createCheckout(localCheckoutData));
    }
  }, []);
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      localStorage.removeItem("cart");
      dispatch(initializeCart([]));
    };

    // Listen to route change events
    router.events.on("routeChangeStart", handleRouteChangeStart);

    // Remove event listeners when the component is unmounted
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total;
  };

  return (
    <div className="min-h-[100vh] py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-center text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Your Order #13432 is confirmed!
        </h1>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div
          id="shipping"
          className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
        >
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Shipping address
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  className="w-[70px]"
                  src={"/assets/avatar.png"}
                  alt="avatar"
                />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {checkoutData.firstName} {checkoutData.lastName}
                  </p>
                  <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    {checkoutData.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col py-8 mt-[10px]">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {checkoutData.address}
                    <br />
                    {checkoutData.city}, {checkoutData.state},{" "}
                    {checkoutData.country} - {checkoutData.zipcode}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="px-[16px] md:px-[60px] my-[60px] flex flex-col items-center">
          <table id="cart-table" className="w-[100%] max-w-[1050px]">
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-[100%] max-w-[1050px] mt-[24px] flex items-center justify-end">
            <h2 className="text-xl font-bold">
              Total: £{calculateCartTotal()}.00
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
