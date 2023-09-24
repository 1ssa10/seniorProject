import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const directorfound = await prisma.director.findFirst({
    where: {
      AND: [{ first_name: body.firstName }, { last_name: body.lastName }],
    },
  });
  return new Response(JSON.stringify(directorfound));
}
