import React from "react";
import { Skeleton } from "@mui/material";
export default function Loading() {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => i + 1).map((id) => (
        <div key={id}>
          <h2 className="mb-2 px-4 text-lg font-bold text-center text-red-900">
            {" "}
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: "grey.900" }}
              animation="wave"
              width={100}
              height={20}
              className=" rounded-lg"
            />
          </h2>

          <div
            className="film-container  flex overflow-x : auto  scrollbar-track-gray-950 scrollbar-thumb-slate-900 space-x-4"
            id="style-2"
          >
            <div className="film-list " tabIndex="0">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((id) => (
                <div key={id} className=" flex-none w-30">
                  <div className="film-item flex flex-col items-center mt-2">
                    <Skeleton
                      variant="rectangular"
                      sx={{ bgcolor: "grey.900" }}
                      animation="wave"
                      width={160}
                      height={300}
                      className=" rounded-lg"
                    />
                  </div>
                  <p className=" pt-2">
                    <Skeleton
                      variant="rectangular"
                      sx={{ bgcolor: "grey.900" }}
                      animation="wave"
                      width={50}
                      height={10}
                      className=" rounded-lg"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
