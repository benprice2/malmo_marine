"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MainLayout from "../../components/MainLayout";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  salary: string | null;
  createdAt: string;
  companyDescription: string;
  employmentType?: string;
  workType?: string;
  vesselType?: string;
}

// Define filter options for adding to mock data
const employmentTypes = ["Full-time", "Contract", "Seasonal", "Part-time"];
const workTypes = ["Sea-faring", "Land-based"];
const vesselTypes = ["Commercial", "Fishing", "Charter", "Engineering", "Logistics"];

// Mock data for jobs - same as in employee/jobs/[id]/page.tsx
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Marine Engineer",
    company: "Auckland Marine Services",
    logo: "/images/companies/company1.jpg",
    description: "We are looking for an experienced Marine Engineer to join our team in Auckland. The ideal candidate will have at least 5 years of experience in marine engineering and be familiar with various types of marine engines and systems.\n\nResponsibilities:\n- Perform maintenance and repairs on marine engines and systems\n- Diagnose mechanical and electrical issues\n- Install new equipment and systems\n- Ensure compliance with safety regulations\n- Maintain detailed records of work performed\n\nRequirements:\n- 5+ years of experience in marine engineering\n- Strong knowledge of diesel and gasoline marine engines\n- Familiarity with electrical systems and electronics\n- Ability to read and interpret technical manuals and drawings\n- Strong problem-solving skills\n- Physical ability to work in confined spaces",
    location: "Auckland, NZ",
    salary: "$70,000 - $90,000",
    createdAt: "2025-09-15T10:00:00Z",
    companyDescription: "Auckland Marine Services is a leading provider of marine engineering and repair services in the Auckland region. With over 20 years in business, we service a wide range of vessels from small pleasure craft to commercial ships."
  },
  {
    id: "2",
    title: "Boat Builder",
    company: "Wellington Yacht Crafters",
    logo: "/images/companies/company2.jpg",
    description: "Skilled boat builder needed for custom yacht construction. Experience with fiberglass, wood, and composite materials required. Must be able to read and interpret blueprints and technical drawings.\n\nResponsibilities:\n- Construct and repair boats according to specifications\n- Work with various materials including fiberglass, wood, and composites\n- Read and interpret blueprints and technical drawings\n- Use hand and power tools with precision\n- Ensure quality standards are met\n\nRequirements:\n- 3+ years of experience in boat building\n- Knowledge of various construction materials and techniques\n- Ability to read and interpret technical drawings\n- Attention to detail and commitment to quality\n- Strong manual dexterity and physical stamina",
    location: "Wellington, NZ",
    salary: "$60,000 - $80,000",
    createdAt: "2025-09-20T14:30:00Z",
    companyDescription: "Wellington Yacht Crafters specializes in custom yacht construction and restoration. Our team of skilled craftsmen combines traditional techniques with modern materials to create beautiful, seaworthy vessels."
  },
  {
    id: "3",
    title: "Marine Technician",
    company: "Christchurch Boat Repairs",
    logo: "/images/companies/company3.webp",
    description: "Marine technician needed for engine repairs and maintenance. Experience with outboard and inboard engines required. Certification preferred but not required for candidates with extensive experience.\n\nResponsibilities:\n- Diagnose and repair marine engines and systems\n- Perform routine maintenance and inspections\n- Install new equipment and accessories\n- Provide technical advice to customers\n- Maintain inventory of parts and supplies\n\nRequirements:\n- Experience with outboard and inboard engines\n- Knowledge of marine electrical and mechanical systems\n- Strong diagnostic and problem-solving skills\n- Customer service orientation\n- Ability to work independently and as part of a team",
    location: "Christchurch, NZ",
    salary: null,
    createdAt: "2025-09-25T09:15:00Z",
    companyDescription: "Christchurch Boat Repairs is a full-service marine repair facility specializing in engine repair and maintenance. We service all major brands of outboard and inboard engines and provide comprehensive maintenance services."
  },
  {
    id: "4",
    title: "Yacht Captain",
    company: "Bay of Islands Charters",
    logo: "/images/companies/company4.webp",
    description: "Experienced yacht captain needed for luxury charter operations in the Bay of Islands. Must have valid certifications and at least 3 years of experience as a captain on vessels 40ft or larger.\n\nResponsibilities:\n- Safely navigate and operate charter yachts\n- Ensure compliance with all maritime regulations\n- Maintain vessel in excellent condition\n- Provide exceptional customer service to charter guests\n- Plan and execute sailing itineraries\n\nRequirements:\n- Valid captain's license and certifications\n- 3+ years of experience as captain on 40ft+ vessels\n- Excellent navigation and boat handling skills\n- Strong customer service orientation\n- Knowledge of Bay of Islands area preferred",
    location: "Bay of Islands, NZ",
    salary: "$85,000 - $110,000",
    createdAt: "2025-09-26T11:45:00Z",
    companyDescription: "Bay of Islands Charters offers luxury sailing experiences in one of New Zealand's most beautiful coastal regions. Our fleet of well-maintained yachts provides unforgettable adventures for our discerning clients."
  },
  {
    id: "5",
    title: "Marine Electrician",
    company: "Tauranga Marine Electronics",
    logo: "/images/companies/company5.png",
    description: "Marine electrician needed for installation and repair of electrical systems on various vessels. Experience with marine electronics, navigation systems, and power distribution required.\n\nResponsibilities:\n- Install and repair marine electrical systems\n- Troubleshoot electrical issues on boats and yachts\n- Install navigation and communication equipment\n- Ensure compliance with marine electrical codes\n- Maintain detailed service records\n\nRequirements:\n- Experience with marine electrical systems\n- Knowledge of navigation and communication equipment\n- Understanding of marine electrical codes and standards\n- Problem-solving skills and attention to detail\n- Ability to work in confined spaces and varied conditions",
    location: "Tauranga, NZ",
    salary: "$65,000 - $85,000",
    createdAt: "2025-09-27T13:20:00Z",
    companyDescription: "Tauranga Marine Electronics specializes in the installation and service of marine electrical systems and electronics. We work with recreational and commercial vessels to provide reliable, high-quality electrical solutions."
  },
];

// Add employment, work, and vessel types to mock jobs
mockJobs.forEach((job, index) => {
  // Add random values for demonstration purposes
  job.employmentType = employmentTypes[index % employmentTypes.length];
  job.workType = workTypes[index % workTypes.length];
  job.vesselType = vesselTypes[index % vesselTypes.length];
});

// Mock data for applications
const mockApplications = [
  { jobId: "1", employeeId: "2" },
  { jobId: "3", employeeId: "2" },
];

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundJob = mockJobs.find(j => j.id === jobId);
    
    if (foundJob) {
      setJob(foundJob);
      
      // Check if user has already applied (only if logged in)
      if (session?.user?.id) {
        const applied = mockApplications.some(
          app => app.jobId === jobId && app.employeeId === session.user.id
        );
        setHasApplied(applied);
      }
    } else {
      setError("Job not found");
    }
    
    setIsLoading(false);
  }, [jobId, session]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApply = () => {
    if (!session) {
      router.push(`/auth/signin?callbackUrl=/jobs/${jobId}`);
      return;
    }
    
    setIsApplying(true);
    
    // In a real app, this would be an API call to submit the application
    setTimeout(() => {
      setHasApplied(true);
      setIsApplying(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E91E63]"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !job) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
          <Link href="/jobs" className="text-[#E91E63] hover:underline">
            Back to Jobs
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-gray-50 py-8">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <Link href="/jobs" className="inline-flex items-center text-[#E91E63] hover:underline mb-6">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs
          </Link>
          
          <div className="">
            <div className="flex items-center mb-3">
              <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border border-gray-200">
                <Image 
                  src={job.logo || "/images/companies/default.png"}
                  alt={`${job.company} logo`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            </div>
            <div className="mt-2">
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
                {job.employmentType && (
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">{job.employmentType}</span>
                )}
                {job.workType && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{job.workType}</span>
                )}
                {job.vesselType && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{job.vesselType}</span>
                )}
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Posted on {formatDate(job.createdAt)}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-8 bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <h2 className="text-xl text-gray-800 font-semibold mb-4">Job Description</h2>
                  <div className="whitespace-pre-line text-gray-700">
                    {job.description}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <h2 className="text-xl text-gray-800 font-semibold mb-4">About the Company</h2>
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 mr-4 rounded-lg overflow-hidden border border-gray-200">
                      <Image 
                        src={job.logo || "/images/companies/default.png"}
                        alt={`${job.company} logo`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">{job.company}</h3>
                  </div>
                  <p className="text-gray-700">{job.companyDescription}</p>
                </div>
              
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-xl text-gray-800 font-semibold mb-4">Apply for this Job</h2>
                  {status === "loading" ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#E91E63]"></div>
                    </div>
                  ) : !session ? (
                    <div>
                      <p className="text-gray-700 mb-4">Please sign in to apply for this job.</p>
                      <Link
                        href={`/auth/signin?callbackUrl=/jobs/${jobId}`}
                        className="btn-primary w-full text-center"
                      >
                        Sign In to Apply
                      </Link>
                    </div>
                  ) : hasApplied ? (
                    <div className="text-center">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 mb-4">You have already applied for this job.</p>
                      <Link
                        href="/employee/applications"
                        className="text-[#E91E63] hover:underline"
                      >
                        View My Applications
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-4">
                        Ready to apply? Click the button below to submit your application.
                      </p>
                      <button
                        onClick={handleApply}
                        disabled={isApplying}
                        className="btn-primary w-full"
                      >
                        {isApplying ? "Submitting..." : "Apply Now"}
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </MainLayout>
  );
}
