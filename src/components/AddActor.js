import React, { useState } from "react";
import axios from "axios";

function AddActor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState();
  const [file, setfile] = useState();
  const [errors, setErrors] = useState({});

  async function handleAddActor() {
    const res = await fetch("http://localhost:3000/api/AddActor", {
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
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setfile(selectedFile);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = await validation();

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      // Your logic for form submission here
      handleAddActor();
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

      alert("actor added created");
    } else {
      // Form validation failed, update the errors state
    }
  };

  const validation = async () => {
    const errors = {};

    const namevalidation = /^[A-Za-z][a-z]{1,}$/;
    const digitValidation = /^\d{2}$/;

    if (!firstName) {
      errors.f_name = "required";
    } else if (!namevalidation.test(firstName)) {
      errors.f_name = " please enter a valid first name";
    }

    if (!lastName) {
      errors.l_name = "required";
    } else if (!namevalidation.test(lastName)) {
      errors.l_name = " please enter a valid last name";
    } else {
      const checkExistusername = async () => {
        const res = await fetch("http://localhost:3000/api/checkactor", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
          }),
        });
        const data = await res.json();
        if (data !== null) {
          errors.actorexist = "Actor already Exist";
        }
      };
      await checkExistusername();
    }

    if (!dob) {
      errors.dob = "required";
    }
    if (!nationality) {
      errors.nationality = "required";
    } else if (!namevalidation.test(nationality)) {
      errors.nationality = " please enter a valid  nationality";
    }
    if (!age) {
      errors.age = "required";
    } else if (!digitValidation.test(age)) {
      errors.age = " please enter a valid age";
    }
    if (!file) {
      errors.image = "required";
    }

    return errors;
  };
  return (
    // <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="bg-gray-800 p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4">Add Actor</h2>
      {/* <form> */}
      <label className="block mb-3">
        First Name:
        <input
          type="text"
          className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
            errors.f_name ? " border-red-700 border-4" : "border-gray-300"
          }`}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.f_name && <p className="text-red-600">!{errors.f_name}</p>}
      </label>
      <label className="block mb-3">
        Last Name:
        <input
          type="text"
          className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
            errors.l_name ? " border-red-700 border-4" : "border-gray-300"
          }`}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.l_name && <p className="text-red-600">!{errors.l_name}</p>}
      </label>
      <label className="block mb-3">
        Age:
        <input
          type="number"
          className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
            errors.age ? " border-red-700 border-4" : "border-gray-300"
          }`}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age && <p className="text-red-600">!{errors.age}</p>}
      </label>
      <label className="block mb-3">
        Nationality
        <input
          type="text"
          className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
            errors.nationality ? " border-red-700 border-4" : "border-gray-300"
          }`}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        {errors.nationality && (
          <p className="text-red-600">!{errors.nationality}</p>
        )}
      </label>
      <label className="block mb-3">
        Date of Birth
        <input
          type="date"
          id="dob"
          value={dob}
          className={`text-black ${
            errors.dob ? " border-red-700 border-4" : "border-gray-300"
          }`}
          onChange={(e) => setDob(e.target.value)}
        />
        {errors.dob && <p className="text-red-600">!{errors.dob}</p>}
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
          type="text"
          className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
            errors.image ? " border-red-700 border-4" : "border-gray-300"
          }`}
          value={file?.name}
          readOnly
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && <p className="text-red-600">!{errors.image}</p>}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
      {errors.actorexist && (
        <p className="text-red-600">!{errors.actorexist}</p>
      )}

      <button
        type="button"
        className="bg-red-500  text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none  focus:border-red-300"
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        Add Actor
      </button>
      {/* </form> */}
    </div>
    // </div>
  );
}

export default AddActor;
