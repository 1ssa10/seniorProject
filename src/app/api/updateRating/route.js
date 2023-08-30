import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();

  const updatedRate = await prisma.rating.update({
    where: {
      userId_filmId: {
        filmId: body.filmid,
        userId: body.userid,
      },
    },
    data: {
      nb_stars: body.nbstars,
      comment: {
        update: {
          data: {
            comment_detail: body.comment + "(edited)",
          },
        },
      },
    },
  });

  return new Response(JSON.stringify(updatedRate));
}
