"use client";
import Image from "next/image";
import Filmposter from "../components/Filmposter";
import ProfileImage from "../components/ProfileImage";
import { useSession } from "next-auth/react";
import SignINComponent from "@/components/SignINComponent";
import SearchBar from "@/components/SearchBar";
import { Suspense, useState } from "react";
import Drawer from "@/components/Drawer";

export default function Home() {
  const session = useSession();

  // if (session.status !== "authenticated") return ;

  console.log(session ? "session" : "no session");
  console.log(session);

  return (
    <>
      <SignINComponent />
      <Filmposter />
    </>
  );
}
