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
    description: "We are looking for an experienced Marine Engineer to join our team in Auckland. The ideal candidate will have at least 5 years of experience in marine engineering and be familiar with various types of marine engines and systems.",
    location: "Auckland, NZ",
    salary: "$70,000 - $90,000",
    createdAt: "2025-09-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Boat Builder",
    company: "Wellington Yacht Crafters",
    logo: "/images/companies/company2.jpg",
    description: "Skilled boat builder needed for custom yacht construction. Experience with fiberglass, wood, and composite materials required. Must be able to read and interpret blueprints and technical drawings.",
    location: "Wellington, NZ",
    salary: "$60,000 - $80,000",
    createdAt: "2025-09-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Marine Technician",
    company: "Christchurch Boat Repairs",
    logo: "/images/companies/company3.webp",
    description: "Marine technician needed for engine repairs and maintenance. Experience with outboard and inboard engines required. Certification preferred but not required for candidates with extensive experience.",
    location: "Christchurch, NZ",
    salary: null,
    createdAt: "2025-09-25T09:15:00Z",
  },
  {
    id: "4",
    title: "Yacht Captain",
    company: "Bay of Islands Charters",
    logo: "/images/companies/company4.webp",
    description: "Experienced yacht captain needed for luxury charter operations in the Bay of Islands. Must have valid certifications and at least 3 years of experience as a captain on vessels 40ft or larger.",
    location: "Bay of Islands, NZ",
    salary: "$85,000 - $110,000",
    createdAt: "2025-09-26T11:45:00Z",
  },
  {
    id: "5",
    title: "Marine Electrician",
    company: "Tauranga Marine Electronics",
    logo: "/images/companies/company5.png",
    description: "Marine electrician needed for installation and repair of electrical systems on various vessels. Experience with marine electronics, navigation systems, and power distribution required.",
    location: "Tauranga, NZ",
    salary: "$65,000 - $85,000",
    createdAt: "2025-09-27T13:20:00Z",
  },
];

export default function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  
  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(mockJobs.map(job => job.location)));
  
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = locationFilter === "" || job.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold mb-6">Browse Jobs</h1>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 ">
          <input
            type="text"
            placeholder="Search jobs by title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
          />
        </div>
        <div>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63]"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No jobs found matching your criteria.</p>
          <p className="mt-2">
            Try adjusting your search or{" "}
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
              }}
              className="text-[#E91E63] hover:underline"
            >
              clear all filters
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
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
                  <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                </div>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  Posted on {formatDate(job.createdAt)}
                </span>
              </div>
              
              <div className="mb-4 ml-0 sm:ml-[52px]">
                <span className="text-[#E91E63] font-medium">{job.company}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{job.location}</span>
                {job.salary && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{job.salary}</span>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
              
              <div className="flex justify-end">
                <Link
                  href={`/employee/jobs/${job.id}`}
                  className="btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
