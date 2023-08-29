"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Drawer from "./Drawer";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useEffect } from "react";

function Navbar() {
  const session = useSession();
  const user = session.data?.user;
  const [logger, setlogger] = useState({});

  useEffect(() => {
    async function fetchUserProfile() {
      const res = await fetch("http://localhost:3000/api/UserProfile", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data?.user.email,
        }),
      });

      const data = await res.json();
      setlogger(data);
    }
    fetchUserProfile();
  });
  const signOutHandler = () => {
    redirect("/");
    signOut();
  };
  return (
    <nav className="bg-black sticky z-20 w-full  top-0 left-0 border-b border-red-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img
            src="/paybutton-removebg-preview.png"
            className="h-8 mr-3"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-700">
            RATEROO
          </span>
        </div>
        <div className="flex md:order-2">
          {user == null ? (
            <>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                onClick={() => signIn()}
              >
                Sign In
              </button>
              <ProfileImage className=" mx-5" />
            </>
          ) : (
            <>
              <Link href="/">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </Link>

              <ProfileImage src={logger.image} className=" mx-5" />
            </>
          )}
        </div>
        <div
          className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium   md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className=" ">
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:hover:text-red-700 md:p-0 "
                aria-current="page"
              >
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link
                href="/Actors"
                className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0"
              >
                <GroupsIcon />
              </Link>
            </li>
            <li>
              <Link
                href="/Profiles"
                className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0"
              >
                <AccountCircleIcon />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0"
              >
                <SettingsIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
