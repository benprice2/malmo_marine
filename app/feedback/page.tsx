"use client";

import { useState, useEffect, Suspense } from "react";
import MainLayout from "../components/MainLayout";
import { useSearchParams } from "next/navigation"; 

function FeedbackContent() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    message: "",
    rating: "3",
    access_key: "c8f0e842-f3e6-4c66-9977-071d8a1ee389", // Replace this with your actual Web3Forms API key
    botcheck: "", // Honeypot field to prevent spam
    redirect: "", // Will be set in useEffect
  });
  
  // Set the redirect URL after component mounts to avoid SSR issues with window.location
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      redirect: window.location.origin + "/feedback?success=true"
    }));
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Check for success parameter in URL
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setSubmitSuccess(true);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...formData,
          subject: `New Feedback: ${formData.feedbackType} (Rating: ${formData.rating}/5)`,
          from_name: "Malmo Marine Feedback"
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          feedbackType: "",
          message: "",
          rating: "3",
          access_key: formData.access_key, // Preserve the API key
          botcheck: "", // Reset honeypot field
          redirect: formData.redirect, // Preserve the redirect URL
        });
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("There was an error submitting your feedback. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-pink-50 py-12 sm:py-16 md:py-20">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800">
            Your <span className="text-[#E91E63]">Feedback</span>
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            We value your input! Whether you&apos;ve found a bug, have a suggestion, or want to share an idea, 
            we want to hear from you.
          </p>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-12 sm:py-16 bg-pink-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Thank You for Your Feedback!</h3>
                  <p className="text-gray-600 mb-4">Your input helps us improve Malmo Marine for everyone.</p>
                  <div className="flex justify-center">
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="btn-primary"
                    >
                      Submit Another Feedback
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field to prevent spam */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  
                  {/* Hidden redirect field */}
                  <input 
                    type="hidden" 
                    name="redirect"
                    value={formData.redirect}
                  />
                  
                  {/* Hidden access_key field */}
                  <input 
                    type="hidden" 
                    name="access_key"
                    value={formData.access_key}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Thoughts</h2>
                    <p className="text-gray-600 mb-6">
                      Your feedback helps us improve our platform and provide better service to the maritime community.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback Type
                    </label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                    >
                      <option value="">Select feedback type</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Improvement Suggestion">Improvement Suggestion</option>
                      <option value="General Feedback">General Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
                      placeholder="Please describe your feedback in detail. For bug reports, include steps to reproduce the issue."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate your experience with Malmo Marine?
                    </label>
                    <div className="flex items-center justify-between max-w-xs mx-auto">
                      <span className="text-gray-500 text-sm">Poor</span>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <label key={rating} className="cursor-pointer">
                            <input
                              type="radio"
                              name="rating"
                              value={rating.toString()}
                              checked={formData.rating === rating.toString()}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              formData.rating === rating.toString() 
                                ? 'bg-[#E91E63] text-white' 
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            } transition-colors`}>
                              {rating}
                            </div>
                          </label>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">Excellent</span>
                    </div>
                  </div>
                  
                  {submitError && (
                    <div className="text-red-500 text-sm">{submitError}</div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Feedback Matters Section */}
      <section className="py-12 sm:py-16 bg-pink-50">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
            Why Your <span className="text-[#E91E63]">Feedback Matters</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Continuous Improvement</h3>
              <p className="text-gray-600">
                Your feedback helps us identify areas where we can improve and enhance the Malmo Marine platform for all users.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">New Features</h3>
              <p className="text-gray-600">
                Many of our best features come directly from user suggestions. Your ideas could shape the future of our platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FCE4EC] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E91E63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Community Voice</h3>
              <p className="text-gray-600">
                We believe in building a platform that truly serves the maritime community, and that means listening to your experiences and needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default function Feedback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackContent />
    </Suspense>
  );
}
