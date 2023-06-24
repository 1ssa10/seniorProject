"use client";
import Image from "next/image";
import Filmposter from "../components/Filmposter";
import ProfileImage from "../components/ProfileImage";
import { useSession } from "next-auth/react";
import SignINComponent from "@/components/SignINComponent";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const session = useSession();

  // if (session.status !== "authenticated") return;

  return (
    <>
      {/* <header className="sticky top-0 z-10 border-b bg-black pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header> */}

      <SearchBar />
      {session.status !== "authenticated" ? <SignINComponent /> : null}
      <Filmposter />
    </>
  );
}
