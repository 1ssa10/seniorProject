"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Carousel, Rating, Typography } from "@material-tailwind/react";
import ProfileImage from "@/components/ProfileImage";
import ReactSpeedometer from "react-d3-speedometer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Divider } from "@mui/material";
import { redirect } from "next/navigation";
import Link from "next/link";

function Page({ params }) {
  // const url = window.location.href;
  // const id = url.split("/Film/")[1];
  const id = params.id;
  // console.log(params.id);
  const [film, setFilm] = useState([]);
  const session = useSession();
  const [rated, setRated] = useState(0);
  const [inputVAlue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const [director, setDirector] = useState({});
  const [alreadyRated, setAlreadyRated] = useState({});
  const [avg, setAVG] = useState();
  const [comerror, setComerror] = useState();

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
    async function fetchDirector() {
      const res = await fetch("http://localhost:3000/api/director", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: film.directorId,
        }),
      });
      const data = await res.json();
      setDirector(data);
    }

    fetchFilmDetails();
    fetchComments();
    fetchDirector();
  }, [id]);

  useEffect(() => {
    async function avgRate() {
      const res = await fetch("http://localhost:3000/api/AVGrating", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await res.json();

      setAVG(parseFloat(data.average.toFixed(1)));
    }
    async function checkRated() {
      const res = await fetch("http://localhost:3000/api/CheckRated", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          user_id: session.data?.user.id,
        }),
      });
      const data = await res.json();

      setAlreadyRated(data);
    }
    avgRate();
    checkRated();
  }, [comments]);

  const Commenting = async (user_id, film_id, nb_stars, comment_d) => {
    if (comment_d == "") {
      setComerror("Acomment is required!!");
    } else {
      // try {
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
    }
    // } catch (error) {
    //   console.error("Error:", error);}

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
  let now = new Date();

  if (session.status !== "authenticated") redirect("/");

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="  sm:grid grid-cols-3">
        <div className="  flex items-center justify-center  w-full font-bold text-red-700 text-7xl col-span-2">
          <p>{film?.title}</p>
        </div>
        <div className="flex justify-end">
          <ReactSpeedometer
            value={avg}
            minValue={0}
            maxValue={5}
            needleColor="gray"
            startColor="#4a5568"
            endColor="#B91C1C"
            width={400}
            needleTransition="easeBounceInOut"
            needleTransitionDuration={2000}
            valueTextFontSize={"100"}
            segmentColors={[
              "#2d3748",
              "#718096",
              "#F87171",
              "#c53030",
              "#b91c1c",
            ]}
            customSegmentLabels={[
              {
                text: "BAD",
                position: "INSIDE",
                color: "black",
              },
              {
                text: "OKAY",
                position: "INSIDE",
                color: "black",
              },
              {
                text: "AVERAGE",
                position: "INSIDE",
                color: "black",
              },
              {
                text: "GOOD",
                position: "INSIDE",
                color: "black",
              },
              {
                text: "AMAZING",
                position: "INSIDE",
                color: "black",
              },
            ]}
          />
        </div>
      </div>
      <div className=" sm:grid grid-cols-3 ">
        <div className="mr-4 flex justify-center items-center">
          <img src={film?.image} alt="film poster" width={280} height={420} />
        </div>

        <div className=" h-96 overflow-y-auto scrollbar scrollbar-track-gray-900 scrollbar-thumb-red-700 scrollbar-thumb-rounded pr-5">
          {film?.description}
        </div>
        <div className="  flex flex-col justify-center items-center">
          <div>
            <img src={director?.image} width={180} height={360} alt="diector" />
          </div>
          <p>{director?.first_name}</p>
        </div>
      </div>
      <br />
      {film?.trailer && (
        <div className=" flex justify-center">
          <iframe
            width="660"
            height="415"
            src={`${film.trailer}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen="allowfullscreen"
          />
        </div>
      )}
      <br />
      <br />
      <p className=" flex justify-center text-red-700">Actors :</p>
      <div className="flex flex-col justify-end">
        <div className="w-fit h-fit mx-auto overflow-x-hidden overflow-y-hidden bg-gray-900 rounded-lg">
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className=" max-w-3xl "
          >
            {film?.Actors?.map((actor, index) => (
              <div key={actor.id} className="flex items-center mb-4">
                <SwiperSlide key={actor.id}>
                  <div className=" items-center mt-2">
                    <Link href={`/Actor/${actor.id}`}>
                      <Image
                        src={actor?.image}
                        alt="Actor Image"
                        width={100}
                        height={120}
                      />
                      <p className="ml-4">
                        {actor.first_name} <br /> {actor.last_name}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
      <br />
      <br />

      {alreadyRated ? (
        <div className="flex flex-col justify-center  items-center gap-2">
          <div>your comment:</div>

          {console.log(alreadyRated.nb_stars)}
          <div className=" w-1/2 overflow-hidden">
            <div className="bg-gray-800  border border-white  rounded-3xl px-4 pt-2 pb-2.5">
              <Rating
                unratedColor="red"
                ratedColor="red"
                value={alreadyRated?.nb_stars}
                size="large"
                readonly
              />
              <Typography
                color="blue-gray"
                className="font-medium text-red-700"
              >
                {alreadyRated?.nb_stars}.0 Rated
              </Typography>
              <div className="text-normal leading-snug md:leading-normal break-words break-all">
                {alreadyRated.comment?.comment_detail}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center  items-center gap-2">
          {" "}
          <Rating
            unratedColor="red"
            ratedColor="red"
            value={rated}
            size="large"
            onChange={(value) => setRated(value)}
          />
          <Typography color="blue-gray" className="font-medium text-red-700">
            {rated}.0 Rate
          </Typography>
        </div>
      )}
      <br />
      <br />
      {rated !== 0 && !alreadyRated ? (
        <div className=" grid place-items-center">
          <div className="py-2 px-4 mb-4   bg-white rounded-lg rounded-t-lg border border-gray-200">
            <textarea
              className="px-0 h-auto w-96 items-center text-sm text-gray-900 resize-none border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required
              value={inputVAlue}
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
            <p className=" text-red-700">{comerror}</p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800"
            onClick={() =>
              Commenting(session.data.user.id, id, rated, inputVAlue)
            }
          >
            Post comment
          </button>
          {/* {console.log(session.data.user.id)} */}
        </div>
      ) : (
        <div></div>
      )}
      <div className=" flex justify-center relative">
        <div className=" grid-cols-1 sm:w-1/2 w-full bg-gray-900 overflow-y-auto  h-96 scrollbar scrollbar-track-gray-900 scrollbar-thumb-red-700 scrollbar-thumb-rounded rounded-xl ">
          {comments?.map((com) => (
            <div
              key={com?.commentId}
              className=" text-black p-4 flex max-w-3xl"
            >
              <div>
                <ProfileImage
                  src={com.rater?.image}
                  className="rounded-full h-8 w-8 mr-2 mt-1"
                />
              </div>
              <div className=" w-full overflow-hidden">
                <div className="bg-gray-800  border border-white  rounded-3xl px-4 pt-2 pb-2.5">
                  <div className="font-semibold text-sm leading-relaxed">
                    {com.rater.name}
                  </div>
                  <Rating
                    unratedColor="red"
                    ratedColor="red"
                    value={com.nb_stars}
                    readonly
                    // className=" flex justify-end"
                  />
                  <div className="text-normal leading-snug md:leading-normal break-words">
                    {com.comment?.comment_detail}
                  </div>
                </div>
                <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
                  {parseInt(now - new Date(com.date)) >= 0 &&
                    parseInt(now - new Date(com.date)) < 60000 && (
                      <span>
                        {parseInt((now - new Date(com.date)) / 1000)} s
                      </span>
                    )}
                  {parseInt((now - new Date(com.date)) / 1000) >= 60 &&
                    parseInt((now - new Date(com.date)) / 1000) < 3600 && (
                      <span>
                        {parseInt((now - new Date(com.date)) / 60000)} m
                      </span>
                    )}
                  {parseInt((now - new Date(com.date)) / 60000) >= 60 &&
                    parseInt((now - new Date(com.date)) / 3600000) < 24 && (
                      <span>
                        {parseInt((now - new Date(com.date)) / 3600000)} h
                      </span>
                    )}
                  {parseInt((now - new Date(com.date)) / 3600000) >= 24 && (
                    <span>
                      {parseInt((now - new Date(com.date)) / 86400000)} d
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default Page;
