"use client";

import React, { useEffect, useState } from "react";

function Filmcon(nb) {
  const id = nb;
  const [film, setFilm] = useState([]);
  useEffect(() => {
    async function fetchCon() {
      const response = await fetch("http://localhost:3000/api/FilmContant");
      const data = await response.json();
      setFilm(data);
    }

    fetchCon();
  }, []);
  return <div>{`hello${id}`}</div>;
}

export default Filmcon;
