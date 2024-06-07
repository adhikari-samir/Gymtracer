import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import loginphoto from "../../Photos/Gymtracer2.jpg";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const Otpui = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
  });

  const handleOtpChange = (e) => {
    const { value } = e.target;
    setOtp(value);
  };

  const handleButtonclick = async () => {
    if (otp.trim().length !== 6 || isNaN(otp.trim())) {
      setError("Please enter a valid OTP.");
      return;
    }
    console.log("Sending OTP:", otp, "for user ID:", userId);
    try {
      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/user/check-otp",
        { otp, id: userId }
      );
      console.log("Response:", response); // Debug statement
      if (response.status === 200) {
        console.log("Otp verified! Please proceed to login");
        notifications.show({
          title: "Otp verified!",
          message: "Please proceed to login",
        });
        navigate("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/5 h-3/4  flex flex-row justify-start gap-2 shadow-2xl ">
        <div className="w-full flex flex-col p-10  bg-gray-100">
          <h1 className="font-bold text-2xl font-lexend">Welcome</h1>
          <p className="mt-3 mb-3 text-gray-500 text-sm font-lexend font-semibold">
            Please enter login details below
          </p>

          <form onSubmit={form.onSubmit(handleButtonclick)}>
            <div className="w-full">
              <div className="flex flex-col gap-3 mt-5 mb-5">
                <TextInput
                  label="OTP Code"
                  size="md"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <Button
                type="submit"
                variant="light"
                className="w-full mt-2 mb-2"
                size="md"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="flex flex-col gap-2 justify-center items-center w-full mt-5">
            <div className="w-full p-3 flex justify-center items-center gap-2 border-solid border-2 border-gray-300 rounded-md">
              <FcGoogle size={26} />
              <label className="text-sm font-lexend font-semibold">
                Login with Google
              </label>
            </div>

            <label className="text-sm font-lexend font-medium mt-3">
              Don't have an account?{" "}
              <span className="font-semibold text-sky-600 cursor-pointer">
                Sign Up
              </span>
            </label>
          </div>
        </div>

        <div className="w-full">
          <img
            src={loginphoto}
            alt="Login image"
            className="object-cover h-48 md:h-auto md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Otpui;
