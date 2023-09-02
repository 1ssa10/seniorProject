import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const director = await prisma.director.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      age: parseInt(body.age) || null,
      DOb: new Date(body.dob),
      nationality: body.nationality,
      gender: body.gender,
      image: "/images/" + body.image,
    },
  });
  return new Response(JSON.stringify(director));
}
