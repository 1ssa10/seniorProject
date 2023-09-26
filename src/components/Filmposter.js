import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Badge } from "@mui/material";
import Drawer from "./Drawer";
import SearchBar from "./SearchBar";
import Recommended from "./Recommended";
import SignINComponent from "./SignINComponent";

function HandlePosterClick(id) {
  const url = `/Film/${id}`;
  window.location.href = url;
}

function Filmposter() {
  const [cats, setCats] = useState([]);
  // const [direction, setDirection] = useState(false);

  useEffect(() => {
    async function fetchCats() {
      const response = await fetch("http://localhost:3000/api/filmsPosters");
      const data = await response.json();
      setCats(data);
    }

    fetchCats();
  }, []);
  const handleListHover = (catId, isHovered) => {
    setCats((prevCats) => {
      const updatedCats = prevCats.map((cat) =>
        cat.id === catId ? { ...cat, isHovered } : cat
      );
      return updatedCats;
    });
  };
  // const directionHnadler = () => {
  //   setDirection(!direction);
  // };
  const direction = cats.map((cat, index) => {
    return index % 2 === 0 ? "left" : "right";
  });

  return (
    <>
      <SearchBar cats={cats} />
      <SignINComponent />
      <Recommended />

      {cats.map((cat, index) => (
        <div id={cat.catergory} key={cat.id}>
          <h2 className="mb-2 px-4 text-lg font-bold text-center text-red-900">
            {cat.catergory}
          </h2>

          <div
            className="film-container  flex overflow-x : auto  scrollbar-track-gray-950 scrollbar-thumb-slate-900 space-x-4"
            id="style-2"
          >
            <Marquee
              play={cat.isHovered ? false : true}
              direction={direction[index]}
              autoFill
              speed={25}
            >
              <div
                className="film-list "
                tabIndex="0"
                onMouseOver={() => handleListHover(cat.id, true)}
                onMouseOut={() => handleListHover(cat.id, false)}
                onFocus={() => handleListHover(cat.id, true)}
                onBlur={() => handleListHover(cat.id, false)}
              >
                {cat.Films?.map((film) => (
                  <div key={film.id} className=" flex-none w-30">
                    <Link href={`/Film/${film.id}`}>
                      <div className="film-item flex flex-col items-center mt-2">
                        <Image
                          src={film.image}
                          alt="Film Poster"
                          width={160}
                          height={300}
                          // onClick={() => {
                          //   HandlePosterClick(film.id);
                          // }}
                        />
                      </div>
                      <p
                        className=" text-center overflow-hidden whitespace-nowrap overflow-ellipsis"
                        style={{ maxWidth: "160px" }}
                      >
                        {film.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      ))}
    </>
  );
}

export default Filmposter;
