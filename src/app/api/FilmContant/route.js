import prisma from "@/lib/prisma";

export async function POST(request) {
  const id = await request.json();
  const filmd = await prisma.film.findFirst({
    where: {
      id: id.id,
    },
    include: {
      Actors: {
        select: {
          id: true,
          image: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(filmd));
}
