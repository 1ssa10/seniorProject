"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Actbar() {
  const [searchitem, setSearchitem] = useState("");
  const [actors, setActors] = useState([]);
  // const searchHandler = (e) => {
  //   setSearchitem((prev) => e.target.value);
  // };
  useEffect(() => {
    async function fetchSerachedActor() {
      const res = await fetch("http://localhost:3000/api/searchedactor", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          actor: searchitem,
        }),
      });
      if (!res.ok) {
        console.error();
      }
      const data = await res.json();
      setActors(data);
    }

    fetchSerachedActor();
  }, [searchitem]);

  return (
    <div className=" relative   mt-4  items-center justify-center  mx-auto ">
      <div className="flex items-center justify-center  ">
        <form method="GET">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              {/* <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              > */}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              {/* </button> */}
            </span>
            <input
              type="search"
              name="p"
              className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search..."
              autoComplete="off"
              value={searchitem}
              onChange={(event) => setSearchitem(event.target.value)}
            />
          </div>
        </form>
      </div>
      <div className=" absolute z-10 left-1/2 transform -translate-x-1/2">
        {searchitem !== "" && (
          <div className=" inset-0 flex justify-center items-center">
            <div className="p-4 rounded-lg relative  bg-gray-900 bg-opacity-50 backdrop-blur-md ">
              {actors.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 transition-opacity duration-500  rlative">
                  {actors?.map((actor) => (
                    <div
                      key={actor.id}
                      className="opacity-50 transform hover:opacity-100 hover:scale-105 transition-opacity duration-300 relative z-10"
                    >
                      <Link href={`/Actor/${actor.id}`}>
                        <Image
                          src={actor.image}
                          width={80}
                          height={150}
                          alt="searched actor"
                          // onClick={() =>
                          //   (window.location.href = `/Film/${actor.id}`)
                          // }
                        />
                        <span>
                          {actor.first_name}
                          <br />
                          {actor.last_name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-700 animate-spin  fill-red-900"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Actbar;
