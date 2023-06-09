import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

export async function Post(request) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      first_name: body.f_name,
      last_name: body.l_name,
      DOB: body.DOB,
      gender: body.gender,
      Email: body.Email,
    },
  });
  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
