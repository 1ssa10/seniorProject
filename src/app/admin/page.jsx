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

  useEffect(() => {
    async function fetchActs() {
      const response = await fetch("http://localhost:3000/api/Allactors");
      const data = await response.json();
      setActors(data);
    }
    fetchActs();
  }, []);

  console.log(selectedActors);
  console.log(director);

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
    if (!file) return console.log("no file");

    try {
      const data = new FormData();
      console.log(data);
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      handleAddFilm();
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      // setprofilePic(`/images/${file.name}`);
      // setSave(false);
    } catch (e) {
      //Handle errors here
      console.error(e);
    }
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
          </label>
          <label className="block mb-3">
            Select Director:
            <SelectDirecBar setdirector={setDirector} />
          </label>
          <div className="grid grid-cols-2">
            <div>
              cant find actor :
              <button
                onClick={(e) => showAddActor(e)}
                className="bg-red-500 text-white py-2 ml-32 h-fit px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300"
              >
                Add Actor
              </button>
              {showact && <AddActor />}
            </div>
            <div>
              cant find director:
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
            <div className="w-fit border">
              <label className="block mb-3">
                Title:
                <br />
                <input
                  type="text"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                Description:
                <br />
                <textarea
                  type="text"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                language
                <br />
                <input
                  type="text"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                Age Restriction :
                <br />
                <input
                  type="number"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={ageRestriction}
                  onChange={(e) => setAgeRestriction(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                duration in mins :
                <br />
                <input
                  type="number"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                Trialer :
                <br />
                <input
                  type="text"
                  className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500 text-black"
                  value={trailer}
                  onChange={(e) => setTrailer(e.target.value)}
                />
              </label>
              <label className="block mb-3">
                Image URL:
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded focus:outline-none focus:ring ring-red-700 focus:border-red-500 text-black"
                  value={file?.name}
                  readOnly
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              <SelectCategories setcategories={setcategories} />
              {/* Other form fields */}
              {/* ... */}

              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300"
                onClick={(e) => onSubmit(e)}
              >
                Add Film
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
