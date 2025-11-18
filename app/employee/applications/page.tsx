"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Mock data for applications
const mockApplications = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Marine Engineer",
    company: "Auckland Marine Services",
    location: "Auckland, NZ",
    appliedAt: "2025-09-20T10:30:00Z",
    status: "PENDING",
  },
  {
    id: "2",
    jobId: "3",
    jobTitle: "Marine Technician",
    company: "Christchurch Boat Repairs",
    location: "Christchurch, NZ",
    appliedAt: "2025-09-22T09:15:00Z",
    status: "VIEWED",
  },
  {
    id: "3",
    jobId: "5",
    jobTitle: "Marine Electrician",
    company: "Tauranga Marine Electronics",
    location: "Tauranga, NZ",
    appliedAt: "2025-09-28T14:45:00Z",
    status: "REJECTED",
  },
  {
    id: "4",
    jobId: "4",
    jobTitle: "Yacht Captain",
    company: "Bay of Islands Charters",
    location: "Bay of Islands, NZ",
    appliedAt: "2025-09-30T11:20:00Z",
    status: "INTERVIEW",
  },
];

export default function MyApplications() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data from an API
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [statusFilter]);
  
  // Define the application type
  type Application = {
    id: string;
    jobId: string;
    jobTitle: string;
    company: string;
    location: string;
    appliedAt: string;
    status: string;
  };

  // Sort applications to put rejected ones at the bottom
  const sortApplications = (applications: Application[]) => {
    return [...applications].sort((a, b) => {
      // If one is rejected and the other isn't, rejected goes to the bottom
      if (a.status === "REJECTED" && b.status !== "REJECTED") return 1;
      if (a.status !== "REJECTED" && b.status === "REJECTED") return -1;
      
      // Otherwise sort by date (newest first)
      return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
    });
  };
  
  const filteredApplications = statusFilter === "ALL"
    ? sortApplications(mockApplications)
    : sortApplications(mockApplications.filter(app => app.status === statusFilter));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "VIEWED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Viewed
          </span>
        );
      case "INTERVIEW":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Interview
          </span>
        );
      case "REJECTED":
        // Display a muted "Expired" badge for rejected applications
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">My Applications</h1>
      
      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <div className="relative">
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-64 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500 text-sm sm:text-base appearance-none"
          >
            <option value="ALL" className="text-gray-500">All Applications</option>
            <option value="PENDING" className="text-gray-500">Pending</option>
            <option value="VIEWED" className="text-gray-500">Viewed</option>
            <option value="INTERVIEW" className="text-gray-500">Interview</option>
            <option value="REJECTED" className="text-gray-500">Expired</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E91E63]"></div>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No applications found.</p>
          {statusFilter !== "ALL" && (
            <p className="mt-2">
              <button
                onClick={() => setStatusFilter("ALL")}
                className="text-[#E91E63] hover:underline"
              >
                Show all applications
              </button>
            </p>
          )}
          <Link href="/employee/jobs" className="mt-4 btn-primary inline-block">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <>
          {/* Table view for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr 
                    key={application.id} 
                    className={application.status === "REJECTED" ? "opacity-60 grayscale" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                      <div className="text-sm text-gray-500">{application.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(application.appliedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/employee/jobs/${application.jobId}`}
                        className="text-[#E91E63] hover:underline"
                      >
                        View Job
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Card view for small screens */}
          <div className="md:hidden space-y-4">
            {filteredApplications.map((application) => (
              <div 
                key={application.id} 
                className={`bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 ${application.status === "REJECTED" ? "opacity-60 grayscale" : ""}`}
              >
                <div className="mb-4 pb-2 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{application.jobTitle}</h3>
                  <p className="text-sm text-gray-500">{application.company}</p>
                  <p className="text-xs text-gray-500 mt-1">{application.location}</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-500 uppercase w-1/3">Applied On</span>
                  <span className="text-sm text-gray-900 w-2/3 text-right">{formatDate(application.appliedAt)}</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-500 uppercase w-1/3">Status</span>
                  <span className="w-2/3 text-right">
                    {getStatusBadge(application.status)}
                  </span>
                </div>
                
                <div className="mt-4 pt-1 flex justify-end">
                  <Link
                    href={`/employee/jobs/${application.jobId}`}
                    className="px-4 py-2 text-sm text-[#E91E63] hover:bg-[#FCE4EC] rounded-md transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
