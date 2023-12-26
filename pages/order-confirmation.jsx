import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderConfirmationPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const [checkoutData, setCheckoutData] = useState({});

  useEffect(() => {
    let localCheckoutData;
    let localCheckoutDataStr = localStorage.getItem("checkoutData");
    if (localCheckoutDataStr) {
      localCheckoutData = JSON.parse(localCheckoutDataStr);
      setCheckoutData(localCheckoutData);
      // dispatch(createCheckout(localCheckoutData));
    }
  }, []);

  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total;
  };

  return (
    <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div class="flex justify-start item-start space-y-2 flex-col">
        <h1 class="text-center text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Your Order #13432 is confirmed!
        </h1>
      </div>
      <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Shipping address
          </h3>
          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div class="flex flex-col justify-start items-start flex-shrink-0">
              <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  className="w-[70px]"
                  src={"/assets/avatar.png"}
                  alt="avatar"
                />
                <div class="flex justify-start items-start flex-col space-y-2">
                  <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {checkoutData.firstName} {checkoutData.lastName}
                  </p>
                  <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    {checkoutData.email}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-between xl:h-full items-stretch w-full flex-col py-8 mt-[10px]">
              <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
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
        <section className="px-[16px] md:px-[60px] my-[60px] flex flex-col items-center justify-center">
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
