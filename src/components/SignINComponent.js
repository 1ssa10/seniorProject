import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
function SignINComponent() {
  const [films, setfilms] = useState([]);
  const [randomfilm, setrandomfilm] = useState([]);
  const session = useSession();

  useEffect(() => {
    async function fetchingFilms() {
      const response = await fetch("http://localhost:3000/api/Films");
      const data = await response.json();
      setfilms(data);
    }

    fetchingFilms();
  }, []);
  useEffect(() => {
    function getRandomfilm() {
      const randomIndex = Math.floor(Math.random() * films?.length);
      setrandomfilm(films[randomIndex]);
    }
    getRandomfilm();
  }, [films]);
  if (session.status === "loading") return;
  return (
    <>
      {session.status !== "authenticated" && (
        <div className="flex justify-center">
          <div className=" my-5 px-4 py-4   rounded-3xl border boreder-lg border-red-700">
            {/* {console.log(randomfilm?.image)} */}
            <div
              className="signindev  bg-contain bg-no-repeat bg-right"
              style={{
                backgroundImage: randomfilm?.image
                  ? `url(${randomfilm?.image})`
                  : null,
              }}
            >
              <h1 className="text-2xl flex justify-center text-gray-700 font-sans font-bold">
                {randomfilm?.title}
              </h1>
              <p className="mt-9">Please sign in!</p>
              <p>Don't have an account?</p>
              <button
                className="bg-red-700  text-white font-bold hover:bg-transparent  hover: border border-red-700 hover:text-red-700  py-2 px-4 rounded-full mt-32 "
                onClick={() => signIn()}
              >
                Sign in
              </button>{" "}
              &nbsp;
              <Link
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full"
                href="/Register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignINComponent;
