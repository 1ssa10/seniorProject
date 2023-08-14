import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const alreadyRated = await prisma.rating.findFirst({
    where: {
      userId: body.user_id,
      filmId: body.id,
    },
    include: {
      comment: {
        select: {
          id: true,
          comment_detail: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(alreadyRated));
}
