import prisma from "@/lib/prisma";

export async function POST(request) {
  const id = await request.json();
  const director = await prisma.director.findFirst({
    where: {
      id: id.id,
    },
  });
  return new Response(JSON.stringify(director));
}
