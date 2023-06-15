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
      // console.log(data);
    }

    fetchCats();
  }, []);

  return (
    <>
      {cats.map((cat) => (
        <div key={cat.id}>
          <h2 className="mb-2 px-4 text-lg font-bold">{cat.catergory}</h2>
          <ul className="flex flex-wrap space-x-0">
            {cat.Films?.map((film) => (
              <li
                key={film.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={film.image}
                    alt="Film Poster"
                    width={280}
                    height={420}
                    onClick={() => {
                      HandlePosterClick(film.id);
                    }}
                  />
                  <p>{film.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default Filmposter;
