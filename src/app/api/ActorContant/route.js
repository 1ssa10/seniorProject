import prisma from "@/lib/prisma";

export async function POST(request) {
  const id = await request.json();
  const actord = await prisma.actor.findFirst({
    where: {
      id: id.id,
    },
    include: {
      Films: {
        select: {
          id: true,
          image: true,
          title: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(actord));
}
