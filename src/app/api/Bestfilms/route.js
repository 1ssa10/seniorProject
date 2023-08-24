import prisma from "@/lib/prisma";
export async function POST(request) {
  const { ids: filmIds } = await request.json();
  const films = await prisma.film.findMany({
    where: {
      id: {
        in: filmIds,
      },
    },
  });
  return new Response(JSON.stringify(films));
}
