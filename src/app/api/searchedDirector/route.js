import prisma from "@/lib/prisma";

export async function POST(request) {
  const { director } = await request.json();

  if (director !== "") {
    const directorS = await prisma.director.findMany({
      where: {
        OR: [
          { first_name: { contains: director } },
          { last_name: { contains: director } },
        ],
      },
    });
    return new Response(JSON.stringify(directorS));
  }
  return new Response(JSON.stringify([]));
}
