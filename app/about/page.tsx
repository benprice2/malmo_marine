import Image from "next/image";
import MainLayout from "../components/MainLayout";

export default function AboutUs() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-[#FCE4EC] py-12 sm:py-16 md:py-20">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800">
            About <span className="text-[#E91E63]">Malmo Marine</span>
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 bg-[#FCE4EC]">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Malmo Marine exists to give mariners clarity and direction in their careers – whether
                they're at sea or land based. We believe every seafarer deserves access to
                transparent, practical career pathways that show exactly what's next and how to get
                there.
              </p>
              <p className="text-gray-600 mb-4">
                At the same time, we believe employers deserve access to qualified, trustworthy
                individuals who are genuinely prepared for the roles they offer. By connecting skilled,
                job-ready mariners with verified companies, Malmo Marine helps build stronger
                crews, safer operations, and a more reliable maritime workforce for New Zealand.
              </p>
              <p className="text-gray-600">
                Built by the industry, for the industry, Malmo Marine combines real maritime insight
                with an easy to use platform to simplify career navigation and job-seeking.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/marin1.png"
                alt="Malmo Marine story"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
            How We <span className="text-[#E91E63]">Work</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Seafarers can store their qualifications, sea-time, and experience in one place, while employers
              have access to a verified pool of skilled, career-driven professionals qualified and
              ready to join your crew, your vessel, or your admin team ashore.
            </p>
            <p className="text-gray-600 mb-6">
              Our network ensures maritime-specific jobs reach the right candidates — and the
              right candidates apply for the right roles. No more "Heavy Diesel Mechanic" when
              you search "Maritime Engineer," and no more "Forklift-certified, fresh-out-of-high-
              school 19-year-olds" applying for "Chief Engineer" on your 500GT vessel.
            </p>
            <p className="text-gray-600 mb-6">
              Shaped with feedback from professionals across New Zealand's maritime industry —
              from major fishing companies to local boat builders — Malmo Marine was created to
              bridge the shores between employers and employees.
            </p>
            <p className="text-gray-600 font-semibold text-center text-lg">
              We are your seamen when you need 'em.
            </p>
            <div className="flex justify-center mt-6">
              <div className="w-20 h-1 bg-[#E91E63] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 sm:py-16 bg-pink-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-gray-800">
            Our <span className="text-[#E91E63]">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from our platform's functionality to the quality of opportunities we help create.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Community</h3>
              <p className="text-gray-600">
                We believe in fostering a strong marine community in New Zealand, supporting growth and collaboration across the industry.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate our platform and services to better serve the evolving needs of New Zealand's marine industry.
              </p>
            </div>
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
