import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const rate = await prisma.rating.create({
    data: {
      rater: {
        connect: {
          id: body.userid,
        },
      },
      film: {
        connect: {
          id: body.filmid,
        },
      },
      comment: { create: { comment_detail: body.comment } },
      nb_stars: body.nbstars,
      date: new Date(),
    },
  });
  return new Response(JSON.stringify(rate));
}
