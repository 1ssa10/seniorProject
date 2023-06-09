import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

export async function Post(request) {
  const body = await request.jason();

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
