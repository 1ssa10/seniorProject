import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const emailfound = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  return new Response(JSON.stringify(emailfound));
}
