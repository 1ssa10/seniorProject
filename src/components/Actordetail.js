"use client";
import React, { useEffect, useState } from "react";
import ActorFilm from "./ActorFilm";

function Actordetail({ id }) {
  const [actor, setActor] = useState();
  const [showAllFilms, setShowAllFilms] = useState(false);

  async function fetchActorDetails() {
    const res = await fetch("http://localhost:3000/api/ActorContant", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const data = await res.json();
    setActor(data);
  }
  useEffect(() => {
    fetchActorDetails();
  }, []);

  const toggleShowFilms = () => {
    setShowAllFilms(!showAllFilms);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" w-1/2 flex justify-center items-center p-4 rounded-lg">
          <div className="flex flex-col items-center bg-gray-900 border border-gray-900 rounded-lg shadow md:flex-row md:max-w-xl  w-full">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={actor?.image}
              alt="actor"
              width={280}
              height={420}
            />
            <div className="flex flex-col justify-center items-center p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
                {actor?.first_name} {actor?.last_name}
              </h5>
              <p class="mb-3 font-normal text-gray-400 ">
                Gender: {actor?.gender}
                <br />
                Age: {actor?.age !== null ? actor?.age : "N/A"}
                <br /> Nationality:{" "}
                {actor?.nationality !== null ? actor?.nationality : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ActorFilm actor={actor} />
    </>
  );
}

export default Actordetail;
