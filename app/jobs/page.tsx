"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "../components/MainLayout";

// Define job interface
interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  salary: string | null;
  createdAt: string;
  employmentType?: string;
  workType?: string;
  vesselType?: string;
}

// Mock data for jobs - same as in employee/jobs/page.tsx
const mockJobs: Job[] = [
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

// Define filter options
const employmentTypes = ["Full-time", "Contract", "Seasonal", "Part-time"];
const workTypes = ["Sea-faring", "Land-based"];
const vesselTypes = ["Commercial", "Fishing", "Charter", "Engineering", "Logistics"];

// Add these properties to the mock jobs
mockJobs.forEach((job, index) => {
  // Add random values for demonstration purposes
  job.employmentType = employmentTypes[index % employmentTypes.length];
  job.workType = workTypes[index % workTypes.length];
  job.vesselType = vesselTypes[index % vesselTypes.length];
});

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");
  const [vesselTypeFilter, setVesselTypeFilter] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(mockJobs.map(job => job.location)));
  
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = locationFilter === "" || job.location === locationFilter;
    const matchesEmploymentType = employmentTypeFilter === "" || job.employmentType === employmentTypeFilter;
    const matchesWorkType = workTypeFilter === "" || job.workType === workTypeFilter;
    const matchesVesselType = vesselTypeFilter === "" || job.vesselType === vesselTypeFilter;
    
    return matchesSearch && matchesLocation && matchesEmploymentType && matchesWorkType && matchesVesselType;
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
    <MainLayout>
      <section className="bg-[#FCE4EC] py-12 sm:py-16 md:py-20">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800">
            Marine <span className="text-[#E91E63]">Jobs</span>
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Find your perfect role in the maritime industry with Malmo Marine&apos;s job listings
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-600"
                />
              </div>
              <div className="flex flex-nowrap">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full min-w-[160px] flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md text-ellipsis"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="whitespace-nowrap flex-shrink-0 ml-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center justify-center transition-colors"
                  aria-expanded={showAdvancedSearch}
                >
                  <span className="hidden sm:inline mr-1">{showAdvancedSearch ? 'Hide' : 'Show'} Filters</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAdvancedSearch ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Advanced Search Filters */}
            {showAdvancedSearch && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 transition-all">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Advanced Search</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Employment Type Filter */}
                  <div>
                    <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      id="employmentType"
                      value={employmentTypeFilter}
                      onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-sm"
                    >
                      <option value="">All Types</option>
                      {employmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Work Type Filter */}
                  <div>
                    <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Type
                    </label>
                    <select
                      id="workType"
                      value={workTypeFilter}
                      onChange={(e) => setWorkTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-sm"
                    >
                      <option value="">All Types</option>
                      {workTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Vessel Type Filter */}
                  <div>
                    <label htmlFor="vesselType" className="block text-sm font-medium text-gray-700 mb-1">
                      Vessel Type
                    </label>
                    <select
                      id="vesselType"
                      value={vesselTypeFilter}
                      onChange={(e) => setVesselTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-sm"
                    >
                      <option value="">All Types</option>
                      {vesselTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Location Filter (duplicated in advanced search) */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select
                      id="location"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-sm"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setLocationFilter("");
                      setEmploymentTypeFilter("");
                      setWorkTypeFilter("");
                      setVesselTypeFilter("");
                    }}
                    className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-md text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
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
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">{job.employmentType}</span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{job.workType}</span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{job.vesselType}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="flex justify-end">
                    <Link
                      href={`/jobs/${job.id}`}
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
        </div>
      </section>
    </MainLayout>
  );
}
