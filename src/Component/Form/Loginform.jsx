import React from "react";
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

const Loginform = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignUpClick = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className=" w-3/5 h-3/4  flex flex-row justify-start gap-2 shadow-2xl ">
          <div className="w-full flex flex-col p-10  bg-gray-100">
            <h1 className="font-bold text-2xl font-lexend">Wellcome Back!</h1>
            <p className="mt-3 mb-3 text-gray-500 text-sm font-lexend font-semibold">
              Please enter log in details below
            </p>

            <form onSubmit={form.onSubmit(console.log)}>
              <div className="w-full">
                <div className="flex flex-col gap-3 mt-5 mb-5">
                  <TextInput
                    label="Email"
                    size="md"
                    placeholder=" Enter email"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    label="Password"
                    size="md"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    placeholder="Enter password"
                  />
                </div>

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
              class="object-cover h-48 md:h-auto md:w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginform;
