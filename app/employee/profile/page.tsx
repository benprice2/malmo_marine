"use client";

import { useState } from "react";

export default function Profile() {
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jane Employee",
    email: "employee@example.com",
    phone: "+64 21 123 4567",
    location: "Auckland, New Zealand",
    cvUrl: "https://example.com/cv.pdf",
    bio: "Experienced marine professional with over 5 years in the industry. Specialized in marine electronics and navigation systems."
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real app, this would be an API call to update the profile
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-800 font-bold">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
            />
          </div>
          
          <div>
            <label htmlFor="cvUrl" className="block text-sm font-medium text-gray-700 mb-1">
              CV/Resume Link
            </label>
            <input
              type="url"
              id="cvUrl"
              name="cvUrl"
              value={formData.cvUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
              placeholder="https://example.com/your-cv.pdf"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter a link to your CV hosted online (Google Drive, Dropbox, etc.)
            </p>
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#E91E63] focus:border-[#E91E63] text-gray-500"
              placeholder="Tell employers about your experience and skills..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-[#E91E63] text-white rounded-md hover:bg-[#C2185B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] disabled:bg-pink-300"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg text-gray-800 font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-800">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-800">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{formData.location}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">CV/Resume</p>
                  {formData.cvUrl ? (
                    <a
                      href={formData.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E91E63] hover:underline font-medium"
                    >
                      View CV
                    </a>
                  ) : (
                    <p className="text-gray-500">No CV uploaded</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Professional Bio</p>
                  <p className="mt-1 text-gray-800">{formData.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
            <button
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
