"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    default: "An error occurred during authentication.",
    CredentialsSignin: "Invalid email or password. Please try again.",
    OAuthAccountNotLinked: "This email is already associated with another account.",
    OAuthSignInError: "Error signing in with this provider.",
    OAuthCallbackError: "Error during authentication callback.",
    EmailSignInError: "Error sending verification email.",
    EmailCreateError: "Error creating email verification request.",
    SessionRequired: "You must be signed in to access this page.",
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
          <div>
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Authentication Error</h2>
            <p className="mt-2 text-center text-sm text-gray-600">{errorMessage}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E91E63] hover:bg-[#C2185B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63]"
            >
              Try signing in again
            </Link>
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63]"
            >
              Return to home page
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
