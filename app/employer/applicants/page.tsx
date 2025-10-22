"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Mock data for jobs
const mockJobs = [
  { id: "1", title: "Marine Engineer", location: "Auckland, NZ" },
  { id: "2", title: "Boat Builder", location: "Wellington, NZ" },
  { id: "3", title: "Marine Technician", location: "Christchurch, NZ" },
];

// Mock data for applicants
const mockApplicants = [
  {
    id: "1",
    jobId: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    appliedAt: "2025-09-20T10:30:00Z",
    cvUrl: "https://example.com/cv/john-smith.pdf",
  },
  {
    id: "2",
    jobId: "1",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    appliedAt: "2025-09-21T14:45:00Z",
    cvUrl: "https://example.com/cv/emma-johnson.pdf",
  },
  {
    id: "3",
    jobId: "1",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    appliedAt: "2025-09-22T09:15:00Z",
    cvUrl: null,
  },
  {
    id: "4",
    jobId: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    appliedAt: "2025-09-19T11:20:00Z",
    cvUrl: "https://example.com/cv/sarah-wilson.pdf",
  },
  {
    id: "5",
    jobId: "2",
    name: "David Taylor",
    email: "david.taylor@example.com",
    appliedAt: "2025-09-23T16:10:00Z",
    cvUrl: "https://example.com/cv/david-taylor.pdf",
  },
  {
    id: "6",
    jobId: "3",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    appliedAt: "2025-09-24T13:40:00Z",
    cvUrl: null,
  },
];

function ApplicantsList() {
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("jobId");
  
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobIdParam);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (jobIdParam) {
      setSelectedJobId(jobIdParam);
    }
  }, [jobIdParam]);

  const filteredApplicants = selectedJobId
    ? mockApplicants
        .filter(applicant => applicant.jobId === selectedJobId)
        .filter(applicant => 
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : mockApplicants.filter(applicant => 
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getJobTitle = (jobId: string) => {
    const job = mockJobs.find(job => job.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {selectedJobId 
          ? `Applicants for ${getJobTitle(selectedJobId)}`
          : "All Applicants"
        }
      </h1>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="sm:w-1/3">
          <label htmlFor="job-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Job
          </label>
          <select
            id="job-filter"
            value={selectedJobId || ""}
            onChange={(e) => setSelectedJobId(e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
          >
            <option value="">All Jobs</option>
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} - {job.location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sm:w-2/3">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Applicants
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
          />
        </div>
      </div>
      
      {filteredApplicants.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No applicants found.</p>
          {(selectedJobId || searchTerm) && (
            <p className="mt-2">
              Try adjusting your filters or{" "}
              <button
                onClick={() => {
                  setSelectedJobId(null);
                  setSearchTerm("");
                }}
                className="text-[#E91E63] hover:underline"
              >
                clear all filters
              </button>
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                {!selectedJobId && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CV
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.email}</div>
                    </div>
                  </td>
                  {!selectedJobId && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getJobTitle(applicant.jobId)}</div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(applicant.appliedAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {applicant.cvUrl ? (
                      <a
                        href={applicant.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E91E63] hover:underline"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-500">Not provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#E91E63] hover:underline mr-4">
                      Contact
                    </button>
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

export default function Applicants() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicantsList />
    </Suspense>
  );
}
