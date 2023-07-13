import Image from "next/image";
import React from "react";

function ProfileImage({ src, className }) {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? (
        <Image
          src="/images/defaultproimage-removebg-preview.png"
          alt="Profile Image"
          quality={100}
          fill
        />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
}

export default ProfileImage;
