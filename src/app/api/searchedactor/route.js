import prisma from "@/lib/prisma";

export async function POST(request) {
  const { actor } = await request.json();

  if (actor !== "") {
    const actorS = await prisma.actor.findMany({
      where: {
        OR: [
          { first_name: { contains: actor } },
          { last_name: { contains: actor } },
        ],
      },
    });
    return new Response(JSON.stringify(actorS));
  }
  return new Response(JSON.stringify([]));
}
