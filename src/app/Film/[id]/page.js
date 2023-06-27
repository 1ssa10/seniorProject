"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "./loading";
import { useEffect, useState } from "react";

function Page({ params }) {
  // const url = window.location.href;
  // const id = url.split("/Film/")[1];
  const id = params.id;
  console.log(params.id);
  const [film, setFilm] = useState([]);
  const session = useSession();

  useEffect(() => {
    async function fetchFilmDetails() {
      const res = await fetch("http://localhost:3000/api/FilmContant", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      // if (!res.ok) throw new Error("connection problems");
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     const data = res.json();
      //     setFilm(data);
      //   }, 3000);
      // });
      const data = await res.json();
      setFilm(data);
    }
    fetchFilmDetails();
  }, [id]);
  if (session.status !== "authenticated") return;

  return (
    <div className="flex">
      <h1>hello to the film section</h1>

      <div className="mr-4">
        <p>{film.title}</p>

        <Image src={film?.image} alt="Film Poster" width={280} height={420} />
      </div>
      <div className="flex flex-col justify-end">
        {film.Actors?.map((actor) => (
          <div key={actor.id} className="flex items-center mb-4">
            <Image
              src={actor?.image}
              alt="Actor Image"
              width={100}
              height={120}
            />
            <p className="ml-4">
              {actor.first_name} {actor.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
