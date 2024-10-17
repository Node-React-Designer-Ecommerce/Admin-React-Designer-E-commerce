import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "../icons/ErrorIcon";
import Eye from "../icons/Eye";
import EyeSlash from "../icons/EyeSlash";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://react-node-designer.glitch.me/api/v1/users/login",
        data
      );
      if (res.data.data.role === "admin") {
        toast.success("Logged In Successfully");
        login(res.data.data.token, res.data.data.role);
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("No, you are a user");
        setError("email", {
          type: "manual",
          message: "No, you are a user",
        });
        setError("password", {
          type: "manual",
          message: "No, you are a user",
        });
      }
    } catch (error) {
      toast.error(` ${error}`);
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-xl mt-20 mx-auto rounded-3xl p-5 h-full shadow-xl ">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:order-2 p-5 rounded-3xl h-[420px] flex flex-col justify-evenly"
      >
        <div>
          <h1 className="text-center  text-3xl pb-6 text-mintColor font-bold">
            Admin Log In
          </h1>
        </div>

        <div className="">
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-mintColor"
            >
              Email address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border-b ${errors.email ? "border-b-red-500" : "border-b-gray-300"
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-mintColor`}
                placeholder="Email"
              />
              {errors.email && <ErrorIcon />}
            </div>
            {errors.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">Invalid email address</span>
            )}
            {errors.email?.type === "manual" && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-mintColor"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 30,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                className={`mt-1 block w-full px-3 py-2 border-b ${errors.password ? "border-b-red-500" : "border-b-gray-300"
                  } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-mintColor`}
                placeholder="Password"
              />
              {showPassword ? (
                <EyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
              {errors.password && <ErrorIcon />}
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be at least 8 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">
                Password must be at most 30 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must contain at least one uppercase letter, one
                lowercase letter, and one number
              </span>
            )}
            {errors.password?.type === "manual" && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* is loading button */}
          <button
            type="submit"
            className="w-full mt-10 flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-bold text-white bg-mintColor hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mintColor"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Login"
            )}
          </button>

        </div>
      </form>
    </div>
  );
}