"use client";
import React, { useEffect, useState } from "react";

function Actordetail({ id }) {
  const [actor, setActor] = useState();

  async function fetchActorDetails() {
    const res = await fetch("http://localhost:3000/api/ActorContant", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const data = await res.json();
    setActor(data);
    console.log(data);
    console.log(actor);
  }
  useEffect(() => {
    fetchActorDetails();
  }, []);

  return (
    <div className=" sm:grid grid-cols-3 bg-gray-900 w-1/2 flex justify-center items-center">
      <div className="mr-4 flex justify-center items-center">
        <img src={actor?.image} alt="film poster" width={280} height={420} />
      </div>

      <div className=" h-96 pr-5">
        {actor?.first_name} {actor?.last_name}
      </div>
    </div>
  );
}

export default Actordetail;
