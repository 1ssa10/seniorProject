import prisma from "@/lib/prisma";

export async function GET(request) {
  const films = await prisma.film.findMany();
  return new Response(JSON.stringify(films));
}
