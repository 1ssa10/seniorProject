import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const filmfound = await prisma.film.findFirst({
    where: {
      title: body.title,
    },
  });
  return new Response(JSON.stringify(filmfound));
}
