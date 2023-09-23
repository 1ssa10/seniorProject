import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const directorfound = await prisma.director.findFirst({
    where: {
      AND: [{ first_name: body.first_name }, { last_name: body.last_name }],
    },
  });
  return new Response(JSON.stringify(directorfound));
}
