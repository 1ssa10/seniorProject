"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Filmposter() {
  return (
    <div>
      <Image
        src="/images/titanic.jpg"
        width="280"
        height="420"
        onClick={() => signOut()}
      />
    </div>
  );
}

export default Filmposter;
