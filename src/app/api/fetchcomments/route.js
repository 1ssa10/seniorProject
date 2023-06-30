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
    },
  });
  return new Response(JSON.stringify(comments));
}
