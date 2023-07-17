import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        sx={{ bgcolor: "grey.900" }}
        animation="wave"
        width={210}
        height={60}
        className=" rounded-lg"
      />
    </div>
  );
}
