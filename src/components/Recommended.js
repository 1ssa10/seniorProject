import { random } from "lodash";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function Recommended() {
  const [Reco, setReco] = useState([]);
  const [randomfilm, setrandomfilm] = useState([]);

  async function FilmRecom() {
    const res = await fetch("http://localhost:3000/api/FilmRecommended");
    const data = await res.json();
    const filmIds = data.map((item) => item.filmId);

    const response = await fetch("http://localhost:3000/api/Bestfilms", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: filmIds,
      }),
    });

    const recommended = await response.json();

    setReco(recommended);

    const numRandomFilms = 3; // Number of random films  want to display
    const randomIndices = [];
    if (recommended.length >= numRandomFilms) {
      while (randomIndices.length < numRandomFilms) {
        const randomIndex = Math.floor(Math.random() * recommended?.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const randomFilms = randomIndices.map((index) => recommended[index]);
      setrandomfilm(randomFilms);
    } else {
      const randomIndex = Math.floor(Math.random() * recommended?.length);
      setrandomfilm([recommended[randomIndex]]);
    }
  }

  useEffect(() => {
    FilmRecom();
  }, []);

  return (
    <>
      <div className="mt-10 text-center  text-lg bg-gray-900 border border-red-700 border-t border-b">
        <p className=" text-red-700">Recommended</p>
        <div className="flex justify-center items-center">
          {randomfilm.map((film) => (
            <div
              key={film?.id}
              className="  m-8 flex h-50 rounded-lg bg-gray-800 shadow-red"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  className="rounded-t-lg"
                  src={film?.image}
                  width={180}
                  height={240}
                  alt="recommended"
                />
                <Link href={`/Film/${film.id}`}>
                  <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </Link>
              </div>
              <div className="p-6 relative">
                <h5 className="mb-2  font-medium leading-tight text-neutral-800  text-red-700 text-2xl break-words">
                  {film?.title}
                </h5>
                <p className="mb-4 text-base text-neutral-600 ">
                  <br />
                  Average rating surpassing
                  <br />
                  <br />
                  <p className=" text-red-700 text-4xl justify-center">3.8</p>
                </p>
                <Link
                  href={`/Film/${film.id}`}
                  type="button"
                  className=" absolute bottom-4 right-0 inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#ff0000] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.3),0_4px_18px_0_rgba(255,0,0,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.3),0_4px_18px_0_rgba(255,0,0,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.3),0_4px_18px_0_rgba(255,0,0,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(255,0,0,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.2),0_4px_18px_0_rgba(255,0,0,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.2),0_4px_18px_0_rgba(255,0,0,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(255,0,0,0.2),0_4px_18px_0_rgba(255,0,0,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  CheckOut
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommended;
