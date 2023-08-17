import Actordetail from "@/components/Actordetail";
import React from "react";

function page({ params }) {
  const id = params.id;

  return <Actordetail id={id} />;
}

export default page;
