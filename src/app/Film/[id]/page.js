"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const url = window.location.href;
  const id = url.split("/Film/")[1]; // Split the URL by "/Film/" and get the second element
  const [film, setFilm] = useState([]);
  const session = useSession();
  console.log("ID:", id);
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
      const data = await res.json();
      setFilm(data);
    }
    fetchFilmDetails();
  }, [id]);
  if (session.status !== "authenticated") return;

  return (
    <div className="flex">
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
