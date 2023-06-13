"use client";
import React, { useEffect } from "react";
import Filmcon from "@/components/Filmcon";

function Page() {
  const url = window.location.href;
  const id = url.split("/").pop();
  console.log("ID:", id);
  // Do something with the id...

  return <Filmcon nb="dd321595-47c4-4059-8dbe-a4e8ba2a7cbb" />;
}

export default Page;
