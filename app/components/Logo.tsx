"use client";

import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        {/* Ship wheel icon */}
        <svg
          className="w-10 h-10 text-[#E91E63]"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 1a1 1 0 011 1v2a1 1 0 11-2 0V6a1 1 0 011-1zm0 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm6-7a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM6 12a1 1 0 01-1-1v0a1 1 0 011-1h2a1 1 0 110 2H6zm8.485-4.485a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zM9.515 16.485a1 1 0 01-1.414 0L6.687 15.07a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zm0-8.97a1 1 0 010 1.414L8.101 10.343a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm6.97 6.97a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM12 10a2 2 0 110 4 2 2 0 010-4z" />
        </svg>
        <span className="ml-2 text-xl font-bold font-heading text-gray-800 hover:text-[#E91E63]">
          Malmo Marine
        </span>
      </div>
    </Link>
  );
};

export default Logo;
