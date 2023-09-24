import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const actorfound = await prisma.actor.findFirst({
    where: {
      AND: [{ first_name: body.firstName }, { last_name: body.lastName }],
    },
  });
  return new Response(JSON.stringify(actorfound));
}
