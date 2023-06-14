"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  //   const { id } = useSearchParams();
  //   console.log(id);
  //   console.log("Href: ", window.location.href);
  //   useEffect(() => {
  //     if (!id) {
  //       return;
  //     }
  //     const fetchSomethingById = async () => {
  //       const response = await fetch(`/api/something/${id}`);
  //       // Rest of your logic...
  //     };
  //     fetchSomethingById();
  //   }, [id]);

  //   return <div>{`hello${id}`}</div>;
  const url = window.location.href;
  const id = url.split("/Film/")[1]; // Split the URL by "/Film/" and get the second element
  const [film, setFilm] = useState([]);
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
  return (
    <div>
      <p>{film.title}</p>
      <Image src={film.image} alt="Film Poster" width={280} height={420} />
      <div>
        {film.Actors?.map((actor) => (
          <Image
            key={actor.id} // Make sure to provide a unique key for each item in the array
            src={actor.image}
            alt="Actor Image"
            width={280}
            height={420}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
