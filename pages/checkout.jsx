import { useDispatch } from "react-redux";
import { createCheckout } from "../store/checkoutSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CheckoutPage = () => {
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

  const handleCheckoutForm = () => {
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
    router.replace("/order-confirmation");
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

  return (
    <div className="px-[36px] md:px-[60px] my-[60px] items-center justify-center">
      <section className="flex flex-row items-start justify-center">
        <div className=" w-[100%] max-w-[1150px] flex flex-col md:flex-row gap-[24px]">
          <div className="w-[100%] md:w-[60%] flex">
            <form className="p-5 w-[100%]">
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
                          autoComplete="given-name"
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
                          autoComplete="family-name"
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
                          autoComplete="email"
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
                          autoComplete="country-name"
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
                          autoComplete="street-address"
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
                          autoComplete="address-level2"
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
                          autoComplete="address-level1"
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
                          autoComplete="postal-code"
                          placeholder="SE17SJ"
                          className="rounded-md peer px-4 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="w-[100%] md:w-[40%] flex">
            <form className="flex flex-col w-full p-5">
              <h2 className="mb-[12px] text-xl font-bold">Delivery</h2>
              <label className="relative w-full flex flex-col mb-4 md:mb-8">
                <span className="block text-sm font-medium leading-6 text-gray-900">
                  Card number
                </span>
                <input
                  required
                  inputmode="numeric"
                  pattern="[0-9\s]{16,16}"
                  autocomplete="cc-number"
                  minlength={"16"}
                  maxlength="16"
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
            </form>
          </div>
        </div>
      </section>
      <div className="flex flex-row items-center justify-center gap-[20px] mt-[36px]">
        <button
          onClick={handleCheckoutForm}
          className="bg-primary px-[30px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Pay Now
        </button>
        <button
          onClick={() => router.replace("/")}
          className="bg-dark text-light px-[30px] py-[8px] rounded-full text-lg font-semibold cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
