"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  navItems: NavItem[];
  loading?: boolean;
}

const DashboardLayout = ({ 
  children, 
  title, 
  navItems, 
  loading = false 
}: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E91E63]"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!collapsed && <h2 className="text-lg font-medium text-gray-800">{title}</h2>}
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 ${
                        isActive
                          ? "bg-[#FCE4EC] text-[#E91E63] border-r-4 border-[#E91E63]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#E91E63]"
                      } transition-colors`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="ml-3">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;
