import prisma from "@/lib/prisma";

export async function GET() {
  const films = await prisma.avgrating.findMany({
    where: {
      average: {
        gte: 4,
      },
    },
  });
  return new Response(JSON.stringify(films));
}
