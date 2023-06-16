import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

function HandlePosterClick(id) {
  const url = `/Film/${id}`;
  window.location.href = url;
}

function Filmposter() {
  const [cats, setCats] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
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
          <h2 className="mb-2 px-4 text-lg font-bold text-center text-red-900">
            {cat.catergory}
          </h2>
          <Marquee play={isHovered ? true : false} autoFill>
            <div
              className="film-container  flex overflow-x  scrollbar-track-gray-950 scrollbar-thumb-slate-900 space-x-4"
              id="style-2"
            >
              <div
                className="film-list "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
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
          </Marquee>
        </div>
      ))}
    </>
  );
}

export default Filmposter;
