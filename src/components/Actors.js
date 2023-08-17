"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Badge } from "@mui/material";
import { Actor } from "next/font/google";

function HandlePosterClick(id) {
  const url = `/Film/${id}`;
  window.location.href = url;
}

function Actors() {
  const [Acts, setActs] = useState([]);

  async function fetchActs() {
    const response = await fetch("http://localhost:3000/api/Allactors");
    const data = await response.json();
    setActs(data);
  }

  fetchActs();

  return (
    <>
      <div className=" grid lg:grid-cols-7  md:grid-cols-5 sm:grid-cols-3">
        {Acts?.map((Actor) => (
          <div key={Actor.id} className="w-30">
            <Link href={`/Actor/${Actor.id}`}>
              <div className="actor-item flex flex-col items-center mt-2">
                <Image src={Actor.image} alt="actor" width={160} height={300} />
              </div>
              <p>
                {Actor.first_name}
                <br />
                {Actor.last_name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Actors;
