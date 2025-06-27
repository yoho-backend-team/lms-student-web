import React from 'react';
import PersonalInformation from './PersonalInformation';
import InstituteInformation from './InstituteInformation';

interface PersonalInfo {
  mailAddress: string;
  name: string;
  gender: string;
  contactNumber: string;
  dateOfBirth: string;
  pinCode: string;
  address: string;
}

interface InstituteInfo {
  course: string;
  batch: string;
  rollNumber: string;
  studentId: string;
}

interface ProfileContentProps {
  personalInfo: PersonalInfo;
  instituteInfo: InstituteInfo;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ personalInfo, instituteInfo }) => {
  return (
    <div className="flex-1 p-6">
      <div 
        className="rounded-lg p-6" 
        style={{
          backgroundColor: '#EBEFF3', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        <PersonalInformation data={personalInfo} />
        <InstituteInformation data={instituteInfo} />
      </div>
    </div>
  );
};

export default ProfileContent;