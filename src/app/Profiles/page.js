"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Profile() {
  const session = useSession();
  const [file, setfile] = useState();
  const [profilePic, setprofilePic] = useState("");
  const [user, setUser] = useState({});
  // const [editBio, setEditBio] = useState(false);
  // const [editedbio, setEditedBio] = useState("");
  const [showSave, setSave] = useState(false);

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
      setSave(true);
      setprofilePic(URL.createObjectURL(selectedFile));
    } else {
      setSave(false);
    }
  };

  const onSubmit = async (e) => {
    setSave(false);
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
      session.data.user.image = "/images/" + file.name;
      console.log(session);
      updateProfile(file);
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
  };

  if (session.status !== "authenticated") redirect("/");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-1/2 flex justify-center items-center p-4 rounded-lg">
        <div className="flex flex-col items-center bg-gray-900 border border-gray-900 rounded-lg shadow md:flex-row md:max-w-xl  w-full">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={profilePic}
            alt="Profile Avatar"
            width={280}
            height={420}
          />
          <div className="flex flex-col justify-center items-center p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
              {user.name}
            </h5>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>

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
            <>
              <button
                className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full mt-3"
                type="submit"
                onClick={onSubmit}
              >
                save
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
