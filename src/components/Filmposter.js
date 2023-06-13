import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function onClickhandler(id) {
  location.href = `/Film/${id} `;
}

function Filmposter() {
  const [posters, setPosters] = useState([]);
  useEffect(() => {
    async function fetchPosters() {
      const response = await fetch("http://localhost:3000/api/filmsPosters");
      const data = await response.json();
      setPosters(data);
    }

    fetchPosters();
  }, []);
  return (
    <ul className="flex flex-wrap space-x-0 ">
      {posters.map((poster) => (
        <li
          key={poster.id}
          className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <div className="flex flex-col items-center">
            <Image
              src={poster.image}
              alt="Film Poster"
              width={280}
              height={420}
              onClick={() => onClickhandler(poster.id)}
            />
            <p>{poster.title}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Filmposter;
