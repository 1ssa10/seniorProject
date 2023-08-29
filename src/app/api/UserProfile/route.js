import prisma from "@/lib/prisma.js";

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  return new Response(JSON.stringify(user));
}
