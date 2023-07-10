"use client";
import Filmposter from "@/components/Filmposter";
import Link from "next/link";
import React from "react";
import { useState } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
import DatePicker from "react-datepicker";
// import { Datepicker } from "flowbite";

function page() {
  const [value, setValue] = useState(new Date());
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    // <div className=" flex items-center justify-center h-screen">
    //   <div className=" bg-black relative overflow-hidden">
    //     <div className=" absolute backdrop-blur-sm bg-transparent h-full w-full overflow-hidden z-10">
    //       {/* <div className="flex justify-center items-center h-full">123123</div> */}
    //     </div>
    //     <div className="rotate-45 overflow-hidden">
    //       <Filmposter />
    //     </div>
    //   </div>

    // <div className=" absolute z-10 w-1/2">
    <section className="  bg-transparent dark:bg-gray-900 ">
      <div className=" flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:pt-7">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-red-700"
        >
          <img
            src="/paybutton-removebg-preview.png"
            className="h-8 mr-3"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-700">
            RATEROO
          </span>
        </Link>
        <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-700 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className=" grid-cols-2 flex">
                <div>
                  <label
                    htmlFor="f_Name"
                    className="block mb-2 text-sm font-medium text-red-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="f_Name"
                    id="f_Name"
                    className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter your FirstName"
                    required=""
                  />
                </div>
                &nbsp; &nbsp;
                <div>
                  <label
                    htmlFor="l_Name"
                    className="block mb-2 text-sm font-medium text-red-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="l_Name"
                    id="l_Name"
                    className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your LastName"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  userName
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter your userName"
                  className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="xxx"
                  className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="xxx"
                  className="bg-gray-700 placeholder:text-gray-900 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>

              <div className="w-full flex flex-col items-center justify-center mt-4">
                <label htmlFor="dob" className="text-xl font-bold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="bg-gray-700 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-700 placeholder:text-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-700 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-red-600 hover:underline dark:text-primary-700"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="api/auth/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-700"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    //   </div>
    // </div>
  );
}

export default page;
