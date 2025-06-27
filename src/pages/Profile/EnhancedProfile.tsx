import React, { useState } from 'react';
import { ArrowLeft, Edit, Settings, FileText, CreditCard, User, Mail, Phone, Calendar, MapPin, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sample profile data
const profileData = {
  name: 'Albert Einstein',
  traineeId: 'U56TRN241',
  profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000',
  personalInfo: {
    mailAddress: 'albert.einstein@example.com',
    name: 'Albert Einstein',
    gender: 'Male',
    contactNumber: '+1 234 567 8900',
    dateOfBirth: '1879-03-14',
    pinCode: '12345',
    address: '123 Physics Street, Princeton, NJ 08544'
  },
  instituteInfo: {
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    rollNumber: 'PHY001',
    studentId: 'U56TRN241'
  }
};

const menuItems = [
  {
    id: 'profile',
    label: 'Profile Information',
    icon: <Settings className="w-4 h-4" />
  },
  {
    id: 'certificate',
    label: 'Certificate',
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: 'idcard',
    label: 'ID Card',
    icon: <CreditCard className="w-4 h-4" />
  }
];

const EnhancedProfile: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleGoBack = () => {
    console.log('Going back...');
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked...');
  };

  return (
    <div 
      className="min-h-screen" 
      style={{
        backgroundColor: '#EBEFF3', 
        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div className="flex">
        {/* Sidebar */}
        <div 
          className="w-80 min-p-2 rounded-r-lg flex flex-col overflow-hidden" 
          style={{
            backgroundColor: '#EBEFF3', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            height: '95vh',
            marginTop: '1rem',
            marginLeft: '1rem',
            position: 'sticky',
            width: '25%'
          }}
        >
          {/* Profile Header Card */}
          <div className="flex-shrink-0 p-4">
            <Card className="bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] border-none">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  {/* Left side - Image and details */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
                        <img 
                          src={profileData.profileImage}
                          alt={profileData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Name and ID below image area */}
                    <div className="flex flex-col justify-center">
                      <h3 
                        className="font-bold text-gray-900 mb-1" 
                        style={{
                          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '1.2',
                          letterSpacing: '0px'
                        }}
                      >
                        {profileData.name}
                      </h3>
                      <p 
                        className="text-gray-600" 
                        style={{
                          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSize: '12px', 
                          lineHeight: '1.4'
                        }}
                      >
                        ID: {profileData.traineeId}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Edit button in input style */}
                  <div className="flex-shrink-0">
                    <button 
                      className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] border-none rounded-md px-3 py-2 flex items-center gap-2 text-gray-700 hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] transition-all duration-200"
                      style={{
                        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                      onClick={handleEditProfile}
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Menu */}
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeMenuItem === item.id
                      ? 'bg-[#7b00ff] text-white'
                      : 'text-gray-700 bg-[#ebeff3]'
                  }`}
                  style={{
                    boxShadow: activeMenuItem === item.id 
                      ? 'inset 3px 3px 5px rgba(123,0,255,0.3), inset -3px -3px 5px rgba(255,255,255,0.7)'
                      : '3px 3px 5px rgba(255,255,255,0.7), inset 2px 2px 3px rgba(189,194,199,0.75)',
                    fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeMenuItem === item.id 
                          ? 'bg-white bg-opacity-20' 
                          : 'bg-[#ebeff3] shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span 
                      className="font-medium" 
                      style={{
                        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Go Back Button */}
          <div className="flex-shrink-0 p-4">
            <button 
              className="w-full bg-[#7b00ff] text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)]" 
              style={{
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '14px'
              }}
              onClick={handleGoBack}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div 
            className="relative bg-[#ebeff3] rounded-lg p-6" 
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) -4px -4px 4px, 
                rgba(189, 194, 199, 0.75) 5px 5px 4px
              `,
              fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 
                className="font-bold text-gray-900 mb-6" 
                style={{
                  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '28px',
                  lineHeight: '100%',
                  letterSpacing: '0px'
                }}
              >
                Personal Information
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Mail Address */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    Mail Address
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.mailAddress}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.name}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    Gender
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.gender}
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    Contact Number
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.contactNumber}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    Date Of Birth
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.dateOfBirth}
                  </div>
                </div>

                {/* Pin Code */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <Hash className="w-4 h-4" />
                    Pin Code
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.pinCode}
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="col-span-2">
                  <label 
                    className="block font-medium text-gray-700 mb-2 flex items-center gap-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.personalInfo.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Institute Information Section */}
            <div>
              <h2 
                className="font-bold text-gray-900 mb-6" 
                style={{
                  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '28px',
                  lineHeight: '100%',
                  letterSpacing: '0px'
                }}
              >
                Institute Information
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Course */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    Course
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.instituteInfo.course}
                  </div>
                </div>

                {/* Batch */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    Batch
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.instituteInfo.batch}
                  </div>
                </div>

                {/* Roll Number */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    Roll Number
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.instituteInfo.rollNumber}
                  </div>
                </div>

                {/* Student ID */}
                <div>
                  <label 
                    className="block font-medium text-gray-700 mb-2" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4'
                    }}
                  >
                    Student ID
                  </label>
                  <div 
                    className="relative bg-[#ebeff3] rounded-lg px-3 py-3 text-gray-600" 
                    style={{
                      fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '14px', 
                      lineHeight: '1.4', 
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) inset 2px 2px 3px
                      `
                    }}
                  >
                    {profileData.instituteInfo.studentId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;