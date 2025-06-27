import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

const ProfileInformation: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Sample data - replace with actual data from props or API
  const [profileData, setProfileData] = useState({
    name: 'Albert Einstein',
    traineeId: 'U56TRN241',
    profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000'
  });

  const [personalInfo, setPersonalInfo] = useState({
    mailAddress: 'albert.einstein@example.com',
    name: 'Albert Einstein',
    gender: 'Male',
    contactNumber: '+1 234 567 8900',
    dateOfBirth: '1879-03-14',
    pinCode: '12345',
    address: '123 Physics Street, Princeton, NJ 08544'
  });

  const [instituteInfo, setInstituteInfo] = useState({
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    rollNumber: 'PHY001',
    studentId: 'U56TRN241'
  });

  // Store original data to compare changes
  const [originalPersonalInfo, setOriginalPersonalInfo] = useState(personalInfo);
  const [originalProfileImage, setOriginalProfileImage] = useState(profileData.profileImage);

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleGoBack = () => {
  };

  const handlePersonalInfoChange = (data: typeof personalInfo) => {
    setPersonalInfo(data);
    // Here you can also update the profile name if needed
    if (data.name !== profileData.name) {
      setProfileData(prev => ({ ...prev, name: data.name }));
    }
  };

  const handleInstituteInfoChange = (data: typeof instituteInfo) => {
    setInstituteInfo(data);
  };

  const handleEditClick = () => {
    if (!isEditing) {
      // Store original data when starting to edit
      setOriginalPersonalInfo(personalInfo);
      setOriginalProfileImage(profileData.profileImage);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (imageFile: File) => {
    // Handle image upload
    const imageUrl = URL.createObjectURL(imageFile);
    setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
    
    // Here you would typically upload the image to your server
  };

  // Check if there are any changes
  const hasChanges = () => {
    const personalInfoChanged = JSON.stringify(personalInfo) !== JSON.stringify(originalPersonalInfo);
    const imageChanged = profileData.profileImage !== originalProfileImage;
    return personalInfoChanged || imageChanged;
  };

  const handleSave = () => {
    if (!hasChanges()) {
      alert('No changes detected to save.');
      return;
    }

    // Here you would typically save all data to your backend
    
    // Update original data after successful save
    setOriginalPersonalInfo(personalInfo);
    setOriginalProfileImage(profileData.profileImage);
    
    // Show success message
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (hasChanges()) {
      const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) {
        return;
      }
    }

    // Restore original data
    setPersonalInfo(originalPersonalInfo);
    setProfileData(prev => ({ ...prev, 
      profileImage: originalProfileImage,
      name: originalPersonalInfo.name 
    }));
    
    setIsEditing(false);
  };

  return (
    <div className="min-h-fit font-['Quicksand']">
      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
        {/* Sidebar - Fixed width */}
        <div className="flex-shrink-0">
          <ProfileSidebar
            name={profileData.name}
            traineeId={profileData.traineeId}
            profileImage={profileData.profileImage}
            activeMenuItem={activeMenuItem}
            onMenuItemClick={handleMenuItemClick}
            onGoBack={handleGoBack}
            onEditClick={handleEditClick}
            onImageChange={handleImageChange}
            isEditing={isEditing}
          />
        </div>
        
        {/* Content - Takes remaining space */}
        <div className="flex-1">
          <ProfileContent
            personalInfo={personalInfo}
            instituteInfo={instituteInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
            onInstituteInfoChange={handleInstituteInfoChange}
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            activeMenuItem={activeMenuItem}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;