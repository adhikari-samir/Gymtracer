import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import {
  NumberInput,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
} from "@mantine/core";
import loginphoto from "../../Photos/Gymtracer2.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const Loginform = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    validationRules: {
      email: (value) => (value ? null : "Email or username is required"),
      password: (value) => (value ? null : "Password is required"),
    },
  });
  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleButtonclick = async (value) => {
    console.log("form submitted");
    console.log("form submitted with password:", value.password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/user/login",
        {
          usernameOrEmail: value.email,
          password: value.password,
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed");
        setError("Invalid username or password");
      }
    } catch (error) {
      if (error.response.status === 403) {
        console.log(error);
        console.log("Navigating");
        const userId = error.response.data.data.user.id;
        navigate(`/otp/${userId}`);
      } else {
        console.error("An error occurred during login:", error);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className=" w-3/5 h-3/4  flex flex-row justify-start gap-2 shadow-2xl ">
          <div className="w-full flex flex-col p-10  bg-gray-100">
            <h1 className="font-bold text-2xl font-lexend">Wellcome Back!</h1>
            <p className="mt-3 mb-3 text-gray-500 text-sm font-lexend font-semibold">
              Please enter log in details below
            </p>

            <form onSubmit={form.onSubmit((value) => handleButtonclick(value))}>
              <div className="w-full">
                <div className="flex flex-col gap-3 mt-5 mb-5">
                  <TextInput
                    label="Email or username"
                    size="md"
                    placeholder=" Enter email or username"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    label="Password"
                    size="md"
                    onChange={(event) => setValue(event.currentTarget.value)}
                    {...form.getInputProps("password")}
                    placeholder="Enter password"
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div class="flex flex-row justify-between mt-3 mb-3 ">
                  <Checkbox
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                    defaultChecked
                    label="Remember me"
                  />
                  <p className="font-semibold text-sm text-sky-600 cursor-pointer">
                    Forgot password?
                  </p>
                </div>
                <Button
                  type="submit"
                  variant="light"
                  className="w-full mt-2 mb-2"
                  style={{ width: "100%" }}
                  size="md"
                >
                  Sign in
                </Button>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center w-full mt-5   ">
                <div class="w-full p-3 flex justify-center items-center gap-2 border-solid border-2 border-gray-300 rounded-md">
                  <FcGoogle size={26} />
                  <label className="text-sm font-lexend font-semibold">
                    Login in with Google
                  </label>
                </div>

                <label className="text-sm font-lexend font-medium mt-3">
                  Don't have account ?{" "}
                  <span
                    className="font-semibold text-sky-600 cursor-pointer"
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </span>
                </label>
              </div>
            </form>
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
    </>
  );
};

export default Loginform;
