"use client";
import Link from "next/link";
import React, { useState } from "react";

function Drawer({ cats }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  console.log(cats);
  return (
    <div className="relative">
      <button
        className="  absolute left-0 top-0 text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
        onClick={toggleDrawer}
      >
        ...
      </button>

      {isDrawerOpen ? (
        <div
          className={`fixed w-64 h-screen p-4 overflow-y-auto transition-transform ${
            isDrawerOpen ? "" : "-translate-x-full hidden"
          }  shadow-lg z-20  bg-gray-900 bg-opacity-50 backdrop-blur-md   `}
        >
          <div className="flex justify-between items-center mb-4">
            <h5
              className={`text-base font-semibold text-gray-500 ${
                isDrawerOpen ? "text-gray-500" : " hidden"
              }`}
            >
              Menu
            </h5>
            <div
              className={`text-base font-semibold ${
                isDrawerOpen ? "text-gray-500" : " hidden"
              } cursor-pointer`}
              onClick={toggleDrawer}
            >
              x
            </div>
          </div>
          <ul className="space-y-2">
            {cats?.map((cat) => (
              <li>
                {/* <Link
                  href={`#${cat.catergory}`}
                  className="block text-gray-600 hover:text-gray-800"
                  onClick={toggleDrawer}
                >
                  {cat.catergory}
                </Link> */}
                <Link
                  href={`#${cat.catergory}`}
                  className="block text-gray-600 hover:text-gray-800"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(cat.catergory);
                    if (section) {
                      const navbarHeight = 80;
                      const targetPosition = section.offsetTop - navbarHeight;

                      window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });
                    }
                    toggleDrawer();
                  }}
                >
                  {cat.catergory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Drawer;
