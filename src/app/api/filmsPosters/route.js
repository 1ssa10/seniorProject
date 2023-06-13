import prisma from "@/lib/prisma";

export async function GET(request) {
  const posters = await prisma.film.findMany();
  return new Response(JSON.stringify(posters));
}
