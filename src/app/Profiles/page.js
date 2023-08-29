"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { set } from "lodash";

function Profile() {
  const session = useSession();
  const [file, setfile] = useState();
  const [profilePic, setprofilePic] = useState("");
  const [user, setUser] = useState({});

  async function updateProfile(file) {
    console.log("Updating profile...");
    const res = await fetch("http://localhost:3000/api/UpdateProfile", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.data.user.email,
        image: file.name,
      }),
    });

    console.log("Profile updated successfully!");
    const updatedUser = {
      ...session.data.user,
      image: "/images/" + file.name, // New image path
    };
    console.log("Updating session with updated user data...");
    await session.update({
      session: session,
      data: {
        user: updatedUser,
      },
    });
    console.log("Session updated successfully!");
    console.log(session);
  }

  useEffect(() => {
    async function fetchUserProfile() {
      const res = await fetch("http://localhost:3000/api/UserProfile", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      });

      const data = await res.json();
      setUser(data);
      setprofilePic(data.image);
    }
    fetchUserProfile();
  }, []);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
      console.log(selectedFile);
      setprofilePic(URL.createObjectURL(selectedFile));
    }
  };

  console.log(user.image);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    console.log(file);
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      // setprofilePic(`/images/${file.name}`);
      console.log(file.name);
      updateProfile(file);
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
  };

  console.log(profilePic);

  if (session.status !== "authenticated") redirect("/");

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md h-screen">
      <div className="text-center mb-4">
        <img
          src={profilePic}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-white"
        />
        <br />
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 hidden"
          />
          Edit
        </label>
        <br />
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>
          save
        </button>
        <h1 className="text-2xl mt-4">{user.name}</h1>
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
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
