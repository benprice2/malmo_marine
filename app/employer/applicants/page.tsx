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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (jobIdParam) {
      setSelectedJobId(jobIdParam);
    }
  }, [jobIdParam]);
  
  // Simulate loading data from an API
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedJobId, searchTerm]);

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
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        {selectedJobId 
          ? `Applicants for ${getJobTitle(selectedJobId)}`
          : "All Applicants"
        }
      </h1>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label htmlFor="job-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Job
          </label>
          <select
            id="job-filter"
            value={selectedJobId || ""}
            onChange={(e) => setSelectedJobId(e.target.value || null)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500 text-sm sm:text-base"
          >
            <option value="">All Jobs</option>
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} - {job.location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Applicants
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500 text-sm sm:text-base"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E91E63]"></div>
        </div>
      ) : filteredApplicants.length === 0 ? (
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
        <>
          {/* Table view for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
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
          
          {/* Card view for small screens */}
          <div className="md:hidden space-y-4">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 pb-2 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{applicant.name}</h3>
                  <p className="text-sm text-gray-500">{applicant.email}</p>
                </div>
                
                {!selectedJobId && (
                  <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase w-1/3">Job</span>
                    <span className="text-sm text-gray-900 w-2/3 text-right">{getJobTitle(applicant.jobId)}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-500 uppercase w-1/3">Applied On</span>
                  <span className="text-sm text-gray-900 w-2/3 text-right">{formatDate(applicant.appliedAt)}</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-500 uppercase w-1/3">CV</span>
                  <span className="w-2/3 text-right">
                    {applicant.cvUrl ? (
                      <a
                        href={applicant.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#E91E63] hover:underline inline-flex items-center"
                      >
                        <span>View CV</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500">Not provided</span>
                    )}
                  </span>
                </div>
                
                <div className="mt-4 pt-1 flex justify-end">
                  <button className="px-4 py-2 text-sm text-[#E91E63] hover:bg-[#FCE4EC] rounded-md transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
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
