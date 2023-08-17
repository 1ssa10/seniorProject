import prisma from "@/lib/prisma";

export async function GET() {
  const actors = await prisma.actor.findMany({
    orderBy: {
      first_name: "asc",
    },
  });
  return new Response(JSON.stringify(actors));
}
