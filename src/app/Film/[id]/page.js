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
  const [comments, setComments] = useState([]);

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
    async function fetchComments() {
      const res = await fetch("http://localhost:3000/api/fetchcomments", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await res.json();
      setComments(data);
    }

    fetchFilmDetails();
    fetchComments();
  }, [id]);

  const Commenting = async (user_id, film_id, nb_stars, comment_d) => {
    try {
      const res = await fetch("http://localhost:3000/api/Rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user_id,
          filmid: film_id,
          nbstars: nb_stars,
          comment: comment_d,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    async function fetchComments() {
      const res = await fetch("http://localhost:3000/api/fetchcomments", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await res.json();
      setComments(data);
    }
    fetchComments();
  };

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
      {rated !== 0 ? (
        <div className=" grid place-items-center">
          <div className="py-2 px-4 mb-4   bg-white rounded-lg rounded-t-lg border border-gray-200">
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
            onClick={() =>
              Commenting(session.data.user.id, id, rated, inputVAlue)
            }
          >
            Post comment
          </button>
          {console.log(session.data.user.id)}
        </div>
      ) : null}
      <div>
        {comments?.map((com) => (
          <div key={com.commentId}>{com.comment.comment_detail}</div>
        ))}
      </div>
    </form>
  );
}

export default Page;
