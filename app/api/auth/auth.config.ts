import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
  role: string;
  company?: string;
  cvUrl?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
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
          console.log("User authenticated successfully", user.email);
          return user;
        }

        console.log("Authentication failed for", credentials.email);
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: CustomUser | null }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        if (user.company) token.company = user.company;
        if (user.cvUrl) token.cvUrl = user.cvUrl;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
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
  secret: process.env.NEXTAUTH_SECRET,
};
