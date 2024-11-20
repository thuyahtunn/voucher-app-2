import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api/constant";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const nav = useNavigate();
  const handleRegisterForm = async (data) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.ok) {
      nav("/");
    } else {
      console.log("register fail");
    }
    reset();
  };
  return (
    <section className={`bg-gray-50`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          Register
        </a>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(handleRegisterForm)}
              className="space-y-2  md:space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
                {errors.name?.type === "required" && (
                  <p className=" text-xs text-red-500 mt-1">Name is Required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
                {errors.email?.type === "required" && (
                  <p className=" text-xs text-red-500 mt-1">
                    Email is Required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password?.type === "required" && (
                  <p className=" text-xs text-red-500 mt-1">
                    Password is Required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register("password_confirmation", { required: true })}
                  id="password_confirmation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
                {errors.password_confirmation?.type === "required" && (
                  <p className=" text-xs text-red-500 mt-1">
                    Password Confirmation is Required
                  </p>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 "
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline "
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full my-10 text-white bg-blue-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm  text-gray-500 ">
                Already have an account?{" "}
                <Link
                  to={"/"}
                  className="font-semibold text-gray-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
