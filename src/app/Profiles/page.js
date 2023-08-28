"use client";
import axios from "axios";
import React, { useState } from "react";

function Profile() {
  const [file, setfile] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="text-center mb-4">
        {/* <img
          src={}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-white"
        /> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setfile(e.target.files?.[0]);
          }}
          className="mt-2"
        />
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>
          enter
        </button>
        <h1 className="text-2xl mt-4">Your Name</h1>
        <p className="text-gray-600">Frontend Developer</p>
      </div>
      <div className="">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            vehicula ex id elit commodo, vel blandit est euismod.
          </p>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">Email: example@example.com</p>
          <p className="text-gray-700">Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
