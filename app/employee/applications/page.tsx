"use client";

import { useState } from "react";
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
  
  const filteredApplications = statusFilter === "ALL"
    ? mockApplications
    : mockApplications.filter(app => app.status === statusFilter);

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
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h1>
      
      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
        >
          <option value="ALL" className="text-gray-500">All Applications</option>
          <option value="PENDING" className="text-gray-500">Pending</option>
          <option value="VIEWED" className="text-gray-500">Viewed</option>
          <option value="INTERVIEW" className="text-gray-500">Interview</option>
          <option value="REJECTED" className="text-gray-500">Rejected</option>
        </select>
      </div>
      
      {filteredApplications.length === 0 ? (
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
        <div className="overflow-x-auto">
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
                <tr key={application.id}>
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
      )}
    </div>
  );
}
