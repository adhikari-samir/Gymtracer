// import React, { useState } from "react";
// import { useForm } from "@mantine/form";
// import { FcGoogle } from "react-icons/fc";
// import { Input, Button, PasswordInput } from "@mantine/core";
// import loginphoto from "../../Photos/women.jpg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { notifications } from "@mantine/notifications";
// import "react-toastify/dist/ReactToastify.css";
// import Loading from "./Loading";

// const Register = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       username: "",
//     },
//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
//       confirmPassword: (value, values) =>
//         value !== values.password ? "Passwords did not match" : null,
//       name: (value) => (value ? null : "Name is required"),
//       username: (value) => (value ? null : "Username is required"),
//     },
//   });

//   const handleSignInClick = () => {
//     navigate("/");
//   };

//   const handleButtonclick = async (value) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://127.0.0.1:9000/api/v1/user/register-user",
//         {
//           email: value.email,
//           password: value.password,
//           name: value.name,
//           username: value.username,
//           profilePicture: "myImg",
//         }
//       );

//       if (response.status === 200) {
//         notifications.show({
//           title: "Registration Completed",
//           message: "You have successfully registered!",
//         });
//         navigate("/");
//       } else {
//         notifications.show({
//           title: "Error",
//           message: "Something went wrong. Please try again later.",
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error:", error);
//       notifications.show({
//         title: "Error",
//         message: "Something went wrong. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex justify-center items-center">
//       <div className="w-3/5 h-4/4  flex flex-row justify-start gap-2 shadow-2xl ">
//         <div className="mt-20 w-full">
//           <img src={loginphoto} alt="Login image" />
//         </div>
//         <div className="w-full flex flex-col p-10  bg-gray-100">
//           <h1 className="font-bold text-2xl font-lexend">
//             Register New Account
//           </h1>
//           <p className="mt-3 mb-3 text-gray-500 text-sm font-lexend font-semibold">
//             Already have an account? Login here
//           </p>

//           <form onSubmit={form.onSubmit((value) => handleButtonclick(value))}>
//             <div className="w-full">
//               <div className="flex flex-col gap-3 mt-5 mb-5">
//                 <div className="flex gap-1 w-ful justify-between">
//                   <Input.Wrapper label="Username" error={form.errors.username}>
//                     <Input
//                       placeholder="Enter username"
//                       {...form.getInputProps("username")}
//                     />
//                   </Input.Wrapper>

//                   <Input.Wrapper label="Name" error={form.errors.name}>
//                     <Input
//                       placeholder="Enter your name"
//                       {...form.getInputProps("name")}
//                     />
//                   </Input.Wrapper>
//                 </div>
//                 <Input.Wrapper label="Email" error={form.errors.email}>
//                   <Input
//                     placeholder="Enter email"
//                     {...form.getInputProps("email")}
//                   />
//                 </Input.Wrapper>
//                 <div className="flex flex-col gap-3 mb-1">
//                   <PasswordInput
//                     label="Password"
//                     placeholder="Password"
//                     {...form.getInputProps("password")}
//                   />

//                   <PasswordInput
//                     label="Confirm password"
//                     placeholder="Confirm password"
//                     {...form.getInputProps("confirmPassword")}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-3 mb-1">
//                   <label className="font-lexend font-semibold text-sm">
//                     Choose profile picture
//                   </label>
//                   <input
//                     type="file"
//                     id="profilePicture"
//                     className="px-1"
//                     accept="image/*"
//                     // onChange={(event) => {
//                     //   console.log(event.target.files[0]);
//                     // }}
//                   />
//                 </div>
//               </div>
//               <Button
//                 type="submit"
//                 variant="light"
//                 className="w-full mt-2 mb-2"
//                 style={{ width: "100%" }}
//                 size="md"
//               >
//                 Register
//               </Button>
//             </div>
//             <div className="flex flex-col gap-2 justify-center items-center w-full mt-5   ">
//               <div className="w-full p-3 flex justify-center items-center gap-2 border-solid border-2 border-gray-300 rounded-md">
//                 <FcGoogle size={26} />
//                 <label className="text-sm font-lexend font-semibold">
//                   Login in with Google
//                 </label>
//               </div>
//               <label className="text-sm font-lexend font-medium mt-3">
//                 Already have an account ?{" "}
//                 <span
//                   className="font-semibold text-sky-600 cursor-pointer"
//                   onClick={handleSignInClick}
//                 >
//                   Sign In
//                 </span>
//               </label>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Loading loading={loading} />
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import { Input, Button, PasswordInput } from "@mantine/core";
import loginphoto from "../../Photos/women.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      name: (value) => (value ? null : "Name is required"),
      username: (value) => (value ? null : "Username is required"),
    },
  });

  const handleSignInClick = () => {
    navigate("/");
  };

  const handleButtonclick = async (value) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("name", value.name);
      formData.append("username", value.username);
      formData.append(
        "profilePicture",
        document.getElementById("profilePicture").files[0]
      );

      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/user/register-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        notifications.show({
          title: "Registration Completed",
          message: "You have successfully registered!",
        });
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/5 h-4/4  flex flex-row justify-start gap-2 shadow-2xl ">
        <div className="mt-20 w-full">
          <img src={loginphoto} alt="Login image" />
        </div>
        <div className="w-full flex flex-col p-10  bg-gray-100">
          <h1 className="font-bold text-2xl font-lexend">
            Register New Account
          </h1>
          <p className="mt-3 mb-3 text-gray-500 text-sm font-lexend font-semibold">
            Already have an account? Login here
          </p>

          <form onSubmit={form.onSubmit((value) => handleButtonclick(value))}>
            <div className="w-full">
              <div className="flex flex-col gap-3 mt-5 mb-5">
                <div className="flex gap-1 w-ful justify-between">
                  <Input.Wrapper label="Username" error={form.errors.username}>
                    <Input
                      placeholder="Enter username"
                      {...form.getInputProps("username")}
                    />
                  </Input.Wrapper>

                  <Input.Wrapper label="Name" error={form.errors.name}>
                    <Input
                      placeholder="Enter your name"
                      {...form.getInputProps("name")}
                    />
                  </Input.Wrapper>
                </div>
                <Input.Wrapper label="Email" error={form.errors.email}>
                  <Input
                    placeholder="Enter email"
                    {...form.getInputProps("email")}
                  />
                </Input.Wrapper>
                <div className="flex flex-col gap-3 mb-1">
                  <PasswordInput
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                  />

                  <PasswordInput
                    label="Confirm password"
                    placeholder="Confirm password"
                    {...form.getInputProps("confirmPassword")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-lexend font-semibold text-sm">
                    Choose profile picture
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    className="px-1"
                    accept="image/*"
                    // onChange={(event) => {
                    //   console.log(event.target.files[0]);
                    // }}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="light"
                className="w-full mt-2 mb-2"
                style={{ width: "100%" }}
                size="md"
              >
                Register
              </Button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full mt-3   ">
              <div className="w-full p-3 flex justify-center items-center gap-2 border-solid border-2 border-gray-300 rounded-md">
                <FcGoogle size={26} />
                <label className="text-sm font-lexend font-semibold">
                  Login in with Google
                </label>
              </div>
              <label className="text-sm font-lexend font-medium mt-3">
                Already have an account ?{" "}
                <span
                  className="font-semibold text-sky-600 cursor-pointer"
                  onClick={handleSignInClick}
                >
                  Sign In
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
};

export default Register;
