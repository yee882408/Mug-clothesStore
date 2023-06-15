import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@models/user";
import { connectToDB } from "@utils/database";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectToDB();

        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          return null;
        }

        // 比對使用者密碼
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          return null;
        }

        return result;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      // 儲存user的id
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();

        // 避免使用credential登入時，沒有name的狀況
        // 當使用credential登入時，儲存username到session
        session.user.name = sessionUser.username;
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        if (profile) {
          const googleUserExists = await User.findOne({
            email: profile.email || credentials.email,
          });

          if (!googleUserExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              password: profile.email,
              image: profile.picture,
            });
          }
        }
        return true;
      } catch (error) {
        console.log("檢查使用者時發生錯誤:", error.message);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
