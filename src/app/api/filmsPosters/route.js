import prisma from "@/lib/prisma";

export async function GET(request) {
  const posters = await prisma.category.findMany({
    include: {
      Films: {
        select: {
          id: true,
          image: true,
          title: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(posters));
}
