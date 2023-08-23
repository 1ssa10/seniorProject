"use client";
import React, { useState } from "react";

function Drawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen">
      <button
        className="fixed  m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
        onClick={toggleDrawer}
      >
        Open Drawer
      </button>

      <div
        className={`fixed w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "" : "-translate-x-full hidden"
        }bg-white border-r shadow-lg`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-gray-500">Menu</h5>
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
          <li>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
