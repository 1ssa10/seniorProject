import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function HandlePosterClick(id) {
  const url = `/Film/${id}`;
  window.location.href = url;
}

function Filmposter() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    async function fetchCats() {
      const response = await fetch("http://localhost:3000/api/filmsPosters");
      const data = await response.json();
      setCats(data);
    }

    fetchCats();
  }, []);

  return (
    <>
      {cats.map((cat) => (
        <div key={cat.id}>
          <h2 className="mb-2 px-4 text-lg font-bold">{cat.catergory}</h2>
          <div
            className="film-container  flex overflow-x-auto  scrollbar-track-gray-950 scrollbar-thumb-slate-900 space-x-4"
            id="style-2"
          >
            <div className="film-list ">
              {cat.Films?.map((film) => (
                <div key={film.id} className=" flex-none w-30">
                  <div className="film-item flex flex-col items-center mt-2">
                    <Image
                      src={film.image}
                      alt="Film Poster"
                      width={180}
                      height={320}
                      onClick={() => {
                        HandlePosterClick(film.id);
                      }}
                    />
                  </div>
                  <p>{film.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Filmposter;
