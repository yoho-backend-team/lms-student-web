/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <div className="flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4">
      <div className="w-1/2 h-full">
        <Card
          className="bg-[#ebeff3] w-full h-full px-4 rounded-md flex justify-center cursor-pointer"
          style={{
            boxShadow: `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
          }}
        >
          <div className="flex flex-col items-center">
            <Card
              className="bg-[#ebeff3] w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
              style={{
                boxShadow: `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
              }}
            >
              <img src={Logo} alt="logo" style={{ width: 25, height: 25 }} />
            </Card>
            <p className="text-center my-1" style={{ ...FONTS.heading_02 }}>
              Join & Connect the Fastest Growing <br /> Online Community
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full my-4">
              {/* Email */}
              <div className="w-full">
                <label style={{ ...FONTS.heading_04 }}>Email Or Username</label>
                <input
                  type="email"
                  style={{ ...FONTS.heading_06 }}
                  {...register("email", { required: "Email is required" })}
                  className="w-full mb-3 mt-2 rounded-md px-4 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none"
                />
                {errors.email && (
                  <span style={{ ...FONTS.para_03, color: COLORS.light_red }}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-2">
                <label style={{ ...FONTS.heading_04 }}>Password</label>
                <div className="relative">
                  <input
                    style={{ ...FONTS.heading_06 }}
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full mb-3 mt-2 rounded-md px-4 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none"
                  />
                  <span
                    className="absolute top-5.5 right-3 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-[#716F6F]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-[#716F6F]" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span style={{ ...FONTS.para_03, color: COLORS.light_red }}>
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="hover:underline"
                  style={{ ...FONTS.heading_06 }}
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full my-6 mt-8 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] py-2 rounded-md transition cursor-pointer`}
                style={{ ...FONTS.heading_04, color: COLORS.white }}
              >
                Sign In
              </button>
              <div className="flex items-center justify-center gap-2">
                <BsInfoCircle color={COLORS.text_desc} />
                <p style={FONTS.heading_07}>
                  Enter the mail ID & Password given by LMS
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
      <div className="w-1/2 h-full">
        <Card
          className="bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center cursor-pointer"
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
            className="w-full h-screen"
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;
