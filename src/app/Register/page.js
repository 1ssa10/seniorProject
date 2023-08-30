"use client";
import Filmposter from "@/components/Filmposter";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

function page() {
  const [f_name, setfName] = useState("");
  const [l_name, setlName] = useState("");
  const [userName, setuserNAme] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [pass, setPass] = useState("");
  const [compass, setCompass] = useState("");
  const [dob, setDob] = useState("");
  const [acceptterms, setAcceptterms] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const createUser = async () => {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: f_name,
        last_name: l_name,
        username: userName,
        password: pass,
        DOB: dob,
        email: email,
        gender: gender,
      }),
    });
    if (res.ok) {
      alert("user created");
    }
  };

  const validation = async () => {
    const errors = {};

    const namevalidation = /^[A-Za-z][a-z]{1,}$/;
    const usernamevalidation = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
    if (!f_name) {
      errors.f_name = "required";
    } else if (!namevalidation.test(f_name)) {
      errors.f_name = " please enter a valid first name";
    }

    if (!l_name) {
      errors.l_name = "required";
    } else if (!namevalidation.test(l_name)) {
      errors.l_name = " please enter a valid last name";
    }

    if (!userName) {
      errors.userName = "required";
    } else if (!usernamevalidation.test(userName)) {
      errors.userName = " please enter a valid username";
    } else {
      const checkExistusername = async () => {
        const res = await fetch("http://localhost:3000/api/checkusername", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
          }),
        });
        const data = await res.json();
        if (data !== null) {
          errors.userName = "userName unavailable";
        }
      };
      await checkExistusername();
    }

    if (!email) {
      errors.email = "required";
    } else {
      const checkUserExist = async () => {
        const res = await fetch("http://localhost:3000/api/checkemail", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const data = await res.json();
        if (data !== null) {
          errors.email = "user exist";
        }
      };
      await checkUserExist();
    }

    if (!pass) {
      errors.pass = "required";
    } else if (pass.length < 8) {
      errors.pass = "Password must be at least 8 characters long";
    }

    if (!compass) {
      errors.compass = "required";
    } else if (pass !== compass) {
      errors.compass = "Passwords does not match ";
    }

    if (!dob) {
      errors.dob = "required";
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await validation();

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      // Your logic for form submission here
      createUser();
      router.push("api/auth/signin");
      alert("user created");
    } else {
      // Form validation failed, update the errors state
    }
  };

  return (
    <div className=" flex flex-col  items-center px-6 py-8 mx-auto md:h-full lg:pt-7">
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
      <div className=" w-full bg-gray-900 rounded-lg   md:mt-0 sm:max-w-xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-red-700 md:text-2xl">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
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
                  value={f_name}
                  onChange={(e) => setfName(e.target.value.trim())}
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.f_name
                      ? " border-red-700 border-4"
                      : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Enter your FirstName"
                />
                {errors.f_name && (
                  <p className="text-red-600">!{errors.f_name}</p>
                )}
              </div>

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
                  value={l_name}
                  onChange={(e) => setlName(e.target.value.trim())}
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.l_name
                      ? " border-red-700 border-4"
                      : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Enter your LastName"
                />
                {errors.l_name && (
                  <p className="text-red-600">!{errors.l_name}</p>
                )}
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
                  value={userName}
                  onChange={(e) => setuserNAme(e.target.value)}
                  placeholder="Enter your userName"
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.userName
                      ? " border-red-700 border-4"
                      : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                />
                {errors.userName && (
                  <p className="text-red-600">!{errors.userName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.dob ? " border-red-700 border-4" : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                />
                {errors.dob && <p className="text-red-600">!{errors.dob}</p>}
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-red-700"
                >
                  Your Gender
                </label>
                <select
                  id="gender"
                  className={`bg-gray-700 placeholder:text-gray-900 border $ text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="what is your gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.email
                      ? " border-red-700 border-4"
                      : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-600">!{errors.email}</p>
                )}
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
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="xxx"
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.pass ? " border-red-700 border-4" : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                />
                {errors.pass && <p className="text-red-600">!{errors.pass}</p>}
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
                  value={compass}
                  onChange={(e) => setCompass(e.target.value)}
                  placeholder="xxx"
                  className={`bg-gray-700 placeholder:text-gray-900 border ${
                    errors.compass
                      ? " border-red-700 border-4"
                      : "border-gray-300"
                  } text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                />
                {errors.compass && (
                  <p className="text-red-600">!{errors.compass}</p>
                )}
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  onChange={() => setAcceptterms(!acceptterms)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-700 placeholder:text-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
              disabled={!acceptterms ? true : false}
              type="submit"
              // onClick={() =>
              //   validation(
              //     f_name,
              //     l_name,
              //     userName,
              //     email,
              //     gender,
              //     pass,
              //     compass
              //   )
              // }
              className="w-full text-white  bg-red-600 disabled:bg-gray-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-700 dark:text-gray-400">
              Already have an account / sign in with google?{" "}
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
  );
}

export default page;
