import prisma from "@/lib/prisma";

export async function POST(request) {
  console.log(request);
  const { film } = await request.json();

  const filmS = await prisma.film.findMany({
    where: {
      title: { contains: film },
    },
  });
  return new Response(JSON.stringify(filmS));
}
