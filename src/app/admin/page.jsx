"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Actors from "@/components/Actors";
import Image from "next/image";
import { CheckBox } from "@mui/icons-material";
import AddActor from "@/components/AddActor";
import Actbar from "@/components/Actbar";
import SelectAct from "@/components/SelectAct";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [selectedActors, setSelectedActors] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function fetchActs() {
      const response = await fetch("http://localhost:3000/api/Allactors");
      const data = await response.json();
      setActors(data);
    }
    fetchActs();
  }, []);

  console.log(selectedActors);
  return (
    <div className="bg-gray-900  flex  items-center justify-center">
      <AddActor />
      <div className="bg-gray-800 p-8 rounded  shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Film</h2>
        <form>
          <label className="block mb-3">
            Title:
            <input
              type="text"
              className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mb-3">
            Description:
            <br />
            <textarea
              type="text"
              className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="block mb-3">
            language
            <input
              type="text"
              className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </label>
          <label className="block mb-3">
            Age Restriction :
            <input
              type="text"
              className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring ring-red-500 focus:border-red-500"
              value={ageRestriction}
              onChange={(e) => setAgeRestriction(e.target.value)}
            />
          </label>
          {/* Other form fields */}
          {/* ... */}
          <label className="block mb-3">
            Select Actors:
            <SelectAct setSelected={setSelectedActors} />
          </label>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring ring-red-500 focus:border-red-300"
          >
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
