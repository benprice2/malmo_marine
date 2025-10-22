"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const Navigation = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm relative z-20">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  href="/auth/signin"
                  className="btn-outline"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : session.user.role === "EMPLOYER" ? (
              <>
                <Link href="/employer/jobs" className="text-gray-700 hover:text-[#E91E63]">
                  My Jobs
                </Link>
                <Link href="/employer/create-job" className="text-gray-700 hover:text-[#E91E63]">
                  Create Job
                </Link>
                <Link href="/employer/applicants" className="text-gray-700 hover:text-[#E91E63]">
                  Applicants
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-700 hover:text-[#E91E63]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/employee/jobs" className="text-gray-700 hover:text-[#E91E63]">
                  Browse Jobs
                </Link>
                <Link href="/employee/applications" className="text-gray-700 hover:text-[#E91E63]">
                  My Applications
                </Link>
                <Link href="/employee/profile" className="text-gray-700 hover:text-[#E91E63]">
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-700 hover:text-[#E91E63]"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-30">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#E91E63] p-1 rounded-md transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      
      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-0 right-0 bg-white shadow-md border-t border-gray-100 z-20 transform transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
      >
        <div className="container-custom mx-auto py-2">
          {!session ? (
            <div className="flex flex-col space-y-3 py-2">
              <Link
                href="/auth/signin"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          ) : session.user.role === "EMPLOYER" ? (
            <div className="flex flex-col space-y-3 py-2">
              <Link
                href="/employer/jobs"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                My Jobs
              </Link>
              <Link
                href="/employer/create-job"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Create Job
              </Link>
              <Link
                href="/employer/applicants"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Applicants
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  toggleMenu();
                }}
                className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 py-2">
              <Link
                href="/employee/jobs"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Browse Jobs
              </Link>
              <Link
                href="/employee/applications"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                My Applications
              </Link>
              <Link
                href="/employee/profile"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  toggleMenu();
                }}
                className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
