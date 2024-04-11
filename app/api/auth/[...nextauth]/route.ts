import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { http } from "../../../../lib/custom-axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johnsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const res = await http.post("/Auth/login", { 
            username: credentials.username,
            password: credentials.password
          });

          if (res.data) {
            return res.data;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // const sessionInfo = {
      //   user: {
      //     id: token.id,
      //     username: token.username,
      //   },
      //   expires: session.expires,
      //   accessToken: token.token,
      // };

      // return sessionInfo as Session;
      if (token && token.user) {
        session.user = token.user as User;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return { ...token, ...user };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };