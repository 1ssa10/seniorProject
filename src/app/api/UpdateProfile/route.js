import prisma from "@/lib/prisma.js";
import { use } from "react";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const user = await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      image: "/images/" + body.image,
    },
  });

  return new Response(JSON.stringify(user));
}
