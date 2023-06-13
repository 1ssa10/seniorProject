import prisma from "@/lib/prisma.js";
import * as bcrypt from "bcrypt";
import { DateTime } from "luxon";

export async function POST(request) {
  const body = await request.json();

  const dob = DateTime.fromISO(body.DOB);

  const user = await prisma.user.create({
    data: {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      first_name: body.first_name,
      last_name: body.last_name,
      DOB: dob.toJSDate(),
      gender: body.gender,
      email: body.email,
      image: body.image,
      name: body.first_name + " " + body.last_name,
    },
  });
  const { password, ...result } = user;

  return new Response(JSON.stringify(result));
}
