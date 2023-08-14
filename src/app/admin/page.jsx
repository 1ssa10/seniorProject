"use client";

import React, { useState } from "react";
import VideoForm from "@/components/admin/Add Video/VideoForm";
import AdminForm from "@/components/admin/Add Admin/AdminForm";
import SidePanel from "@/components/admin/SidePanel";
import Image from "next/image";

function Page() {
  const [active, setActive] = useState("videos");
  const [menu, setMenu] = useState(false);

  function handleSetActive(section) {
    setActive(section);
    setMenu(!menu);
  }

  function showMenu() {
    setMenu(!menu);
  }

  return (
    <div className="w-fit h-fit  bg-zinc-950 text-white ">
      <div className=" max-[990px]:hidden">
        <SidePanel
          handleSetActive={handleSetActive}
          active={active}
          showMenu={showMenu}
        />
      </div>

      <div className="w-[75vw] max-[990px]:w-screen bg-zinc-900 p-8  ">
        <button className="mb-4 min-[990px]:hidden" onClick={showMenu}>
          Menu
        </button>
        {/* {active === "videos" ? <VideoForm /> : <AdminForm />} */}
        <VideoForm />
      </div>
    </div>
  );
}

export default Page;
