"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { set } from "lodash";

function Profile() {
  const session = useSession();
  const [file, setfile] = useState();
  const [profilePic, setprofilePic] = useState("");
  const [user, setUser] = useState({});
  // const [editBio, setEditBio] = useState(false);
  // const [editedbio, setEditedBio] = useState("");
  const [showSave, setSave] = useState(true);

  const handlerDoubleClick = () => {
    setEditBio(!editBio);
  };

  async function updateProfile(file) {
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

    const updatedUser = {
      ...session.data.user,
      image: "/images/" + file.name, // New image path
    };

    await session.update({
      session: session,
      data: {
        user: updatedUser,
      },
    });
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
      // setEditedBio(data.bio);
    }
    fetchUserProfile();
  }, []);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
      // setSave(true);
      setprofilePic(URL.createObjectURL(selectedFile));
    }
  };

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
      // setprofilePic(`/images/${file.name}`);
      // setSave(false);
      updateProfile(file);
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
  };

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
        <label className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full mt-3 ">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 hidden"
          />
          Edit
        </label>
        <br />
        {showSave ? (
          <button
            className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full mt-3"
            type="submit"
            onClick={onSubmit}
          >
            save
          </button>
        ) : null}

        <h1 className="text-2xl mt-4">{user.name}</h1>
        <p className="text-gray-600">RATEROO MEMBER</p>
      </div>
      <div className="">
        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          {editBio ? (
            <div className="w-96">
              <input
                type="text"
                className="bg-gray-900 text-white w-96 border border-red-700"
                value={editedbio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <br />
              <div className=" flex justify-center items-center">
                <button
                  className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full  mt-3 "
                  onClick={handlerDoubleClick}
                >
                  Cancel
                </button>
                <button className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full mt-3 ">
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700" onDoubleClick={handlerDoubleClick}>
              {user.bio ? user.bio : "N/A"}
            </p>
          )}
        </div> */}
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
