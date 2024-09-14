import dbConnect from "@/utils/dbConnect";
import User from "@/utils/models/userSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Type Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await dbConnect();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw new Error("User Does not exist");
        }

        const isPsdCrct = await bcrypt.compare(password, existingUser.password);
        console.log({ isPsdCrct });

        if (!isPsdCrct) {
          // return NextResponse.json({message:"Wrong Password"},{status: 400})
          throw new Error("Password Wrong");
        }

        return existingUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (!token._id) {
          await dbConnect();
          const userExisted = await User.findOne({ email: token.email });
          if (!userExisted) return null;
          token.username = userExisted.username;
          token._id = userExisted._id;
        }
      }
      return token;
    },
    session({ session, user, token }) {
      session.user._id = token._id;
      session.user.username = token.username;
      console.log({ session });

      return session;
    },
  },
});

export { handler as GET, handler as POST };
