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
        className="relative bg-[#ebeff3] rounded-lg p-6" 
        style={{
          boxShadow: `
            rgba(255, 255, 255, 0.7) -4px -4px 4px, 
            rgba(189, 194, 199, 0.75) 5px 5px 4px
          `,
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