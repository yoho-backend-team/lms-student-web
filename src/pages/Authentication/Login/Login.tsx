import { Card } from "@/components/ui/card";
import Logo from "../../../assets/Student PNG.png";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { BsInfoCircle } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { useDispatch } from "react-redux";
import { getStudentLogin } from "@/features/Authentication/reducers/thunks";
import type { AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { StoreLocalStorage } from "@/utils/helper";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      if (data.email) {
        const response: any = await dispatch(getStudentLogin(data, {}));

        if (response?.status === "success") {
          if (response?.data?.step === "otp") {
            StoreLocalStorage("otp", response?.data?.otp);
            StoreLocalStorage("otptoken", response?.data?.token);
            StoreLocalStorage("email", response?.data?.email);
            navigate("/otp-verify", {
              state: {
                email: data?.email,
                data: response?.data,
              },
            });
            return;
          } else {
            StoreLocalStorage("token", response?.data?.token);
            StoreLocalStorage("user", response?.data?.user);
            toast.success(response?.message || "Login successful!", {
              style: { backgroundColor: "green", color: "white" },
            });
            login(response?.data?.token);
            navigate("/");
            return;
          }
        } else {
          toast.error(response?.message || "Invalid email or password", {
            style: { backgroundColor: "red", color: "white" },
          });
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row bg-[#ebeff3] w-full min-h-screen p-4 gap-4">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center ">
        <Card
          className="bg-[#ebeff3] w-full min-h-screen  px-6 rounded-md flex flex-col justify-center"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          {/* Logo Container */}
          <div className="flex justify-center mb-6">
            <div
              className="bg-[#ebeff3] w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px,
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
              }}
            >
              <img src={Logo} alt="logo" className="w-6 h-6" />
            </div>
          </div>

          {/* Heading */}
          <p
            className="text-center mb-8 text-lg md:text-xl"
            style={{ ...FONTS.heading_02 }}
          >
            Join & Connect the Fastest Growing <br /> Online Community
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            {/* Email */}
            <div className="w-full">
              <label style={{ ...FONTS.heading_04 }} className="block mb-2">
                Email Or Username
              </label>
              <input
                type="email"
                style={{ ...FONTS.heading_06 }}
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-md px-4 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none text-sm md:text-base"
              />
              {errors.email && (
                <span 
                  className="block mt-1"
                  style={{ ...FONTS.para_03, color: COLORS.light_red }}
                >
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label style={{ ...FONTS.heading_04 }} className="block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  style={{ ...FONTS.heading_06 }}
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full rounded-md px-4 py-3 pr-10 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none text-sm md:text-base"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-[#716F6F]" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-[#716F6F]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span 
                  className="block mt-1"
                  style={{ ...FONTS.para_03, color: COLORS.light_red }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="hover:underline inline-block"
                style={{ ...FONTS.heading_06 }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7B00FF] to-[#B200FF] py-3 rounded-md !text-white text-base md:text-lg font-semibold mt-2"
              style={{ ...FONTS.heading_04 }}
            >
              Sign In
            </button>

            {/* Info Message */}
            <div className="flex items-center justify-center gap-2 text-center pt-2">
              <BsInfoCircle color={COLORS.text_desc} />
              <p style={FONTS.heading_07}>
                Enter the mail ID & Password given by LMS
              </p>
            </div>
          </form>
        </Card>
      </div>

      {/* Right side - Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Card
          className="bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <DotLottieReact
            src="https://lottie.host/da5bd43c-0c42-4618-9ddf-f01f243d01ab/ZSX7ZLvOxy.lottie"
            loop
            autoplay
            className="w-full h-60 sm:h-80 md:h-96 lg:h-[500px]"
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;