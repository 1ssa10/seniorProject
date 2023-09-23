"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Actors from "@/components/Actors";
import Image from "next/image";
import { CheckBox } from "@mui/icons-material";
import AddActor from "@/components/AddActor";
import Actbar from "@/components/Actbar";
import SelectAct from "@/components/SelectAct";
import AddDirector from "@/components/AddDirector";
import SelectDirecBar from "@/components/SelectDirecBar";
import SelectCategories from "@/components/SelectCategories";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState();
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState();
  const [image, setImage] = useState("");
  const [selectedActors, setSelectedActors] = useState([]);
  const [actors, setActors] = useState([]);
  const [showact, setShowAct] = useState(false);
  const [showdir, setShowDir] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [director, setDirector] = useState({});
  const [file, setfile] = useState();
  const [Categories, setcategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchActs() {
      const response = await fetch("http://localhost:3000/api/Allactors");
      const data = await response.json();
      setActors(data);
    }
    fetchActs();
  }, []);

  const showAddActor = (e) => {
    e.preventDefault();
    setShowAct(!showact);
  };
  const showAddDirector = (e) => {
    e.preventDefault();
    setShowDir(!showdir);
  };

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
      handleAddFilm();
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
        alert("Film added ");
      } catch (e) {
        //Handle errors here
        console.error(e);
      }

      alert("Film added");
    } else {
      // Form validation failed, update the errors state
      console.log(errors);
    }
  };
  const validation = async () => {
    const errors = {};

    const namevalidation = /^[A-Za-z][a-z]{1,}$/;
    const digitValidation = /^\d{2,3}$/;

    if (!title) {
      errors.title = "required";
    } else {
      const checkExistusername = async () => {
        const res = await fetch("http://localhost:3000/api/checkFilm", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
        });
        const data = await res.json();
        if (data !== null) {
          errors.Filmexist = "Film already Exist";
        }
      };
      await checkExistusername();
    }

    if (!description) {
      errors.description = "required";
    }
    if (!language) {
      errors.language = "required";
    } else if (!namevalidation.test(language)) {
      errors.language = " please enter a valid  language";
    }

    if (!ageRestriction) {
      errors.ageRestriction = "required";
    }
    if (!trailer) {
      errors.trailer = "required";
    }
    if (!duration) {
      errors.duration = "required";
    } else if (!digitValidation.test(duration)) {
      errors.duration = " please enter a valid  time duration";
    }
    if (selectedActors.length < 6) {
      errors.Actors = "Please Select and Save at Least 6 Actors";
    }
    if (Categories.length < 6) {
      errors.cat = "Please Select ";
    }
    if (Object.keys(director).length === 0) {
      errors.director = "Please Select and Save Director";
    }
    if (!file) {
      errors.image = "required";
    }

    return errors;
  };

  async function handleAddFilm() {
    const res = await fetch("http://localhost:3000/api/AddFilm", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        ageRestriction: ageRestriction,
        language: language,
        duration: duration,
        trailer: trailer,
        Actors: selectedActors,
        director: director,
        image: file.name,
        Categories: Categories,
      }),
    });
    console.log("adding");
  }
  return (
    <div className="bg-gray-900  flex  items-center justify-center">
      {/* <AddActor /> */}
      <div className="bg-gray-800 p-8 rounded  shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Film</h2>
        <form>
          <label className="block mb-3">
            Select Actors:
            <SelectAct setSelected={setSelectedActors} />
            {errors.Actors && (
              <p className="text-red-600 text-center">!{errors.Actors}</p>
            )}
          </label>
          <label className="block mb-3">
            Select Director:
            <SelectDirecBar setdirector={setDirector} />
            {errors.director && (
              <p className="text-red-600 text-center">!{errors.director}</p>
            )}
          </label>
          <div className="grid grid-cols-2">
            <div>
              <button
                onClick={(e) => showAddActor(e)}
                className="bg-red-500 text-white py-2 ml-32 h-fit px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300 "
              >
                Add Actor
              </button>
              {showact && <AddActor />}
            </div>
            <div>
              <button
                onClick={(e) => showAddDirector(e)}
                className="bg-red-500 text-white py-2 ml-32 h-fit px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300"
              >
                Add director
              </button>
              {showdir && <AddDirector />}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-fit  grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-3">
                  Title:
                  <br />
                  <input
                    type="text"
                    className={`w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.title
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }
                     ${
                       errors.Filmexist
                         ? " border-red-700 border-4"
                         : "border-gray-300"
                     }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-red-600">!{errors.title}</p>
                  )}
                  {errors.Filmexist && (
                    <p className="text-red-600">!{errors.Filmexist}</p>
                  )}
                </label>
              </div>
              <div className=" row-span-21">
                <label className="block mb-3">
                  Description:
                  <br />
                  <textarea
                    type="text"
                    className={`w-96 border h-20 px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.description
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-red-600">!{errors.description}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-3">
                  Language
                  <br />
                  <input
                    type="text"
                    className={`w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.language
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                  {errors.language && (
                    <p className="text-red-600">!{errors.language}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-3">
                  Age Restriction :
                  <br />
                  <input
                    type="number"
                    className={`w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.ageRestriction
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={ageRestriction}
                    onChange={(e) => setAgeRestriction(e.target.value)}
                  />
                  {errors.ageRestriction && (
                    <p className="text-red-600">!{errors.ageRestriction}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-3">
                  Duration in mins :
                  <br />
                  <input
                    type="number"
                    className={`w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.duration
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  {errors.duration && (
                    <p className="text-red-600">!{errors.duration}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-3">
                  Trailer :
                  <br />
                  <input
                    type="text"
                    className={`w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black ${
                      errors.trailer
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                  />
                  {errors.trailer && (
                    <p className="text-red-600">!{errors.trailer}</p>
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-3">
                  Image URL:
                  <input
                    type="text"
                    className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black ${
                      errors.image
                        ? " border-red-700 border-4"
                        : "border-gray-300"
                    }`}
                    value={file?.name}
                    readOnly
                    onChange={(e) => setImage(e.target.value)}
                  />
                  {errors.image && (
                    <p className="text-red-600">!{errors.image}</p>
                  )}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              </div>
              <div>
                <SelectCategories
                  setcategories={setcategories}
                  className={`${
                    errors.cat ? " border-red-700 border-4" : "border-gray-300"
                  }`}
                />
                {/* Other form fields */}
                {/* ... */}
                {errors.cat && <p className="text-red-600">!{errors.cat}</p>}
              </div>
              <div>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300"
                  onClick={(e) => onSubmit(e)}
                >
                  Add Film
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
