"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(roleParam || "EMPLOYEE");
  const [company, setCompany] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (role === "EMPLOYER" && !company) {
      setError("Company name is required for employer accounts");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // In a real app, you would send this data to your API
      // For this demo, we'll simulate a successful registration
      
      setTimeout(() => {
        // Redirect to sign-in page after successful registration
        router.push("/auth/signin");
      }, 1500);
      
    } catch (error) {
      setError("An error occurred. Please try again." + (error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join Malmo Marine to find your next opportunity
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a... *
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="role-employee"
                      name="role"
                      type="radio"
                      value="EMPLOYEE"
                      checked={role === "EMPLOYEE"}
                      onChange={() => setRole("EMPLOYEE")}
                      className="focus:ring-[#E91E63] h-4 w-4 text-[#E91E63] border-gray-300"
                    />
                    <label htmlFor="role-employee" className="ml-2 block text-sm text-gray-700">
                      Job Seeker
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="role-employer"
                      name="role"
                      type="radio"
                      value="EMPLOYER"
                      checked={role === "EMPLOYER"}
                      onChange={() => setRole("EMPLOYER")}
                      className="focus:ring-[#E91E63] h-4 w-4 text-[#E91E63] border-gray-300"
                    />
                    <label htmlFor="role-employer" className="ml-2 block text-sm text-gray-700">
                      Employer
                    </label>
                  </div>
                </div>
              </div>
              
              {role === "EMPLOYER" && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                    placeholder="ABC Marine Ltd"
                  />
                </div>
              )}
              
              {role === "EMPLOYEE" && (
                <div>
                  <label htmlFor="cvUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    CV/Resume Link (Optional)
                  </label>
                  <input
                    id="cvUrl"
                    name="cvUrl"
                    type="url"
                    value={cvUrl}
                    onChange={(e) => setCvUrl(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] sm:text-sm"
                    placeholder="https://example.com/my-resume.pdf"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E91E63] hover:bg-[#C2185B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] disabled:bg-pink-300"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/signin" className="font-medium text-[#E91E63] hover:text-[#C2185B]">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
