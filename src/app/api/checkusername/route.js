import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const usernamefound = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });
  return new Response(JSON.stringify(usernamefound));
}
