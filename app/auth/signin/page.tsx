"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setFormError("");
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setFormError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Redirect based on user role
      // In a real app, you'd get this from the session
      if (email === "employer@example.com") {
        router.push("/employer/jobs");
      } else if (email === "employee@example.com") {
        router.push("/employee/jobs");
      } else {
        router.push(callbackUrl);
      }
    } catch (_error) {
      setFormError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back to Malmo Marine
            </p>
          </div>
          
          {(error || formError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error === "CredentialsSignin" 
                ? "Invalid email or password" 
                : formError || "An error occurred"}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#E91E63] focus:ring-[#E91E63] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#E91E63] hover:text-[#C2185B]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E91E63] hover:bg-[#C2185B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] disabled:bg-pink-300"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="font-medium text-[#E91E63] hover:text-[#C2185B]">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          
          {/* Demo accounts info */}
          <div className="mt-6 border-t border-gray-200 pt-4 text-gray-500">
            <h3 className="text-sm font-medium text-gray-500 text-center mb-2">Demo Accounts</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Employer Login:</p>
                <p>employer@example.com</p>
                <p>password</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Employee Login:</p>
                <p>employee@example.com</p>
                <p>password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
