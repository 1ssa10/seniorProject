import prisma from "@/lib/prisma";

export async function POST(request) {
  const { film } = await request.json();
  if (film !== "") {
    const filmS = await prisma.film.findMany({
      where: {
        title: { contains: film },
      },
    });
    return new Response(JSON.stringify(filmS));
  }
  return new Response(JSON.stringify([]));
}
