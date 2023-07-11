import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "******" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:3000/api/logIn", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: "profile email https://www.googleapis.com/auth/user.birthday.read",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        console.log(existingUser ? existingUser : "no user");
        console.log(profile.sub);
        console.log(profile.name);
        console.log(profile.email);
        const imageUrl = await fetchProfileImage(
          profile.sub,
          account.access_token
        );

        console.log(imageUrl);

        if (!existingUser) {
          const user = await prisma.user.create({
            data: {
              id: profile.sub,

              name: profile.name,
              image: imageUrl,
              email: profile.email,

              DOB: new Date(profile?.birthDate),

              // Set any other relevant fields
            },
          });
          return user;
        }
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        // Add the 'id' property to the session user object
        session.user.id = token.uid || null;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id || null;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
async function fetchProfileImage(userId, accessToken) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/userinfo/v2/me?fields=picture&access_token=${accessToken}`
    );
    return response.data.picture || null;
  } catch (error) {
    console.log("Error fetching profile image:", error);
    return null;
  }
}

export { handler as GET, handler as POST };
