"use client";

import React from "react";
import Link from "next/link";

export default function Roadmap() {
  const stages = [
    {
      id: "current",
      title: "Current Stage: Prototype",
      description: "Initial prototype with basic functionality and UI design.",
      features: [
        "User authentication (sign up, sign in)",
        "Job listings and applications",
        "Employer and employee profiles",
        "Responsive design for all devices"
      ],
      status: "active"
    },
    {
      id: "stage1",
      title: "Stage 1: Fully Functioning Job Portal",
      description: "Complete job portal with enhanced features and real-time functionality.",
      features: [
        "Advanced search and filtering options",
        "Email notifications for applications and job matches",
        "Upload and store CV/Qualifications",
        "Messaging system between employers and candidates",
        "Job recommendations based on skills and experience"
      ],
      status: "upcoming"
    },
    {
      id: "stage2",
      title: "Stage 2: Ticket/Qualification Verification System",
      description: "Integrated verification system for marine qualifications and certifications.",
      features: [
        "Secure digital storage of qualifications and certificates",
        "Verification process for uploaded credentials",
        "Expiry tracking and renewal reminders",
        "Integration with official marine certification bodies",
        "Qualification-based job matching"
      ],
      status: "planned"
    },
    {
      id: "stage3",
      title: "Stage 3: Industry Insights and Analytics",
      description: "Data-driven insights and analytics for the marine industry.",
      features: [
        "Salary benchmarking and industry trends",
        "Regional demand mapping for marine roles",
        "Career progression pathways",
        "Skills gap analysis for job seekers",
        "Hiring pattern analytics for employers"
      ],
      status: "planned"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Malmo Marine <span className="text-[#E91E63]">Roadmap</span>
            </h1>
            <p className="text-lg text-gray-600">
              Our vision and development plan for the future of Malmo Marine.
            </p>
          </div>

          <div className="space-y-16">
            {stages.map((stage) => (
              <div key={stage.id} className="relative">
                {/* Timeline connector */}
                {stage.id !== "stage3" && (
                  <div className="absolute left-8 top-16 bottom-0 w-1 bg-gray-200"></div>
                )}
                
                <div className="flex items-start">
                  {/* Status indicator */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mr-4 
                    ${stage.status === 'active' 
                      ? 'bg-[#E91E63] text-white' 
                      : stage.status === 'upcoming' 
                        ? 'bg-[#FCE4EC] text-[#E91E63] border-2 border-[#E91E63]' 
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-300'}`}>
                    {stage.status === 'active' && (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {stage.status === 'upcoming' && (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {stage.status === 'planned' && (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <h2 className={`text-xl sm:text-2xl font-bold mb-3 
                      ${stage.status === 'active' 
                        ? 'text-[#E91E63]' 
                        : stage.status === 'upcoming' 
                          ? 'text-gray-800' 
                          : 'text-gray-600'}`}>
                      {stage.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{stage.description}</p>
                    
                    <div className={`bg-gray-50 rounded-lg p-4 border-l-4 
                      ${stage.status === 'active' 
                        ? 'border-[#E91E63]' 
                        : stage.status === 'upcoming' 
                          ? 'border-blue-400' 
                          : 'border-gray-300'}`}>
                      <h3 className="font-semibold text-gray-800 mb-2">Key Features:</h3>
                      <ul className="space-y-2">
                        {stage.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className={`w-5 h-5 mr-2 mt-0.5 
                              ${stage.status === 'active' 
                                ? 'text-[#E91E63]' 
                                : stage.status === 'upcoming' 
                                  ? 'text-blue-400' 
                                  : 'text-gray-400'}`} 
                              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              This roadmap is subject to change based on user feedback and industry needs.
            </p>
            <Link href="/" className="inline-flex items-center text-[#E91E63] hover:underline">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
