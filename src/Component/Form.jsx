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
import loginphoto from "../Photos/Gymtracer2.jpg";
import { useState } from "react";

const Demo = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <div>
      <div class="shadow-2xl flex flex-row w-3/4 h-2/4 mt-20 ml-44  bg-gray-100 ">
        <div class="md:w-5/12 ml-10">
          <h1 class="font-bold text-4xl mt-12  ">Wellcome Back!</h1>

          <p class="mt-5 text-s">Please enter log in details below</p>
          <form onSubmit={form.onSubmit(console.log)} class="mt-5">
            <TextInput
              mt="xl"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              mt="md"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              placeholder="password"
            />
            <div class="flex flex-row justify-between mt-3">
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                defaultChecked
                label="Remember me"
              />
              <p className="font-semibold text-sm">Forgot password?</p>
            </div>
            <Button type="submit" mt="xl">
              Sign in
            </Button>
            <div>
              <FcGoogle />
              <p>Login in with Google</p>
            </div>
            <p class="flex justify-center mt-5">
              Don't have an account?{" "}
              <span class="font-semibold "> Sign Up</span>
            </p>
          </form>
        </div>
        <div class=" ml-14">
          <img
            src={loginphoto}
            alt="Login image"
            class="object-cover h-48 md:h-auto md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
