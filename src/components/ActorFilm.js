import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function ActorFilm({ actor }) {
  const [showAllFilms, setShowAllFilms] = useState(false);
  const toggleShowFilms = () => {
    setShowAllFilms(!showAllFilms);
  };
  console.log(actor);
  return (
    <div>
      <div className="text-gray-300 mb-4">
        <p className="text-red-700  text-center text-3xl">Starring: </p>

        {actor?.Films?.length > 0 ? (
          <>
            <div className=" grid grid-cols-7">
              {showAllFilms
                ? actor?.Films.map((film) => (
                    <div key={film.id} className="w-30">
                      <Link href={`/Film/${film.id}`}>
                        <div className="actor-item flex flex-col items-center mt-2">
                          <Image
                            src={film.image}
                            alt="actor"
                            width={160}
                            height={300}
                          />
                        </div>
                        <p>{film.title}</p>
                      </Link>
                    </div>
                  ))
                : actor?.Films.slice(0, 7).map((film) => (
                    <div key={film.id} className="w-30">
                      <Link href={`/Film/${film.id}`}>
                        <div className="actor-item flex flex-col items-center mt-2">
                          {console.log(film.image)}
                          <Image
                            src={film.image}
                            alt="actor"
                            width={160}
                            height={300}
                          />
                        </div>
                        <p>{film.title}</p>
                      </Link>
                    </div>
                  ))}
            </div>

            {actor?.Films.length > 7 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={toggleShowFilms}
                  className="text-red-500 hover:underline focus:outline-none "
                >
                  {showAllFilms ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
}

export default ActorFilm;
