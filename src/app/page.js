"use client";
import Image from "next/image";
import Filmposter from "../components/Filmposter";
import ProfileImage from "../components/ProfileImage";
import { useSession } from "next-auth/react";
import SignINComponent from "@/components/SignINComponent";
import SearchBar from "@/components/SearchBar";
import { Suspense, useState } from "react";
import Drawer from "@/components/Drawer";
import Recommended from "@/components/Recommended";

export default function Home() {
  const session = useSession();

  // if (session.status !== "authenticated") return ;

  return (
    <>
      <Filmposter />
    </>
  );
}
