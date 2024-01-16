import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import serverApi from "../../utils/serverApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (registerDetails.name.trim().length === 0) {
      return toast.error("Name cannot be empty");
    }
    if (registerDetails.email.length === 0) {
      return toast.error("Email cannot be empty");
    }
    if (registerDetails.password !== registerDetails.confirmPassword) {
      return toast.error("Password and Confirm password didn't match.");
    }
    if (registerDetails.password.length < 6) {
      return toast.error("Password needs to be minimum 8 characters.");
    }

    await serverApi
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/create`, {
        name: registerDetails.name,
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
      .then(() => toast.success("Sign up successful."))
      .then(() => router.replace("/"))
      .catch((err) => toast.error(err.response.data.error));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-light px-6 py-8 rounded-xl shadow-xl text-dark w-full">
          <h1 className="mb-8 text-3xl text-center font-bold">Sign up</h1>
          <input
            type="text"
            className="block border border-dark w-full p-3 rounded-lg mb-4"
            name="fullname"
            placeholder="Full Name"
            value={registerDetails.name}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                name: e.target.value,
              })
            }
          />
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
          <input
            type="password"
            className="block border border-dark w-full p-3 rounded-lg mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            value={registerDetails.confirmPassword}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                confirmPassword: e.target.value.trim(),
              })
            }
          />
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full text-center py-3 rounded-lg bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-primary font-semibold"
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6 flex flex-row">
          Already have an account?&nbsp;
          <Link href="/auth/login">
            <p className="font-semibold cursor-pointer">Log in</p>
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
