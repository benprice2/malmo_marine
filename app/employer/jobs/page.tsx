"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock data for jobs
const mockJobs = [
  {
    id: "1",
    title: "Marine Engineer",
    company: "Auckland Marine Services",
    logo: "/images/companies/company1.jpg",
    description: "We are looking for an experienced Marine Engineer to join our team in Auckland.",
    location: "Auckland, NZ",
    createdAt: "2025-09-15T10:00:00Z",
    applications: 5,
  },
  {
    id: "2",
    title: "Boat Builder",
    company: "Wellington Yacht Crafters",
    logo: "/images/companies/company2.jpg",
    description: "Skilled boat builder needed for custom yacht construction.",
    location: "Wellington, NZ",
    createdAt: "2025-09-20T14:30:00Z",
    applications: 3,
  },
  {
    id: "3",
    title: "Marine Technician",
    company: "Christchurch Boat Repairs",
    logo: "/images/companies/company3.webp",
    description: "Marine technician needed for engine repairs and maintenance.",
    location: "Christchurch, NZ",
    createdAt: "2025-09-25T09:15:00Z",
    applications: 2,
  },
];

export default function EmployerJobs() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0 text-gray-800">My Job Listings</h1>
        <Link
          href="/employer/create-job"
          className="btn-primary"
        >
          Create New Job
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No job listings found.</p>
          {searchTerm && (
            <p className="mt-2 text-gray-300">
              Try adjusting your search or{" "}
              <button
                onClick={() => setSearchTerm("")}
                className="text-[#E91E63] hover:underline"
              >
                clear the search
              </button>
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden border border-gray-200">
                    <Image 
                      src={job.logo || "/images/companies/default.png"}
                      alt={`${job.company} logo`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <p className="text-gray-500 text-sm">{job.location} • Posted on {formatDate(job.createdAt)}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="bg-[#FCE4EC] text-[#E91E63] text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {job.applications} {job.applications === 1 ? "application" : "applications"}
                  </span>
                </div>
              </div>
              
              <p className="mt-2 text-gray-600 line-clamp-2">{job.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/employer/applicants?jobId=${job.id}`}
                  className="text-sm px-3 py-1 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  View Applicants
                </Link>
                <Link
                  href={`/employer/jobs/${job.id}/edit`}
                  className="text-sm px-3 py-1 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="text-sm px-3 py-1 text-gray-800 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
