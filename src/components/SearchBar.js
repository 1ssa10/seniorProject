import Image from "next/image";
import React, { useEffect, useState } from "react";

function SearchBar() {
  const [searchitem, setSearchitem] = useState("");
  const [films, setFilms] = useState([]);
  const searchHandler = (e) => {
    setSearchitem((prev) => e.target.value);
  };
  useEffect(() => {
    if (searchitem !== "") {
      async function fetchSerachedFilm() {
        const res = await fetch("http://localhost:3000/api/searchedfilm", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            film: searchitem,
          }),
        });
        const data = await res.json();
        setFilms(data);
      }

      fetchSerachedFilm();
    }
  }, [searchitem]);
  console.log(films);
  return (
    <div>
      <div className="mt-4 flex justify-center">
        <input
          className="bg-black text-gray-700 rounded-full border-red-500 border focus:outline-none py-2 px-4 w-96"
          type="text"
          placeholder="Search"
          value={searchitem}
          onChange={(event) => searchHandler(event)}
        />
      </div>

      {searchitem !== "" && (
        <div className="relative inset-0 flex justify-center items-center">
          <div className="p-4 rounded-lg ">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 transition-opacity duration-500">
              {films?.map((film) => (
                <div
                  key={film.id}
                  className="opacity-50 transform hover:opacity-100 hover:scale-105 transition-opacity duration-300"
                >
                  <Image
                    src={film.image}
                    width={80}
                    height={150}
                    alt="searched film"
                  />
                  <span>{film.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* {searchitem !== "" && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-gray-900 p-4 rounded-lg">
            {films?.map((film) => (
              <p className="text-white" key={film.id}>
                {film?.title}...
              </p>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
