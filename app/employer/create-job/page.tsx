"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Job description should be at least 50 characters";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, this would be an API call to create the job
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/employer/jobs");
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Job</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-800 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Marine Engineer, Boat Builder"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-800 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Provide a detailed description of the job, including responsibilities, requirements, and qualifications..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-800 ${
              errors.location ? "border-red-500" : "border-gray-300"  
            }`}
            placeholder="e.g., Auckland, Wellington, Christchurch"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary (Optional)
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-800"
            placeholder="e.g., $60,000 - $80,000 per year"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/employer/jobs")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#E91E63] text-white rounded-md hover:bg-[#C2185B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] disabled:bg-pink-300"
          >
            {isSubmitting ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
