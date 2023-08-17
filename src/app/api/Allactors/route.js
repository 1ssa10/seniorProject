import prisma from "@/lib/prisma";

export async function GET() {
  const actors = await prisma.actor.findMany();
  return new Response(JSON.stringify(actors));
}
