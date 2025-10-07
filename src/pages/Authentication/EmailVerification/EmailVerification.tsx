import { Card } from "@/components/ui/card";
import Logo from "../../../assets/icons/navbar/icons8-ionic-50.png";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordClient } from "@/features/Authentication/services";

type EmailData = {
  email: string;
};

const EmailVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: EmailData) => {
    try {
      setIsLoading(true);
      const response = await forgotPasswordClient({ email: data.email }, {});
      if (response) {
        toast.success("Verification email sent successfully!", {
          style: { backgroundColor: "green", color: "white" },
        });
        navigate("/otp-verify", {
          state: {
            email: data?.email,
            data: response?.data,
          },
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email",
        { style: { backgroundColor: "red", color: "white" } }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row bg-[#ebeff3] w-full min-h-screen p-4 gap-4">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Card
          className="bg-[#ebeff3] w-full h-full rounded-md px-4 flex justify-center items-center"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <div className="flex flex-col items-center w-full max-w-md p-4">
            {/* Logo */}
            <Card
              className="bg-[#ebeff3] w-[50px] h-[50px] rounded-full flex items-center justify-center mb-6"
              style={{
                boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px,
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
              }}
            >
              <img src={Logo} alt="logo" className="w-5 h-5" />
            </Card>

            {/* Title */}
            <h1
              className="text-2xl font-bold mb-8 text-center"
              style={{ ...FONTS.heading_02 }}
            >
              Email Verification
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{ ...FONTS.heading_04 }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p
                    className="mt-1 text-sm text-red-500"
                    style={{ ...FONTS.para_03 }}
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#7B00FF] to-[#B200FF] hover:from-[#6a00e0] hover:to-[#9a00e0]"
                }`}
                style={{ ...FONTS.heading_04, color: COLORS.white }}
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>

              <div
                className="flex items-center justify-center gap-2 mt-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => !isLoading && navigate("/login")}
              >
                <IoMdArrowRoundBack size={18} color={COLORS.blue_02} />
                <span style={{ ...FONTS.heading_06, color: COLORS.blue_02 }}>
                  Back to Login
                </span>
              </div>
            </form>
          </div>
        </Card>
      </div>

      {/* Graphic Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
        <Card
          className="bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-60 md:h-full rounded-md flex items-center justify-center"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <div className="text-center p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Secure Account Access</h2>
            <p className="text-lg opacity-90">
              We've sent a verification code to your email to ensure it's really
              you.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
