import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import serverApi from "../utils/serverApi";
import toast from "react-hot-toast";
import { setUser } from "../store/userSlice";

const AccountInfo = () => {
  const userData = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("pw_token");
    await localStorage.removeItem("pw_token");
    await serverApi
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        email: userData.email,
        token: token,
      })
      .then((response) => {
        localStorage.setItem("pw_token", response.data.token);
        dispatch(
          setUser({
            name: "",
            email: "",
            isAdmin: false,
          })
        );
      })
      .then(() => toast.success("Logout successful."))
      .then(() => router.replace("/"))
      .catch((err) => toast.error("Unable to Logout. Please try again."));
  };

  return (
    <div className="w-[160px] md:w-[200px] p-[16px] rounded-lg bg-background">
      {userData.email && (
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <p className="text-dark font-semibold">Hello {userData.name}</p>
          <button className="w-[100%] py-[6px] border-2 border-primary hover:border-dark bg-primary text-dark font-semibold cursor-pointer rounded transition">
            My Orders
          </button>
          {userData.isAdmin && (
            <button
              onClick={() => router.push("/admin/products")}
              className="w-[100%] py-[6px] border-2 border-dark bg-dark hover:bg-primary text-light hover:text-dark font-semibold cursor-pointer rounded transition"
            >
              Products
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-[100%] py-[6px] border-2 border-dark bg-light hover:bg-dark text-dark hover:text-light font-semibold cursor-pointer rounded transition"
          >
            Logout
          </button>
        </div>
      )}
      {!userData.email && (
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <p className="text-dark font-semibold">Hello!</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-[100%] py-[6px] border-2 border-dark bg-dark hover:bg-primary text-light hover:text-dark font-semibold cursor-pointer rounded transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="w-[100%] py-[6px] border-2 border-dark bg-light hover:bg-primary text-dark font-semibold cursor-pointer rounded transition"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
