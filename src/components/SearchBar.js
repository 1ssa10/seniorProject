import React, { useEffect, useState } from "react";

function SearchBar() {
  const [searchitem, setSearchitem] = useState("");
  const [films, setFilms] = useState([]);
  const searchHandler = (e) => {
    setSearchitem((prev) => e.target.value);
  };
  useEffect(() => {
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
  }, [searchitem]);
  console.log(films);
  return (
    <div className="mt-4 flex justify-center">
      <input
        className="bg-black text-gray-700 rounded-full border-red-500 border focus:outline-none py-2 px-4 w-96"
        type="text"
        placeholder="Search"
        value={searchitem}
        onChange={(event) => searchHandler(event)}
      />

      <div>
        {films?.map((films) => {
          <p className="text-white" key={films.id}>
            {films?.title}...
          </p>;
        })}
      </div>
    </div>
  );
}

export default SearchBar;
