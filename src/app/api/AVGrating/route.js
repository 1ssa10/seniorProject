import prisma from "@/lib/prisma";

export async function POST(request) {
  const filmid = await request.json();
  const avg = await prisma.avgrating.findUnique({
    where: {
      filmId: filmid.id,
    },
  });
  return new Response(JSON.stringify(avg));
}
