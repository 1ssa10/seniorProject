"use client";

// import React, { useState } from "react";
// import VideoForm from "@/components/admin/Add Video/VideoForm";
// import AdminForm from "@/components/admin/Add Admin/AdminForm";
// import SidePanel from "@/components/admin/SidePanel";
// import Image from "next/image";

// function Page() {
//   const [active, setActive] = useState("videos");
//   const [menu, setMenu] = useState(false);

//   function handleSetActive(section) {
//     setActive(section);
//     setMenu(!menu);
//   }

//   function showMenu() {
//     setMenu(!menu);
//   }

//   return (
//     <div className="w-fit h-fit  bg-zinc-950 text-white ">
//       <div className=" max-[990px]:hidden">
//         <SidePanel
//           handleSetActive={handleSetActive}
//           active={active}
//           showMenu={showMenu}
//         />
//       </div>

//       <div className="w-[75vw] max-[990px]:w-screen bg-zinc-900 p-8  ">
//         <button className="mb-4 min-[990px]:hidden" onClick={showMenu}>
//           Menu
//         </button>
//         {/* {active === "videos" ? <VideoForm /> : <AdminForm />} */}
//         <VideoForm />
//       </div>
//     </div>
//   );
// }

// export default Page;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Actors from "@/components/Actors";
import Image from "next/image";
import { CheckBox } from "@mui/icons-material";
import AddActor from "@/components/AddActor";
import Actbar from "@/components/Actbar";

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
    console.log(actors);
  }, []);

  const handleActorChange = (event) => {
    setSelectedActors(
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
  };

  const handleAddFilm = async () => {
    const requestData = {
      title,
      description,
      age_restriction: parseInt(ageRestriction),
      language,
      duration,
      image,
      actorIds: selectedActors,
    };

    try {
      const response = await axios.post("/api/addFilm", requestData);
      console.log("Film added:", response.data.film);
      // Reset form fields or show success message
    } catch (error) {
      console.error("Error adding film:", error);
      // Show error message to user
    }
  };

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
              className="w-96 border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          {/* Other form fields */}
          {/* ... */}
          <label className="block mb-3">
            Select Actors:
            <Actbar />
            {/* <div
              multiple
              className="w-full border px-2 py-1 rounded text-red-700 focus:outline-none focus:ring focus:border-blue-500 grid grid-cols-2 sm:grid-cols-5 gap-4 transition-opacity duration-500"
            >
              {actors?.map((actor) => (
                <div
                  key={actor.id}
                  className="opacity-50 transform hover:opacity-100 hover:scale-105 transition-opacity duration-300 relative z-10"
                >
                  <Image
                    src={actor.image}
                    width={80}
                    height={150}
                    alt="searched actor"
                    // onClick={() =>
                    //   (window.location.href = `/Film/${actor.id}`)
                    // }
                  />
                  <span>
                    {actor.first_name}
                    <br />
                    {actor.last_name}
                  </span>
                  <input type="checkbox" />
                </div>
              ))}
            </div> */}
          </label>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleAddFilm}
          >
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
