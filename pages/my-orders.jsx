import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";

const MyOrders = () => {
  const userData = useSelector((state) => state.userState);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const clientToken = localStorage.getItem("pw_token");
    await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order/my-orders`,
      data: { email: userData.email },
      headers: {
        Authorization: clientToken,
      },
    })
      .then((res) => setOrders(res.data.orders))
      .catch((err) => setIsLoading("error"));
  };

  useEffect(() => {
    setIsLoading("loading");
    if (!userData.email) {
      return;
    }
    getOrders();
    setIsLoading("loaded");
  }, [userData]);

  return (
    <section className="min-h-[100vh] px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center gap-[24px]">
      <h2 className="text-2xl font-bold text-left">My orders</h2>
      <div className="w-[100%] max-w-[1100px] flex flex-col gap-[24px]">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
