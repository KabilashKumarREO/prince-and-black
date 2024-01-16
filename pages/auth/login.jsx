import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import serverApi from "../../utils/serverApi";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(""); // loading, loaded, error

  const handleRegister = async () => {
    if (registerDetails.email.length === 0) {
      return toast.error("Email cannot be empty.");
    }
    if (registerDetails.password.length < 6) {
      return toast.error("Please check password.");
    }

    setIsLoading("loading");
    await serverApi
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`, {
        email: registerDetails.email,
        password: registerDetails.password,
      })
      .then((response) => {
        localStorage.setItem("pw_token", response.data.token);
        dispatch(
          setUser({
            name: response.data.profile.name,
            email: response.data.profile.email,
            isAdmin: response.data.profile.isAdmin,
          })
        );
      })
      .then(() => {
        setIsLoading("loaded");
        toast.success("Sign in successful.");
      })
      .then(() => router.replace("/"))
      .catch((err) => {
        setIsLoading("loaded");
        toast.error("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-light px-6 py-8 rounded-xl shadow-xl text-dark w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-dark w-full p-3 rounded-lg mb-4"
            name="email"
            placeholder="Email"
            value={registerDetails.email}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                email: e.target.value.trim(),
              })
            }
          />
          <input
            type="password"
            className="block border border-dark w-full p-3 rounded-lg mb-4"
            name="password"
            placeholder="Password"
            value={registerDetails.password}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                password: e.target.value.trim(),
              })
            }
          />
          <button
            type="submit"
            onClick={handleRegister}
            disabled={isLoading === "loading"}
            className="w-full text-center py-3 rounded-lg bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-primary font-semibold"
          >
            {isLoading === "loading" ? "Logging in" : "Login"}
          </button>
        </div>

        <div className="text-grey-dark mt-6 flex flex-row">
          Don&apos;t have an account?&nbsp;
          <Link href="/auth/register">
            <p className="font-semibold cursor-pointer">Register</p>
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
