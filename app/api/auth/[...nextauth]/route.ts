import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// This is a placeholder authentication handler
// In a production environment, you would validate against your database
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // In production, you would:
        // 1. Validate the credentials against your database
        // 2. Return the user object if valid
        // 3. Return null if invalid

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // This is just a placeholder - replace with actual database lookup
        const mockUsers = [
          {
            id: "1",
            name: "John Employer",
            email: "employer@example.com",
            role: "EMPLOYER",
            company: "ABC Company",
          },
          {
            id: "2",
            name: "Jane Employee",
            email: "employee@example.com",
            role: "EMPLOYEE",
            cvUrl: "https://example.com/cv.pdf",
          },
        ];

        const user = mockUsers.find(user => user.email === credentials.email);

        if (user && credentials.password === "password") {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        if (user.company) token.company = user.company;
        if (user.cvUrl) token.cvUrl = user.cvUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        if (token.company) session.user.company = token.company as string;
        if (token.cvUrl) session.user.cvUrl = token.cvUrl as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
