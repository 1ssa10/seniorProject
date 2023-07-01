import prisma from "@/lib/prisma";

export async function POST(request) {
  const id = await request.json();
  const comments = await prisma.rating.findMany({
    where: {
      filmId: id.id,
    },
    include: {
      comment: {
        select: {
          comment_detail: true,
        },
      },
      rater: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return new Response(JSON.stringify(comments));
}
