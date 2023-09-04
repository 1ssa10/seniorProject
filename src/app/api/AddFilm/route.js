import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  console.log("click");
  const film = await prisma.film.create({
    data: {
      title: body.title,
      description: body.description,
      age_restriction: parseInt(body.ageRestriction) || null,
      language: body.language,
      duration: body.duration,
      trailer: body.trailer,
      Actors: {
        connect: body.Actors.map((actor) => ({ id: actor.id })),
      },
      directorId: body.director.id,

      image: "/images/" + body.image,
      Categories: {
        connect: body.Categories.map((cat) => ({ id: cat.id })),
      },
    },
  });
  return new Response(JSON.stringify(film));
}
