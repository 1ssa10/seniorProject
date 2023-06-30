"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "./loading";
import { useEffect, useState } from "react";
import SignINComponent from "@/components/SignINComponent";
import Ratingstars from "@/components/Ratingstars";
import { Rating, Typography } from "@material-tailwind/react";
import { every } from "lodash";
function Page({ params }) {
  // const url = window.location.href;
  // const id = url.split("/Film/")[1];
  const id = params.id;
  console.log(params.id);
  const [film, setFilm] = useState([]);
  const session = useSession();
  const [rated, setRated] = useState(0);
  const [inputVAlue, setInputValue] = useState("");

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
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="flex">
        <div className="mr-4">
          <p>{film?.title}</p>

          <Image src={film?.image} alt="Film Poster" width={280} height={420} />
        </div>
        <div className="flex flex-col justify-end">
          {film?.Actors?.map((actor) => (
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

      <div className="flex items-center gap-2">
        <Rating
          unratedColor="red"
          ratedColor="red"
          value={rated}
          onChange={(value) => setRated(value)}
        />
        <Typography color="blue-gray" className="font-medium text-red-700">
          {rated}.0 Rated
        </Typography>
        <input type="text" className=" text-black" />
      </div>
      <button type="submit" onClick={() => alert("123")}>
        submit
      </button>
      <div className=" grid place-items-center">
        <div class="py-2 px-4 mb-4   bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label for="comment" class="sr-only">
            Your comment
          </label>
          <textarea
            className="px-0 h-auto w-96 items-center text-sm text-gray-900 resize-none border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            required
            value={inputVAlue}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </div>
    </form>
  );
}

export default Page;
