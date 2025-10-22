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
      <section className="bg-[#FCE4EC] py-20">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Find Your Next <span className="text-[#E91E63]">Marine Job</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connecting marine professionals with the best opportunities across New Zealand.
                Whether you&apos;re looking for work or hiring talent, we&apos;ve got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup?role=employer" className="btn-primary">
                  Post a Job
                </Link>
                <Link href="/auth/signup?role=employee" className="btn-outline">
                  Find Jobs
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/banner.png"
                alt="Marine professionals"
                width={600}
                height={400}
                className="rounded-lg "
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#E91E63] mb-12">
            Recent <span className="text-[#E91E63]">Job Listings</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* These would be dynamically generated from the database */}
            {recentJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
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
                    <span className="text-xs font-medium bg-[#FCE4EC] text-[#E91E63] px-2 py-1 rounded-full inline-block">
                      {job.type}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-1">{job.title}</h3>
                  </div>
                </div>
                <p className="text-[#E91E63] font-medium text-sm mb-2">{job.company}</p>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  We are looking for an experienced {job.title} to join our team in {job.location}. The ideal candidate will have relevant experience...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{job.location}</span>
                  <Link href={`/employee/jobs/${job.id}`} className="text-[#E91E63] font-medium hover:underline">
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
