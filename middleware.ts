import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// This function can be marked `async` if using `await` inside
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('Middleware running, token present:', !!req.nextauth.token);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Middleware authorization check, token:', !!token);
        return !!token;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// Protect routes that require authentication
export const config = {
  matcher: [
    '/employee/:path*',
    '/employer/:path*',
    '/admin/:path*',
  ],
};
