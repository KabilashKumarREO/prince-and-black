import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../store/checkoutSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import serverApi from "../utils/serverApi";
import { SERVER_URL } from "../config";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);
  const userData = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const generateToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };
  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total;
  };

  const handleCheckoutForm = (e) => {
    e.preventDefault();
    if (checkoutData.firstName === "") {
      return toast.error("Firstname is required");
    }
    if (checkoutData.email === "") {
      return toast.error("Email is required");
    }
    if (checkoutData.country === "") {
      return toast.error("Country is required");
    }
    if (checkoutData.address === "") {
      return toast.error("Street address is required");
    }
    if (checkoutData.city === "") {
      return toast.error("City is required");
    }
    if (checkoutData.state === "") {
      return toast.error("State is required");
    }
    if (checkoutData.zipcode === "") {
      return toast.error("Zipcode is required");
    }
    if (
      checkoutData.cardNumber === "" ||
      checkoutData.cardExpiry === "" ||
      checkoutData.cardCvv === ""
    ) {
      return toast.error("Card details validation error");
    }
    dispatch(
      createCheckout({
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        email: checkoutData.email,
        country: checkoutData.country,
        address: checkoutData.address,
        city: checkoutData.city,
        state: checkoutData.state,
        zipcode: checkoutData.zipcode,
        cardNumber: checkoutData.cardNumber,
        cardExpiry: checkoutData.cardExpiry,
        cardCvv: checkoutData.cardCvv,
      })
    );
    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        email: checkoutData.email,
        country: checkoutData.country,
        address: checkoutData.address,
        city: checkoutData.city,
        state: checkoutData.state,
        zipcode: checkoutData.zipcode,
        cardNumber: checkoutData.cardNumber,
        cardExpiry: checkoutData.cardExpiry,
        cardCvv: checkoutData.cardCvv,
      })
    );
    serverApi
      .post(`${SERVER_URL}/order/add`, {
        orderId: "PW-" + generateToken(),
        accountEmail: userData.email || "guest",
        cart: cartItems.map((item) => item._id),
        totalPrice: calculateCartTotal(),
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        country: checkoutData.country,
        streetAddress: checkoutData.address,
        city: checkoutData.city,
        province: checkoutData.state,
        zipcode: checkoutData.zipcode,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Order placed successfully.");
        router.replace(
          `/order-confirmation?orderId=${response.data.order.orderId}`
        );
      })
      .catch((err) => toast.error("Error"));

    // router.replace("/order-confirmation");
  };

  useEffect(() => {
    let localCheckoutData;
    let localCheckoutDataStr = localStorage.getItem("checkoutData");
    if (localCheckoutDataStr) {
      localCheckoutData = JSON.parse(localCheckoutDataStr);
      setCheckoutData(localCheckoutData);
      // dispatch(createCheckout(localCheckoutData));
    }
  }, []);

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[100vh] px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center ">
        <h2 className="text-2xl font-bold text-center">Cart is empty</h2>
        <button
          onClick={() => router.push("/products")}
          className="mt-[24px] bg-primary hover:bg-dark hover:text-light transition px-[24px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Shop now
        </button>
      </section>
    );
  }

  return (
    <form className="min-h-[100vh] px-[36px] md:px-[60px] my-[60px] items-center justify-center">
      <section className="flex flex-row items-start justify-center">
        <div className=" w-[100%] max-w-[1150px] flex flex-col md:flex-row gap-[24px]">
          <div className="w-[100%] md:w-[60%] flex">
            <div className="p-5 w-[100%]">
              <h2 className="mb-[12px] text-xl font-bold">Delivery</h2>
              <div className="space-y-12">
                <div className="pb-1">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              firstName: e.target.value,
                            })
                          }
                          value={checkoutData.firstName}
                          type="text"
                          name="first-name"
                          id="first-name"
                          placeholder="First name"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              lastName: e.target.value,
                            })
                          }
                          value={checkoutData.lastName}
                          type="text"
                          name="last-name"
                          id="last-name"
                          placeholder="Last name"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              email: e.target.value,
                            })
                          }
                          value={checkoutData.email}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="example@domain.com"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="">
                        <select
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              country: e.target.value,
                            })
                          }
                          value={checkoutData.country}
                          id="country"
                          name="country"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              address: e.target.value,
                            })
                          }
                          value={checkoutData.address}
                          type="text"
                          name="street-address"
                          id="street-address"
                          placeholder="Street address"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              city: e.target.value,
                            })
                          }
                          value={checkoutData.city}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="">
                        <input
                          required
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              state: e.target.value,
                            })
                          }
                          value={checkoutData.state}
                          type="text"
                          name="region"
                          id="region"
                          placeholder="State / Province"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="">
                        <input
                          required
                          inputmode="numeric"
                          minLength="6"
                          maxLength="7"
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              zipcode: e.target.value,
                            })
                          }
                          value={checkoutData.zipcode}
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          placeholder="SE17SJ"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] md:w-[40%] flex">
            <div className="flex flex-col w-full p-5">
              <h2 className="mb-[12px] text-xl font-bold">Delivery</h2>
              <label className="relative w-full flex flex-col mb-4 md:mb-8">
                <span className="block text-sm font-medium leading-6 text-gray-900">
                  Card number
                </span>
                <input
                  required
                  inputmode="numeric"
                  pattern="[0-9\s]{16,16}"
                  minLength="16"
                  maxLength="16"
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardNumber: e.target.value,
                    })
                  }
                  value={checkoutData.cardNumber}
                  className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300"
                  type="tel"
                  name="card_number"
                  placeholder="0000 0000 0000 0000"
                />
              </label>
              <label className="relative flex flex-col mb-4 md:mb-8">
                <span className="block text-sm font-medium leading-6 text-gray-900">
                  Expire date
                </span>
                <input
                  required
                  inputmode="numeric"
                  minLength="4"
                  maxLength="4"
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardExpiry: e.target.value,
                    })
                  }
                  value={checkoutData.cardExpiry}
                  className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300"
                  type="text"
                  name="expire_date"
                  placeholder="MM/YY"
                />
              </label>
              <label className="relative flex flex-col mb-4 md:mb-8">
                <span className="font-bold flex items-center gap-3 mb-3">
                  CVC/CVV
                </span>
                <input
                  required
                  inputmode="numeric"
                  minLength="3"
                  maxLength="3"
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardCvv: e.target.value,
                    })
                  }
                  value={checkoutData.cardCvv}
                  className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300"
                  type="password"
                  name="card_cvc"
                  placeholder="&bull;&bull;&bull;"
                />
              </label>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-row items-center justify-center gap-[20px] mt-[36px]">
        <button
          id="pay-now"
          type="submit"
          onClick={handleCheckoutForm}
          className="bg-primary hover:bg-dark hover:text-light transition px-[30px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Pay Now
        </button>
        <button
          id="cancel-checkout"
          onClick={() => router.replace("/")}
          className="bg-dark text-light px-[30px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutPage;
