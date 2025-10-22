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
        <span className="text-lg sm:text-xl font-bold font-heading text-gray-800 hover:text-[#E91E63]">
          Malmo Marine
        </span>
      </div>
    </Link>
  );
};

export default Logo;
