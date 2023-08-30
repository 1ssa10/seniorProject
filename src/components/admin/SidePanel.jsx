import React from "react";

function SidePanel({ handleSetActive, active, showMenu }) {
  return (
    <div className="w-[25vw] max-[990px]:w-[60vw] max-[990px]:h-full p-8  bg-zinc-950">
      <div className="flex justify-between">
        <p className="text-3xl mb-12">Admin Panel </p>
        <p onClick={showMenu} className="min-[990px]:hidden">
          X
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div
          onClick={() => handleSetActive("videos")}
          className={`px-6 py-3 rounded-lg hover:cursor-pointer ${
            active === "videos" ? "bg-red-900" : ""
          }`}
        >
          Add Videos
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
