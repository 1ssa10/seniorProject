// import React, { useEffect, useState } from "react";

// function Recommended() {
//   const [Reco, setReco] = useState([]);
//   const [randomfilm, setrandomfilm] = useState([]);

//   async function FilmRecom() {
//     const res = await fetch("http://localhost:3000/api/FilmRecommended");
//     const data = await res.json();
//     const filmIds = data.map((item) => item.filmId);
//     console.log(filmIds);
//     setTimeout(2000);
//     const response = await fetch("http://localhost:3000/api/Bestfilms", {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ids: filmIds,
//       }),
//     });

//     const recommended = await response.json();
//     setReco(recommended);

//     console.log(recommended);
//   }
//   function getRandomFilms() {
//     const numRandomFilms = 3; // Number of random films you want to display
//     const randomIndices = [];

//     while (randomIndices.length < numRandomFilms) {
//       const randomIndex = Math.floor(Math.random() * Reco?.length);
//       if (!randomIndices.includes(randomIndex)) {
//         randomIndices.push(randomIndex);
//       }
//     }

//     const randomFilms = randomIndices.map((index) => Reco[index]);
//     setrandomfilm(randomFilms);
//   }

//   getRandomFilms();
//   useEffect(() => {
//     FilmRecom();
//   }, []);

//   console.log(Reco);
//   return (
//     <div className="flex flex-col items-center bg-gray-900 border border-gray-900 rounded-lg shadow md:flex-row w-52  ">
//       <img
//         className="object-cover  rounded-t-lg   md:rounded-none md:rounded-l-lg"
//         src={Reco[0]?.image}
//         alt="actor"
//         width={80}
//         height={220}
//       />
//       <div className="flex flex-col justify-center items-center p-4 leading-normal">
//         <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
//           {Reco[0]?.title}
//         </h5>
//       </div>
//     </div>
//   );
// }

// export default Recommended;

import { random } from "lodash";
import React, { useEffect, useState } from "react";

function Recommended() {
  const [Reco, setReco] = useState([]);
  const [randomfilm, setrandomfilm] = useState([]);

  async function FilmRecom() {
    const res = await fetch("http://localhost:3000/api/FilmRecommended");
    const data = await res.json();
    const filmIds = data.map((item) => item.filmId);

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
    console.log(recommended);
    setReco(recommended);

    const numRandomFilms = 2; // Number of random films you want to display
    const randomIndices = [];
    if (recommended.length >= numRandomFilms) {
      while (randomIndices.length < numRandomFilms) {
        const randomIndex = Math.floor(Math.random() * recommended?.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const randomFilms = randomIndices.map((index) => recommended[index]);
      setrandomfilm(randomFilms);
    } else {
      const randomIndex = Math.floor(Math.random() * recommended?.length);
      setrandomfilm([recommended[randomIndex]]);
    }
  }
  console.log(randomfilm);
  useEffect(() => {
    FilmRecom();
  }, []);

  return (
    <div className="flex items-center bg-gray-900 border border-gray-900 rounded-lg shadow md:flex-row">
      {randomfilm.map((film) => (
        <div
          key={film?.id}
          className="flex justify-center items-center p-4 leading-normal"
        >
          <img
            className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={film?.image}
            alt="film"
            width={80}
            height={220}
          />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
            {film?.title}
          </h5>
        </div>
      ))}
    </div>
  );
}

export default Recommended;
