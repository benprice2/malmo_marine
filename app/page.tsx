import Image from "next/image";
import Link from "next/link";
import MainLayout from "./components/MainLayout";

// Sample job data with logos
const recentJobs = [
  {
    id: "1",
    title: "Marine Engineer",
    company: "Auckland Marine Services",
    logo: "/images/companies/company1.jpg",
    type: "Full Time",
    location: "Auckland, NZ"
  },
  {
    id: "2",
    title: "Boat Builder",
    company: "Wellington Yacht Crafters",
    logo: "/images/companies/company2.jpg",
    type: "Contract",
    location: "Wellington, NZ"
  },
  {
    id: "3",
    title: "Marine Technician",
    company: "Christchurch Boat Repairs",
    logo: "/images/companies/company3.webp",
    type: "Part Time",
    location: "Christchurch, NZ"
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-[#FCE4EC] py-12 sm:py-16 md:py-20">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
                WHERE&apos;S YOUR <span className="text-[#E91E63]">SEAMEN</span>
              </h1>             
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
                WHEN YOU <span className="text-[#E91E63]">NEED&apos;EM?</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Connecting marine professionals with the best opportunities across New Zealand.
                Whether you&apos;re looking for work or hiring talent, we&apos;ve got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/auth/signup?role=employer" className="btn-primary text-center">
                  Post a Job
                </Link>
                <Link href="/auth/signup?role=employee" className="btn-outline text-center">
                  Find Jobs
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <Image
                  src="/images/banner.png"
                  alt="Marine professionals"
                  fill
                  className="rounded-lg object-contain object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#E91E63] mb-8 sm:mb-12">
            Recent <span className="text-[#E91E63]">Job Listings</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* These would be dynamically generated from the database */}
            {recentJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start sm:items-center mb-4">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 mr-3 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image 
                      src={job.logo || "/images/companies/default.png"}
                      alt={`${job.company} logo`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-medium bg-[#FCE4EC] text-[#E91E63] px-2 py-1 rounded-full inline-block">
                      {job.type}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-1">{job.title}</h3>
                  </div>
                </div>
                <p className="text-[#E91E63] font-medium text-sm mb-2">{job.company}</p>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                  We are looking for an experienced {job.title} to join our team in {job.location}. The ideal candidate will have relevant experience...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">{job.location}</span>
                  <Link href={`/employee/jobs/${job.id}`} className="text-[#E91E63] text-sm sm:text-base font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/employee/jobs" className="btn-outline">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
