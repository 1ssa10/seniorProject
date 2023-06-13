import prisma from "@/lib/prisma";

export async function GET(request) {
  const id = request.query;
  const posters = await prisma.film.findFirst({
    where: {
      id: id,
    },
  });
  return new Response(JSON.stringify(posters));
}
