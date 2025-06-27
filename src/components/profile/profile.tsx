import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

const ProfileInformation: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');

  // Sample data - replace with actual data from props or API
  const profileData = {
    name: 'Albert Einstein',
    traineeId: 'U56TRN241',
    profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000'
  };

  const personalInfo = {
    mailAddress: 'albert.einstein@example.com',
    name: 'Albert Einstein',
    gender: 'Male',
    contactNumber: '+1 234 567 8900',
    dateOfBirth: '1879-03-14',
    pinCode: '12345',
    address: '123 Physics Street, Princeton, NJ 08544'
  };

  const instituteInfo = {
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    rollNumber: 'PHY001',
    studentId: 'U56TRN241'
  };

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleGoBack = () => {
    // Handle navigation back
    console.log('Going back...');
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
        <ProfileSidebar
          name={profileData.name}
          traineeId={profileData.traineeId}
          profileImage={profileData.profileImage}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={handleMenuItemClick}
          onGoBack={handleGoBack}
        />
        
        <ProfileContent
          personalInfo={personalInfo}
          instituteInfo={instituteInfo}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;