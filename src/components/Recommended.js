import React, { useEffect, useState } from "react";

function Recommended() {
  const [Reco, setReco] = useState();

  async function FilmRecom() {
    const res = await fetch("http://localhost:3000/api/FilmRecommended");
    const data = await res.json();
    const filmIds = data.map((item) => item.filmId);
    console.log(filmIds);
    setTimeout(2000);
    const response = await fetch("http://localhost:3000/api/Bestfilms", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: filmIds,
      }),
    });

    const recommended = await response.json();
    setReco(recommended);

    console.log(recommended);
  }
  useEffect(() => {
    FilmRecom();
  }, []);

  console.log(Reco);
  return (
    <div className="flex flex-col items-center bg-gray-800 border border-gray-900 rounded-lg shadow md:flex-row md:max-w-xl  w-full">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={Reco[0]?.image} //fix here
        alt="actor"
        width={80}
        height={220}
      />
      <div className="flex flex-col justify-center items-center p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
          {Reco[0]?.title}
          {/* fix here too */}
        </h5>
      </div>
    </div>
  );
}

export default Recommended;
