import React from "react";
import { Rating } from "@mui/material";
function Averagerate({ avg }) {
  console.log(avg);
  return (
    <div>
      <Rating defaultValue={avg} precision={0.1} />
      <Rating />
    </div>
  );
}

export default Averagerate;
