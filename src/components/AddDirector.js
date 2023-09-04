import React, { useState } from "react";
import axios from "axios";

function AddDirector({ setdirector }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [file, setfile] = useState();

  async function handleAddActor() {
    const res = await fetch("http://localhost:3000/api/AddDirector", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age) || null,
        nationality: nationality,
        dob: dob,
        gender,
        image: file.name,
      }),
    });
    // const data = res.json();
    // setdirector(data);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
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
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
  };
  return (
    // <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="bg-gray-800 p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4">Add Director</h2>
      <form>
        <label className="block mb-3">
          First Name:
          <input
            required
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          Last Name:
          <input
            required
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          Age:
          <input
            required
            type="number"
            className="w-full border px-2 py-1 rounded focus:outline-none  focus:ring ring-red-700 focus:border-red-500 text-black"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          Nationality
          <input
            required
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          Date of Birth
          <input
            required
            type="date"
            id="dob"
            value={dob}
            className=" text-black"
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          Gender:
          <select
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700  focus:border-red-500 text-black"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="block mb-3">
          Image URL:
          <input
            required
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black"
            value={file?.name}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <input
          required
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2"
        />

        <button
          type="button"
          className="bg-red-500  text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none  focus:border-red-300"
          onClick={(e) => {
            handleAddActor(), onSubmit(e), alert("director added");
          }}
        >
          Add Director
        </button>
      </form>
    </div>
    // </div>
  );
}

export default AddDirector;
